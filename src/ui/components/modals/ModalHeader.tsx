import React, { FunctionComponent } from 'react'
import { LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'

import { accessibilityAndTestId } from 'tests/utils'
import { getSpacing, Typo } from 'ui/theme'
import { ZIndex } from 'ui/theme/layers'

import { ModalIconProps } from './types'

type ModalHeaderProps = {
  title: string
  boldTitle?: boolean
  numberOfLines?: number
  onLayout?: (event: LayoutChangeEvent) => void
} & ModalIconProps

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({
  title,
  leftIcon: LeftIcon,
  leftIconAccessibilityLabel = 'leftIconButton',
  onLeftIconPress,
  rightIcon: RightIcon,
  rightIconAccessibilityLabel = 'rightIconButton',
  onRightIconPress,
  boldTitle = false,
  numberOfLines = 2,
  onLayout,
}) => {
  const TitleComponent = boldTitle ? BoldTitle : Title
  return (
    <HeaderContainer onLayout={onLayout}>
      <LeftHeaderActionContainer>
        <LeftHeaderAction
          onPress={onLeftIconPress}
          {...accessibilityAndTestId(leftIconAccessibilityLabel)}>
          {!!LeftIcon && <LeftIcon size={32} testID="leftIcon" />}
        </LeftHeaderAction>
      </LeftHeaderActionContainer>
      <TitleContainer>
        <TitleComponent numberOfLines={numberOfLines}>{title}</TitleComponent>
      </TitleContainer>
      <RightHeaderActionContainer>
        <RightHeaderAction
          onPress={onRightIconPress}
          {...accessibilityAndTestId(rightIconAccessibilityLabel)}>
          {!!RightIcon && <RightIcon size={32} testID="rightIcon" />}
        </RightHeaderAction>
      </RightHeaderActionContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
})

const TitleContainer = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: getSpacing(3),
  paddingLeft: getSpacing(3),
  flex: 0.8,
  zIndex: ZIndex.MODAL_HEADER,
  marginTop: 5,
})

const RightHeaderActionContainer = styled.View({
  flexDirection: 'row',
  flex: 0.1,
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
})

const LeftHeaderActionContainer = styled.View({
  flexDirection: 'row',
  flex: 0.1,
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
})

/* The negative margins are used to compensate for the
 "empty" space of SVG icons. */
const LeftHeaderAction = styled.TouchableOpacity({ marginLeft: -5 })
const RightHeaderAction = styled.TouchableOpacity({ marginRight: -5 })

const Title = styled(Typo.Title4)({ textAlign: 'center' })
const BoldTitle = styled(Typo.Title3)({ textAlign: 'center' })
