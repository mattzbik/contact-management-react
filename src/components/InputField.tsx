import { TextField } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> extends UseControllerProps {
  label?: string;
  placeholder?: string;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  formProps?: UseFormReturn<T[keyof T]>;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps<FieldValues>> = ({
  label,
  name,
  placeholder,
  type,
  formProps,
  required = false,
  ...rest
}) => {
  return (
    <Controller
      {...rest}
      control={formProps?.control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          id={name}
          error={!!error}
          label={label}
          placeholder={placeholder}
          type={type}
          required={required}
          fullWidth
        />
      )}
    />
  );
};
