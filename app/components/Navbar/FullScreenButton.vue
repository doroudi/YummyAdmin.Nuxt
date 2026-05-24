<script setup lang="ts">
// const isFullScreen = ref<boolean>(document.fullscreenElement !== null)
const isFullScreen = ref(false)
function toggleFullScreen() {
    // if (isFullScreen.value) document.exitFullscreen()
    // else document.documentElement.requestFullscreen()

    // isFullScreen.value = !isFullScreen.value
}
</script>

<template>
    <n-tooltip placement="top" trigger="hover">
        <template #trigger>
            <n-button class="hidden md:flex" quaternary circle @click="toggleFullScreen()">
                <template #icon>
                    <Icon name="fluent:full-screen-maximize-24-regular" size="1.4rem" v-if="isFullScreen" />
                    <Icon name="fluent:full-screen-minimize-24-regular" size="1.4rem" v-else />
                </template>
            </n-button>
        </template>
        <span>{{ $t('button.toggle_fullscreen') }}</span>
    </n-tooltip>
</template>
