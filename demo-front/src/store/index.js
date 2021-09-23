import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import {text} from './module/getApi/text.js'
import {home} from './module/getApi/home.js'
export default new Vuex.Store({
  state: {
    memory_rate:'',
    gpu_rate:'',
    meme_used_rate:'',
  },
  mutations: {
  },
  actions: {
  
  },
  modules: {
    home,
    text,
  }
})
