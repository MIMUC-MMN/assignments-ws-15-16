<?php

class User
{
    protected $id;
    protected $name;
    protected $hash;

    function __construct($id, $name, $hash)
    {
        $this->id = $id;
        $this->name = $name;
        $this->hash = $hash;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return User
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getHash()
    {
        return $this->hash;
    }

    /**
     * @param mixed $hash
     * @return User
     */
    public function setHash($hash)
    {
        $this->hash = $hash;
        return $this;
    }
}