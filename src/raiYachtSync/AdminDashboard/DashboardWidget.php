<?php
	class raiYachtSync_AdminDashboard_DashboardWidget {

		public function __construct() {

		}

		public function add_actions_and_filters() {
			add_action( 'wp_dashboard_setup', [$this, 'admin_dashboard_widget'] );
		}

        public function admin_dashboard_widget() {
            wp_add_dashboard_widget(
                'rai_ys_dashboard_widget',
                'Yacht Sync Dashboard Widget',
                [$this, 'rai_ys_dashboard_widget_callback']
            );
        }

        public function rai_ys_dashboard_widget_callback() {
            // include_once RAI_YS_PLUGIN_TEMPLATES_DIR.'/admin-dashboard-widget.php';
            echo '<h1>Programming is fun!</h1>';
        }

	}