import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, RichText, InspectorControls, URLInput } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('ysp-blocks/hform-block', {
    icon: 'universal-access-alt',
    attributes: {
      
    },
    edit: function (props) {
      return (
            <div { ...useBlockProps() }>
                  <ServerSideRender 
                      block="ysp-blocks/hform-block"
              attributes={ props.attributes }
                  />	
              </div>
      );
    },
    save: function (props) {
      return null;
    },
  });