<script setup lang="ts">
import type { SidebarMenuOption  } from './SidebarMenu.vue'
const layoutStore = useLayout()
const { collapsed, forceCollapsed, mobileMode, mobileMenuClosed } = useLayout()

const effectiveCollapsed = computed(() => {
  if (mobileMode.value) return mobileMenuClosed.value

  return collapsed.value || forceCollapsed.value
})

const menuOptions: SidebarMenuOption[] = [
  {
    label: $t('menu.dashboard'),
    key: 'index',
    icon: 'fluent:board-24-regular',
    children: [
      {
        label: $t('menu.eCommerce'),
        key: 'dashboard-ecommerce',
        icon: 'fluent-chart-multiple-20-regular',
        activeIcon: 'fluent-chart-multiple-20-filled' ,
        route: '/',
      },
      {
        label: $t('menu.analytics'),
        route: '/Dashboard/Analytics',
        key: 'dashboard-analytics',
        icon: 'fluent:arrow-trending-lines-24-regular',
      },
    ],
  },
  {
    label: $t('menu.components'),
    key: 'components',
    icon: 'fluent:puzzle-piece-24-regular',
    children: [
      {
        label: $t('menu.charts'),
        route: '/components/charts',
        key: 'components-charts',
        icon: 'fluent:data-trending-16-regular',
      },
    ],
  },

  {
    label: $t('menu.eCommerce'),
    icon: 'fluent:cart-24-regular',
    key: 'ecommerce',
    children: [
      {
        label: $t('menu.products'),
        route: '/products',
        key: 'products',
        icon: 'fluent:box-multiple-20-regular',
        activeIcon: 'fluent:box-multiple-20-filled',
      },
      {
        label: $t('menu.createProduct'),
        route: '/products/create',
        key: 'products-create',
        icon: 'fluent:apps-add-in-24-regular',
      },
      {
        label: $t('menu.categories'),
        route: '/categories',
        key: 'categories',
        icon: 'fluent:folder-24-regular',
        activeIcon: 'fluent:folder-24-filled',
      },
      {
        label: $t('menu.brands'),
        route: '/brands',
        key: 'brands',
        icon: 'fluent:checkmark-starburst-20-regular',
        activeIcon: 'fluent:checkmark-starburst-20-filled',
      },
      {
        label: $t('menu.colors'),
        route: '/colors',
        key: 'colors',
        icon: 'fluent:color-24-regular',
        activeIcon: 'fluent:color-24-filled',
      },
      {
        label: $t('menu.reviews'),
        route: '/reviews',
        key: 'reviews',
        icon: 'fluent:star-three-quarter-20-filled',
      },
      {
        label: $t('menu.orders'),
        route: '/orders',
        key: 'orders',
        icon: 'fluent:cart-24-regular',
        activeIcon: 'fluent:cart-24-filled',
        showBadge: true,
      },
      {
        label: $t('menu.customers'),
        route: '/customers',
        key: 'customers',
        icon: 'fluent:people-24-regular',
        activeIcon: 'fluent:people-24-filled',
      },
    ],
  },
  {
    label: $t('menu.apps'),
    key: 'apps',
    icon: 'fluent:app-folder-20-regular',
    children: [
      {
        label: $t('menu.chat'),
        route: '/apps/chat',
        key: 'apps-chat',
        icon: 'fluent:chat-multiple-20-regular',
        activeIcon: 'fluent:chat-multiple-20-filled',
      },
      {
        label: $t('menu.todo'),
        route: '/apps/todo',
        isNew: true,
        key: 'apps-todo',
        icon: 'fluent:checkmark-circle-24-regular',
        activeIcon: 'fluent:checkmark-circle-24-filled',
      },
    ],
  },

  {
    label: $t('menu.pages'),
    key: 'pages',
    icon: 'fluent:door-arrow-right-20-regular',
    children: [
      {
        label: $t('menu.login'),
        route: '/account/login',
        key: 'account-login',
        icon: 'fluent:person-lock-20-regular',
      },
      {
        label: $t('menu.register'),
        route: '/account/register',
        key: 'account-register',
        icon: 'fluent:person-add-20-regular',
      },

      {
        label: $t('menu.forgetPassword'),
        route: '/account/ForgotPassword',
        key: 'account-forget-password',
        icon: 'fluent:person-lightbulb-20-regular',
      },
      {
        label: $t('menu.notFound'),
        route: '/404',
        key: 'not-found',
        icon: 'fluent:shield-error-24-regular',
      },
      {
        label: $t('menu.error'),
        route: '/error',
        key: 'error',
        icon: 'fluent:error-circle-24-regular',
      },
      {
        label: $t('menu.maintenance'),
        route: '/maintenance',
        key: 'maintenance',
        icon: 'fluent:error-circle-settings-20-regular',
      },
    ],
  },

  {
    label: $t('menu.settings'),
    key: 'settings',
    icon: 'fluent:settings-28-regular',
    children: [
      {
        label: $t('menu.accountSettings'),
        route: '/account/profile',
        key: 'accountSettings',
        icon: 'fluent:person-settings-20-regular',
        activeIcon: 'fluent:person-settings-20-filled',
      },
    ],
  },
]
const router = useRouter()
//mobile view
router.beforeEach(() => {
  layoutStore.closeSidebar()
})
</script>

