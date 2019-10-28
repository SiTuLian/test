<template>
  <div class="music-control" @click="controlClick">
    <div class="img-box">
      <img :src="musicPicUrl" alt="">
    </div>
    <div class="music-name ">
      {{musicName}}
    </div>
    

  </div>
</template>

<script>

  import {getMusicUrl} from 'network/musicPage'


export default {
  name: 'musicControl',
  props: {
    dataObj: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      musicName: null,
      musicPicUrl: null,
      musicId: null
    }
  },
  
  mounted(){
    this.$bus.$on('sendMusic', (obj)=>{
      this.musicName = obj.name;
      this.musicPicUrl = obj.picUrl;
      this.musicId = obj.id;
      
      this.MgetMusicUrl(this.musicId)
    })
  },
  methods: {
    MgetMusicUrl(id){
      getMusicUrl(id).then((res) => {
        // this.musicUrl = res.data[0].url
        // console.log(res.data[0].url);
        this.$bus.$emit('sendUrl', res.data[0].url)

      }).catch((err) => {
        console.log(err)
      });
    },
    controlClick(){
      this.$router.push('/lcy/' + this.musicId)
    }
  }
  
}
</script>

<style scoped>
  .music-control{
    height: 49px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
    bottom: -48px;
    left: 0;
    right: 0;

    background: rgb(151, 190, 255);
  }

  
 
  .img-box{
    width: 40px;
    height: 40px;
  }

  .img-box img{
    width: 100%;

  }

  .music-name{
    width: 200px;
    height: 40px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    line-height: 40px;
  }

  
</style>