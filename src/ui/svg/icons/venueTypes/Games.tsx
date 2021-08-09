import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from '../types'

export function Games({ size = 32, color = ColorsEnum.BLACK, testID }: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="0 0 96 96">
      <Path d="M50.0095 25.4012C50.0095 19.1633 54.933 14.107 61.007 14.107C66.4197 14.107 70.9187 18.1221 71.8343 23.4106C72.0226 24.4988 72.8997 25.4012 74.0041 25.4012C75.1084 25.4012 76.0169 24.5015 75.8789 23.4058C74.9262 15.8424 68.6313 10 61.007 10C52.7243 10 46.0104 16.8951 46.0104 25.4012C46.0104 25.5784 46.0323 25.7503 46.0733 25.9143C46.0322 26.0785 46.0103 26.2506 46.0103 26.428V34.642H24.0154C17.5989 34.642 12.565 36.8505 9.13263 40.6222C5.72492 44.3669 4.075 49.4543 4.02015 54.9051C4 56.3262 4 62.8342 4 69.2795V69.28V69.3462C4 78.53 11.2538 85.9795 20.1963 85.9795C25.7402 85.9795 30.8951 83.0733 33.8808 78.2514L33.8824 78.2488L40.1128 68.1539L47.882 68.145L55.87 68.1359L62.1385 78.271C65.1028 83.0707 70.2569 86.0001 75.8036 86.0001C84.7462 86.0001 91.9999 78.5505 91.9999 69.3667V55.021L92 55.0128L91.9998 54.9949C91.9136 44.8131 85.3849 34.642 74.004 34.642H50.0103V26.428C50.0103 26.2502 49.9883 26.0777 49.9469 25.9132C49.9878 25.7495 50.0095 25.578 50.0095 25.4012ZM72.0054 52.0967C73.6622 52.0967 75.0054 50.7176 75.0054 49.0164C75.0054 47.3153 73.6622 45.9362 72.0054 45.9362C70.3485 45.9362 69.0054 47.3153 69.0054 49.0164C69.0054 50.7176 70.3485 52.0967 72.0054 52.0967ZM69.0063 55.177C69.0063 56.8781 67.6632 58.2572 66.0063 58.2572C64.3495 58.2572 63.0063 56.8781 63.0063 55.177C63.0063 53.4758 64.3495 52.0967 66.0063 52.0967C67.6632 52.0967 69.0063 53.4758 69.0063 55.177ZM78.0039 58.2572C79.6608 58.2572 81.0039 56.8781 81.0039 55.177C81.0039 53.4758 79.6608 52.0967 78.0039 52.0967C76.3471 52.0967 75.0039 53.4758 75.0039 55.177C75.0039 56.8781 76.3471 58.2572 78.0039 58.2572ZM75.0054 61.3375C75.0054 63.0387 73.6622 64.4178 72.0054 64.4178C70.3485 64.4178 69.0054 63.0387 69.0054 61.3375C69.0054 59.6363 70.3485 58.2573 72.0054 58.2573C73.6622 58.2573 75.0054 59.6363 75.0054 61.3375ZM24.0161 63.391C22.9161 63.391 22.0161 62.4669 22.0161 61.3375V57.2305H18.0166C16.9169 57.2305 16.0171 56.3065 16.0171 55.177C16.0171 54.0476 16.9169 53.1235 18.0166 53.1235H22.0161V49.7731V49.0165C22.0161 47.8871 22.9161 46.963 24.0161 46.963C25.1161 46.963 26.0161 47.8871 26.0161 49.0165V52.6142V53.1235H26.7333H30.0139C31.1136 53.1235 32.0134 54.0476 32.0134 55.177C32.0134 55.691 31.8271 56.1625 31.5203 56.5237C31.1531 56.9562 30.6132 57.2305 30.0139 57.2305H26.0161V61.3375C26.0161 62.4669 25.1161 63.391 24.0161 63.391ZM45.0107 49.0165C45.0107 47.8824 45.9062 46.963 47.0107 46.963H49.0107C50.1153 46.963 51.0107 47.8824 51.0107 49.0165C51.0107 50.1506 50.1153 51.07 49.0107 51.07H47.0107C45.9062 51.07 45.0107 50.1506 45.0107 49.0165ZM8.01898 54.9515C8.065 50.3009 9.46441 46.2725 12.0544 43.4265C12.1887 43.2789 12.3268 43.1339 12.4685 42.9916C15.0348 40.4171 18.8216 38.749 24.0154 38.749H74.004C82.4958 38.749 87.9235 46.3151 88.0008 55.0218V69.3667C88.0008 76.2823 82.5375 81.8931 75.8036 81.8931C71.6331 81.8931 67.7488 79.6879 65.5142 76.069L58.0659 64.0264L42.1091 64.0446L37.9112 64.0494L30.5063 76.0476L30.505 76.0496C28.2518 79.6869 24.3694 81.8725 20.1963 81.8725C13.4624 81.8725 7.99909 76.2618 7.99909 69.3462C7.99909 62.8422 7.99918 56.3372 8.01889 54.9608L8.01898 54.9515Z" />
    </Svg>
  )
}
