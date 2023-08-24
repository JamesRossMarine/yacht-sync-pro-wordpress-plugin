<?php 
	class raiYachtSync_Options {

	    const OPTION_INSTALLED = '_installed';
	 
	    const PREFIX = 'rai_ys_';

	    public $defaultOptionValues = [
	        
	    ];

	    public function __construct() {
	    	
	    }

	    public function get($optionName) 
	    {
	        global $rai_yS_gotten_options;

	        $prefixedOptionName = SELF::PREFIX.$optionName;

	        if (isset($rai_yS_gotten_options[ $prefixedOptionName ])) {
	          $retVal = $rai_yS_gotten_options[$prefixedOptionName];
	        }
	        else {
	          $retVal = get_option($prefixedOptionName);
	          $rai_yS_gotten_options[$prefixedOptionName] = $retVal;
	        }

	        return $retVal;
	    }

	    public function update($optionName, $value) 
	    {
	        global $rai_yS_gotten_options;

	        $prefixedOptionName = SELF::PREFIX.$optionName;

	        $rai_yS_gotten_options[$prefixedOptionName] = $value;
	        
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