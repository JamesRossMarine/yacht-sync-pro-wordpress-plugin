<?php 
    #[AllowDynamicProperties]
 class raiYachtSync_Taxonomies {
    public function __construct() {

    }

    public function add_actions_and_filters() {
        add_action('init', [$this, 'add_taxonomies']);
    }

    public function add_taxonomies() {
        register_taxonomy('boatclass', 'rai_yacht', array(

            'public' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'hierarchical' => false,

            'labels' => array(
              'name' => __( 'Boat Code Class' ),
              'singular_name' => __( 'Boat Code Class' ),
              'search_items' =>  __( 'Search Codes' ),
              'all_items' => __( 'All Boat Code Classes' ),
              'parent_item' => __( 'Parent Code' ),
              'parent_item_colon' => __( 'Parent Code:' ),
              'edit_item' => __( 'Edit Code Class' ),
              'update_item' => __( 'Update Code Class' ),
              'add_new_item' => __( 'Add New Code Class' ),
              'new_item_name' => __( 'New Code Class' ),
              'menu_name' => __( 'Boat Code Classes' ),
            )
          ));
    }

 }