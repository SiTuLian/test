<template>
  <div class="music-list-line-item" >
    <div class="img-box">
      <img :src="dataObj.al.picUrl" alt="">
    </div>
    <div class="music-name" >
      {{dataObj.al.name}}
    </div>
    <div class="music-list-control" >
      <div class="play" @click="playClick">
        <img v-if="isPlay" src="~assets/image/musicpage/play.png" alt="">
        <img v-else src="~assets/image/musicpage/stop.png" alt="">
      </div>
      <div class="like"  @click="likeClick">
        <img v-if="isLike" src="~assets/image/musicpage/like.png" alt="">
        <img v-else src="~assets/image/musicpage/like-active.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  // import musicListControl from './musicListControl'
  export default {
    name: 'musicListLineItem',
    // components: {
    //   musicListControl
    // },
    props: {
      dataObj: {
        type: Object,
        default(){
          return {}
        }
      },
      index: {
        type: Number
      }

    },
    data(){
      return {
        id: this.dataObj.al.id,
        isPlay: this.index,
        isLike: this.index
      }
    },
    methods: {
      playClick(){
        this.isPlay = !this.isPlay
      },
      likeClick(){
        this.isLike = !this.isLike
      }
    }

  }
</script>

<style scoped>

  .music-list-line-item{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .img-box{
    height: 40px;
    width: 40px;
  }

  .img-box img{
    width: 100%;
  }

  .music-name{
    height: 40px;
    width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    line-height: 40px;

    font-size: 14px;
  }

.music-list-control{
    height: 40px;
    width: 80px;

    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .play, .like{
    height: 30px;
    width: 30px;
  }
  .play img, .like img{
    width: 100%;
  }
  
</style>