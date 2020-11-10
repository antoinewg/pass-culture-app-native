import { navigate } from '__mocks__/@react-navigation/native'
import { RouteParams } from 'features/navigation/RootNavigator'

import { DeepLinksToScreenConfiguration } from './types'
import { decodeDeeplinkParts, useDeeplinkUrlHandler } from './useDeeplinkUrlHandler'
import { formatDeeplinkDomain } from './utils'

describe('useDeeplinkUrlHandler', () => {
  describe('Url parts', () => {
    const uri = 'my-route?param1=one&param2=2&param3=true&param4=false'
    const uriWithoutParams = 'my-route/test' // slash will be included in the route name

    it.each([
      ['Android', formatDeeplinkDomain() + uri],
      ['iOS', formatDeeplinkDomain() + uri],
    ])('should parse route name and uri params for %s', (_platform, url) => {
      const { routeName, params } = decodeDeeplinkParts(url)
      expect(routeName).toEqual('my-route')
      expect(params).toMatchObject<Record<string, string>>({
        param1: 'one',
        param2: '2',
        param3: 'true',
        param4: 'false',
      })
    })
    it.each([
      ['Android', formatDeeplinkDomain() + uriWithoutParams],
      ['iOS', formatDeeplinkDomain() + uriWithoutParams],
    ])('should handle url without uri params for %s', (_platform, url) => {
      const { routeName, params } = decodeDeeplinkParts(url)
      expect(routeName).toEqual('my-route/test')
      expect(params).toEqual({})
    })
  })
  describe('Navigation handler', () => {
    it('should redirect to the right component when it exists', () => {
      const handleDeeplinkUrl = useDeeplinkUrlHandler()
      const url =
        formatDeeplinkDomain() + 'my-route-to-test?param1=one&param2=2&param3=true&param4=false'

      handleDeeplinkUrl({ url })

      expect(navigate).toHaveBeenCalledWith('UniqueTestRoute', {
        param1: 'one',
        param2: 2,
        param3: true,
        param4: false,
      })
    })
    it('should redirect to Home when the route is not recognized', () => {
      const handleDeeplinkUrl = useDeeplinkUrlHandler()
      const url = formatDeeplinkDomain() + 'unknwon-route?param1=one&param2=2'

      handleDeeplinkUrl({ url })

      expect(navigate).toHaveBeenCalledWith('Home')
    })
  })
})

/** FAKING NAVIGATION BY REDEFINING A LOCAL STACK PARAMLIST */
type RoutesListForTest = { 'my-route-to-test': 'UniqueTestRoute'; default: 'Home' }

type RootStackParamListForTest = {
  UniqueTestRoute: { param1: string; param2: number; param3: boolean; param4: boolean }
}

jest.mock('features/deeplinks/types', () => ({
  deeplinkToScreenConfiguration: {
    'my-route-to-test': {
      screen: 'UniqueTestRoute',
      paramConverter({
        param1,
        param2,
        param3,
        param4,
      }: Record<string, string>): RouteParams<RootStackParamListForTest, 'UniqueTestRoute'> {
        return {
          param1,
          param2: Number(param2),
          param3: param3 === 'true',
          param4: param4 === 'true',
        }
      },
    },
    default: {
      screen: 'Home',
    },
  } as DeepLinksToScreenConfiguration<RoutesListForTest, RootStackParamListForTest>,
}))

/** FAKING NAVIGATION END */
