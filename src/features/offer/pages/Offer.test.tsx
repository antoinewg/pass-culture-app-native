import { NavigationContainer } from '@react-navigation/native'
import { act, fireEvent, render } from '@testing-library/react-native'
import { rest } from 'msw/'
import React from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import waitForExpect from 'wait-for-expect'

import { OfferResponse } from 'api/gen'
import { RootStack } from 'features/navigation/RootNavigator'
import { env } from 'libs/environment'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { server } from 'tests/server'
import { flushAllPromises } from 'tests/utils'

import { offerDigitalResponseSnap, offerDuoReponseSnap } from '../hooks/snaps/offerResponseSnap'
import { dehumanizeId } from '../services/dehumanizeId'

import { Offer } from './Offer'

jest.mock('@react-navigation/native', () => jest.requireActual('@react-navigation/native'))

jest.mock('features/auth/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isLoggedIn: true })),
}))

describe('<Offer />', () => {
  it('should match snapshot for physical offer', async () => {
    const { toJSON } = await renderOfferPage('AGH2M')
    expect(toJSON()).toMatchSnapshot()
  })

  it('should match snapshot for digital offer', async () => {
    const { toJSON } = await renderOfferPage('AGH2K')
    expect(toJSON()).toMatchSnapshot()
  })
  it('should show withdrawalDetails', async () => {
    let wrapper = await renderOfferPage('AGH2K', { withdrawalDetails: 'How to withdraw' })
    expect(wrapper.queryByText('Modalités de retrait')).toBeTruthy()

    wrapper = await renderOfferPage('AGH2K', { withdrawalDetails: undefined })
    expect(wrapper.queryByText('Modalités de retrait')).toBeFalsy()
  })
  it('animates on scroll', async () => {
    const { getByTestId } = await renderOfferPage('AHD3A')
    expect(getByTestId('offerHeaderName').props.style.opacity).toBe(0)
    const scrollContainer = getByTestId('offer-container')
    await act(async () => await fireEvent.scroll(scrollContainer, scrollEvent))
    expect(getByTestId('offerHeaderName').props.style.opacity).toBe(1)
  })
})

const scrollEvent: NativeSyntheticEvent<NativeScrollEvent> = {
  // @ts-ignore : partial event is enough
  nativeEvent: { contentOffset: { y: 200 } },
}

async function renderOfferPage(id: string, extraOffer?: Partial<OfferResponse>) {
  const offerId = dehumanizeId(id)
  const baseResponse =
    offerId === offerDuoReponseSnap.id ? offerDuoReponseSnap : offerDigitalResponseSnap
  const offerResponse = { ...baseResponse, ...extraOffer }

  server.use(
    rest.get<OfferResponse>(env.API_BASE_URL + '/native/v1/offer/' + offerId, (req, res, ctx) =>
      res.once(ctx.status(200), ctx.json(offerResponse))
    )
  )

  const wrapper = render(
    reactQueryProviderHOC(
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Offer">
          <RootStack.Screen name="Offer" component={Offer} initialParams={{ id }} />
        </RootStack.Navigator>
      </NavigationContainer>
    )
  )

  await act(async () => {
    await flushAllPromises()
  })

  await waitForExpect(() => {
    expect(wrapper.queryByTestId('offer-container')).toBeTruthy()
  })

  return wrapper
}
