import { UseQueryResult } from 'react-query'

import { SettingsResponse } from 'api/gen'
import { useAppSettings as actualUseAppSettings } from 'features/auth/settings'

export const mockDefaultSettings: SettingsResponse = {
  depositAmount: 30000,
  isRecaptchaEnabled: true,
  allowIdCheckRegistration: true,
  enablePhoneValidation: true,
  displayDmsRedirection: true,
  autoActivateDigitalBookings: true,
  enableIdCheckRetention: false,
  enableNativeIdCheckVerboseDebugging: false,
  idCheckAddressAutocompletion: true,
  objectStorageUrl: 'http://localhost-storage',
  isWebappV2Enabled: false,
  enableNativeEacIndividual: false,
  enableUnderageGeneralisation: false,
  enableCulturalSurvey: false,
  accountCreationMinimumAge: 15,
}

export const useAppSettings: typeof actualUseAppSettings = jest.fn(
  () =>
    ({ data: mockDefaultSettings, isLoading: false, isSuccess: true } as UseQueryResult<
      SettingsResponse,
      unknown
    >)
)
