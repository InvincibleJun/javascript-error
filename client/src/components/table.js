import React, { Component } from "react";
import { Table, Icon, Divider, Checkbox, Button } from "antd";
import moment from "moment";
import { relative } from "path";
import RightModel from "./right";

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

export default class tableList extends Component {
  state = {
    show: false,
    columns: [
      {
        width: 200,
        title: "时间",
        dataIndex: "createTime",
        // key: 'createTime',
        render: (text, record) => {
          return (
            <div>{moment(text).format("YYYY-MM-DD HH:mm:ss SSS") + "ms"}</div>
          );
        }
      },
      {
        title: "错误名",
        width: 160,
        dataIndex: "name",
        key: "name"
      },
      {
        title: "平台",
        width: 100,
        dataIndex: "desktop",
        key: "desktop"
      },
      {
        title: "源请求",
        width: 240,
        dataIndex: "location",
        key: "location"
      },
      {
        title: "错误定位",
        width: 120,
        render: (text, record) => {
          return <div>{`${record.lineNo}行${record.colunmNo}列`}</div>;
        }
      },
      {
        title: "源文件",
        width: 200,
        dataIndex: "origin",
        key: "origin"
      },
      {
        title: "IP",
        width: 200,
        key: "ip",
        dataIndex: "ip"
      },
      {
        width: 200,
        key: "position",
        title: "定位",
        dataIndex: "position"
      },
      {
        width: 100,
        title: "操作",
        render: (text, record) => {
          return <Button onClick={() => this.props.open(record)}>查看详情</Button>;
        }
      }
    ]
  };

  open = record => {
    this.setState({ show: true });
  };

  render() {
    const { filter, columns, show } = this.state;
    const { data } = this.props;
    return (
      <div>
        <CheckboxGroup options={plainOptions} value={filter} />
        {!!data.length && (
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: true }}
            pagination={false}
            bordered
            size="middle"
          />
        )}
      </div>
    );
  }
}
