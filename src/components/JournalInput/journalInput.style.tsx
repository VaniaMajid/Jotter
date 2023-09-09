import styled from "styled-components";

interface InputTemplateProps {
  id: string;
}

export const StyledInput = styled.textarea <InputTemplateProps>`
    width: 96%;
    margin: 7px;
    padding: 9px;
    border: none;
    height:  ${(props) => (props.id === "description" ? "auto" : "55px")} !important;
    border-bottom: ${(props) => (props.id === "description" ? "none" : "1px solid #d4d4d4ff")} !important;
    transition: 0.3s ease;
    background-color: ${(props) => (props.id === "description" ? "#fff9ff" : "white")} !important;
    color: ${(props) => (props.id === "description" ? "inherit" : "#D392EE")} !important;
    font-family: ${(props) => (props.id === "description" ? "Nunito Sans" : "Josefin Sans")} !important;
    font-size: ${(props) => (props.id === "description" ? "15px" : "20px")} !important;
    font-weight: ${(props) => (props.id === "description" ? "light" : "bold")} !important;
    text-transform: ${(props) => (props.id === "description" ? "inherit" : "uppercase")} !important;;
    overflow: auto;
    resize: none;

    &::placeholder {
        font-weight: lighter;
        text-transform: none;
    }

    &:focus {
        outline: none;
        background-color: ${(props) => (props.id == "description" ? "#fff9ff" : "white")} !important;
        
        /* border-bottom-color:  linear-gradient(134deg, #FF8AC7 0%, #D392EE 50.52%, #97B5FF 100%); */
        /* font-family: 'Comic Neue'; */
        /* border-bottom: 1px solid transparent;
        background: linear-gradient(white, white) padding-box,
              linear-gradient(134deg, #FF8AC7 0%, #D392EE 50.52%, #97B5FF 100%) border-box; */
    }
    &:hover {
        background-color: ${(props) => (props.id == "description" ? "#fff9ff" : "white")} !important;
        /* sent(134deg, #FF8AC7 0%, #D392EE 50.52%, #97B5FF 100%) border-box; */
        box-shadow: none;
    }

    &::-webkit-scrollbar {
        display: none;
    } 

`;
