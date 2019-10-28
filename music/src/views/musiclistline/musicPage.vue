<template>
  <div class="music-page">
    <nav-bar bg-color="#97beff" >
      <div slot="left" class="nav-left" @click="backHomeClick">
        <img src="~assets/image/nav/返回.svg" alt="">
      </div>
      <div slot="center" class="nav-center">{{title}}</div>
    </nav-bar>
    <scroll class="content">
      <music-list-line :data-arr="dataArr">
        <!-- <music-list-line-item :dataObj="item" :currentIndex="index"></music-list-line-item> -->
      </music-list-line>
    </scroll>
    <!-- <music-control></music-control> -->
  </div>
</template>

<script>
  import navBar from 'components/common/nav/navBar'
  import Scroll from 'components/common/scroll/scroll'
  // import musicControl from 'components/business/musicControl'

  import musicListLine from './musicListLine'
  import musicListLineItem from './musicListLineItem'

  

  import {getPlaylistDetail} from 'network/musicPage.js'

  export default {
    name: 'musicPage',
    components: {
      navBar,
      Scroll,
      // musicControl,
      musicListLine,
      musicListLineItem
    },
    data(){
      return {
        id: null,
        title: '歌单详情',
        dataArr: [],
        idArr: []
      }
    },
    created(){
      this.id = this.$route.params.id;
      this.$toast.show('正在请求数据')
      this.methodGetPlaylistDetail();
    },
    methods: {

      //网络请求
      methodGetPlaylistDetail(){
        getPlaylistDetail(this.id).then((res) => {

           
          this.dataArr = res.playlist.tracks;

          if(this.$store.state.musicList){
            this.$delete(this.$store.state,this.$store.state.musicList);
            this.$set(this.$store.state,'musicList',[]);
          }
          
          for(let i = 0; i<res.playlist.tracks.length; ++i){
            this.$store.commit('changeMusicList', res.playlist.tracks[i].id)
          }
          
        }).catch((err) => {
          this.$toast.show('数据请求失败！')
        });
      },

      backHomeClick(){
        this.$router.back();
        
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

  .music-page{
    position: relative;
  }

  .nav-left{
    width: 24px;
    height: 24px;
    margin-left: 6px;
  }

  .nav-left img{
    width: 100%;
  }

  .nav-center{
    margin-left: 100px;
  }

  .content{
    height: calc(100vh - 44px);
    overflow: hidden;
  }
</style>