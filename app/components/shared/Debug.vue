<template>
    <dev-only>
        <n-alert :show-icon="false" type="warning" closable>
            <pre>{{ JSON.stringify(value, null, 2) }}</pre>
        </n-alert>
    </dev-only>
</template>

<script setup lang="ts">
import { DevOnly } from "#components";

const props = defineProps<{ value: any }>();
</script>

<style scoped>
pre {
    direction: ltr;
}
</style>
