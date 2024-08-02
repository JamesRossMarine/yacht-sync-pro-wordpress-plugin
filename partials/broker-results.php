<?php
    $brokersQuery = new WP_Query(array(
        'post_type' => 'rai_team',
        'posts_per_page' => -1,
    ));
?>

<div id="broker-results">
    <h2 class="brokers-section-title">Our Team</h2>
    <div class="broker-cards">
        
        <?php while ($brokersQuery->have_posts()):
            $brokersQuery->the_post();
            // var_dump($brokersQuery->post);

            $broker_first_name = get_post_meta($brokersQuery->post->ID, 'rai_team_fname', true);
            $broker_last_name = get_post_meta($brokersQuery->post->ID, 'rai_team_lname', true);
            $broker_email = get_post_meta($brokersQuery->post->ID, 'rai_team_email', true);
            $broker_phone = get_post_meta($brokersQuery->post->ID, 'rai_team_phone', true);
        ?>
            <div class="broker-card">
            <a class="broker-anchor" href="<?php the_permalink(); ?>">
                <img class="broker-image" src="<?php echo esc_url(get_the_post_thumbnail_url()); ?>" alt="" />
                <div class="broker-info">
                    <div class="broker-name-container">
                        <p class="broker-name"><?php echo ($broker_first_name . " " . $broker_last_name); ?></p>
                        <img class="arrow-right" src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>images/arrow-right.png" alt="bed-icon" />
                    </div>
                    </a>
                    <p class="broker-title">Broker</p>
                    <p class="broker-email"><a href="mailto:broker@gmail.com"><?php echo $broker_email; ?></a></p>
                    <p class="broker-phone"><a href="tel:6466465555"><?php echo $broker_phone; ?></a></p>
                </div>
            </div>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    </div>
</main>
