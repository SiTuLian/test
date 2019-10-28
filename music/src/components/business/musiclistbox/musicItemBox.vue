<template>
  <div class="music-item-box">
    <slot></slot>
  </div>
</template>

<script>
  
export default {
  name: 'musicItemBox'
}
</script>

<style scoped>
  .music-item-box{
    width: 120px;
    margin-top: 10px;

  }
 
</style>