<script setup lang="ts">
const isFullScreen = ref<boolean>(false)
function toggleFullScreen() {
    if (import.meta.client) {
        if (isFullScreen.value)
            document.exitFullscreen()
        else
            document.documentElement.requestFullscreen()

        isFullScreen.value = !isFullScreen.value
    }
}
const iconName = computed(() => isFullScreen.value ? 'fluent:full-screen-minimize-24-regular' : 'fluent:full-screen-maximize-24-regular')
</script>

<template>
    <client-only>
        <n-tooltip placement="top" trigger="hover">
            <template #trigger>
                <n-button class="hidden md:flex" quaternary circle @click="toggleFullScreen()">
                    <template #icon>
                        <Icon :name="iconName" size="1.4rem" />
                    </template>
                </n-button>
            </template>
            <span>{{ $t('button.toggle_fullscreen') }}</span>
        </n-tooltip>
    </client-only>
</template>
