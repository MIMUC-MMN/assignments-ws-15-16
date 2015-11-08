/**
 * Cookie-Box-module
 *
 * Handles UX-components for hiding the cookie-box, as well as logic for
 * setting a cookie indicating the user has agreed with the cookie-policy.
 */

var CookieBox = (function ($) {

    // declare the variables we'll need in our event-handlers

    var methods = {},                   // object containing our private methods
        clicks = 0,                     // click-counter
        cookieBox = $('#cookie-box'),   // JQ-reference to our box
        $window = $(window),            // alias the window-global
        $document = $(document);        // alias the document-global

    /**
     * Hide the cookiebox.
     *
     * Also sets a cookie "accepted=true" after a 10-second timeout has passed.
     */
    methods.hideCookieBox = function () {
        cookieBox.fadeOut(500);

        var timeout = window.setTimeout(function () {
            document.cookie = 'accepted=true';

            // this is just a little fanciness
            $('.cookie-status').text($('.cookie-status').text().replace('not ', ''));
            $('.cookie-status').addClass('accepted');
        }, 10000);

    };

    /**
     * Hide the cookie-box on clicking the close-handler (X).
     */
    methods.hideOnClose = function hideOnClose() {
        cookieBox.find('.close').on('click', function () {
            methods.hideCookieBox();
        });
    };

    /**
     * Hide the cookie-box when the user has clicked three times
     * anywhere on the page.
     */
    methods.hideOnTripleClick = function hideOnTripleClick() {
        $('html').on('click', function () {

            // increment counter...
            clicks++;

            // ...then check condition
            if (clicks === 3) {
                methods.hideCookieBox();
            }
        });
    };

    /**
     * Hide the cookie-box when the user has scrolled to the bottom of the page.
     */
    methods.hideOnScroll = function hideOnScroll() {

        // 'window' because we want to detect scrolls of the page
        $window.on('scroll', function () {

            // scrollTop() is the offset created by one scroll-event
            if ($window.scrollTop() + $window.height() === $document.height()) {
                methods.hideCookieBox();
            }
        });
    };

    return {

        /**
         * Initialize our module by setting up the different event-handlers.
         */
        init: function init() {

            // shorthand for $(document).ready()
            $(function () {
                methods.hideOnClose();
                methods.hideOnTripleClick();
                methods.hideOnScroll();
            });
        }
    }

}(jQuery));

CookieBox.init();