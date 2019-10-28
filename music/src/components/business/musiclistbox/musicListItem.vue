<template>
  <div class="music-list-item" >
    <div ref="music_id" @click="categroyItem">
      <div class="img-box">
        <img :src="dataObj.picUrl" alt="" @load="itemImageLoad">
      </div>
      <div class="img-text">{{dataObj.name}}</div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'musicListItem',
  props: {
    dataObj: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    categroyItem(){
      //路由动态跳转
      this.$router.push('/music/' + this.dataObj.id);
    },
    itemImageLoad(){
      this.$bus.$emit('itemImageLoad');
    }
  }
}
</script>

<style scoped>
  

  .img-box img{
    width: 100%;
  }
</style>