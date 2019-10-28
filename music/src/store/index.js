import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    url: null,
    startTime: '00:00',
    endTime: '00:00',
    activeTime: '00:00',
    _isPlay: true,
    _isLike: false,
    musicList: [],
    currentId: ''
    
  },
  mutations: {
    change_isPlay(state, bool){
      state._isPlay = bool;
      
    },
    changeUrl(state,src){
      state.url = src;
    },
    changeEndTime(state,time){
      state.endTime = time;
    },
    changestartTime(state,time){
      state.startTime = time;
    },
    changeMusicList(state,item){

      state.musicList.push(item)
    },
    changeCurrentId(state,id){
      state.currentId = id;
    }

  },
  actions: { /*异步操作*/ },
  getters: { /*相当于计算属性，获取state进行加工 */},
  modules: { /*在这里可以继续创建state*/ }
})

export default store