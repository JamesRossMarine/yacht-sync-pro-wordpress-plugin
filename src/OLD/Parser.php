<?php

trait Parser
{
    protected $obj;

    /**
     * Removes unwanted fields
     *
     * @param  array  $fields
     * @param  null|array  $obj
     */
    public function unsetVars(array $fields, &$obj = null)
    {
        if ($obj) {
            array_forget($obj, $fields);
        } else {
            array_forget($this->obj, $fields);
        }
    }

    /**
     * Adds specified fields in a sub array and removes old one from property array.
     *
     * @param $groupName
     * @param  array  $fields
     * @param  bool  $convertToBool
     * @param  null|array  $obj
     */
    protected function createGroup($groupName, array $fields, $convertToBool = false, &$obj = null)
    {
        $fieldsFound = [];
        $source      = ($obj ? $obj : $this->obj);

        foreach ($fields as $key => $field) {
            //check if field has type
            $type = null;
            if ( ! is_numeric($key)) {
                $type  = $field;
                $field = $key;
            }
            if (array_key_exists($field, $source)) {
                if ($convertToBool) {
                    $fieldsFound[$field] = ($source[$field] == 'Y' ? true : false);
                } elseif ($type) {
                    switch ($type) {
                        case 'int':
                            $fieldsFound[$field] = (is_numeric(
                                $source[$field]
                            ) ? (int)$source[$field] : $source[$field]);
                            break;
                        case 'string':
                            $fieldsFound[$field] = (string)$source[$field];
                        default:
                            $fieldsFound[$field] = $source[$field];
                            break;
                    }
                } else {
                    $fieldsFound[$field] = $source[$field];
                }
                if ($obj) {
                    array_forget($obj, $field);
                } else {
                    array_forget($this->obj, $field);
                }
            } else {
                $fieldsFound[$field] = null;
            }
        }
        ksort($fieldsFound);
        if ($obj) {
            array_set($obj, $groupName, $fieldsFound);
        } else {
            array_set($this->obj, $groupName, $fieldsFound);
        }
    }

    /**
     *
     * @param  array  $fields
     * @param  null|array  $obj
     */
    protected function renameFields(array $fields, &$obj = null)
    {
        foreach ($fields as $oldField => $newField) {
            // merge fields
            $newFieldValues = null;
            $merge          = false;
            $mergeFields    = [];
            // $oldField is ignored when we get an array of $newField
            if (is_array($newField) && $newField) {
                $merge       = true;
                $mergeFields = $newField;
                $newField    = key($newField);
                foreach ($mergeFields[$newField] as $oldField) {
                    $newFieldValues = ($newFieldValues ? $newFieldValues.' ' : '').array_get(
                            $obj ?: $this->obj,
                            $oldField
                        );
                }
                if ($obj) {
                    array_forget($obj, $mergeFields[$newField]);
                } else {
                    array_forget($this->obj, $mergeFields[$newField]);
                }
            }

            if ($obj) {
                array_set($obj, $newField, ($merge ? $newFieldValues : array_get($obj ?: $this->obj, $oldField)));
                array_forget($obj, $merge ? $mergeFields[$newField] : $oldField);
            } else {
                array_set($this->obj, $newField, ($merge ? $newFieldValues : array_get($obj ?: $this->obj, $oldField)));
                array_forget($this->obj, $merge ? $mergeFields[$newField] : $oldField);
            }
        }
    }
}