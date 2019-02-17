// / <reference types="Modal" />
import React, {Component} from 'react';
import {Modal} from 'antd';
import PropTypes from 'prop-types';

export default class WindlikeModal extends Component {
  static propTypes = {
    /** 模态框打开处理函数 */
    handleOpen: PropTypes.func,
    /** 模态框关闭处理函数 */
    handleClose: PropTypes.func,
  };

  componentDidMount() {
    this.handleVisibleChange(this.props);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.handleVisibleChange(nextProps);
    }
  }

  handleVisibleChange = nextProps => {
    if (nextProps.visible) {
      if (typeof this.props.handleOpen === 'function') {
        this.props.handleOpen(nextProps);
      }
    } else if (typeof this.props.handleClose === 'function') {
      this.props.handleClose(nextProps);
    }
  };

  render() {
    return <Modal {...this.props}>{this.props.children}</Modal>;
  }
}
