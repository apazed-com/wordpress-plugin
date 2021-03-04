<?php

/**
 * Provide a admin area view for the plugin
 *
 * @link       https://apazed.com
 * @since      1.0.0
 *
 * @package    Apazed
 * @subpackage Apazed/admin/partials
 */
?>
<div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
        <div class="sm:flex sm:items-start sm:justify-between">
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Connect with Apazed
                </h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                        Let's get you connected with Apazed. If you don't have an account already, don't worry, you'll
                        be given the opportunity register.
                    </p>
                </div>
            </div>
            <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                <form action="<?php echo $action_url ?>" method="GET">
                    <input type="hidden" name="name" value="<?php echo get_bloginfo( 'name' ) ?>">
                    <input type="hidden" name="return_url"
                           value="<?php echo admin_url( "options-general.php?page=" . $_GET["page"] ) ?>">
                    <button
                            type="submit"
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                        Connect
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
