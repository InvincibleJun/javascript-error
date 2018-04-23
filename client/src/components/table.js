import React, { Component } from "react";
import { Table, Icon, Divider, Checkbox, Button } from "antd";
import moment from "moment";
import { relative } from "path";
import RightModel from "./right";

const CheckboxGroup = Checkbox.Group;

const platformMap = {
  'desktop': '桌面'
}

export default class tableList extends Component {
  state = {
    show: false,
    columns: [
      {
        width: 200,
        title: "时间",
        dataIndex: "createTime",
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
        dataIndex: "device",
        render: (text, record) => {
          return <div>{platformMap[text.type]}</div>
        }
      },
      {
        title: "内核",
        dataIndex: "engine",
        width: 100,
        render: (text) => {
          return <div>{text.name}</div>
        }
      },
      {
        title: "系统",
        dataIndex: "os",
        width: 100,
        render: (text) => {
          return <div>{text.name+text.version.original}</div>
        }
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
        width: 120,
        key: "ip",
        dataIndex: "ip"
      },
      {
        width: 200,
        title: "定位",
        dataIndex: "position",
        render: (text) => {
          return <div>{`${text.country} ${text.region} ${text.city}`}</div>
        }
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
