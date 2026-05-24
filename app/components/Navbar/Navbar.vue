<script setup lang="ts">
const { collapsed, isRtl, mobileMode, toggleSidebar } = useLayout()
</script>

<template>
  <n-page-header class="px-2 py-3 navbar relative z-100">
    <template #title>
      <div class="flex items-center">
        <div flex w-full justify-start items-center>
          <img v-if="mobileMode" width="35" src="~/assets/images/logo.png" alt="logo" class="logo">
          <n-button mx-2 size="small" quaternary circle :class="{ 'rotate-180': isRtl }" @click="toggleSidebar">
            <template #icon>
              <Icon size="1.2rem" name="fluent:navigation-20-regular" v-if="mobileMode" />
              <Icon size="1.2rem" name="fluent:panel-left-expand-20-regular" v-else-if="collapsed" />
              <Icon size="1.2rem" name="fluent:panel-left-contract-24-regular" v-else />
            </template>
          </n-button>
        </div>
        <BreadCrumb />
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <Search />
        <!-- <AppMenu /> -->
        <ThemeCustomize />
        <ThemeSwitch class="mx-1" />
        <LanguageSelect class="mx-1" />
        <FullScreenButton client-only class="mx-1" />
        <Notifications class="mx-1" />
        <UserProfile class="mx-1" />
      </div>
    </template>
  </n-page-header>
</template>

<style lang="scss">
.navbar {
  border-bottom: solid 1px var(--border-color);
  padding-bottom: 0.4rem;
}

.rtl {
  .n-page-header .n-page-header__title {
    margin-right: 0;
    margin-left: 1.5rem;
  }
}
</style>
