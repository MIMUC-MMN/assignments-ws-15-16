# Assignment 14 #

## Exam preparation ##

Here we are collecting solutions for assignment sheet 14.


## TS' Comments on current solution ##

I am referring to the status from commit b749e14. 

### Task 2d) ###
"Transparency" in network communication means the opposite.<br />
https://en.wikipedia.org/wiki/Network_transparency<br  />
transparent == invisible!

### Task 4d) ###
- I counted the missing imports as one mistake, but in general you're right
- You're right about the movies.json URL, that's a copy-paste error. I used a movies.json to first make sure that everything works ;)
- I counted the missing databinding in the `<h2>` as one error.

so here are the four: missing imports, missing databinding annotations, missing template info, faulty attribute on iron-ajax.<br />
not counted: URL in iron-ajax (my bad).

### Task 5c) ###
- So far so good, but please note that the solution wouldn't fit into the box on the page. I'd suggest providing a solution that
does not use a typical express-generator layout. It's really just merging the solution into one file `app.js`

- one more thing (somewhat off topic): 

    ``` javascript
    if(request.hours === "1")
    ```
    
    I would argue against a strong, type-checked "equals" here. The semantics of this check is "if req.hours is truthy, 
     then provide the data". So a simple req.query.hours would be enough.
      
### Task 6a) ###
I'll leave that open for discussion. Location can be something that usually doesn't require human input. See here: https://goo.gl/pl3rHH 

### Task 6b) ###
The first part of your answer suggests using better software to facilitate manual tagging. That was not the point of the
 question. The second part of your answer is better ;)