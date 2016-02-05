# Assignment 14 #

## Task 4 ##

#### Task 1: Ajax ####

##### Advantages #####
+ Page does not require a complete refresh
+ Asynchronous (non blocking)
+ Reduces traffic 
+ Different triggers (e.g. mouseclick, mouseover, mousemove)
+ Keeps pages up-to-date (allows the creation of webApp GUIs)

##### Drawbacks #####
- Could cause problems with bookmarks
- May cause issues with back button
- Requires JavaScript
- Web crawlers usually do not use JavaScript
- Bad implementation could cause high server load

#### Same Origin Policy ####

The Same Origin Policy describes a security concept (security policy). Only resources within the same origin can be accessed by AJAX. The origin is defined by domain, port and protocol (http or https). 
As this policy can limit the functionality (e.g. limits access to 3rd party APIs). Cross origin resource sharing (CORS) or JSONP are methods to face this issue.

##### Example #####

Domain `example.com`

```javascript
$.ajax({
    type: 'GET',
    url: 'http://www.url.com'
})



#### Issues found in polymer code (I found 6? instead of four) ####
`polymer (<link rel="import" href="../bower_components/polymer/polymer.html">)`and iron-ajax `<link rel="import" href="../bower_components/iron-ajax/iron-ajax.html">` not embedded.
Wrong url `movie.es` instead of `movies.json`
Camel case: `last-response` instead of `lastResponse` 
Missing databinding `databinding` (one way is enough) for `movie.name and movie.year`
