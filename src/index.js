import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';

// import createHistory from 'history/createHashHistory';
// user BrowserHistory
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { message } from 'antd';
import handleError from './utils/errors';
import 'moment/locale/zh-cn';
import './rollbar';

import './index.less';
import './styles/common.less';
// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 默认情况客户端会发送到相同主机名(域名)下的/graphql端点
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  clientState: {
    defaults: {
    },
    typeDefs: `
          ${import('./types/questions')}
          ${import('./types/classifications')}
          ${import('./types/users')}
          ${import('./types/messages')}
      `,
  },
  link: ApolloLink.from([
    new HttpLink({ uri: 'http://192.168.1.100:8080/graphql' }),
  ]),
  onError: (({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ messageStr, locations, path }) =>
        message.error(
          `[GraphQL Error]: Message: ${messageStr}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) {
      handleError(networkError);
    }
  }),
  cache: new InMemoryCache(),
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
const App = app.start();

ReactDOM.render((
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
), document.querySelector('#root'));

export default app._store; // eslint-disable-line
