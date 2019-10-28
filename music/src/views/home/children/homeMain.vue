<template>
  <div class="home-main">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'homeMain'
  
}
</script>

<style scoped>
  .home-main{
    width: 100vw;
    flex-shrink: 0;
  }
</style>