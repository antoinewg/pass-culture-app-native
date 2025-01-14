import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

import { useUserProfileInfo } from 'features/home/api'
import { openUrl } from 'features/navigation/helpers'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { env } from 'libs/environment'
import { PageHeader } from 'ui/components/headers/PageHeader'
import { SectionRow } from 'ui/components/SectionRow'
import { Separator } from 'ui/components/Separator'
import { ExternalSiteDeprecated } from 'ui/svg/icons/ExternalSite_deprecated'
import { ProfileDeletion } from 'ui/svg/icons/ProfileDeletion'
import { getSpacing, Spacer } from 'ui/theme'

export function LegalNotices() {
  const { data: user } = useUserProfileInfo()
  const { navigate } = useNavigation<UseNavigationType>()
  return (
    <React.Fragment>
      <Container>
        <Spacer.TopScreen />
        <Spacer.Column numberOfSpaces={14} />
        <Row
          title={t`Conditions Générales d’Utilisation`}
          type="clickable"
          onPress={() => openUrl(env.CGU_LINK)}
          icon={ExternalSiteDeprecated}
          style={styles.row}
        />
        <Separator />
        <Row
          title={t`Charte de protection des données personnelles`}
          type="clickable"
          onPress={() => openUrl(env.DATA_PRIVACY_CHART_LINK)}
          icon={ExternalSiteDeprecated}
          style={styles.row}
        />
        {!!user && (
          <React.Fragment>
            <Separator />
            <Row
              title={t`Suppression du compte`}
              type="clickable"
              onPress={() => navigate('ConfirmDeleteProfile')}
              icon={ProfileDeletion}
              style={styles.row}
            />
          </React.Fragment>
        )}
      </Container>

      <PageHeader title={t`Mentions légales`} />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: getSpacing(4),
  },
})

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
  flexDirection: 'column',
  paddingHorizontal: getSpacing(4),
}))

const Row = styled(SectionRow).attrs({
  style: styles.row,
})``
