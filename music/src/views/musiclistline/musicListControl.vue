<template>
  <div class="music-list-control" >
    <div class="play" @click="playClick(currentIndex)">
      <img v-if="isPlay" src="~assets/image/musicpage/play.png" alt="">
      <img v-else src="~assets/image/musicpage/stop.png" alt="">
    </div>
    <div class="like"  @click="likeClick">
      <img v-if="isLike" src="~assets/image/musicpage/like.png" alt="">
      <img v-else src="~assets/image/musicpage/like-active.png" alt="">
    </div>
  </div>
</template>

<script>
  let num = 0;
export default {
  name: 'musicListControl',
  props: {
    currentIndex: {
      type: Number
    }
  },
  data(){
    return {
      isPlay: true,
      isLike: true,
    }
  },
  methods: {
    playClick(index){
      this.isPlay = !this.isPlay
      
      let audio = this.$store.state.audio;
      if(this.isPlay){
        audio.pause()
      }else{
        audio.play()
      }
      this.$store.commit('change_isPlay', this.isPlay)

    // console.log(this.$store.state.audio);
    
      //  this.$store.state.audio.play();
      // if(!this.isPlay){
      //  
      // }else{
      //   this.$store.state.audio.pause();
      // }
      
      this.$emit('playClick', index)
    },
    likeClick(){
      this.isLike = !this.isLike
    }
  }
}
</script>

<style scoped>
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