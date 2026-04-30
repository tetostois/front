import React, { useId } from 'react';
import { cn } from '../../utils/cn';

const baseField =
  'w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[15px] leading-normal text-slate-900 shadow-sm transition ' +
  'placeholder:text-slate-400 ' +
  'focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ' +
  'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400';

const errorField =
  'border-red-500 focus:border-red-600 focus:ring-red-500/25';

/**
 * Zone de saisie native + label (Tailwind), remplace MUI TextField pour les formulaires.
 */
export default function FormTextInput({
  label,
  id,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  disabled,
  required,
  error = false,
  helperText,
  multiline = false,
  rows = 4,
  fullWidth = true,
  className,
  inputClassName,
  startAdornment,
  endAdornment,
  inputProps = {},
}) {
  const uid = useId();
  const fieldId = id || `tw-field-${uid}`;
  const helperId = helperText ? `${fieldId}-helper` : undefined;

  const { className: inputPropsClass, ...restInputProps } = inputProps;

  const fieldClass = cn(
    baseField,
    error && errorField,
    startAdornment && 'pl-10',
    endAdornment && 'pr-10',
    multiline && 'min-h-[5rem] resize-y align-top',
    inputClassName,
    inputPropsClass
  );

  const control = multiline ? (
    <textarea
      id={fieldId}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      rows={rows}
      aria-invalid={error || undefined}
      aria-describedby={helperId}
      className={fieldClass}
      {...restInputProps}
    />
  ) : (
    <input
      id={fieldId}
      name={name}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      aria-invalid={error || undefined}
      aria-describedby={helperId}
      className={fieldClass}
      {...restInputProps}
    />
  );

  return (
    <div className={cn(fullWidth && 'w-full', className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-sm font-medium text-slate-600"
        >
          {label}
          {required ? <span className="ml-0.5 text-red-500">*</span> : null}
        </label>
      ) : null}

      <div className="relative">
        {startAdornment ? (
          <span
            className={cn(
              'pointer-events-none absolute left-3 z-[1] text-emerald-600',
              multiline ? 'top-3' : 'top-1/2 -translate-y-1/2'
            )}
          >
            {startAdornment}
          </span>
        ) : null}
        {control}
        {endAdornment ? (
          <span
            className={cn(
              'absolute right-1 z-[1] flex items-center text-slate-500 [&_button]:pointer-events-auto',
              multiline ? 'top-3' : 'top-1/2 -translate-y-1/2'
            )}
          >
            {endAdornment}
          </span>
        ) : null}
      </div>

      {helperText ? (
        <p
          id={helperId}
          className={cn('mt-1.5 text-sm', error ? 'text-red-600' : 'text-slate-500')}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
