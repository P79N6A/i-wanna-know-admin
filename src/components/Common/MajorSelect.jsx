import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Select} from 'antd';
import {get} from 'Utils/utils';

const Option = Select.Option;

const MAJORS_QUERY = gql`
  query MajorsQuery($departmentId: String!) {
    majors: MajorsQuery(departmentId: $departmentId) {
      list {
        _id
        name
      }
      total
    }
  }
`;

class MajorSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    selectedDepartment: PropTypes.string.isRequired,
    selectedMajor: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.selectedDepartment === this.props.selectedDepartment) {
      return false;
    } else {
      return true;
    }
  }

  onCompleted = data => {
    const list = get(data, 'majors.list') || [];

    if (this.props.selectedMajor !== list[0]._id && list.length) {
      this.props.onChange(list[0]._id);
    }
  };

  render() {
    return (
      <Query
        query={MAJORS_QUERY}
        onCompleted={this.onCompleted}
        variables={{departmentId: this.props.selectedDepartment}}>
        {({data, loading}) => {
          const list = get(data, 'majors.list') || [];

          return (
            <Select
              style={{width: 200}}
              onChange={this.props.onChange}
              value={this.props.selectedMajor || '无'}>
              {loading
                ? null
                : list.map(department => (
                    <Option key={department._id} value={department._id}>
                      {department.name}
                    </Option>
                  ))}
            </Select>
          );
        }}
      </Query>
    );
  }
}

export default MajorSelect;
