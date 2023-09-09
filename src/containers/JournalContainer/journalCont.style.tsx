import { Button, Carousel, Image } from "antd";
import styled from "styled-components";

export const JournalData = styled.section`
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    height: 86vh;
    font-family: 'Nunito Sans';
    display: flex;
    flex-direction: column;
`;

export const DescSection = styled.div`
    width: 100%;
    height: max-content;
    margin-top: 20px;
    border: 1px dashed #f1b9ff;
    border-radius: 10px;
    background-color: #fff9ff;
`;

export const StyledDescription = styled.section`
    padding: 20px;
    max-height: 44vh;
    overflow: auto;
    text-align: justify;
    &::-webkit-scrollbar {
        display: none;
    } 

    
`;

export const StyledCarousel = styled(Carousel)`
    height: 21vh;
    width: 300px;
    margin-bottom: 10px;
    margin: 10px 0px 20px 20px;
    text-align: center;
    background: #ffffff;
    border: 1px solid #e2e2e2;
    display: flex;
`;
export const ActionButtonCont = styled.div`
    display: flex;
    flex-direction: column;  
`;

export const ActionButton = styled(Button)`
    border: none;
    box-shadow: none;
    text-align: left;
    font-family: 'Nunito Sans';
    margin: 5px 0px 5px 0px;

    &&&:hover{
        color: #af55c5;
    }
`;

export const StyledImage = styled(Image)`
    object-fit: cover;
    
`;

export const StyledImageSection = styled.div`
    height: inherit;

`;
