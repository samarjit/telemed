import { createStore, dispatch } from 'redux';
import httpClient from '../util/http-client';
import { ReactReduxContext } from 'react-redux';
import { useReducer, useLayoutEffect, useRef, useMemo, useContext, useDebugValue } from 'react'
import { isEqual } from 'lodash';

export const loginStore = createStore(loginReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
window.loginStore = loginStore;
function loginReducer(state = {}, action) {
  switch (action.type) {
    case 'LOGGED_IN': return { loggedIn: true, profile: action.payload }
    case 'LOGGED_OUT': return { loggedIn: false, profile: null }
    case 'SET_TEST_USER': return { loggedIn: true, profile: action.payload }
  }
}

export function login(profile) {
  loginStore.dispatch({ type: 'LOGGED_IN', payload: { ...profile, userType: 'doc' } });
}

export function logout() {
  httpClient.post('/auth/logout').then(data => console.log('loggedout from server', data))
    .catch(e => console.log('already logged out'));
  loginStore.dispatch({ type: 'LOGGED_OUT', payload: { userType: 'doc' } });
}

export function redirectLogout() {
  loginStore.dispatch({ type: 'LOGGED_OUT', payload: { userType: 'doc' } });
}


export const useSelector = (selector) => {
  const latestStoreState = useRef()
  const latestSelectedState = useRef()
  const { store } = useContext(ReactReduxContext)
  let selectedState;
  // const selectedState = useSelectorWithStoreAndSubscription(
  //   selector,
  //   isEqual,
  //   store,
  //   ReactReduxContext
  // );
  // useDebugValue(selectedState)
  const [, forceRender] = useReducer((s) => s + 1, 0)
  useLayoutEffect(() => {
    latestSelectedState.current = selector(store.getState());
    latestStoreState.current = store.getState();
  });
  useLayoutEffect(() => {
    store.subscribe(() => {

      if (store.getState() === latestStoreState.current) {
        return;
      }

      selectedState = selector(store.getState())
      if (isEqual(selectedState, latestSelectedState.current)) {
        return;
      }
      latestSelectedState.current = selectedState
      latestStoreState.current = store.getState();
      forceRender();

    });
  }, [store])
  return latestSelectedState.current;
  // if (store.getState()) return selector(store.getState());
}



// // bad idea since it calls render object comparison does not work
// export const useSelector2 = (selector) => {
//   const subscription = useMemo(() => ({
//     getCurrentValue: () => selector(loginStore.getState()),
//     subscribe: callback => {
//       const subscription = loginStore.subscribe(callback);
//       return () => subscription.unsubscribe();
//     }
//   }), [loginStore]);
//   console.log('new subscription')
//   const val = useSubscription(subscription);
//   // const value = selector(val)
//   return val;
// };