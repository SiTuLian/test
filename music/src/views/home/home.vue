<template>
  <div id="home">
    <home-nav></home-nav>
    <tab-control :bg-color="[151, 190, 255, 1]">
      <tab-control-item v-for="(item, index) in tabName" :key="index"
        :class="{active: index===currentIndex}"
        @tabControlClick="tabNameClick(index)"
      >
      {{item}}
      </tab-control-item>
    </tab-control>
    <main-box :margin_left="margin_left" 
      @mainMove="mainMove"
    >
      <home-main>
        <scroll class="content" ref="scrollA" @pullingUp="loadMore" :pull-up-load="true">
          <music-list-box>
            <music-item-box v-for="(item, index) in dataObj.dataArr" :key="index">
              <music-list-item :dataObj="item"></music-list-item>
            </music-item-box>
          </music-list-box>
        </scroll>
      </home-main>
      <home-main>
        <scroll class="content">
          <music-list-box>
            <categroy-item 
              v-for="(item,index) in categroyList" :key="index" 
              :categroyItem="item"
              :itemIndex="index"
              ></categroy-item>
          </music-list-box>
        </scroll>
      </home-main>
      <home-main>
        <scroll class="content">

        </scroll>
      </home-main>
    </main-box>

  </div>
</template>

<script>

  //公共组件
  import tabControl from 'components/common/tabcontrol/tabControl'
  import tabControlItem from 'components/common/tabcontrol/tabControlItem'
  import Scroll from 'components/common/scroll/scroll'

  //业务组件
  import homeNav from './children/homeNav'
  import mainBox from 'components/business/mainBox.vue'
  import homeMain from './children/homeMain'
  import musicListBox from 'components/business/musiclistbox/musicListBox'
  import musicItemBox from 'components/business/musiclistbox/musicItemBox'
  import musicListItem from 'components/business/musiclistbox/musicListItem'

  import categroyItem from './children/categroyItem'

  import {debounce} from 'publicJS/index.js'
  

  //网络请求
  import {getRecommendSongs, getCatlist} from 'network/home'

  export default {
    name: 'home',
    components: {
      
      tabControl,
      tabControlItem,
      Scroll,

      homeNav,
      mainBox,
      homeMain,
      musicListBox,
      musicItemBox,
      musicListItem,
      categroyItem
     
    },
    data(){
      return {
        tabName: ['推荐', '分类', '收藏'],
        positionLeft: 26,
        currentIndex: 0,
        margin_left: 0,

        //请求过来的数据
        dataObj: {
          dataArr: [],
          limit: 0
        },
       
        categroyList: []
      }
    },
    created(){
      this.$toast.show('正在请求数据！请耐心等待')
      this.methodGetRecommendSongs()
      this.methodGetCatlist();
    },
    mounted(){

      const refresh = debounce(this.$refs.scrollA.refresh, 100);

      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })

      
    },
    methods: {
      //网络请求
      methodGetRecommendSongs(){
        let before = this.dataObj.limit;
        let limit = this.dataObj.limit += 10;
        
        getRecommendSongs(limit).then((res) => {
          
          
          for(let i = before; i<res.result.length; ++i){
            this.dataObj.dataArr.push(res.result[i])
          }

          this.$refs.scrollA.finishPullUp();

        }).catch((err) => {
          console.log(err);
          this.$toast.show('对不起！数据请求失败！')
        });
      },
      methodGetCatlist(){
        getCatlist().then((res) => {
          this.categroyList = res.sub;
        }).catch((err) => {
          
        });
      },

      //事件监听
      tabNameClick(index){
        this.currentIndex = index;
        
        switch (index) {
          case 0:
            this.positionLeft = 26;
            this.margin_left = 0;
            break;
          case 1:
            this.positionLeft = 130;
            this.margin_left = -100;
            break;
          case 2:
            this.positionLeft = 238;
            this.margin_left = -200;
            break;
        }
        
      },
      loadMore(){
        this.methodGetRecommendSongs();
      
      },
      mainMove(flag){
        if(flag === 0 && this.currentIndex < this.tabName.length - 1){
          this.currentIndex++;
          this.tabNameClick(this.currentIndex)
        }
        if(flag === 1 && this.currentIndex > 0){
          this.currentIndex--;
          this.tabNameClick(this.currentIndex)
        }
      }
      
    }
  }
</script>

<style scoped>
  .active{
    color: #ffffff;
  }

  .content{
    height: calc(100vh - 80px);
    overflow: hidden;
  }
</style>