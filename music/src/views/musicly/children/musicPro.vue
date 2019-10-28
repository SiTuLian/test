<template>
  <div class="music-pro" >
    <div class="time">
      <span>{{$store.state.startTime}}</span>
      <span>{{$store.state.endTime}}</span>
    </div>
    <div class="block">

    </div>
    <div class="music-inner-pro">

    </div>
  </div>
</template>

<script>
export default {
  name: 'musicPro',
  data(){
    return {
      sudu: 0
    }
  },
  mounted(){
    
    let audio = this.$store.state.audio;
    let block = document.querySelector('.block');
    let proWidth = document.querySelector('.music-pro').offsetWidth - block.offsetWidth;
    let proInnerWidth = document.querySelector('.music-inner-pro');

    this.$bus.$on('getEndTime', ()=>{
      let sumTimeArr1 = this.$store.state.endTime.split(':');
      let sumTime1 = (sumTimeArr1[0]*60-'0') + (sumTimeArr1[1]-'0')
      this.sudu = proWidth/sumTime1
    })
    
    
        
    this.$bus.$on('proTo',(num)=>{
      let sumTimeArr = this.$store.state.startTime.split(':');
      let sumTime = (sumTimeArr[0]*60-'0') +( sumTimeArr[1]-'0')

      block.style.left = (sumTime*this.sudu) + 'px';
      proInnerWidth.style.width = (sumTime*this.sudu) + 'px';

      if(num == 0){
        block.style.left = 0 + 'px';
        proInnerWidth.style.width = 0 + 'px';
      }
      
    })
  }
  
}
</script>

<style scoped>
  .music-pro{
    width: 275px;
    height: 5px;
    background: #cccccc;
    margin: 0px auto;
    margin-top: 50px;
    position: relative;
  }

  .block{
    height:10px;
    width: 10px;
    border-radius: 50%;
    position: absolute;
    left: 0px;
    top: -3px;

    background: red;

    transition: left .3s;
  }

  .music-inner-pro{
    width: 0px;
    height: 5px;
    background: rgb(71, 90, 255);

    transition: width .3s;
  }

  .time{
    width: 275px;
    height: 20px;
    position: absolute;
    top: -27px;
    display: flex;
    justify-content: space-between;
  }

  
</style>