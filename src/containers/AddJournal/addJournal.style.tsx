import styled from "styled-components";

export const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const AddJournalSection = styled.section`
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    height: 86vh;

    p {
        color: #f16c77;
        font-size: 14px;
        font-weight: bold;
        font-family: 'Klee One';
        text-align: center;
        
    }
`;

export const DescSection = styled.div`
    border: 1px solid #cccccc;
    border-radius: 10px;
    width: 100%;
    height: 44.5vh;
    margin-top: 20px;
    background-color: #fff9ff;
`;

export const ImgUploadSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 0px;
    
`;

export const ImgUpload = styled.label`
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border: 1px dashed #ccc;
    color: #c46aeb;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 5px;
    font-size: 20px;
`;

export const ImgPreview = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const ImgCont = styled.div`
    width: 80px;
    height: 80px;
    border: 1px dashed #ccc;
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;    
`;

export const DelBtn = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: white;
    border-radius: 50px;
    border: 1px solid gray;
    height: 20px;
    width: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;  
`;
