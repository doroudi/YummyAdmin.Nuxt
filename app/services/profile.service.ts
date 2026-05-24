import type { Profile, ProfileSettings } from '~/models/Profile'
import { useGenericService } from './generic.service'

export const useProfileService = () => {
  const base = useGenericService<Profile, string>('profile')
  const api = useApi('profile')
  
  async function getUserProfile(): Promise < Profile > {
    const response = await api.get<Profile>('user-profile')
    return response
  }

  async function getUserSettings(): Promise <ProfileSettings> {
    const response = await api.get<ProfileSettings>('user-settings')
    return response
  }
  return {
    ...base,
    getUserProfile,
    getUserSettings,
  }
}