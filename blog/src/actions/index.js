import jsonPlaceholders from '../apis/jsonPlaceholders';

export const fetchPosts = async () => {
  const response = await jsonPlaceholders.get('/posts');

  return {
    type: 'FETCH_POST',
    payload: response,
  };
};
