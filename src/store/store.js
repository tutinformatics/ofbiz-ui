export const initialState = {
  userLoginId: localStorage.getItem('userLoginId'),
  jwtToken: localStorage.getItem('jwtToken'),
  partyId: '',
};

export const setUserLoginId = (state, userLoginId) => {
  localStorage.setItem("userLoginId", userLoginId);
  return Object.assign({}, state, {userLoginId: userLoginId});
};

export const setJwtToken = (state, jwtToken) => {
  localStorage.setItem("jwtToken", jwtToken);
  return Object.assign({}, state, {jwtToken: jwtToken});
};

export const reset = (state) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userLoginId");
  return Object.assign({}, state,
    {
      jwtToken: null, userLoginId: null, partyId: null
    }
  );
};

export const setPartyId = (state, partyId) => {
  return Object.assign({}, state, {partyId: partyId});
};


