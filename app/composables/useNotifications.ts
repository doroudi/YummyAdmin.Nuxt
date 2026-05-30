import type { Notification } from '~/models/Notification'
import { useNotificationsService } from '~/services/notification.service'

export const useNotifications = () => {
  const notificationService = useNotificationsService()
  const notifications = ref<Notification[]>([])
  const isLoading = ref(false)
  async function getNotifications() {
    const response = await notificationService.getNotificationsList()
    notifications.value = response.items
  }

  function clearAll() {
    notifications.value = []
  }

  return {
    notifications,
    isLoading,
    getNotifications,
    clearAll,
  }
}
