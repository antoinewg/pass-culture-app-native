import React from 'react'

import { BatchUser } from '__mocks__/@bam.tech/react-native-batch'
import { env } from 'libs/environment'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { flushAllPromises, act, render } from 'tests/utils'

import { CheatCodes } from '../CheatCodes'

const installationID = 'installationID'

beforeAll(() => {
  BatchUser.getInstallationID.mockImplementation(() => Promise.resolve(installationID))
  BatchUser.editor.mockImplementation(() => ({
    setIdentifier: () => ({
      save: jest.fn(),
    }),
  }))
})

jest.mock('features/auth/AuthContext')

describe('CheatCodes component', () => {
  const navigation = {
    dispatch: jest.fn(),
  } as any // eslint-disable-line @typescript-eslint/no-explicit-any

  it('should render correctly', async () => {
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const instance = render(reactQueryProviderHOC(<CheatCodes navigation={navigation} />))

    await act(async () => {
      await flushAllPromises()
    })

    expect(instance.toJSON()).toMatchSnapshot()
  })

  it.each`
    environment     | buttonIsdisplayed
    ${'testing'}    | ${true}
    ${'staging'}    | ${false}
    ${'production'} | ${false}
  `('should display/not display code push button', async ({ environment, buttonIsdisplayed }) => {
    env.ENV = environment
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const instance = render(reactQueryProviderHOC(<CheatCodes navigation={navigation} />))

    await act(async () => {
      await flushAllPromises()
    })
    buttonIsdisplayed
      ? expect(instance.queryByText('Check update')).toBeTruthy()
      : expect(instance.queryByText('Check update')).toBeFalsy()
    expect.assertions(1)
  })

  it('should call installationID and display it', async () => {
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const { queryByText } = render(reactQueryProviderHOC(<CheatCodes navigation={navigation} />))

    await act(async () => {
      await flushAllPromises()
    })

    expect(BatchUser.getInstallationID).toHaveBeenCalled()
    expect(queryByText(`Batch installation ID: ${installationID}`)).toBeTruthy()
  })
})