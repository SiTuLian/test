<template>
  <nav class="nav-bar" ref="nav" :class="{fhorizontal:flexHorizontal}" :style="{backgroundColor: bgColor}">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </nav>
</template>

<script>
export default {
  name: 'navBar',
  props: {
    flexHorizontal: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: "#ffffff"
    }
  },
  mounted(){
    this.$refs.nav.style.boxShadow = `0px 0px 3px ${this.bgColor}`;
  }

}
</script>

<style scoped>
  .nav-bar{
    height: 44px;
    
    display: flex;
    align-items: center;
  }

  .fhorizontal{
    justify-content: space-around;
  }

  
</style>