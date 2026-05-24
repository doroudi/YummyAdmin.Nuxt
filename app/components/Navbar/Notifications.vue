<script setup lang="ts">
import { NotificationType } from '@/models/Notification'
const { isRtl, isDark } = useLayout()
const { getNotifications, notifications, clearAll } = useNotifications()
onMounted(getNotifications)

function getIcon(notificationType: NotificationType) {
  switch (notificationType) {
    case NotificationType.info:
      return 'fluent:info-24-regular'
    case NotificationType.alert:
      return 'fluent:warning-24-regular'
    case NotificationType.security:
      return 'fluent:shield-24-regular'
    case NotificationType.order:
      return 'fluent:cart-20-regular'
    case NotificationType.customer:
      return 'fluent:person-24-regular'
    default:
      return 'fluent:info-24-regular'
  }
}

const badgeOffset = computed(() => [isRtl.value ? '4' : '-4', '5'])
</script>

<template>
  <div v-bind="$attrs">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-popover class="notifications" trigger="click" :show-arrow="true" style="width: 270px;max-height: 450px;">
          <template #trigger>
            <n-button quaternary circle>
              <template #icon>
                <n-badge dot type="success" processing :offset="badgeOffset" >
                  <Icon name="fluent:alert-28-regular" class="shake-item" size="1.4rem" />
                </n-badge>
              </template>
            </n-button>
          </template>
          <template #header>
            <NText strong depth="1">
              {{ $t('notifications.title') }}
            </NText>
          </template>
          <template #footer>
            <NButton :disabled="!notifications.length" quaternary @click="clearAll()">
              {{ $t('notifications.clear') }}
            </NButton>
          </template>
          <n-empty v-if="!notifications.length" class="m-5" :description="$t('notifications.empty')">
            <template #icon>
              <Icon name="fluent:mail-inbox-20-regular" />
            </template>
          </n-empty>
          <NScrollbar v-else style="max-height:300px">
            <div class="notifications-list">
              <n-list hoverable clickable>
                <n-list-item v-for="item of notifications" :key="item.id">
                  <template #prefix>
                    <div class="icon ms-2">
                      <Icon :name="getIcon(item.type)" size="1.2rem" :color="isDark ? '#fff' : '#444'" />
                    </div>
                  </template>
                  <n-thing :title="$t(`notifications.${item.title}`)"
                    :description="$t(`notifications.${item.key}`, item.data ?? {})" />
                </n-list-item>
              </n-list>
            </div>
          </NScrollbar>
        </n-popover>
      </template>
      <span>{{ $t('button.notifications') }}</span>
    </n-tooltip>
  </div>
</template>

<style lang="scss">
.notifications {
  .n-popover__content {
    --n-padding: 0;
  }
}

.notifications-list {
  --n-padding: 8px 14px;
  --b-border-radius: 0px;

  .n-list.n-list--hoverable .n-list-item {
    padding: 12px 0;
  }

  .n-thing .n-thing-main .n-thing-header {
    margin-bottom: 0;

    .n-thing-header__title {
      font-size: 13px;
      font-weight: bold;
    }
  }

  .n-thing-main__description {
    font-size: 13px;
  }
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  color: var(--color);
  background-color: rgb(from var(--color) r g b / 0.1);

  &.info {
    --color: #00d9ff;
  }

  &.security {
    --color: #ff2f2f;
  }

  &.alert {
    --color: #ffcc00;
  }

  &.order {
    --color: #a74aff;
  }

  &.customer {
    --color: #09c758;
  }
}

.notification-item {
  .notification-content {
    .title {
      font-size: 0.8rem;
      font-weight: bold;
      margin: 0;
    }

    .text {
      font-size: 0.8rem;
    }
  }
}
</style>
