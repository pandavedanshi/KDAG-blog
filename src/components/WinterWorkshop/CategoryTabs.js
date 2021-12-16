import React from "react";
import { Tabs } from "antd";

import Topics from "./Topics";
import CategoryTab from "./CategoryTab";

const { TabPane } = Tabs;

const categoryToComponentMap = {
  "Topics": Topics,

}

const CategoryTabs = (props) => {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        {props.category.map((e) => (
          <TabPane tab={e.title} key={e.tab}>
            <CategoryTab category={props.category.title} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
