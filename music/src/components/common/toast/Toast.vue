<template>
  <div id="toast" class="position black-theme" v-show="isShow" >
    <div>{{message}}</div>
  </div>
</template>

<script>

export default {
  name: 'Toast',
  data(){
    return {
      message: '',
      isShow: false,
      time: null
    }
  },
  methods: {
    show(message, duration=3000){

      this.isShow = true;
      this.message = message;

      if(this.time){
        clearTimeout(this.time);
        this.time = null;
      }
      this.time = setTimeout(()=>{
        this.isShow = false;
        this.message = ''
      }, duration)

    }
  }
}
</script>

<style scoped>
  #toast{
    
    border-radius: 4px;
    padding: 4px 8px;
    text-align: center;
    font-size: 14px;
       
  }

  .black-theme{
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
  }
 
  .position{
    position: absolute;
    left: 10%;
    right: 10%;
    top: 80%;
    z-index: 999;
  }
</style>