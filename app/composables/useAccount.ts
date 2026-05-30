import type { Account, LoginViewModel } from '~/models/Account'
import { useAccountService } from '~/services/account.service'

export const useAccount = () => {
  const accountService = useAccountService()
  const user = useState<Account | null>('account', () => null)
  const isLoading = useState<boolean>('isLoading', () => false)
  const loginFailed = useState('loginFailed', () => false)
  const login = async (loginInfo: LoginViewModel): Promise<boolean> => {
    isLoading.value = true
    try {
      const response = await accountService.login(loginInfo)
      if (response.isSucceed) {
        user.value = {
          token: response.token,
        }
        return true
      }

      return false
    } catch {
      return false
    } finally {
      isLoading.value = false
    }
  }

  function socialLogin(provider: string): Promise<boolean> {
    //TODO: implement real social login
    isLoading.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        if (provider !== 'apple') resolve(true)
        else resolve(false)

        isLoading.value = false
      }, 1500)
    })
  }

  function logout() {
    user.value = null
  }

  async function register(registerInfo: any) {
    isLoading.value = true
    try {
      const response = await accountService.register(registerInfo)
      if (response.isSucceed) {
        user.value = {
          token: response.token,
        }
        return true
      }

      return false
    } catch {
      return false
    } finally {
      isLoading.value = false
    }
  }

  function resetPassword(forgetInfo: any) {
    return Promise.resolve(forgetInfo)
  }

  function isAuthenticated() {
    return (user.value?.token && user.value.token !== null) ?? false
  }

  return {
    user,
    isLoading,
    loginFailed,
    login,
    socialLogin,
    logout,
    isAuthenticated,
    resetPassword,
    register,
  }
}
