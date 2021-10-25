import { t } from '@lingui/macro'
import React, { Fragment } from 'react'

import { accessibilityAndTestId } from 'tests/utils'
import { TextInput } from 'ui/components/inputs/TextInput'
import { TextInputProps } from 'ui/components/inputs/types'
import { Spacer, Typo } from 'ui/theme'

interface Props extends TextInputProps {
  label: string
  email: string
  onEmailChange: (email: string) => void
}

export const EmailInput = ({ label, email, onEmailChange, ...inputProps }: Props) => (
  <Fragment>
    <Typo.Body>{label}</Typo.Body>
    <Spacer.Column numberOfSpaces={2} />
    <TextInput
      autoCapitalize="none"
      keyboardType="email-address"
      onChangeText={onEmailChange}
      placeholder={t`tonadresse@email.com`}
      textContentType="emailAddress"
      value={email}
      {...accessibilityAndTestId("Entrée pour l'email")}
      {...inputProps}
    />
  </Fragment>
)