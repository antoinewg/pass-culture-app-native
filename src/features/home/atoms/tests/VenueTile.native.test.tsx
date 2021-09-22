import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { VenueTypeCode } from 'api/gen'
import { analytics } from 'libs/analytics'
import { mockedSearchResponse } from 'libs/search/fixtures/mockedSearchResponse'
import { fireEvent, render } from 'tests/utils'

import { VenueTile } from '../VenueTile'

jest.mock('react-query')

const venueResponse = mockedSearchResponse.hits[0]

const props = {
  name: venueResponse.name,
  venueType: VenueTypeCode.MUSEUM,
  venueId: Number(venueResponse.id),
}

describe('VenueTile component', () => {
  it('should render correctly', () => {
    const component = render(<VenueTile {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('should navigate to the venue when clicking on the image', async () => {
    const { getByTestId } = render(<VenueTile {...props} />)
    fireEvent.press(getByTestId('tileImage'))
    expect(navigate).toHaveBeenCalledWith('Venue', {
      id: props.venueId,
    })
  })

  it('should log analytics event ConsultVenue when pressing on the venue tile', async () => {
    const { getByTestId } = render(<VenueTile {...props} />)
    fireEvent.press(getByTestId('tileImage'))
    expect(analytics.logConsultVenue).toHaveBeenNthCalledWith(1, {
      venueId: props.venueId,
      from: 'home',
    })
  })
})
