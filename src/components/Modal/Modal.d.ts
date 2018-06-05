/// <reference types="react" />
import * as React from 'react';
import { ModalProps } from 'antd';

interface WindlikeModalProps extends ModalProps {
  /** 模态框打开处理函数 */
  handleOpen?: (nextProps: object) => void,
  /** 模态框关闭处理函数 */
  handleClose?: (nextProps: object) => void,
}

export default class WindlikeModal extends React.Component<WindlikeModalProps, {}> {
  static propTypes: {
    handleOpen: () => void,
    handleClose: () => void,
  };

  componentDidMount: () => void;
  UNSAFE_componentWillUpdate(nextProps: object): void;
  handleVisibleChange: () => void;
  render(): JSX.Element;
}