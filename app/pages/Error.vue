<script lang="ts" setup>
definePageMeta({
    layout: 'error-layout',
    key: 'error-page'
})
</script>

<template>
    <div class="flex justify-center items-center h-100vh">
        <div class="error-message z-10">
            <img src="@/assets/images/500.svg" class="w-130" />
            <p class="text-lg mt-8 dark:text-white">
                {{ $t('common.500Message') }}
            </p>
            <BackHomeButton />
        </div>
    </div>
</template>
