import type { RegisterViewModel } from '~/models/Account'

export const useAuth = () => {
  const account = useAccount()
  const token = useState<string | null>('token', (): string | null => null)
  const isLoading = ref(false)

  const setToken = (newToken: string | null) => {
    token.value = newToken
    const tokenCookie = useCookie('token', {
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // a week
    })

    if (newToken) {
      tokenCookie.value = newToken
    } else {
      tokenCookie.value = null
    }
  }

  const socialLogin = (provider: string): Promise<boolean> => {
    isLoading.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        if (provider !== 'apple') resolve(true)
        else resolve(false)

        isLoading.value = false
      }, 1500)
    })
  }

  const resetPassword = (forgetInfo: any) => {
    return Promise.resolve(forgetInfo)
  }

  function isAuthenticated() {
    return (token && token.value !== null) ?? false
  }

  const register = async (registerInfo: RegisterViewModel) => {
    try {
      const response = await account.register(registerInfo)
      // setToken(response.token);
      return response
    } catch (error) {
      setToken(null)
      // user.value = null;
      throw error
    }
  }

  const logout = () => {
    setToken(null)
    navigateTo('/login')
  }

  const initAuth = () => {
    const tokenCookie = useCookie('token').value
    if (tokenCookie) {
      setToken(tokenCookie)
    }
  }

  return {
    token,
    isLoading,
    socialLogin,
    isAuthenticated,
    logout,
    initAuth,
    setToken,
    register,
    resetPassword,
  }
}