<template>
  <n-layout-sider :native-scrollbar="false" collapse-mode="width" :collapsed-width="mobileMode ? 0 : 64"
    :collapsed="effectiveCollapsed"
    :class="{ 'collapsed': effectiveCollapsed, 'mobile-mode': mobileMode, 'support-mode': layoutStore.supportEnabled }">
    <div class="logo-container mb-4">
      <div class="flex w-full justify-between items-center">
        <div class="flex w-full justify-start items-center">
          <div class="logo-bg"><img src="@/assets/images/logo.png" alt="logo" class="logo"></div>
          <h1 class="main-title">
            {{ $t('title') }}
          </h1>
        </div>

        <n-button v-if="mobileMode" mx-2 size="small" tertiary circle @click="layoutStore.closeSidebar">
          <template #icon>
            <Icon name="fluent:dismiss-24-filled" size="1.2rem" />
          </template>
        </n-button>
      </div>
    </div>
    <SidebarMenu :collapsed-width="mobileMode ? 0 : 64" :collapsed-icon-size="mobileMode ? 30 : 20"
      :options="menuOptions" />
  </n-layout-sider>
</template>

<style lang="scss">
.n-scrollbar {
  z-index: 1;
}

.logo-container {
  display: flex;
  align-items: center;
  padding: 1.5rem 0.8rem 0.5rem 1.1rem;
  transition: all 100ms;
  line-height: 1;

  .main-title {
    font-family: Quicksand, Shabnam;
    font-size: 1.3rem;
    font-weight: 500;
    user-select: none;
  }

  .logo-bg {
    width: 38px;
    height: 38px;
    display: flex;
    margin: 0 .34rem;
    justify-content: center;
    align-items: center;

    .logo {
      width: 34px;
      object-fit: cover;
    }
  }

  .text-logo {
    max-width: 175px;
  }
}

.mobile-mode {
  max-width: 100% !important;
  width: 100% !important;
}

.mobile-mode.collapsed {
  max-width: 0 !important;
}

.collapsed {
  .logo-container {
    padding: 1.5rem 0.5rem 0.5rem .5rem;
  }

  .main-title {
    display: none;
  }

  .n-menu-item-group>.n-menu-item-group-title {
    display: none;
  }

  .p-button-label {
    display: none;
  }
}

.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled):hover::before {
  background-color: rgba(189, 189, 189, 0.15);
}

.n-menu-tooltip span {
  color: #e4e4e4 !important;
}

.n-layout-sider {
  background-color: transparent;
}

.p-button {
  .p-button-label {
    text-align: left;
  }
}

.rtl {
  .logo {
    margin-left: 0.8rem;
    margin-right: .5rem;
  }

  .n-menu-item-group-title {
    margin-left: auto;
    margin-right: 32px;
  }
}

.support-mode {
  .n-scrollbar>.n-scrollbar-container {
    max-height: calc(100% - 120px);
  }
}

.n-menu-item {
  user-select: none;
}

.main-menu {
  .active {
    .p-button {

      .p-button-label,
      .p-button-icon {
        color: var(--primary-color);
      }
    }

    ul>li>a {
      display: block;
    }
  }

  .separator {
    border-bottom: solid 1px #f4f4f5;
    margin-bottom: .5rem;
  }
}

.p-sidebar-header {
  justify-content: center;
  font-weight: bold;
  padding-top: 1.7rem !important;
}

.p-sidebar-header-content {
  width: 100%;
}

.n-menu-item-group .n-submenu .n-menu-item-content.n-menu-item-content--collapsed {
  padding-left: 22px !important;
}

.n-menu .n-menu-item-group .n-menu-item-group-title {
  height: 20px;
}
</style>
