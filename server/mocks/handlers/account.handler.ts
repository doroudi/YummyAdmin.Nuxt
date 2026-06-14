import type {
  ForgetPasswordResponse,
  ForgetPasswordViewModel,
  LoginResponse,
  LoginViewModel,
  RegisterResponse,
  RegisterViewModel,
} from '../../../app/models/Account'
import {  delay } from '../handler-utilities' 
import { registerMockHandler } from '../registry'

registerMockHandler('POST', 'account/login', async (request: any) => {
  const user = (await request.json()) as LoginViewModel
  if (user.username === 'Yummy' && user.password === 'Admin!') {
    const response: LoginResponse = {
      token: 'JWT_Fake_Token',
      isSucceed: true,
    }
    await delay(1000)
    return response
  }

  return { //TODO: return correct error response
    status: 400,
    statusText: 'UserName or Password is not correct',
  }
  // return HttpResponse.json(null, {
  //   status: 400,
  //   statusText: 'UserName or Password is not correct',
  // })
})

registerMockHandler('POST', 'account/register', async (request: any) => {
  const user = (await request.json()) as RegisterViewModel
  if (user.username.toLowerCase() === 'yummy')
    return {
      status: 400,
      statusText: 'user name is already taken!',
    }

  const response: RegisterResponse = {
    token: 'JWT_Fake_Token',
    isSucceed: true,
  }
  await delay(1000)
  return response
})

registerMockHandler('POST', 'account/forget-password', async (request: any) => {
  const user = (await request.json()) as ForgetPasswordViewModel
  if (user.email !== 'yummy@admin.io')
    return {
      status: 400,
      statusText: 'Email is not found',
    }

  const response: ForgetPasswordResponse = { isSucceed: true }
  return response
})

