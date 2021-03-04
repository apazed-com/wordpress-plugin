<?php

if ( ! function_exists( 'prp' ) ) {
	/**
	 * print_r with a <pre> wrap
	 * @param array $array
	 * @return
	 */
	function prp( $array ) {
		echo '<pre style="white-space:pre-wrap;">';
		print_r( $array );
		echo '</pre>';
	}
}