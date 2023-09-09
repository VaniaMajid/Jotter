import styled from "styled-components";

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    align-self: center;
    font-family: 'Nunito Sans';

    #registerBtn {
        background: none;
        border: none;
        color: #D392EE;
        font-weight: bold;
        font-size: 16px;
    }

    div p {
        margin-top: 0px;
        margin-bottom: 60px;
        text-align: center;
    }

    .register{
        color: #333333;
        font-size: 16px;
        margin-top: 10px;
    }

    p button {
        font-family: 'Nunito Sans';
    }

    .err {
        color: #f16c77;
        font-size: 14px;
        font-weight: bold;
    }
`;
