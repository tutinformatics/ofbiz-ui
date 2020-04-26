export const initialState = {
  userLoginId: localStorage.getItem('userLoginId'),
  partyId: '',
};

export const setUserLoginId =  (state, userLoginId) => {
  return Object.assign({}, state, { userLoginId: userLoginId });
};

export const setPartyId =  (state, partyId) => {
  return Object.assign({}, state, { partyId: partyId });
};


