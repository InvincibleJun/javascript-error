import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Route, Link, Switch } from 'react-router-dom'
import Create from './create'
import Project from './project'
import History from './history'
const { Header, Content } = Layout

export default class Container extends Component {
  state = {}
  render() {
    const { pathname } = this.props.location
    const match = '/' + pathname.split('/')[1]
    return (
      <Layout>
        <Header style={{ position: 'fixed', width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[match]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="/">
              <Link to="/">现有监控</Link>
            </Menu.Item>
            <Menu.Item key="/create">
              <Link to="/create">新建监控</Link>
            </Menu.Item>
            <Menu.Item key="/history">
              <Link to="/history/index">日志查询</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="layout-content-box">
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Switch>
              <Route exact path="/" component={Project} />
              <Route path="/create" component={Create} />
              <Route path="/history/:id" component={History} />
            </Switch>
          </div>
        </Content>
      </Layout>
    )
  }
}
