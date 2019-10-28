<template>
  <div class="tab-control-item" @click="tabControlClick">
     <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tabControlItem',
    methods: {
      tabControlClick(){
        this.$emit('tabControlClick')
      }
    }
  }
</script>

<style scoped>
  .tab-control-item{
  
    flex: 1;
  }
</style>