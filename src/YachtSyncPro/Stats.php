<?php
#[AllowDynamicProperties]
class YachtSyncPro_Stats {
    public function run($params) {
        global $wpdb;

        $yArgs = [
            'post_type'      => 'rai_yacht',
            'fields'         => 'ids',
            'posts_per_page' => -1,
        ];

        $yArgs = array_merge($yArgs, $params);
        $postIDs = get_posts($yArgs);

        $min_max_year = $wpdb->get_row($wpdb->prepare("
            SELECT 
                MIN(pm.meta_value) min_year,
                MAX(pm.meta_value) max_year
            FROM {$wpdb->postmeta} pm
            LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
            INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
            WHERE p.post_status = %s
            AND p.post_type = %s
            AND pm.meta_key = %s
            AND pmm.meta_key = 'SalesStatus'
            AND pmm.meta_value NOT IN ('Sold', 'Suspend')
            AND LENGTH(pm.meta_value) > 1
        ", 'publish', 'rai_yacht', 'ModelYear'));

        $min_max_priceUSD = $wpdb->get_row($wpdb->prepare("
            SELECT 
                MIN(pm.meta_value) min_priceUSD,
                MAX(pm.meta_value) max_priceUSD,
                SUM(pm.meta_value) sum_priceUSD
            FROM {$wpdb->postmeta} pm
            LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
            INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
            WHERE p.post_status = %s
            AND p.post_type = %s
            AND pm.meta_key = %s 
            AND pmm.meta_key = 'SalesStatus'
            AND pmm.meta_value NOT IN ('Sold', 'Suspend')
            AND LENGTH(pm.meta_value) > 1
        ", 'publish', 'rai_yacht', 'YSP_USDVal'));


        $min_max_priceEUR = $wpdb->get_row($wpdb->prepare("
            SELECT 
                MIN(pm.meta_value) min_priceEUR,
                MAX(pm.meta_value) max_priceEUR,
                SUM(pm.meta_value) sum_priceEUR
            FROM {$wpdb->postmeta} pm
            LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
            INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
            WHERE p.post_status = %s
            AND p.post_type = %s
            AND pm.meta_key = %s 
            AND pmm.meta_key = 'SalesStatus'
            AND pmm.meta_value NOT IN ('Sold', 'Suspend')
            AND LENGTH(pm.meta_value) > 1
        ", 'publish', 'rai_yacht', 'YSP_EuroVal'));

        $min_max_length = $wpdb->get_row($wpdb->prepare("
            SELECT 
                MIN(pm.meta_value) min_loa,
                MAX(pm.meta_value) max_loa
            FROM {$wpdb->postmeta} pm
            LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
            INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
            WHERE p.post_status = %s
            AND p.post_type = %s
            AND pm.meta_key = %s
            AND pmm.meta_key = 'SalesStatus'
            AND pmm.meta_value NOT IN ('Sold', 'Suspend')
            AND LENGTH(pm.meta_value) > 1
        ", 'publish', 'rai_yacht', 'YSP_LOAFeet'));

        $min_max_length_meters = $wpdb->get_row($wpdb->prepare("
            SELECT 
                MIN(pm.meta_value) min_loa,
                MAX(pm.meta_value) max_loa
            FROM {$wpdb->postmeta} pm
            LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
            INNER JOIN {$wpdb->postmeta} pmm ON pmm.post_id = pm.post_id
            WHERE p.post_status = %s
            AND p.post_type = %s
            AND pm.meta_key = %s
            AND pmm.meta_key = 'SalesStatus'
            AND pmm.meta_value NOT IN ('Sold', 'Suspend')
            AND LENGTH(pm.meta_value) > 1
        ", 'publish', 'rai_yacht', 'YSP_LOAMeter'));


        return [
            'min_year' => $min_max_year->min_year,
            'max_year' => $min_max_year->max_year,
            
            'min_priceUSD' => $min_max_priceUSD->min_priceUSD,
            'max_priceUSD' => $min_max_priceUSD->max_priceUSD,
            'sum_priceUSD' => $min_max_priceUSD->sum_priceUSD,
            
            'min_priceEUR' => $min_max_priceEUR->min_priceEUR,
            'max_priceEUR' => $min_max_priceEUR->max_priceEUR,
            'sum_priceEUR' => $min_max_priceEUR->sum_priceEUR,
            
            'min_loa' => $min_max_length->min_loa,
            'max_loa' => $min_max_length->max_loa,           

            'min_loa_meters' => $min_max_length_meters->min_loa,
            'min_loa_meters' => $min_max_length_meters->max_loa,            
        ];
    }
}




