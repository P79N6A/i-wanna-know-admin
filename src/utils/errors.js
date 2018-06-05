import { message } from 'antd';

function handleError(networkError) {
  if (!networkError.response) {
    message.error('请求无响应');

    return;
  }

  const status = networkError.response.status;

  if (status === 400) {
    message.error('请求错误');
  } else if (status === 403) {
    message.error('没有权限访问');
  } else if (status === 500) {
    message.error('哎呀，服务器开小差啦');
  }
}

export default handleError;
