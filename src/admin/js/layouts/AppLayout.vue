<template>
	<div class="min-h-screen bg-transparent -ml-5">
		<div class="full-animated-gradient-background pb-32">

			<nav class="pt-3 bg-support1-800 border-b border-support1-300 border-opacity-25 lg:border-none">
				<div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
					<div
						class="relative h-16 flex items-center justify-between lg:border-b lg:border-support1-400 lg:border-opacity-25">
						<slot name="navigation"></slot>
					</div>
				</div>
			</nav>

			<header class="py-10">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<slot name="header"></slot>
				</div>
			</header>
		</div>

		<main class="-mt-32">
			<div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">

				<div>
					<slot name="messages"></slot>
				</div>

				<div class="bg-white rounded-sm shadow px-5 py-6 sm:px-6">
					<slot name="main"></slot>
				</div>

			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: "app-layout",
}
</script>

