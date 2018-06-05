import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message } from 'antd';

export default class ImageUpload extends Component {
  static propTypes = {
    imageName: PropTypes.string,
    onImageChange: PropTypes.func,
  }

  state = {
    isUploading: false,
  }

  beforeUpload(file) {
    const IMG_TYPES = ['image/jpeg', 'image/png', 'image/bmp'];
    const isImg = IMG_TYPES.includes(file.type);

    if (!isImg) {
      message.error('只可以上传图片文件!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('图片大小要小于2MB!');
    }
    return isImg && isLt2M;
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.props.onChange(info.file.response.name);
    }

    if (info.file.status === 'error') {
      message.error('上传失败');
    }
  }

  render() {
    const { isUploading } = this.state;
    const { imageName } = this.props;
    const uploadButton = (
      <div>
        <Icon type={isUploading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图标</div>
      </div>
    );

    return (
      <Upload
        accept="image/*"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="//localhost:8080/classificationIcons"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageName ?
            <img
              width="100"
              height="100"
              src={`http://localhost:8080/classificationIcons/${imageName}`}
              alt={imageName} /> :
            uploadButton
        }
      </Upload>
    )
  }
}
