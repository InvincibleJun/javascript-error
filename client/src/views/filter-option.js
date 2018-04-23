import React, { Component } from "react";
import { Checkbox } from "antd";
const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  "时间",
  "错误名",
  "平台",
  "源请求",
  "错误定位",
  "源文件",
  "IP",
  "定位",
  "原始堆栈"
];

export default class FilterOption extends Component {
  state = {};
  render() {
    return (
      <div>
        <CheckboxGroup options={plainOptions} value={filter} />
      </div>
    );
  }
}
