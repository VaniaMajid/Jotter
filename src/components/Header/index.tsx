import { StyledHeader } from "Components/Header/header.style";

type headerProps = {
  heading: string
};

function FormHeader({ heading }: headerProps) {
  return (
    <StyledHeader>{heading}</StyledHeader>
  );
}

export default FormHeader;
