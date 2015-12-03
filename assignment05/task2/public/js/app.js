/**
 * A module for the notetaking-app.
 *
 * This modules encapsulates logic dealing with the
 * Create and Delete parts of the API. These two actions
 * are implemented via simple AJAX-calls to two server-side scripts,
 * which perform the actual deletion.
 *
 */
var Notes = (function ($) {
    // private methods
    var methods = {};

    // since creating markup is expensive, we alias the markup we want to insert later
    var noteMarkup =
    '<div id="note-{{note.id}}" class="note flexChild">' +
        '<i class="delete fa fa-trash fa-lg"></i>' +
        '<div class="title">{{note.title}}</div>' +
        '<div class="content">{{note.content}}</div>' +
    '</div>';

    /**
     * Create a note via AJAX.
     *
     * Uses the Promise-interface to resolve the AJAX-call.
     * Compiles a template from pre-existing markup and
     * correctly updates the nagbar depending on the outcome.
     *
     * @param data the JSON-data representing the note
     */
    methods.createNote = function createNote(data) {
        $.post('app/controllers/api/createNote.php', data)
            .always(function () {
                $('header').find('.notification').remove();
            })
            .done(function (data) {

                var note = data; // the API echoes back our sent data
                var markup = noteMarkup
                    .replace(/\{\{note\.id\}\}/ig, note.id)
                    .replace(/\{\{note.title\}\}/, note.title)
                    .replace(/\{\{note.content\}\}/, note.content);

                // show notification
                $('<div class="notification success">Successfully added note!</div>')
                    .insertBefore('header .brand')
                    .fadeOut(10000);

                // insert new note into DOM
                $('.flexParent').append($(markup));

            })
            .fail(function (xhr, status, error) {
                $('<div class="notification error">Oops! There was an error while saving your note.</div>')
                    .insertBefore('header .brand')
                    .fadeOut(10000);

                console.error('[Add note] ERROR: ', error);
            });
    };

    /**
     * Delete a note via AJAX.
     *
     * Uses the Promise-interface to resolve the AJAX-call.
     * Removes the recently deleted note and correctly updates
     * the nagbar depending on the outcome.
     *
     * @param data the ID of the note pending deletion, in JSON
     */
    methods.deleteNote = function deleteNote(data) {
        $.post('app/controllers/api/deleteNote.php', data)
            .always(function () {
                $('header').find('.notification').remove();
            })
            .done(function (data) {

                // the API echoes back our sent data, here only the deleted ID
                var note = data.deleted;

                // we identify our notes by their individual IDs
                $('#note-' + note).fadeOut(400);

            })
            .fail(function (xhr, status, error) {
                $('<div class="notification error">Sorry, we couldn\'t delete that note.</div>')
                    .insertBefore('header .brand')
                    .fadeOut(10000);

                console.error('[Delete note] ERROR: ', error);
            });
    };

    /**
     * Setup event handlers on the UI and attach the
     * relevant AJAX proxy-methods to them.
     */
    methods.setupEventHandlers = function setupEventHandlers() {

        /*
         Hook into the note-form's submit-event to send a note
         to the server via Ajax and store it there.
         */
        $('#note').on('submit', function (e) {

            var data = $(this).serialize();

            // we will take care of data-submission, not the browser!
            e.preventDefault();

            methods.createNote(data);
        });

        /*
         There's a special delete-button which will send the id
         of the note pending deletion to the server to finally
         remove it.
         Since we're creating new notes and thus new delete-buttons
         on the fly, we need to delegate their click-event!
         */
        $('.notes').on('click', '.delete', function (e) {

            var id = $(this).parent().attr('id').split('-')[1];

            e.preventDefault();
            methods.deleteNote({'note-id': id});
        });
    };

    // return a tiny public interface
    return {
        init: function init() {
            methods.setupEventHandlers();
        }
    };

}(jQuery));

Notes.init();