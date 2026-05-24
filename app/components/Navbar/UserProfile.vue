<script setup lang="ts">
const { renderLabel, renderIcon } = useRender()
const { profile, loadUserProfile } = useProfile()
onMounted(loadUserProfile)
const items: any[] = [
  {
    icon: renderIcon('fluent:settings-20-regular'),
    label: () => renderLabel($t('userMenu.profile'), '/account/profile'),
    key: 'options',
  },
  {
    icon: renderIcon('fluent:door-arrow-right-20-regular'),
    label: () => renderLabel($t('userMenu.logout'), '/account/login'),
    key: 'login',
  },
]
</script>

<template>
  <div class="flex items-center" v-bind="$attrs">
    <n-dropdown :options="items">
      <NImage class="avatar" preview-disabled src="/assets/images/avatar.png" alt="avatar"
        fallbackSrc="/assets/images/avatar.png" />
    </n-dropdown>
  </div>
</template>

<style lang="scss">
.username {
  font-size: 0.8rem;
  font-weight: bold;
}

.avatar {
  width: 33px;
  height: 33px;
  border-radius: 50%;
}

.role {
  font-size: 0.7rem;
}

.p-tieredmenu .p-menuitem-active>.p-submenu-list {
  right: 100%;
  left: auto;
}

.rtl {

  .p-tieredmenu .p-menuitem-active>.p-submenu-list {
    right: auto;
    left: 100%;
  }
}
</style>
