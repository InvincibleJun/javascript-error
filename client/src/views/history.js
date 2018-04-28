import React, { Component } from 'react'
import { get } from '../services/history'
import Table from '../components/table'
import RightModal from '../components/right'
import ErrorDetail from './error-detail'
import { Pagination } from 'antd'

export default class History extends Component {
  state = {
    list: [],
    visible: false,
    modalData: null,
    size: 18,
    total: 0,
    page: 1
  }

  componentWillMount() {
    this.getList()
  }

  getList(page) {
    const { match } = this.props
    get({ _id: match.params.id, page }).then(({ list, page, size, total }) => {
      this.setState({ list, page, size, total })
    })
  }

  open = line => {
    this.setState({ visible: true, modalData: line })
  }

  pageChange = page => {
    this.getList(page)
  }

  render() {
    const { id } = this.props.match.params
    const { list, page, size, total, visible, modalData } = this.state
    return (
      <div>
        {id === 'index' ? (
          <div>选择现有项目</div>
        ) : (
          <div>
            <RightModal
              show={visible}
              data={modalData}
              onClose={() => {
                this.setState({ visible: false })
              }}
            >
              {visible && <ErrorDetail data={modalData} />}
            </RightModal>
            <Table data={list} open={this.open} />
            <br />
            <Pagination
              onChange={this.pageChange}
              defaultCurrent={page}
              total={total}
              defaultPageSize={size}
            />
          </div>
        )}
      </div>
    )
  }
}
