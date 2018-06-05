import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Upload, Icon, message } from 'antd';
import { graphql, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '../Modal/Modal';
import ImageUpload from '../ImageUpload/ImageUpload';
import { stat } from 'fs';

const FormItem = Form.Item;
const ADD_CLASSIFICATIONS = gql`
  mutation createClassification($input: ClassificationInput) {
    info: createClassification(input: $input) {
      code
      message
    }
  }
`;

const UPDATE_CLASSIFICATIONS = gql`
  mutation updateClassification($input: ClassificationUpdateInput) {
    info: updateClassification(input: $input) {
      code
      message
    }
  }
`;

class EditModal extends Component {
  static propTypes = {
    classification: PropTypes.object.isRequired,
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
  }

  state = {
    _id: '',
    imageName: '',
    mutation: ADD_CLASSIFICATIONS,
  }

  handleOpen = (nextProps) => {
    const { classification } = nextProps;

    if (classification && classification._id) {
      this.props.form.setFieldsValue({
        name: classification.name,
        description: classification.description,
      });
      this.setState({
        _id: classification._id,
        imageName: classification.icon,
        mutation: UPDATE_CLASSIFICATIONS,
      });
    } else {
      this.props.form.setFieldsValue({
        name: '',
        description: '',
      });
      this.setState({
        _id: '',
        imageName: '',
        mutation: ADD_CLASSIFICATIONS,
      })
    }
  }

  handleUpload = (imageName) => {
    this.setState({
      imageName,
    });
  }

  handleOk = (mutation) => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        if (!this.state.imageName) {
          message.error('请上传分类图标');
          return;
        }

        const input = {
          name: values.name,
          description: values.description,
          icon: this.state.imageName,
        };

        if (this.state._id) {
          /** 编辑 */
          mutation({
            variables: {
              input: {
                _id: this.state._id,
                ...input,
              },
            },
          });
        } else {
          /** 添加 */
          mutation({
            variables: {
              input,
            },
          });
        }
      }
    })

  }

  onSuccess = (data) => {
    if (data.info.code === 200) {
      message.success(data.info.message);
      this.props.handleOk();
    } else {
      message.error(data.info.message);
    }
  }

  render() {
    const { visible, classification } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Mutation
        onCompleted={this.onSuccess}
        mutation={this.state.mutation}>
        {
          (mutation, { data }) => (
            <Modal
              classification={classification}
              maskClosable={false}
              onCancel={this.props.handleCancel}
              onOk={() => this.handleOk(mutation)}
              handleOpen={this.handleOpen}
              title={this.state._id ? '编辑分类' : '添加分类'}
              visible={visible}
            >
              <Form>
                <FormItem
                  label="分类名"
                >
                  {
                    getFieldDecorator('name', {
                      rules: [{
                        required: true,
                        message: '分类名必须填写',
                      }],
                    })(<Input placeholder="分类名" />)
                  }
                </FormItem>
                <FormItem
                  label="分类简介"
                >
                  {
                    getFieldDecorator('description')(<Input placeholder="分类简介" />)
                  }
                </FormItem>
                <FormItem
                  label="分类图标"
                  required
                >
                  <ImageUpload
                    onChange={this.handleUpload}
                    imageName={this.state.imageName}>
                  </ImageUpload>
                </FormItem>
              </Form>
            </Modal>
          )
        }
      </Mutation>
    )
  }
}

export default Form.create()(EditModal);
