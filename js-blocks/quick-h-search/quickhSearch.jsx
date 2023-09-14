import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, RichText, InspectorControls, URLInput } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('ysp-blocks/quick-h-search', {
    icon: 'universal-access-alt',
    attributes: {
      
    },
    edit: function (props) {
      return (
            <div { ...useBlockProps() }>
                  <ServerSideRender 
                      block="ysp-blocks/quick-h-search"
              attributes={ props.attributes }
                  />	
              </div>
      );
    },
    save: function (props) {
      return null;
    },
  });