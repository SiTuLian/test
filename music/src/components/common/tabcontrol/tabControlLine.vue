<template>
  <div class="tab-control-line" :style="positionLeftStyle"></div>
</template>

<script>
export default {
  name: 'tabControlLine',
  props: {
    positionLeft: {
      type: Number,
      default: 26
    }
  },
  computed: {
    positionLeftStyle(){
      return {left: this.positionLeft+'px'};
    }
  }

}
</script>

<style lang='less' scoped>
  .tab-control-line{
    position: absolute;
    height: 2px;
    width: 53px;
    background: rgb(255, 116, 116);
    bottom: 3px;
    transition: left 0.3s;
   
  }
</style>