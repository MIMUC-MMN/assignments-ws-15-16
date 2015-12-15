/**
 * Created by tobias on 14.12.2015.
 */
var express = require('express');
var router = express.Router();


// connect to a local database. We assume that we do not need a user name / password
var db = require('monk')('localhost/mmn');

// this collection holds our notes
var notesCollection = db.get('notes');

// we enable updates / removals of multiple documents on collection-level.
notesCollection.options.multi = true;


/**
 * simply return all the notes in the database collection "notes"
 * The query params could be passed as GET parameters.
 */
router.get('/', function (req, res) {
    // find all notes, unless we find mongo selection parameters in the get request.
    // TODO
    // 1. query the database using the notesCollection
    // 2. respond to the client with a JSON object
    /*
         The response should look like this in case of success:
         {
            status : 'success',
            message : 'fetched notes',
            notes : ... // array containing the fetched notes.
         }

         In case of an error, adjust the response accordingly. The status and message fields are mandatory.
     */
});


/**
 * this route is used to insert notes into the notes collection.
 * it accepts both a single Object and an array of notes in req.body.notes
 */
router.post('/insert', function (req, res) {
    var notes;
    // make sure the parsing succeeded and notes is not null.
    if (req.body && req.body.notes) {
        // TODO
        // 1. use the right method on notesCollection to insert the data
        // 2. provide a callback function that is used when the insertion is done
        // 3. make sure to send a JSON as response.
        /*
            The response should look like this in case of success:
            {
                status : 'success',
                message : 'successfully inserted the note(s)',
                inserted : ... // array containing the inserted notes.
            }

            In case of an error, adjust the response accordingly. The status and message fields are mandatory.
         */
    }
    // either the body-parser failed or the parameter "notes" is missing in the request.
    else {
        res.json({
            status: 'error',
            code: 1000,
            message: 'missing parameter \'notes\''
        })
    }
});


/**
 * this route can be used to delete notes from the database.
 * req.body.notes is expected to be an array of document-ids (hex-value)
 * eg.
 * {
 *   notes :  ["566fdb2c9b8629381cfff85e","566fdb279b8629381cfff85d"]
 * }
 *
 */
router.post('/delete', function (req, res) {
    var notes;
    // make sure the POST parameter is present.
    if (req.body && req.body.notes) {

        // use whatever we get, but we need an array
        if (req.body.notes instanceof Array) {
            // it already is an array, so we use it.
            notes = req.body.notes;
        }
        else if(req.body.notes instanceof Object){
            // it is an object, so it should contain the _id field. Wrap it in a 1-element array.
            notes = [req.body.notes._id];
        }
        else if(req.body.notes instanceof String){
            // it is a string, so we assume it contains the id as hex-value
            notes = [req.body.notes];
        }

        // now we have to "cast" all the ids to real ObjectId objects.
        // to speed this up without for loops, we use the .map() function
        notes = notes.map(function(i){
            return notesCollection.id(i);
        });

        // notes now contains an array of ObjectIds.

        notesCollection.remove({
            _id: {
                // the $in operator is kind of slow, but does the job.
                // it takes each item in the notes array and checks if there is an object with such an id.
                $in: notes
            }
        }, function (e) {
            // remove does not return a docs array, only an error (if any)
            if (!e) {
                // everything went fine, let's inform the client
                res.json({
                    status: 'success',
                    code: 200,
                    message: 'removed ' + notes.length + ' notes.' // this is not accurate, but rather an upper boundary.
                })
            }
            else {
                // somehow, the removal failed, inform the client.
                res.json({
                    status: 'error',
                    code: 1002,
                    message: 'There was an error removing the data'
                })
            }
        })
    }
    else {
        // the notes parameter is missing in the request or the body parser failed.
        res.json({
            status: 'error',
            code: 1000,
            message: 'missing parameter \'notes\''
        })
    }
});

module.exports = router;
