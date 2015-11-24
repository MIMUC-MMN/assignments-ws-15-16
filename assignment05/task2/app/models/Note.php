<?php

class Note
{
    protected $id;
    protected $title;
    protected $content;

    function __construct($id, $title, $content)
    {
        $this->id = $id;
        $this->title = $title;
        $this->content = $content;
    }
}