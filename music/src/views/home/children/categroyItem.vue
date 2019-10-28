<template>
  <div class="categroy-item-box">
    <div class="categroy-item" 
    :data-categroy="categroyItem.category" 
    :class="{odd: isOdd, even: isEven}"
   
    >
      {{categroyItem.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'categroyItem',
  props: {
    categroyItem: {
      type: Object,
      default(){
        return {}
      }
    },
    itemIndex: {
      type:Number
    }
  },
  computed: {
    isOdd(){
      return this.itemIndex%2 == 0? false : true
    },
    isEven(){
      return this.itemIndex%2 == 0? true : false
    }
  }
}
</script>

<style scoped>
  .categroy-item-box{
    width: 90px;
    height:90px;
   
    margin-top: 10px;

    
  }

  .categroy-item{
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .odd{
    background: #000000;
    color: #ffffff;
  }

  .even{
    background: #ffffff;
    color: #000000;
  }

  

  
</style>