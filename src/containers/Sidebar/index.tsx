import { Button, MenuProps } from "antd";
import {
  InfoCircleOutlined,
  SettingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { BsJournals } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CustomMenu, StyledSider } from "Containers/Sidebar/sidebar.style";

type MenuItem = Required<MenuProps>["items"][number];

function Sidebar() {
  const [collapse, setCollapsed] = useState(false);

  const itemsSider: MenuItem[] = [
    {
      label: "Journals",
      key: "1",
      icon: <BsJournals />,
      children: [
        {
          label: <Link to="/">Your Journals</Link>,
          key: "2-1",
        },
        {
          label: <Link to="/createjournal">Create Journal</Link>,
          key: "2-2",
        },
      ],
    },
    { label: <Link to="/guide">Guide</Link>, key: "2", icon: <InfoCircleOutlined /> },
    { label: <Link to="/settings">Settings</Link>, key: "3", icon: <SettingOutlined /> },

  ];

  return (
    <StyledSider collapsed={collapse} width={240} collapsedWidth="75px">
      <div>
        <CustomMenu
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={itemsSider}
        />

        <Button
          type="text"
          icon={<SwapOutlined style={{ fontSize: "20px", color: "#a7a7a7" }} />}
          onClick={() => setCollapsed(!collapse)}
          style={{ marginLeft: "21px", marginTop: "18px" }}
        />
      </div>

    </StyledSider>
  );
}

export default Sidebar;
