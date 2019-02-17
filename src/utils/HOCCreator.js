import React, {Component} from 'react';
import {graphql, Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function handleComponentsCreator({
  /** Query组件参数 */
  queryProps = {
    delay: false,
  },
  /** 初始state */
  initState = {},
  /** 是否在组件Mount完成后立刻获取数据 */
  isFetchAfterMount = true,
  /** 是否把新获取的数据加在原有数组里，而不是覆盖，用于加载更多功能 */
  isFetchMore = false,
  /** 获取数据后的回调 */
  afterFetch = () => {},
  /** 获取数据出错回调 */
  afterCatch = () => {},
} = {}) {
  function withHandle(query, WrappedComponent) {
    // ...and returns another component...
    class WithHandle extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          ...initState,
        };
      }

      UNSAFE_componentWillUpdate(nextProps) {
        if (nextProps.location !== this.props.location) {
          const {state} = this.props.location;

          this.setState(state);
        }
      }

      setUrl = (newParams, isReplaced) => {
        if (isReplaced) {
          this.props.history.replace({
            path: this.props.location.pathname,
            state: newParams,
          });
        } else {
          this.props.history.push({
            path: this.props.location.pathname,
            state: newParams,
          });
        }
      };

      handleAnythings = state => {
        /* this.setUrl(state); */
        this.setState(state);
      };

      setNewData = (preData, data) => {
        return preData;
      };

      render() {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return (
          <Query {...queryProps} query={query} variables={{...this.state}}>
            {props => {
              const {updateQuery, loading} = props;

              if (isFetchMore && !loading) {
                updateQuery(this.setNewData);
              }

              return (
                <WrappedComponent
                  handleAnythings={state => this.handleAnythings(state)}
                  {...props}
                  data={props.data || {}}
                  {...this.state}
                  {...this.props}
                />
              );
            }}
          </Query>
        );
      }
    }

    WithHandle.displayName = `WithHandle(${getDisplayName(WrappedComponent)})`;

    return WithHandle;
  }

  return withHandle;
}

export default handleComponentsCreator;
