import { BaseButtonProps } from "antd/es/button/button";
import { StyledButton } from "Components/BtnComponent/button.style";

interface ButtonProps extends BaseButtonProps {
  name: string,
  click: (event: React.MouseEvent<HTMLButtonElement>) => void
  width: string,
  bgClr?: string,
  margin?: string;
}

function ButtonComponent({
  name, click, width, margin, bgClr, ...rest
}: ButtonProps) {
  return (
    <StyledButton {...rest} onClick={click} width={width} margin={margin} bgcolor={bgClr}>
      {name}
    </StyledButton>
  );
}

export default ButtonComponent;
