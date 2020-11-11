import { I18nProvider } from '@lingui/react' //@translations
import React, { FunctionComponent } from 'react'
import CodePush from 'react-native-code-push' // @codepush
import 'react-native-gesture-handler' // @react-navigation
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { addPlugin } from 'react-query-native-devtools'

import { RootNavigator } from 'features/navigation/RootNavigator'
import { env } from 'libs/environment'
import { i18n } from 'libs/i18n' //@translations
import 'libs/sentry'
import { startBatchNotification } from 'libs/notifications'
import { useHideSplashScreen } from 'libs/splashscreen'

const codePushOptionsManual = {
  updateDialog: true,
  installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.MANUAL,
}

const codePushOptionsAuto = {
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
}

const queryCache = new QueryCache()

if (__DEV__ && process.env.JEST !== 'true') {
  addPlugin(queryCache)
}

const AppComponent: FunctionComponent = function () {
  startBatchNotification()

  useHideSplashScreen()

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <I18nProvider language={i18n.language} i18n={i18n}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </I18nProvider>
    </ReactQueryCacheProvider>
  )
}

// @codepush
const App = env.FEATURE_FLAG_CODE_PUSH
  ? CodePush(env.FEATURE_FLAG_CODE_PUSH_MANUAL ? codePushOptionsManual : codePushOptionsAuto)(
      AppComponent
    )
  : AppComponent

export { App }
