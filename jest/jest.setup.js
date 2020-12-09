/* eslint-disable no-undef */
import 'cross-fetch/polyfill'

/* We disable the following warning, which can be safely ignored as the code
  is not executed on a device :
  "Animated: `useNativeDriver` is not supported because the native animated module is missing. 
  Falling back to JS-based animation." */
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

/* We disable the following warning, which can be safely ignored as the code
  is not executed on a device :
  "Invariant Violation: Native module cannot be null." */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

/* Alerts cannot be opened in node.js environment */
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}))

/* Links cannot be opened in node.js environment */
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  addEventListener: jest.fn(),
  canOpenURL: jest.fn().mockResolvedValue(true),
  getInitialURL: jest.fn(),
  openURL: jest.fn(),
  removeEventListener: jest.fn(),
}))

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  useSafeAreaInsets: () => ({ bottom: 16, right: 16, left: 16, top: 16 }),
}))

/* Cf. the corresponding mock in libs/__mocks__ */
jest.mock('libs/analytics')

jest.mock('libs/environment', () => ({
  env: {
    ENV: 'testing',
    API_BASE_URL: 'http://localhost',
    CONTENTFUL_SPACE_ID: 'contentfulSpaceId',
    CONTENTFUL_ENVIRONMENT: 'environment',
    CONTENTFUL_ACCESS_TOKEN: 'accessToken',
    ALGOLIA_APPLICATION_ID: 'algoliaAppId',
    ALGOLIA_INDEX_NAME: 'algoliaIndexName',
    ALGOLIA_SEARCH_API_KEY: 'algoliaApiKey',
    URL_PREFIX: 'passculture',
    IOS_APP_ID: 'app.ios',
    ANDROID_APP_ID: 'app.android',
    SUPPORT_EMAIL_ADDRESS: 'support@test.passculture.app',
  },
}))
