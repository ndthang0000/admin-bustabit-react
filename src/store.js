import { createStore } from 'redux'
import io from 'socket.io-client';
import DOMAIN from './domain';

const initialState = {
  sidebarShow: true,
  isAuthenticate: false,
  token: "",
  socket: null
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'login':
      const socket = io(DOMAIN, { query: `token=${rest.token}` })
      return { ...state, ...rest, socket }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
