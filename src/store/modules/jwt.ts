import { IData, IStore } from './interface';
import {useFetch} from '../hook/useFetch';
import { ActionContext } from 'vuex';

const {load, error, FetchData} = useFetch('POST');

const state:IStore = {

  check: false,
  user: '',
  load: false,
  error: null,
  type: '',
  token: null,

}

const getters = {

  loginToken({ token } : { token: string }) {

    return token

  },

}

const mutations = {

  loginToken(state: IStore, data: IData) {

    if(data.access && data.user && data.type) {

      state.type = data.type
      state.load = true
      state.user = data.user
      state.token = data.access

    } else {

      state.load = true
      state.token = null

    }

    state.check = true

  },

  deleteToken(state: IStore){
    
    state.type = ''
    state.load = true
    state.user = ''
    state.token = null
    state.check = false
  }

}

const actions = {

  checkLogin(context: ActionContext<string, IStore>) {

    return FetchData('http://localhost:3000/refresh')
    .then((data) => {
        context.commit('loginToken', data)
    })

  },

  deleteToken(context: ActionContext<string, IStore>) {
    context.commit('deleteToken')
  }

}

export default { state, getters, mutations, actions }
