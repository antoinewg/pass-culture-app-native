import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components/native'

import { UseRouteType } from 'features/navigation/RootNavigator'
import { VenueWebHeader } from 'features/venue/components/VenueWebHeader'
import { useHeaderTransition } from 'ui/components/headers/animationHelpers'

import { useVenue } from '../api/useVenue'
import { VenueHeader } from '../components/VenueHeader'

import { VenueBody } from './VenueBody'

export const Venue: FunctionComponent = () => {
  const { params } = useRoute<UseRouteType<'Venue'>>()
  const { data: venue } = useVenue(params.id)
  const { headerTransition, onScroll } = useHeaderTransition()

  if (!venue) return <React.Fragment></React.Fragment>

  return (
    <Container>
      <VenueWebHeader venue={venue} />
      <VenueBody venueId={params.id} onScroll={onScroll} />
      <VenueHeader
        headerTransition={headerTransition}
        title={venue.publicName || venue.name}
        venueId={venue.id}
      />
    </Container>
  )
}

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
}))
