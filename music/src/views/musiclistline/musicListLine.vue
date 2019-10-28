<template>
  <div>
    <div class="music-list-line" v-for="(item, index) in dataArr" :key="index">
      <div class="music-list-line-item" @click="musicUrlClick(index)">
        <div class="img-box">
          <img :src="item.al.picUrl" alt="">
        </div>
        <div class="music-name" >
          {{item.name}}
        </div>
      </div>
      
    </div>
  </div>
  
</template>

<script>


export default {
  
  name: 'musicListLine',
  props: {
    dataArr: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      bool: false,
      prevbool: null,
      nextbool: null,
      prevIndex: null,
      nextIndex: null,
      prevObj: null,
      nextObj: null,
      tempObj: {}
      
    }
  },
  methods: {
    musicUrlClick(index){

      this.$router.push('/lcy/' + this.dataArr[index].id)
      
    }
  }
 
}
</script>

<style scoped>
  .music-list-line{
    height: 50px;
    background: rgba(151, 190, 255, .5);

   

  }

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
    width: 240px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    line-height: 40px;

    font-size: 14px;
  }


  
  
</style>