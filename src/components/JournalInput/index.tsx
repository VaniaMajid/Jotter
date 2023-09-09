import { TextAreaProps } from "antd/es/input";
import { StyledInput } from "Components/JournalInput/journalInput.style";

interface InputProps extends TextAreaProps  {
  name: string,
  placeholder: string,
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void

};

function JournalInput({ name, placeholder, onChange }: InputProps) {
  return (
    <StyledInput
      id={name}
      onChange={onChange}
      placeholder={placeholder}
      rows={name === "description" ? 17 : 1}
    />
  );
}

export default JournalInput;
