<template>
  <div class="home-nav">
      <nav-bar :flexHorizontal="true" bg-color="#97beff">
        <div slot="left" class="nav-left" @click="menuClick">
          <img class="nav-img" src="~assets/image/nav/菜单.svg" alt="菜单">
        </div>
        <div class="nav-center" slot="center">
          <vue-input 
            @showMessage="showMes" 
            @hideMessage="hideMes" 
            :message="mes"></vue-input>
        </div>
    </nav-bar>
  </div>
</template>

<script>
  import navBar from 'components/common/nav/navBar'
  import vueInput from './vueInput'
  

  export default {
    name: 'homeNav',
    components: {
      navBar,
      vueInput
    },
    data(){
      return {
        mes: ''
      }
    },
    methods: {
      showMes(){
        this.mes = '请输入歌曲名称'
      },
      hideMes(){
        this.mes = ''
      },
      menuClick(){
        this.$bus.$emit('showSideBar');
        
      }
    }
  }
</script>

<style scoped>
  .nav-left{
    width: 24px;
    height: 24px;
   
  }
  .nav-left img{
    width: 100%;

  }
  .nav-center{
    height: 80%;
    width: 260px;


  }
</style>