# Assignment 14 #

## Task 2 ##

### b) How are Sessions destroyed in PHP? ###
`session_destroy(); \n $_SESSION = array();`

### c) How does PHP identify unsers to keep track of individual sessions? ###
Using a default cookie `PHPSESSID``

### d) How do you transparently transmit form data to the sever? ###
Using `GET` Requests, form data is attached as parameters to the url.