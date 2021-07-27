import { NavigationAction } from '@react-navigation/core'
import { Link as DefaultLink } from '@react-navigation/native'
import React from 'react'
import { GestureResponderEvent, TextProps } from 'react-native'

declare type Props = {
  to: string
  action?: NavigationAction
  target?: string
  onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void
} & (TextProps & {
  children: React.ReactNode
}) & {
    params?: string | string[][] | Record<string, string | any> | URLSearchParams
  }

export const Link = function Link({ to, action, target, onPress, children, params }: Props) {
  const searchParams = new URLSearchParams(params)

  return (
    <DefaultLink
      to={`${to}${params ? `?${searchParams.toString()}` : ''}`}
      action={action}
      target={target}
      onPress={onPress}>
      {children}
    </DefaultLink>
  )
}