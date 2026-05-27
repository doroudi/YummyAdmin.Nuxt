<script setup lang="ts">
import Sidebar from '~/components/shared/Sidebar.vue';
import SupportProject from '~/components/shared/SupportProject.vue';
const props = defineProps({
  isFluid: {
    type: Boolean,
    default: false,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
})

const { isFluid, supportEnabled } = useLayout()
const effectiveFluid = computed(() => {
  return props.isFluid || isFluid.value
})
const currentRouteName = useRoute().name
</script>

<template>
  <n-layout has-sider position="absolute">
    <Sidebar />
    <n-layout :native-scrollbar="false" position="static">
      <div class="main-content flex-1 dark:bg-slate-800 dark:text-white my-2">
        <Navbar />
        <div class="relative h-full">
          <NScrollbar>
            <div class="h-full overflow-auto md:mx-auto"
              :class="{ 'md:container': !effectiveFluid, 'md:pb-18': !fullScreen, 'p-3': !fullScreen }">
              <n-layout-content>
                <DarkModeContainer class="z-1" />
                <slot />
              </n-layout-content>
            </div>
          </NScrollbar>
        </div>
      </div>
    </n-layout>
    <!-- you can remove it -->
    <SupportProject v-if="supportEnabled" />
  </n-layout>
</template>


<style lang="scss">
.n-layout {
  padding: 0 4px;
  background-color: transparent !important;
}

.dark {
  .main-content {
    --un-bg-opacity: .6;
    background: rgb(30 41 59 / var(--un-bg-opacity)) !important;
  }
}

.main-content {
  --un-bg-opacity: .4;
  background: #ffffffcc !important;
}
</style>
