<template>
  <div class="music-list-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'musicListBox'
}
</script>

<style scoped>
  .music-list-box{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
       
  }
</style>