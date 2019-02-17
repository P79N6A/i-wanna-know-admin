import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Select} from 'antd';
import {get} from 'Utils/utils';

const Option = Select.Option;

const DEPARTMENTS_QUERY = gql`
  query DepartmentsQuery {
    departments: DepartmentsQuery {
      list {
        _id
        name
      }
      total
    }
  }
`;

class DepartmentSelect extends Component {
  static propTypes = {
    selectedDepartment: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  render() {
    return (
      <Query query={DEPARTMENTS_QUERY}>
        {({data, loading}) => {
          const list = get(data, 'departments.list') || [];

          return (
            <Select
              onChange={this.props.onChange}
              style={{width: 200}}
              value={this.props.selectedDepartment}>
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

export default DepartmentSelect;
