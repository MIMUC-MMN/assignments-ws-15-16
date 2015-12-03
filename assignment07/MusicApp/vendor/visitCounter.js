/**
 * This is a module that counts visits of certain paths.
 * It provides a middleware that can be used at a given mount point to track visits
 * relative to the mount point.
 *
 * @param countedPaths String|Array of paths that should be counted as visits. Most likely ['/', '/index.html'] and alike.
 *        if this is missing, all paths are counted.
 */
var visitCounter = function(countedPaths){
    // we are going to access "this" in other functions
    // to avoid any unintended behavior we create a reference to
    // this object to safely refer to only to the top-level "this".
    var self = this;

    // member variables
    this.visits = {};
    this.countedPaths = countedPaths;


    /**
     * middleware function that can be used on certain routes.
     * @param req the request object
     * @param res the response
     * @param next a pointer to the next function in the middleware chain.
     */
    this.countMiddleware = function(req, res, next){
        /**
         * either initializes a property of self.visits
         * or increments the coutner if it is already there.
         * @param req the request object
         */
        function initOrIncrement(req){
            if(self.visits[req.url] === undefined){
                self.visits[req.url] = 1;
            }
            else{
                self.visits[req.url]++;
            }
        }
        // check if counted paths is specified
        // if so, we only count what is included in there.
        if(self.countedPaths){
            // check if the request should be counted as visit.
            // indexOf works both on Strings and Arrays.
            if(self.countedPaths.indexOf(req.url) != -1){
                initOrIncrement(req);
            }
        }
        else{ // we count all paths.
            initOrIncrement(req);
        }

        // we do not want to do anything with the request nor the response
        // so we have to call next()
        next();
    };


    /**
     * @param path: optional path. If specified, will only return the visits of the given path as number.
     * @returns {number|object} current visit count on the given mount point and countedPaths.
     */
    this.getCount = function(path){
        var filteredVisits = {};
        if(path && typeof self.visits[path] == 'number'){
            filteredVisits[path] = self.visits[path];
            return filteredVisits;
        }
        else return self.visits;
    };
};

// make the module available to other modules:
module.exports = visitCounter;