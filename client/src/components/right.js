import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: ${props => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
`;

const Cover = styled.div`
  width: 100vw;
  height: 100vh;
  animation: ${props =>
    props.show ? `${fadeIn} .3s linear` : `${fadeOut} .3s linear`};
  background-color: #f5f5f5;
  opacity: 0.5;
`;

const Main = styled.div`
  width: 600px;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fafafa;
  animation: ${props =>
    props.show
      ? `${scrollRightShow} .3s linear`
      : `${scrollRightHide} .3s linear`};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
`;

const scrollRightShow = keyframes`
  from {
    margin-right: -600px;
  }

  to {
    margin-right: 0;
  }
`;

const scrollRightHide = keyframes`
  from {
    margin-right: 0;
  }

  to {
    margin-right: -600px;;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: .5;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: .5;
  }

  to {
    opacity: 0;
  }
`;

export default class RightModel extends Component {
  state = {
    show: false,
    body: document.body,
    top: 0
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
			this.setState({ show: true });
			this.stopBodyScroll(true);			
    }
  }

  stopBodyScroll(isFixed) {
    const { body, top } = this.state;
    if (isFixed) {
      this.setState({ top: window.scrollY });
      body.style.position = "fixed";
      body.style.top = -top + "px";
    } else {
      body.style.position = "";
      body.style.top = "";

      window.scrollTo(0, top); // 回到原先的top
    }
  }

  close = () => {
    this.setState({ show: false });
    // this.refs.main.addEventListener('webkitAnimationEnd', function() {
    // debugger
    // })
    setTimeout(() => {
			this.stopBodyScroll(false)
      this.props.onClose();
    }, 300);
  };

  render() {
    const { show } = this.state;
    const showProp = this.props.show;
    return (
      <Container show={showProp}>
        <Cover show={show} ref="cover" onClick={this.close} />
        <Main show={show} ref="main" />
      </Container>
    );
  }
}
