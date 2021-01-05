import jsonPlaceholders from '../apis/jsonPlaceholders';

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholders.get('/posts');

  dispatch({
    type: 'FETCH_POST',
    payload: response,
  });
};
