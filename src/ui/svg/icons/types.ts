import { ViewStyle } from 'react-native'

import { ColorsEnum, UniqueColors } from 'ui/theme'

interface IconSharedProperties {
  accessibilityLabel?: string
  accessible?: boolean
  color?: ColorsEnum | UniqueColors
  testID?: string
  style?: ViewStyle
}

export interface IconInterface extends IconSharedProperties {
  size?: number | string
  opacity?: number
  color2?: ColorsEnum | UniqueColors
}

export interface BicolorIconInterface extends IconInterface {
  color2?: ColorsEnum | UniqueColors
  thin?: boolean
}

export interface RectangleIconInterface extends IconSharedProperties {
  width?: number | string
  height?: number | string
}
