export const initialState = {
  userLoginId: localStorage.getItem('userLoginId'),
};

export const setUserLoginId =  (state, userLoginId) => {
  return Object.assign({}, state, { userLoginId: userLoginId });
};

