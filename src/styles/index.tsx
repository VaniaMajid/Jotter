import { css } from "styled-components";

export const sharedButtonStyle = css`
    box-shadow: none;
    padding: 20px;
    border-radius: 10px;
    background: linear-gradient(134deg, #FF8AC7 0%, #D392EE 50.52%, #97B5FF 100%);
    border: none;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease;
    font-size: medium;
    transition: 0.5s ease;

    &&&:hover{
        box-shadow: 1px 1px 10px #f4d2ff;
        transform: scale(0.98)
    }
`;
