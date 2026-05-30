import type { Profile, ProfileSettings } from '~/models/Profile'
import { useProfileService } from '~/services/profile.service'

export const useProfile = () => {
  const profileService = useProfileService()
  const profile = useState<Profile | null>('profile', () => null)
  const userSettings = ref<ProfileSettings>({} as ProfileSettings)
  const isLoading = ref(false)

  async function loadUserProfile() {
    isLoading.value = true

    try {
      const result = await profileService.getUserProfile()
      profile.value = result
    } finally {
      isLoading.value = false
    }
  }

  async function loadSettings() {
    const settings = await profileService.getUserSettings()
    userSettings.value = settings
  }

  return {
    profile,
    loadUserProfile,
    isLoading,
    loadSettings,
    userSettings,
  }
}
