<template>
  <div class="v-audio">
    <audio id="audio" :src="$store.state.url" @timeupdate="timeDate" @canplay="musicPlay"></audio>
  </div>
</template>

<script>
export default {
  name: 'vaudio',
  data(){
    return {
      dom: null
    }
  },
  mounted(){
    this.dom = document.querySelector('#audio');
    this.$set(this.$store.state,'audio',this.dom);
    
  },
  methods: {
    chuliTime(time){
      let min = parseInt(time/60);
      let sec =  time%60;
      if(min<10){
        min = '0'+min
      }
      if(sec<10){
        sec = '0'+sec
      }
      let sumTimeStr = `${min}:${sec}`

      return sumTimeStr;
    },
    musicPlay(){
      let sumTime = parseInt(audio.duration);
      let time =  this.chuliTime(sumTime)
      this.$store.commit('changeEndTime',time)

      this.$bus.$emit('getEndTime');
    },
    timeDate(){
      let audio = this.$store.state.audio;

      let sumTime = parseInt(audio.currentTime);
      let time = this.chuliTime(sumTime)
      this.$store.commit('changestartTime',time)


      if(this.$store.state.startTime >= this.$store.state.endTime ){
        this.$store.commit('change_isPlay', true)
        this.$bus.$emit('proTo',0);
        this.$bus.$emit('moveBlock',0);
      }else{
        this.$bus.$emit('proTo',1);
        this.$bus.$emit('moveBlock',1);
      }
    }
  }
}
</script>

<style scoped>

</style>