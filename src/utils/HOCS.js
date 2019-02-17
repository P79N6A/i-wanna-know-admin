import createHOC from './HOCCreator';

export const withPageHandle = createHOC({
  queryProps: {
    fetchPolicy: 'cache-and-network',
  },
  isFetchMore: true,
  initState: {
    page: 1,
    perPageNum: 8,
  },
});
