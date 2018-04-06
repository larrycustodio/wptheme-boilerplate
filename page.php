<?php get_header(); ?>

	<div class="row">
		<div class="col-sm-12">
			<?php echo wp_title(''); ?>

			<?php 
				if ( have_posts() ) : while ( have_posts() ) : the_post();
					the_content();
				endwhile; endif; 
			?>
		</div> <!-- /.col -->
	</div> <!-- /.row -->

<?php get_footer(); ?>