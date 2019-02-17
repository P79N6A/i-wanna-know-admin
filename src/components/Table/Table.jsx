import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';

export default class TableComponent extends Component {
  static propTypes = {
    tableProps: PropTypes.object,
    total: PropTypes.number,
    current: PropTypes.number,
  };

  static defaultProps = {
    total: 0,
    current: 1,
  };

  render() {
    const {tableProps, current, total, onChange} = this.props;

    return (
      <Table
        rowKey="_id"
        // size="middle"
        pagination={{
          pageSize: 8,
          current,
          total,
          onChange,
        }}
        {...tableProps}
      />
    );
  }
}
