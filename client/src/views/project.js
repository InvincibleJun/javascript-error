import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../services/project'
import { Card, Tag } from 'antd'

export default class Project extends Component {
  state = {
    data: []
  }

  componentWillMount() {
    projects().then(data => {
      this.setState({
        data
      })
    })
  }

  render() {
    const { data } = this.state
    return (
      <div>
        {data.map(project => (
          <Card
            key={project._id}
            title={project.name}
            extra={<Link to={`/history/${project._id}`}>查看日志</Link>}
            style={{ width: 350, display: 'inline-block', margin: 10 }}
          >
            <div className="project-card-line">
              <span>hosts:</span>
              {project.host.map(h => <Tag key={h}>{h}</Tag>)}
            </div>
            <div className="project-card-line">
              <span>创建人:</span> {project.creator}
            </div>
            <div className="project-card-line">
              <span>用户:</span>
              {project.users.map(u => <Tag key={u}>{u}</Tag>)}
            </div>
            <div className="project-card-line">
              <span>token:</span> {project._id}
            </div>
          </Card>
        ))}
      </div>
    )
  }
}
