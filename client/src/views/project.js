import React, { Component } from "react";
import { Link } from "react-router-dom";
import { projects } from "../services/project";
import { Card, Button } from "antd";

export default class Project extends Component {
  state = {
    data: []
  };
  componentWillMount() {
    projects().then(data => {
      this.setState({
        data
      });
    });
    // throw new Error('error le')
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        {data.map(project => (
          <Card
            key={project._id}
            title={project.name}
            extra={<Link to={`/history/${project._id}`}>查看日志</Link>}
            style={{ width: 300, display: 'inline-block', margin: 10 }}
          >
            <p className="project-card-line">
              <span>监控hosts:</span>
            </p>
            <p className="project-card-line">
              <span>创建人:</span>
            </p>
            <p className="project-card-line">
              <span>创建人:</span>
            </p>
            <p className="project-card-line">
              <Button size="small">复制token</Button>
            </p>
          </Card>
        ))}
      </div>
    );
  }
}
