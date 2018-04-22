import React, {Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Create from './create';
import Project from './project';
import History from './history';
const { Header, Content, Footer } = Layout;

export default class Container extends Component{
  state = {

  }
  render() {
    return (
    <Layout>
      <Header style={{ position: 'fixed', width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <Link to="/">现有监控</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/create" >新建监控</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/history/1231">日志查询</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px 50px 0', marginTop: 64, }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          <Route exact path="/" component={Project} />        
          <Route exact path="/create" component={Create} />
          <Route exact path="/history/:id" component={History} />
          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/topics" component={Topics} /> */}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        javascript-error
      </Footer>
    </Layout>
    )
  }
}

