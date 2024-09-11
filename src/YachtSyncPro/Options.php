<?php 
	#[AllowDynamicProperties]
	class YachtSyncPro_Options {

	    const OPTION_INSTALLED = '_installed';
	 
	    const PREFIX = 'ysp_ys_';

	    public $defaultOptionValues = [
	        'euro_c_c' => .9,
	    ];

	    public function __construct() {
	    	
	    }

	    public function get($optionName) 
	    {
	        global $ysp_gotten_options;

	        $prefixedOptionName = SELF::PREFIX.$optionName;

	        if (isset($ysp_gotten_options[ $prefixedOptionName ])) {
	          $retVal = $ysp_gotten_options[$prefixedOptionName];
	        }
	        else {
	          $retVal = get_option($prefixedOptionName);
	          $ysp_gotten_options[$prefixedOptionName] = $retVal;
	        }

	        return $retVal;
	    }

	    public function update($optionName, $value) 
	    {
	        global $ysp_gotten_options;

	        $prefixedOptionName = SELF::PREFIX.$optionName;

	        $ysp_gotten_options[$prefixedOptionName] = $value;
	        
	        return update_option($prefixedOptionName, $value);
	    }

	    public function delete($optionName) 
	    {
	        $prefixedOptionName = SELF::PREFIX.$optionName; 

	        return delete_option($prefixedOptionName);
	    }

	    public function isInstalled() 
	    {
	      return $this->get(self::OPTION_INSTALLED);
	    }

	    public function markAsInstalled() 
	    {
	      return $this->update(self::OPTION_INSTALLED, true);
	    }

	    public function markAsUnInstalled() 
	    {
	      return $this->delete(self::OPTION_INSTALLED);
	    }
	}