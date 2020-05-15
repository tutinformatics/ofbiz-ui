export const initialState = {
  userLoginId: localStorage.getItem('userLoginId'),
  jwtToken: localStorage.getItem('jwtToken'),
  partyId: null,
  error: {
    errorMessage: null,
    statusCode: null,
    statusDescription: null
  },
  workspaces: []
};

export const setUserLoginId = (state, userLoginId) => {
  localStorage.setItem('userLoginId', userLoginId);
  return Object.assign({}, state, { userLoginId: userLoginId });
};

export const setJwtToken = (state, token) => {
  localStorage.setItem('jwtToken', token);
  return Object.assign({}, state, { jwtToken: token });
};

export const reset = (state) => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userLoginId');
  return Object.assign({}, state, {
    jwtToken: null,
    userLoginId: null,
    partyId: null,
    error: {
      errorMessage: null,
      statusCode: null,
      statusDescription: null
    },
    workspaces: []
  });
};

export const setPartyId = (state, partyId) => {
  return Object.assign({}, state, { partyId: partyId });
};

export const setError = (state, error) => {
  return Object.assign({}, state, { error: error });
};

export const setWorkspaces = (state, workspaces) => {
  return Object.assign({}, state, { workspaces: workspaces });
};
