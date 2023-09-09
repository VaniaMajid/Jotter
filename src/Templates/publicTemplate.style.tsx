import styled from "styled-components";
import { media } from "Styles/mediaQueries";

export const StyledSection = styled.section`
    display: flex;
    align-items: center;
    height: 100vh;
    width: 98vw;
    margin: -8px;
    font-family: 'Klee One';

    .imgSection {
        background: #f9e5fa;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 98%;
        width: 50%;
        border: 1px solid #f2c9fc;
        border-radius: 0px 50px 50px 0px;
    }

    #heroImg {
            height: auto;
            width: 75%;
            filter: drop-shadow(5px 5px 5px #cb9ed6);
    }

    .form {
        position: relative;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form img {
        width: 150px;
        position: absolute;
        top: 4%;
        right: 35%;    
    }

    ${() => media.lessThan("lessThanLargeTablet")`
        flex-direction: column;

        .imgSection {
            width: 95%;
            border-radius: 0px 0px 50px 50px;
        }

        #heroImg {
            width: 70%;
            padding: 10px;
        }

        .form {
            margin-top: 60px;
        }

        .form img {
            width: 140px;
            top: -3%;
        }
    `};

`;
