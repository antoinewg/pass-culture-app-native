import { IdCheckHomePage, useIdCheckContext } from '@pass-culture/id-check'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { useNotifyIdCheckCompleted } from 'features/auth/api'
import { useAppSettings } from 'features/auth/settings'
import { useUserProfileInfo } from 'features/home/api'
import { homeNavigateConfig } from 'features/navigation/helpers'
import { ScreenNavigationProp, UseNavigationType } from 'features/navigation/RootNavigator'
import { QueryKeys } from 'libs/queryKeys'

export const IdCheckV2 = (props: ScreenNavigationProp<'IdCheckV2'>) => {
  const { setContextValue } = useIdCheckContext()
  const { navigate } = useNavigation<UseNavigationType>()
  const { data: settings } = useAppSettings()
  const queryClient = useQueryClient()
  const { mutate: notifyIdCheckCompleted } = useNotifyIdCheckCompleted({
    onSuccess: syncUserAndProceedToNextScreen,
    onError: syncUserAndProceedToNextScreen,
  })

  const { refetch } = useUserProfileInfo({
    cacheTime: 0,
  })

  function goToBeneficiaryRequestSent() {
    navigate('BeneficiaryRequestSent')
  }

  function onAbandon() {
    navigate(homeNavigateConfig.screen, homeNavigateConfig.params)
  }

  function syncUserAndProceedToNextScreen() {
    queryClient.invalidateQueries(QueryKeys.USER_PROFILE).finally(() => {
      refetch().finally(goToBeneficiaryRequestSent)
    })
  }

  function onSuccess() {
    notifyIdCheckCompleted()
  }

  useEffect(() => {
    if (setContextValue) {
      setContextValue({
        onAbandon,
        onSuccess,
        displayDmsRedirection: !!settings?.displayDmsRedirection,
        isLicenceTokenChecked: false,
        debug: !!settings?.enableNativeIdCheckVerboseDebugging,
      })
    }
  }, [setContextValue])

  // @ts-ignore : props typing issue with IdCheck screen from module.
  // Probably needs some change on the side of the module.
  return <IdCheckHomePage {...props} />
}
