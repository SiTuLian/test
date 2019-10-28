<template>
  <div class="vue-input-box">
    <input class="vue-input" type="text" :placeholder="message" 
      @focus="inputFocus"
      @blur="inputBlur"
      v-model="inputMessage"
      >
    <img class="input-img"  src="~assets/image/nav/搜索.svg" alt="搜索.svg" 
      :class="{transitionStart: isTransitionStart, transitionEnd: isTransitionEnd}">
  </div>
</template>

<script>
  export default {
    name: 'vueInput',
    props: {
      message: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        isTransitionStart: true,
        isTransitionEnd: false,
        inputMessage: ''
      }
    },
    methods: {
      inputFocus(){
        this.isTransitionStart = false;
        this.isTransitionEnd = true;
        this.$emit('showMessage')
      },
      inputBlur(){
        this.isTransitionStart = true;
        this.isTransitionEnd = false;
        this.inputMessage = '';
        this.$emit('hideMessage');
      }
    }
  }
</script>

<style scoped>
  .vue-input-box{
   
    height: 100%;

    display: flex;
    align-items: center;
    position: relative;
  
  }

  .vue-input-box img{
    height: 70%;
    position: absolute;
    
    
  }

  .vue-input{
    background: transparent;
    border: 1px solid #ffffff;
    height: 80%;
    width: 260px;
    border-radius: 8px;
    box-sizing: border-box;
    padding-left: 10px;
    caret-color: #ffffff;
  }

  .transitionStart{
    left: 50%;
  }

  .transitionEnd{
    left: 88%;
  }

  .input-img{
     transition: left 1s;
  }

</style>