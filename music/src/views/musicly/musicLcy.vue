<template>
  <div class="music-lcy">
    <nav-bar bg-color="#97beff" >
      <div slot="left" class="nav-left" @click="backHomeClick">
        <img src="~assets/image/nav/返回.svg" alt="">
      </div>
    </nav-bar>
    <lcy-block :arr="lycArr"></lcy-block>
    <music-pro ></music-pro>
    <music-lyc-concrol @getNextURL="getNextURL"></music-lyc-concrol>
  </div>
</template>

<script>
  import navBar from 'components/common/nav/navBar'
  import lcyBlock from './children/lcyBlock'
  import musicPro from './children/musicPro'
  import musicLycConcrol from './children/musicLycConcrol'

  import {getMusicLyc} from 'network/musicPage'
  import {getMusicUrl} from 'network/musicPage'
  

  export default {
    name: 'musicLcy',
    components: {
      navBar,
      lcyBlock,
      musicPro,
      musicLycConcrol
    },
    data(){
      return {
        id: null,
        lycArr: [],
      }
    },
    created(){
      this.id = this.$route.params.id;

      this.$toast.show('正在请求数据！请耐心等待')
      this.MgetMusicUrl(this.id)
      this.MgetMusicLyc(this.id);
      
      
      if(this.$store.state._isPlay != true){
        this.$store.commit('change_isPlay',true)
      }
      
    },
    methods: {
      backHomeClick(){
        this.$router.back();
      },
      getNextURL(nextID){

        console.log(nextID)
        this.MgetMusicLyc(nextID)
        this.MgetMusicUrl(nextID)
      },
      MgetMusicLyc(id){

        if(this.lycArr){
          this.lycArr = [];
        }

        getMusicLyc(id).then((res) => {
          
          
          let strArr = res.lrc.lyric.split(/[\n\r]+/);
          for(let item of strArr){
            if(item == ''){
              continue;
            }
            let lrc = item.split(']');
            let obj = {};
            obj.text = lrc[1];
            let time = lrc[0].slice(1).split(':');
            obj.time = Number(time[0]) * 60 + Number(time[1]);
            this.lycArr.push(obj)
        }


          
        }).catch((err) => {
          this.$toast.show('正在请求失败！')
          console.log(err)
        });
      },
      MgetMusicUrl(id){
        getMusicUrl(id).then((res) => {
         
          this.$store.commit('changeCurrentId', id)
          this.$store.commit('changeUrl', res.data[0].url)
          
        }).catch((err) => {
          
        });   
      }
    },
    //组件内的路由守卫，离开路由是，销毁该组件
    beforeRouteLeave (to, from , next) {
      this.$destroy(this.$options.name) 
      next()
    }
  }
</script>

<style scoped>

  .music-lcy{
    height: 100vh;
    background-image: url('~assets/image/bg/bg.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  .nav-left{
    width: 24px;
    height: 24px;
    margin-left: 6px;
  }

  .nav-left img{
    width: 100%;
  }

 
</style>