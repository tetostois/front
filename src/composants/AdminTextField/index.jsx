import React from 'react';
import { FormTextInput } from '../UiInputs';

/**
 * Compatibilité : ancien nom « AdminTextField » (MUI).
 * Délègue vers FormTextInput (Tailwind). Ignore sx, variant, size MUI.
 */
export default function AdminTextField(props) {
  const {
    sx: _sx,
    variant: _variant,
    size: _size,
    InputProps,
    inputProps,
    SelectProps: _sp,
    children: _ch,
    ...rest
  } = props;

  const mergedInputProps = {
    ...(InputProps?.inputProps || {}),
    ...(inputProps || {}),
  };

  return (
    <FormTextInput
      {...rest}
      inputProps={mergedInputProps}
      startAdornment={InputProps?.startAdornment}
      endAdornment={InputProps?.endAdornment}
    />
  );
}
