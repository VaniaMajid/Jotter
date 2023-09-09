import styled from "styled-components";

export const StyledContainer = styled.div`
    position: relative;
`;

export const StyledInput = styled.input`
    width: 425px;
    margin: 7px;
    padding: 9px;
    border: 1px solid #d4d4d4ff;
    border-radius: 10px;
    transition: 0.3s ease;
    font-family: 'Nunito Sans';
    font-size:15px;
   

    &&&:focus{
        outline: none;
        box-shadow: 1px 1px 10px #f4d2ff;
        /* font-family: 'Comic Neue'; */
        border: 1px solid transparent;
        background: linear-gradient(white, white) padding-box,
              linear-gradient(134deg, #FF8AC7 0%, #D392EE 50.52%, #97B5FF 100%) border-box;
    }
    &&:hover {
        border: 1px solid transparent;
        background: linear-gradient(white, white) padding-box,
              linear-gradient(134deg, #FF8AC7 0%, #D392EE 50.52%, #97B5FF 100%) border-box;
        box-shadow: none;
    }
`;

export const IconStyle = styled.span`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  color: #979797;
`;
