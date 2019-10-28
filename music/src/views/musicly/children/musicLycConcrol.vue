<template>
  <div class="music-lyc-concrol">
    <div class="img-box">
      <img src="~assets/image/musicpage/2.png" alt="">
    </div>
    <div class="img-box" @click="lastClick">
      <img src="~assets/image/musicpage/prev.png" alt="">
    </div>
    <div class="img-box" @click="musicPlay">
      <img v-if="$store.state._isPlay" src="~assets/image/musicpage/play.png" alt="">
      <img v-else src="~assets/image/musicpage/stop.png" alt="">
    </div>
    <div class="img-box" @click="nextMusic">
      <img src="~assets/image/musicpage/next.png" alt="">
    </div>
    <div class="img-box">
      <img src="~assets/image/musicpage/like.png" alt="">
    </div>
  </div>
</template>

<script>
  
export default {
  name: 'musicLycConcrol',
  data(){
    return {
      ispaly: null,
      currentIndex: null,
      nextIndex: null,
      lastIndex: null
    }
  },
  methods: {
    musicPlay(){
      
      this.ispaly = this.$store.state._isPlay;
      if(this.ispaly){
        this.$store.commit('change_isPlay', false);
      }else{
        this.$store.commit('change_isPlay', true);
      }
      
      
      if(this.$store.state._isPlay){
        audio.pause();

        // this.$bus.$emit('proTo',0);
      }else{
        audio.play();
        
      }
      
    },
    chuliID(){
      for(let i = 0; i<this.$store.state.musicList.length; ++i){
        if(this.$store.state.currentId == this.$store.state.musicList[i]){
          this.currentIndex = i;
        }
      }

      if(this.currentIndex != this.$store.state.musicList.length-1){
          this.nextIndex = this.currentIndex + 1;
      }
      if(this.currentIndex != 0){
        this.lastIndex = this.currentIndex - 1;
      }
    },
    nextMusic(){
      
      this.chuliID();
     
      this.$emit('getNextURL',this.$store.state.musicList[this.nextIndex])
      this.$bus.$emit('nextClick')
    },
    lastClick(){
       this.chuliID();
       this.$emit('getNextURL',this.$store.state.musicList[this.lastIndex])
       this.$bus.$emit('nextClick')
    }
   
  },
  beforeRouteLeave (to, from , next) {
      this.$destroy(this.$options.name) 
      next()
    }
}
</script>

<style scoped>
  .music-lyc-concrol{
    height: 60px;
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .img-box{
    height: 20px;
    width: 20px;
    
  }

   .img-box img{
     width: 100%;
   }
</style>