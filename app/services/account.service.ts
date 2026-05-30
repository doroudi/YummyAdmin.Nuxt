import type {
  ForgetPasswordResponse,
  LoginResponse,
  LoginViewModel,
  RegisterResponse,
  RegisterViewModel,
} from '~/models/Account'

export const useAccountService = () => {
  const login = async (loginInfo: LoginViewModel): Promise<LoginResponse> => {
    const response = await useApi('account').get<LoginResponse>(
      'login',
      loginInfo,
    )
    return response
  }

  const register = async (
    registerModel: RegisterViewModel,
  ): Promise<RegisterResponse> => {
    const response = await useApi('account').post<RegisterResponse>(
      'register',
      registerModel,
    )
    return response
  }

  const forgetPassword = async (
    forgetPasswordModel: LoginViewModel,
  ): Promise<ForgetPasswordResponse> => {
    const response = await useApi('account').post<ForgetPasswordResponse>(
      'forget-password',
      forgetPasswordModel,
    )
    return response
  }

  return {
    login,
    register,
    forgetPassword,
  }
}
