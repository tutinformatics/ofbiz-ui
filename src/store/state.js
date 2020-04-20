export const initialState = {
  userLoginId: null,
  token: null,
};

export const setUserLoginId =  (state, userLoginId) => {
  return Object.assign({}, state, { userLoginId: { userLoginId } });
};

export const setToken =  (state, token) => {
  return Object.assign({}, state, { token: { token } });
};
