import {createStore, dispatch} from 'redux';

export const loginStore = createStore(loginReducer, []);

function loginReducer(state={}, action) {
  switch (action.type) {
    case 'LOGGED_IN': return {loggedIn: true, profile: action.payload}
    case 'LOGGED_OUT': return {loggedIn: false, profile: null}
  }
}

export function login() {
  loginStore.dispatch({type: 'LOGGED_IN', payload: {userType: 'doc'}});
}

export function logout() {
  loginStore.dispatch({type: 'LOGGED_OUT', payload: {userType: 'doc'}});
}
