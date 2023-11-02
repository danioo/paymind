import {
  TextInput as _TextInput,
  PasswordInput as _PasswordInput,
} from '@mantine/core';
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

export function PasswordInput({ ...rest }) {
  return (
    <_PasswordInput label="Your password" classNames={classes} {...rest} />
  );
}
