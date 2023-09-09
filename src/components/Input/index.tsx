import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { StyledContainer, IconStyle, StyledInput } from "Components/Input/input.style";

type InputProps = {
  placeholder: string;
  type: string;
  Icon: React.ElementType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputBox({ placeholder, type, onChange, Icon }: InputProps) {
  const [passHidden, setPassHidden] = useState(true);
  const [inputType, setInputType] = useState(type);

  return (
    <StyledContainer>
      <StyledInput
        type={inputType}
        onChange={onChange}
        placeholder={placeholder}
      />
      <IconStyle>
        {type === "password" ? (
          !passHidden ? (
            <Icon
              onClick={() => (
                setPassHidden(!passHidden), setInputType("password")
              )}
            />
          ) : (
            <EyeOutlined
              onClick={() => (setPassHidden(!passHidden), setInputType("text"))}
            />
          )
        ) : (
          <Icon />
        )}
      </IconStyle>
    </StyledContainer>
  );
}

export default InputBox;
