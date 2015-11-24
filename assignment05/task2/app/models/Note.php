<?php

class Note{
    var $id;
    var $title;
    var $content;
    function __construct($id=-1,$title,$content){
        $this->id=$id;
        $this->title=$title;
        $this->content=$content;
    }
}