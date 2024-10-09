import { TextField, TextFieldProps } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = TextFieldProps & {
  errorMessage?: string;
  register: () => UseFormRegisterReturn<string>;
};

const InputField: React.FC<InputFieldProps> = ({
  errorMessage,
  register,
  ...rest
}) => {
  return (
    <TextField
      variant="outlined"
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      {...register()}
      sx={{ width: '100%' }}
      {...rest}
    />
  );
};

export default InputField;
