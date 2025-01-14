import React from 'react'
import { PixelRatio } from 'react-native'
import styled from 'styled-components/native'

import { ColorsEnum, Typo, GUTTER_DP, getSpacing } from 'ui/theme'
import { BorderRadiusEnum } from 'ui/theme/grid'

interface ImageCaptionProps {
  categoryLabel: string | null
  distance?: string
  height: number
  width: number
}

export const ImageCaption = ({ categoryLabel, height, width, distance }: ImageCaptionProps) => {
  return (
    <Row height={height} width={width}>
      <TextWrapper>
        <Typo.Caption color={ColorsEnum.WHITE} numberOfLines={1} testID="categoryImageCaption">
          {categoryLabel}
        </Typo.Caption>
      </TextWrapper>
      {!!distance && (
        <React.Fragment>
          <Separator />
          <TextWrapper>
            <Typo.Caption color={ColorsEnum.WHITE} testID="distanceImageCaption">
              {distance}
            </Typo.Caption>
          </TextWrapper>
        </React.Fragment>
      )}
    </Row>
  )
}

const textLineHeight = PixelRatio.roundToNearestPixel(GUTTER_DP)

const Row = styled.View<{ height: number; width: number }>(({ height, width }) => ({
  flexDirection: 'row',
  backgroundColor: ColorsEnum.BLACK,
  height,
  width,
  borderBottomLeftRadius: BorderRadiusEnum.BORDER_RADIUS,
  borderBottomRightRadius: BorderRadiusEnum.BORDER_RADIUS,
  alignItems: 'center',
}))

const Separator = styled.View({
  height: textLineHeight,
  backgroundColor: ColorsEnum.WHITE,
  width: 1,
})

const TextWrapper = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  // So all categories are entirely visibles on homepage offer tiles
  paddingHorizontal: getSpacing(0.5),
  flex: 1,
})
