import Vue from 'vue'
import Vuex from 'vuex'
import popbox from "./modules/popbox"
import shadow from "./modules/shadow"

Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    popbox,
    shadow
  }
})