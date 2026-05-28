<script lang="ts" setup>
definePageMeta({
    layout: 'error-layout'
})
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="error-message flex flex-col justify-center items-center z-10">
            <img src="@/assets/images/500.svg" class="w-130" />
            <p class="text-lg mt-8 dark:text-white">
                {{ $t('common.500Message') }}
            </p>
            <BackHomeButton />
        </div>
    </div>
</template>
