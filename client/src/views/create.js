import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd'

import { create } from '../services/project'
const FormItem = Form.Item

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        create(values).then(res => {
          console.log(res)
        })
      }
    })
  }
  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入监控名称'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="监控代号">
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                message: '请输入监控代号'
              }
            ]
          })(<Input type="text" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="host">
          {getFieldDecorator('host', {
            rules: [
              {
                required: true,
                message: '请输入监控host'
              }
            ]
          })(<Select mode="tags" notFoundContent="请输入host" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="创建人">
          {getFieldDecorator('creator', {
            rules: [
              {
                required: true,
                message: '请输入创建人'
              }
            ]
          })(<Input type="text" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="可查看用户">
          {getFieldDecorator('users', {
            rules: [{ required: true, message: '请输入可查看用户' }]
          })(<Select mode="tags" notFoundContent="请输入host" />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            确认创建
          </Button>
          <Button htmlType="submit">取消</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(RegistrationForm)
