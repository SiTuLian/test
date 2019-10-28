<template>
  <div class="side-bar">
    <div class="side-left">
      <div>
        <ul v-for="item in arr" :key="item">
          <li>{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="side-right">

    </div>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data(){
    return {
      arr: ['基础设置', '高级设置', '桌面歌词', 'VIP', '背景设置', '关闭']
    }
  }
}
</script>

<style scoped>
  .side-bar{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0;

    left: 0px;
    display: flex;
  }

  .side-left{
    width: 60vw;
    height: 100%;
    background: #000000;
    color: #ffffff;
  }

  .side-left div{
    margin-top: 100px;
  }

  .side-left li{
    text-align: center;
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
  }

  .side-right{
    width: 40vw;
    height: 100%;
    background: transparent;
  }
</style>