<template>
  <main class="main-box" :style="marginLeftStyle" 
    @touchstart="touchStart" 
    @touchmove='touchMove' 
    @touchend='touchEnd'
  >
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'mainBox',
  props: {
    margin_left: {
      type: Number,
      default: 0
    }
  },
  computed: {
    marginLeftStyle(){
      return {marginLeft: this.margin_left+'%'};
    }
  },
  methods: {
    touchStart(event){
      this.startX = event.touches[0].pageX;
      
    },
    touchMove(event){
      this.currentX = event.touches[0].pageX;
      this.distanceX = this.currentX - this.startX
      this.abs = Math.abs(this.distanceX)

    },
    touchEnd(event){
      
      
      if(this.abs>100){
        if(this.distanceX<0){
          //0 => 向左移动
          this.$emit('mainMove', 0)
        }else{
          //1 => 向右移动
          this.$emit('mainMove', 1)
        
        }
      }
      
    }
  }
  
}
</script>

<style scoped>
  .main-box{
    display: flex;
    overflow: hidden;
    transition: margin-left 0.3s
  }
</style>