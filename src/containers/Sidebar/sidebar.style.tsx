import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import styled from "styled-components";
import { Content } from "antd/es/layout/layout";
import { media } from "Styles/mediaQueries";

export const CustomMenu = styled(Menu)`
    height: 79.5vh;
    background: #ffffff;
    color: #333333;
    font-family: 'Nunito Sans';
    border-radius: 10px;
    border: none !important;
    margin-top: 10px;

`;

export const StyledSider = styled(Sider)`
    background: #ffffff !important;
    margin: 5px 0px 0px 20px;
    height: 88vh;
    border-radius: 10px;
    box-shadow: 1px 1px 7px #e0e0e0;
    /* ${() => media.lessThan("lessThanPhone")`
            width: 0;
        `}; */
`;

export const StyledContent = styled(Content)`
    /* padding: 20px; */
    height: 90.5vh;

`;
