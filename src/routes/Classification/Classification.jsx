import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input} from 'antd';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import EditModal from '../../components/Classification/EditModal';
import Table from '../../components/Table/Table';
import DepartmentSelect from '../../components/Common/DepartmentSelect';
import MajorSelect from '../../components/Common/MajorSelect';
import styles from './Classification.less';
import {get} from 'Utils/utils';

const Search = Input.Search;

const GET_CLASSIFICATIONS = gql`
  query ClassificationsQuery($majorId: String!, $name: String) {
    classifications: ClassificationsQuery(majorId: $majorId, name: $name) {
      list {
        _id
        name
        followedNum
        questionsNum
      }
      total
    }
  }
`;

class Classification extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      editedClassification: {},
      isShowModal: false,
      selectedDepartment: '04',
      selectedMajor: '0402',
      search: '',
    };
    this.rowSelection = {
      onChange: this.onSelectChange,
    };
  }

  onEdit = editedClassification => {
    this.setState({
      editedClassification,
    });
    this.showModal();
  };

  onAdd = () => {
    this.setState({
      editedClassification: {},
    });
    this.showModal();
  };

  showModal = () => {
    this.setState({isShowModal: true});
  };

  handleModalOk = () => {
    this.props.refetch();
    this.hideModal();
  };

  hideModal = () => {
    this.setState({isShowModal: false});
  };

  onDepartmentChange = departmentId => {
    this.setState({
      selectedDepartment: departmentId,
      selectedMajor: 0,
      page: 1,
    });
  };

  onMajorChange = majorId => {
    this.setState({
      selectedMajor: majorId,
      page: 1,
    });
  };

  onSearch = value => {
    this.setState({
      search: value,
      page: 1,
    });
  };

  render() {
    const {
      editedClassification,
      selectedDepartment,
      selectedMajor,
      page,
    } = this.state;
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
      },
      {
        title: '关注数',
        dataIndex: 'followedNum',
        key: 'followedNum',
      },
      {
        title: '问题数',
        dataIndex: 'questionsNum',
        key: 'questionsNum',
      },
    ];

    return (
      <Query
        variables={{
          majorId: this.state.selectedMajor,
        }}
        query={GET_CLASSIFICATIONS}>
        {({data, loading}) => {
          const list = get(data, 'classifications.list') || [];
          const dataSource = list.filter(item =>
            item.name.includes(this.state.search)
          );
          const total = get(data, 'classifications.total') || 0;

          return (
            <div className={styles.wrapper}>
              <div className={`${styles['btn-box']} flex-between`}>
                <span>
                  <span>
                    <DepartmentSelect
                      onChange={this.onDepartmentChange}
                      selectedDepartment={this.state.selectedDepartment}
                    />
                  </span>
                  <span style={{marginLeft: 16}}>
                    <MajorSelect
                      onChange={this.onMajorChange}
                      selectedDepartment={this.state.selectedDepartment}
                      selectedMajor={this.state.selectedMajor}
                    />
                  </span>
                </span>
                <span>
                  <Search
                    placeholder="请输入课程名"
                    style={{width: 200}}
                    onSearch={this.onSearch}
                  />
                </span>
                {/* <Button
                    className={styles.btn}
                    type="primary"
                    onClick={this.onAdd}>添加</Button>
                  <Button
                    className={styles.btn}
                    type="danger">删除</Button> */}
              </div>
              <Table
                tableProps={{
                  loading,
                  // rowSelection: this.rowSelection,
                  dataSource: loading
                    ? []
                    : dataSource.slice((page - 1) * 8, page * 8),
                  columns: columns,
                }}
                onChange={page => this.setState({page})}
                total={loading ? 0 : dataSource.length}
                current={page}
              />
              {/* <EditModal
                    handleOk={() => this.handleModalOk()}
                    handleCancel={this.hideModal}
                    classification={editedClassification}
                    visible={this.state.isShowModal}
                  /> */}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Classification;
