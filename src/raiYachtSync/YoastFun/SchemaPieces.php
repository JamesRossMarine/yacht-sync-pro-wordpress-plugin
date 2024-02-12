<?php 
    class raiYachtSync_YoastFun_SchemaPieces {

        public function __construct() {
						
		}
	
		public function add_actions_and_filters() {
            add_filter( 'wpseo_schema_graph_pieces', [$this, 'yoast_add_graph_pieces'], 11, 2 );
		}

        public function yoast_add_graph_pieces( $pieces, $context ) {

            $pieces[] = new raiYachtSync_YoastFun_Schema_Broker( $context );
            $pieces[] = new raiYachtSync_YoastFun_Schema_Yacht( $context );
            $pieces[] = new raiYachtSync_YoastFun_Schema_Search( $context );
            $pieces[] = new raiYachtSync_YoastFun_Schema_ImageGallery( $context );
            $pieces[] = new raiYachtSync_YoastFun_Schema_VideoObject( $context );
            $pieces[] = new raiYachtSync_YoastFun_Schema_PDFDoc( $context );

            return $pieces;
        }

    }