import React from 'react'
import waitForExpect from 'wait-for-expect'

import { DeeplinkImporter } from 'features/deeplinks/pages/DeeplinkImporter'
import { FIREBASE_DYNAMIC_LINK_URL } from 'features/deeplinks/utils'
import * as DeeplinkUtils from 'features/deeplinks/utils'
import { mockGoBack } from 'features/navigation/__mocks__/useGoBack'
import { analytics } from 'libs/analytics'
import { render, fireEvent } from 'tests/utils'

jest.mock('react-query')

describe('DeeplinkImporter', () => {
  it('should redirect to Home when clicking on ArrowPrevious icon', async () => {
    const { getByTestId } = render(<DeeplinkImporter />)

    const leftIcon = getByTestId('Revenir en arrière')
    fireEvent.press(leftIcon)

    await waitForExpect(() => {
      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
  })

  it('should resolve the link', async () => {
    const url = FIREBASE_DYNAMIC_LINK_URL + '/home'

    const resolveHandlerSpy = jest.spyOn(DeeplinkUtils, 'resolveHandler')

    const { getByTestId, getByPlaceholderText } = render(<DeeplinkImporter />)

    const urlInput = getByPlaceholderText('Colle ton lien ici ...')
    const importButton = getByTestId('Importer le lien')

    fireEvent.changeText(urlInput, url)
    fireEvent.press(importButton)

    await waitForExpect(() => {
      expect(resolveHandlerSpy).toBeCalled()
      expect(analytics.logProblemWithLink).toHaveBeenNthCalledWith(1, url)
    })
    resolveHandlerSpy.mockRestore()
  })
})
