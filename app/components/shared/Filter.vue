<script setup lang="ts">
const show = ref(false)

function toggleShow() {
    show.value = !show.value
}
</script>

<template>
    <NButton secondary type="primary" @click="toggleShow" class="ms-2">
        <template #icon>
            <Icon name="fluent:filter-24-regular" />
        </template>
        {{ $t('common.filter') }}
    </NButton>
    <n-collapse-transition :show="show">
        <slot />
    </n-collapse-transition>
</template>



<style scoped></style>