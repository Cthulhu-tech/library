import { IStore } from './modules/interface'
import { createStore } from 'vuex'
import jwt from "./modules/jwt"

interface Store {
  jwt: IStore
}

export default createStore<any>({
  modules: {
    jwt
  }
})
