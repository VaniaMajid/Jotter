import { Card } from "antd";
import styled from "styled-components";
import { media } from "Styles/mediaQueries";

export const JournalCard = styled(Card)`
    width: 300px;
    height: max-content;
    margin: 15px 5px;
    background: linear-gradient(134deg, #ffdfef 0%, #f4dcff 50.52%, #dae4ff 100%);
    font-family: 'Nunito Sans';
    font-weight: bold;
    border: 1px solid #fbcdff;

    ${() => media.lessThan("lessThanLargeTablet")`
        width: 300px;
    `};

    ${() => media.lessThan("lessThanTablet")`
        width: 260px;
    `};

`;

export const StyledCarouselImg = styled.img`
    width:100%;
    height: 170px;
    object-fit: cover;

`;
export const Description = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;
