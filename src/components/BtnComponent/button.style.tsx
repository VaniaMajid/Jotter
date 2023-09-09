import styled from "styled-components";
import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface ButtonTemplateProps extends BaseButtonProps {
  width: string;
  bgcolor? : string;
  margin?: string;
}

export const StyledButton = styled(Button)<ButtonTemplateProps>`
    box-shadow: none;
    padding: 20px;
    border-radius: 10px;
    background: ${(props) => (props.bgcolor ? props.bgcolor : "linear-gradient(134deg, #FF8AC7 0%, #D392EE 50.52%, #97B5FF 100%)")} !important;
    /* background: linear-gradient(134deg, #FF8AC7 0%, #D392EE 50.52%, #97B5FF 100%); */
    border: none;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: 'center';
    transition: 0.2s ease;
    font-size: medium;
    font-family: 'Nunito Sans';
    font-weight: bold;
    transition: 0.5s ease;
    color: white;
    width:  ${(props) => (props.width ? props.width : "500px")} !important;
    margin: ${(props) => (props.margin ? props.margin : "0px 5px 5px 5px")} !important;

    &&&:hover{
        box-shadow: 1px 1px 10px #f4d2ff;
        transform: scale(0.98)
    }


    
`;
