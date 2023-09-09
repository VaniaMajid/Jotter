import { Space } from "antd";
import styled from "styled-components";

export const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const JournalsSection = styled.section`
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    height: 86vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Journals = styled(Space)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }    
`;
