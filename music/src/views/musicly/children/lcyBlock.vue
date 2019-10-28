<template>
  <div class="lcy-block">
    <div class="inner-block">
      <ul v-for="(item, index) in arr" :key="index">
        <li :data-music-time="item.time" :class="{active: lightIndex == index}">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lcyBlock',
  props: {
    arr: {
      type: Array,
      default: ''
    }
  },
  data(){
    return {
      lycArr: [],
      lightIndex: -1
    }
  },
  mounted(){
    let audio = this.$store.state.audio;
    let inner_block = document.querySelector('.inner-block');

    this.$bus.$on('nextClick', ()=>{
      this.$store.commit('changestartTime','00:00')
      this.lightIndex = -1;
      inner_block.style.top = 100 + 'px'
      this.$store.commit('change_isPlay', true)
    })
    
    this.$bus.$on('moveBlock', (num)=>{
      let sumTimeArr = this.$store.state.startTime.split(':');
      let sumTime = Number(sumTimeArr[0]) * 60 + Number(sumTimeArr[1]);
      let top = inner_block.offsetTop

      if(num == 0){
        this.$store.commit('changestartTime','00:00')
        this.lightIndex = -1;
        inner_block.style.top = 100 + 'px'
      }

      if(this.lightIndex >=this.arr.length-1){
        this.lightIndex = this.arr.length - 1;
        return ;
      }

     if(sumTime>=this.arr[this.lightIndex+1].time){
       
        this.lightIndex = this.lightIndex+1;
        inner_block.style.top = (top - 30) + 'px';
      }

      
      
    })

    


    
  }

}
</script>

<style scoped>
  .lcy-block{
    height: 300px;
    margin-top: 50px;
    position: relative;
    overflow: hidden;

    font-size: 14px;
  }

  .inner-block{
    width: 100%;
    position: absolute;
    top: 100px;

    transition: top .3s
  }

  .lcy-block li{
    height: 20px;
    width: 100%;
    text-align: center;
    line-height: 20px;
    margin-top: 10px;
  }

  .active{
    color: yellow;
  }
</style>