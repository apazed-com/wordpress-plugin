<template>
	<div>

		<template v-if="this.forms.length">
			<form-list :site="site" :forms="forms" />
		</template>
		<template v-else>
			<cta-create-form :site="site" />
		</template>

	</div>
</template>

<script>

import CtaCreateForm from "./../components/CtaCreateForm";
import FreeFeatures from "../components/FreeFeatures";
import ProFeatures from "../components/ProFeatures";
import FormList from "../components/FormsList";

export default {
	name: "forms",
	components: {FormList, ProFeatures, FreeFeatures, CtaCreateForm},
	props: ['site','forms'],
}
</script>

