import { createReducer, createAction } from 'redux-act';


const initial = {
  authenticated: false,
  user: {
    id: null,
  }
};

export const authActions = {
  authenticate: createAction('authenticate')
};

const authReducer = createReducer({
  [authActions.authenticate]: (state, payload) => ({ authenticated: true, user: payload })
}, initial);

export default authReducer
