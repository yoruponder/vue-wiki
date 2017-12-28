import Vue from 'vue'
import Vuex from 'vuex'
import popbox from "./modules/popbox"
import shadow from "./modules/shadow"
import user from "./modules/user"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    popbox,
    shadow,
    user
  }
})