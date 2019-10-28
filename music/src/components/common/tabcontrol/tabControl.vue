<template>
  <div class="tab-control" :style="bgColorStyle">
    <slot></slot>
    <slot name="line"></slot>
  </div>
</template>

<script>
  export default {
    name: 'tabControl',
    props: {
      bgColor: {
        type: Array,
        default(){
          return []
        }
      }
    },
    computed: {
      bgColorStyle(){
        return {background: `rgba(${this.bgColor[0]}, ${this.bgColor[1]}, ${this.bgColor[2]}, ${this.bgColor[3]})`}
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    height: 36px;
    line-height: 36px;
    text-align: center;
    position: relative;
  }
</style>