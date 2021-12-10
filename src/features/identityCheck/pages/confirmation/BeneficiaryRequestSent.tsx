import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import { useAppSettings } from 'features/auth/settings'
import { useShouldShowCulturalSurvey } from 'features/firstLogin/shouldShowCulturalSurvey'
import { navigateToHome } from 'features/navigation/helpers'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { ButtonPrimaryWhite } from 'ui/components/buttons/ButtonPrimaryWhite'
import { GenericInfoPage } from 'ui/components/GenericInfoPage'
import { RequestSent } from 'ui/svg/icons/RequestSent'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

export function BeneficiaryRequestSent() {
  const { navigate } = useNavigation<UseNavigationType>()
  const { data: settings } = useAppSettings()
  const shouldNavigateToCulturalSurvey = useShouldShowCulturalSurvey()

  function onPress() {
    if (shouldNavigateToCulturalSurvey) {
      navigate('CulturalSurvey')
    } else {
      navigateToHome()
    }
  }

  const body = settings?.enableIdCheckRetention
    ? t`Tu recevras une réponse par e-mail sous 5 jours ouvrés.`
    : t`Tu recevras un e-mail lorsque ta demande sera validée.`

  let inTheMeantime = ''
  if (shouldNavigateToCulturalSurvey) {
    inTheMeantime = t`En attendant, aide-nous à en savoir plus sur tes pratiques culturelles !`
  } else if (settings?.enableIdCheckRetention) {
    inTheMeantime = t`En attendant, tu peux découvrir l'application !`
  }

  const message = inTheMeantime.length ? `${body} ${inTheMeantime}` : body

  return (
    <GenericInfoPage title={t`Demande envoyée !`} icon={RequestSent} iconSize={getSpacing(42)}>
      <StyledBody>{t`Nous étudions ton dossier...`}</StyledBody>
      <StyledBody>{message}</StyledBody>
      <Spacer.Column numberOfSpaces={15} />
      <ButtonPrimaryWhite title={t`On y va !`} onPress={onPress} />
    </GenericInfoPage>
  )
}

const StyledBody = styled(Typo.Body).attrs({
  color: ColorsEnum.WHITE,
})({
  textAlign: 'center',
})
