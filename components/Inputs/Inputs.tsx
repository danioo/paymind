import {
  TextInput as _TextInput,
  PasswordInput as _PasswordInput,
  NumberInput as _NumberInput,
} from '@mantine/core';
import { DatePickerInput as _DatePickerInput } from '@mantine/dates';
import classes from './Inputs.module.css';

export function TextInput({ ...rest }) {
  return (
    <_TextInput
      label="Email address"
      placeholder="me@example.com"
      classNames={classes}
      {...rest}
    />
  );
}

export function NumberInput({ ...rest }) {
  return <_NumberInput classNames={classes} {...rest} />;
}

export function DatePickerInput({ ...rest }) {
  return <_DatePickerInput classNames={classes} {...rest} />;
}

export function PasswordInput({ ...rest }) {
  return (
    <_PasswordInput label="Your password" classNames={classes} {...rest} />
  );
}
