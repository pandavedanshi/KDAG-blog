import React from "react";
import workshopbanner from "../../assets/pics/winterworkshop/winterworkshop.svg";
import { Tabs } from "antd";

import CategoryTabs from "./CategoryTabs";

const { TabPane } = Tabs;

const DayTabs = (props) => {
  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition="left">
        {props.days.map((e) => (
          <TabPane tab={e.day} key={e.id}>
            <CategoryTabs category={e.category} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default DayTabs;
