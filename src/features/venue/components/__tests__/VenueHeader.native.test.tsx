import React from 'react'
import { Animated } from 'react-native'

import { goBack } from '__mocks__/@react-navigation/native'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { fireEvent, render } from 'tests/utils'

import { VenueHeader } from '../VenueHeader'

describe('<VenueHeader />', () => {
  it('should render correctly', async () => {
    const { toJSON } = await renderVenueHeader()
    expect(toJSON()).toMatchSnapshot()
  })

  it('should render back icon', async () => {
    const venueHeader = await renderVenueHeader()
    expect(venueHeader.queryByTestId('icon-back')).toBeTruthy()
  })

  it('should goBack when we press on the back button', async () => {
    const { getByTestId } = await renderVenueHeader()
    fireEvent.press(getByTestId('icon-back'))
    expect(goBack).toBeCalledTimes(1)
  })
})

async function renderVenueHeader() {
  const animatedValue = new Animated.Value(0)
  return render(reactQueryProviderHOC(<VenueHeader headerTransition={animatedValue} />))
}
