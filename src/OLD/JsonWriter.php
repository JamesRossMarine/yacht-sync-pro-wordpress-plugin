<?php

class JsonWriter
{
    private $jsonWriteFileResource;
    private $key = 0;
    public function __construct($path)
    {
        // Truncate the file. and write the beginning of the json array
        $this->jsonWriteFileResource = fopen($path, 'w');
        fwrite($this->jsonWriteFileResource, '[');
    }

    /**
     * Add an item into JSON array
     *
     * @param  array|object|string  $json
     */
    public function add($json)
    {
        if ($this->key !== 0) {
            fwrite($this->jsonWriteFileResource, ',');
        }
        fwrite($this->jsonWriteFileResource, json_encode($json));
        $this->key++;
    }

    public function __destruct()
    {
        $this->cleanup();
    }

    /**
     * Close the JSON array and cleanup the resource
     *
     * @return void
     */
    public function cleanup()
    {
        if (is_resource($this->jsonWriteFileResource)) {
            fwrite($this->jsonWriteFileResource, ']');
            fclose($this->jsonWriteFileResource);
        }
    }
}