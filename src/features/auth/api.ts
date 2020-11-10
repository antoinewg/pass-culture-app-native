import { useQuery } from 'react-query'

import { analytics } from 'libs/analytics'
import { env } from 'libs/environment'
import { get, post } from 'libs/fetch'
import { saveAccessToken } from 'libs/storage'

export type SigninBody = {
  email: string
  password: string
}

export type SigninResponse = {
  access_token: string
  refresh_token: string
}

export async function signin({ email, password }: SigninBody): Promise<boolean> {
  const body = { identifier: email, password }
  try {
    const { access_token, refresh_token } = await post<SigninResponse>('/native/v1/signin', {
      body,
      credentials: 'omit',
    })
    await saveAccessToken(access_token)
    await analytics.logLogin({ method: env.API_BASE_URL })
    return true
  } catch (error) {
    return false
  }
}

export type CurrentUserResponse = {
  logged_in_as: string
}

export function useCurrentUser() {
  const { data: email, isFetching, refetch, error, isError } = useQuery<string>({
    querykey: 'currentUser',
    queryFn: async function () {
      const json = await get<CurrentUserResponse>('/native/v1/protected')
      return json.logged_in_as
    },
  })
  return { email, isFetching, refetch, error, isError }
}
