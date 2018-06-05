import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import EditModal from '../../components/Classification/EditModal';
import { graphql, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './Classification.less';

const GET_CLASSIFICATIONS = gql`
  query {
    classifications: ClassificationsQuery {
      _id
      name
      description
      icon
    }
  }
`;

export default class Classification extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);

    this.state = {
      editedClassification: {},
      isShowModal: false,
    };
    this.rowSelection = {
      onChange: this.onSelectChange,
    };
  }

  onSelectChange = (selectedRowKeys) => {

  }

  onEdit = (editedClassification) => {
    this.setState({
      editedClassification,
    });
    this.showModal();
  }

  onAdd = () => {
    this.setState({
      editedClassification: {},
    });
    this.showModal();
  }

  showModal = () => {
    this.setState({ isShowModal: true });
  }

  handleModalOk = (refetch) => {
    refetch();
    this.hideModal();
  }

  hideModal = () => {
    this.setState({ isShowModal: false });
  }

  render() {
    const { editedClassification } = this.state;
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '关注数',
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: '操作',
        key: 'ctrl',
        render: (record) => (
          <span>
            <span
              onClick={() => this.onEdit(record)}
              className="color-primary pointer margin-right-sm">编辑</span>
            <span className="color-danger pointer">删除</span>
          </span>
        ),
      },
    ];

    return (
      <Query
        fetchPolicy="cache-and-network"
        query={GET_CLASSIFICATIONS}>
        {
          ({ loading, err, data, refetch }) => {
            const { classifications } = data || {};

            return (
              <div className={styles.wrapper}>
                <div className={styles['btn-box']}>
                  <Button
                    className={styles.btn}
                    type="primary"
                    onClick={this.onAdd}>添加</Button>
                  <Button
                    className={styles.btn}
                    type="danger">删除</Button>
                </div>
                <Table
                  rowKey="_id"
                  loading={loading}
                  rowSelection={this.rowSelection}
                  dataSource={classifications}
                  columns={columns}
                  size="middle"
                />
                <EditModal
                  handleOk={() => this.handleModalOk(refetch)}
                  handleCancel={this.hideModal}
                  classification={editedClassification}
                  visible={this.state.isShowModal}
                />
              </div>
            )
          }
        }
      </Query>

    )
  }
}
