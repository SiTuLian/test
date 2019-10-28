<template>
  <div id="app" @click="hideSideBar">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <transition name="fade">
      <router-view name="sideBar" v-show="isShow" ></router-view>
    </transition>
    <vaudio></vaudio>
    <!-- <audio :src="musicUrl" autoplay></audio> -->
  </div>
</template>

<script>
  import vaudio from './components/business/vaudio'

export default {
  name: 'app',
  data(){
    return {
      isShow: false
    }
  },
  components: {
    vaudio
  },
  mounted(){
    this.$bus.$on('showSideBar', () =>{
      this.isShow = true;
      
    })

    // this.$bus.$on('sendUrl', (url) => {
    //   this.musicUrl = url;
    //   // this.$stort.commit()
    // })
  },
  methods: {
    hideSideBar(event){
      const domClass = event.target.className;
      
      if(domClass == 'side-right'){
        this.isShow = false;
      }
      
    }
  }
}
</script>

<style lang="less">
#app {

   @import url('assets/CSS/base.css'); 
   
  position: relative;
 

  .fade-enter-active, .fade-leave-active {
    transition: left 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    left: -200px;
  }
}
</style>
