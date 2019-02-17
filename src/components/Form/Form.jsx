import React, {Component} from 'react';
import {Form} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class FormComponent extends Component {
  static propTypes = {
    formProps: PropTypes.object.isRequired,
    formItems: PropTypes.array.isRequired,
  };

  static defaultProps = {
    formProps: {},
    formItems: [],
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {formProps, formItems} = this.props;

    return (
      <Form {...formProps}>
        {formItems.map(item => {
          item.props = item.props || {};

          return (
            <FormItem {...item.props}>
              {getFieldDecorator(item.name, item.rules)(item.el)}
            </FormItem>
          );
        })}
      </Form>
    );
  }
}

export default Form.create()(FormComponent);
