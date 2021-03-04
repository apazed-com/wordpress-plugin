<template>
	<div>
		<form-list :site="site" :forms="forms" />
	</div>
</template>

<script>

import CtaConnect from "./../components/CtaConnect";
import FreeFeatures from "../components/FreeFeatures";
import ProFeatures from "../components/ProFeatures";
import FormList from "../components/FormsList";

export default {
	name: "forms",
	components: {FormList, ProFeatures, FreeFeatures, CtaConnect},
	props: ['site','forms'],
}
</script>

