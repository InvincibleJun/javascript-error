import React, { Component } from "react";
import { get } from "../services/history";
import Table from "../components/table";
import { Modal } from "antd";

export default class History extends Component {
  state = {
    data: [],
    visible: false,
    modalData: null
  };

  componentWillMount() {
    const { match } = this.props;
    get({ _id: match.params.id }).then(data => {
      this.setState({ data });
    });
  }

  open = line => {
      this.setState({visible: true, modalData: line});
  };

  render() {
    const { data, visible, modalData } = this.state;
    return (
      <div>
        <Modal
          title="20px to Top"
          style={{ top: 20 }}
          width={800}
          visible={visible}
          onCancel={() => this.setModal1Visible(false)}
        >
          {modalData && <p>{modalData.stack}</p>}
        </Modal>
        <Table data={data} open={this.open}/>
      </div>
    );
  }
}
