import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/system';

const Root = styled(TextField)`
  width: 100%;
`;

const InputField: React.FC<TextFieldProps> = (props) => {
  return (
    <Root variant="outlined" {...props}/>
  );
};

export default InputField;
