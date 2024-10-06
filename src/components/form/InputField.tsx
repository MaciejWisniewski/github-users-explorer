import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/system';

const TextFieldStyled = styled(TextField)`
  width: 100%;
`;

const InputField: React.FC<TextFieldProps> = (props) => {
  return <TextFieldStyled variant="outlined" {...props} />;
};

export default InputField;
