import React from 'react'

import { useRoute } from '__mocks__/@react-navigation/native'
import { CategoryNameEnum, CategoryType } from 'api/gen'
import * as Queries from 'features/bookings/api/queries'
import * as NavigationHelpers from 'features/navigation/helpers'
import { act, fireEvent, render } from 'tests/utils'

import { bookingsSnap } from '../api/bookingsSnap'
import { Booking } from '../components/types'

import { BookingDetails } from './BookingDetails'

jest.mock('features/home/api', () => ({
  useUserProfileInfo: jest.fn(() => ({ data: undefined })),
}))
jest.mock('libs/itinerary/useItinerary', () => ({
  useItinerary: jest.fn(() => ({ availableApps: ['waze'], navigateTo: jest.fn() })),
}))

describe('BookingDetails', () => {
  afterEach(jest.restoreAllMocks)

  beforeAll(() => {
    useRoute.mockImplementation(() => ({
      params: {
        id: 456,
      },
    }))
  })

  it('should render correctly', async () => {
    const booking = bookingsSnap.ongoing_bookings[0]
    const { getByTestId, toJSON } = renderBookingDetails(booking)

    await act(async () => {
      getByTestId('three-shapes-ticket').props.onLayout({ nativeEvent: { layout: { width: 150 } } })
    })
    expect(toJSON()).toMatchSnapshot()
  })

  describe('<DetailedBookingTicket />', () => {
    it('should display booking token', async () => {
      const booking = bookingsSnap.ongoing_bookings[0]
      const { getByText, getByTestId } = renderBookingDetails(booking)
      await act(async () => {
        getByTestId('three-shapes-ticket').props.onLayout({
          nativeEvent: { layout: { width: 150 } },
        })
      })

      getByText('352UW4')
    })

    it('should display offer link button if offer is digital and open url on press', async () => {
      const openExternalUrl = jest
        .spyOn(NavigationHelpers, 'openExternalUrl')
        .mockImplementation(jest.fn())
      const booking = bookingsSnap.ongoing_bookings[0]
      booking.stock.offer.isDigital = true
      booking.stock.offer.url = 'http://example.com'

      const { getByText, getByTestId } = renderBookingDetails(booking)
      await act(async () => {
        getByTestId('three-shapes-ticket').props.onLayout({
          nativeEvent: { layout: { width: 150 } },
        })
      })
      const offerButton = getByText("Accéder à l'offre")
      fireEvent.press(offerButton)

      expect(openExternalUrl).toHaveBeenCalledWith(booking.stock.offer.url)
    })

    it('should display booking qr code if offer is physical', async () => {
      const booking = bookingsSnap.ongoing_bookings[0]
      booking.stock.offer.isDigital = false
      const { getByTestId } = renderBookingDetails(booking)
      await act(async () => {
        getByTestId('three-shapes-ticket').props.onLayout({
          nativeEvent: { layout: { width: 150 } },
        })
      })
      getByTestId('qr-code')
    })

    it('should display EAN code if offer is a book (digital or physical)', async () => {
      const booking = bookingsSnap.ongoing_bookings[0]
      booking.stock.offer.category.name = CategoryNameEnum.LIVRE
      const { getByText, getByTestId } = renderBookingDetails(booking)
      await act(async () => {
        getByTestId('three-shapes-ticket').props.onLayout({
          nativeEvent: { layout: { width: 150 } },
        })
      })
      getByText('123456789')
    })
  })

  describe('Offer rules', () => {
    it('should display rules for a digital offer', () => {
      const booking = bookingsSnap.ongoing_bookings[0]
      booking.stock.offer.isDigital = true

      const { getByText } = renderBookingDetails(booking)

      getByText(
        'Ce code à 6 caractères est ta preuve d’achat ! N’oublie pas que tu n’as pas le droit de le revendre ou le céder.'
      )
    })
    it.each([
      [
        'event',
        (booking: Booking) => (booking.stock.offer.category.categoryType = CategoryType.Event),
      ],
      [
        'physical',
        (booking: Booking) => (booking.stock.offer.category.categoryType = CategoryType.Thing),
      ],
    ])('should display rules for a %s & non-digital offer', (type, prepareBooking) => {
      const booking = { ...bookingsSnap.ongoing_bookings[0] }
      booking.stock.offer.isDigital = false
      prepareBooking(booking)

      const { getByText } = renderBookingDetails(booking)

      getByText(
        'Tu dois présenter ta carte d’identité et ce code de 6 caractères pour profiter de ta réservation ! N’oublie pas que tu n’as pas le droit de le revendre ou le céder.'
      )
    })
  })
})

function renderBookingDetails(booking: Booking) {
  jest.spyOn(Queries, 'useOngoingBooking').mockReturnValue(booking)
  return render(<BookingDetails />)
}
