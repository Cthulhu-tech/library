import { createStore } from 'vuex'

import jwt from "./modules/jwt";

export default createStore<any>({
  modules: {
    jwt
  }
})
