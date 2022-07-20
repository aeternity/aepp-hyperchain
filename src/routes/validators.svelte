<script lang="ts">
	import getValidatorState from '$lib/aesdk/getValidatorState';
	import { browser } from '$app/env';

	if (browser) {
		getValidatorState();
	}
</script>

<div>Validators here</div>
