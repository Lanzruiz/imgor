// Modules
import React, { Component } from 'react';
import RCTooltip from 'rc-tooltip';
// Styles
import './styles.scss';

export default class Tooltip extends Component {
  state = {
    visible: false,
  };

  render() {
    const { message } = this.props;
    return (
      <RCTooltip
        visible={this.state.visible}
        animation="zoom"
        onVisibleChange={this.onVisibleChange}
        trigger="click"
        overlay={<span>{message}</span>}
        placement="top"
      >
        <div className="tooltip__container">
          {this.props.children}
        </div>
      </RCTooltip>
    );
  }

  onVisibleChange = (visible) => {
    this.setState({ visible });
  }

  onDestroy = () => {
    this.setState({ destroy: true });
  }
}