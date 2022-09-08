import { IAdminData, IData, IStore, IUserData } from './interface';
import {useFetch} from '../hook/useFetch';
import { ActionContext } from 'vuex';

const {FetchData} = useFetch('POST');

const state:IStore = {
  type: '',
  user: '',
  load: false,
  token: null,
  error: null,
  check: false,
  adminError: null,
  userError: null,
}

const getters = {

  loginToken({ token } : { token: string }) {

    return token

  },

}

const mutations = {

  loginToken(state: IStore, data: IData) {
    if(data?.access && data?.user && data?.type) {
      state.error = ''
      state.userError = ''
      state.adminError = ''
      state.type = data.type
      state.load = true
      state.user = data.user
      state.token = data.access
    } else {
      state.load = true
      state.token = null
      if(data.message && data.type === 'user')
        state.userError = data.message; 
      if(data.message && data.type === 'admin')
        state.adminError = data.message
      else
        state.error = data.message     
    }
    state.check = true
  },
  deleteToken(state: IStore){
    state.type = ''
    state.load = false
    state.user = ''
    state.token = null
    state.check = false
  },
  deleteError(state: IStore){
    state.error = ''
    state.userError = ''
    state.adminError = ''
  },
}

const actions = {
  checkLogin(context: ActionContext<string, IStore>) {
    return FetchData('http://localhost:3000/refresh')
    .then((data) => context.commit('loginToken', data))

  },
  deleteToken(context: ActionContext<string, IStore>) {
    context.commit('deleteToken')
  },
  loginInUser(context: ActionContext<string, IStore>, userData: IUserData){
    context.commit('deleteError')
    FetchData('http://localhost:3000/loginuser', userData)
    .then((data) => context.commit('loginToken', data))
  },
  loginInAdmin(context: ActionContext<string, IStore>, adminData: IAdminData){
    context.commit('deleteError')
    FetchData('http://localhost:3000/loginadmin', adminData)
    .then((data) => context.commit('loginToken', data))
  },
  lagoutInSession(context: ActionContext<string, IStore>){
    FetchData('http://localhost:3000/lagout')
    .then(() => context.commit('deleteToken'))
  }

}

export default { state, getters, mutations, actions }
