import type { ListResult } from '~/models/ListResult'
import type { Notification } from '~/models/Notification'
import { useGenericService } from './generic.service'

export const useNotificationsService = () => {
  const base = useGenericService<Notification, string>('notification')
  const _api = useApi('notification')

  async function getNotificationsList(): Promise<ListResult<Notification>> {
    const response = await useApi('notification').getList<Notification>('', {})
    return response
  }

  return {
    ...base,
    getNotificationsList,
  }
}
