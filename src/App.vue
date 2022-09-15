<template>
     <!-- <router-view/> -->
    <baidu-map></baidu-map>
</template>

<script>
// import NewsList from './components/NewsList';
import BaiduMap from './components/BaiduMap';
export default {
  name: 'App',
  components:{
    BaiduMap
  },
  data() {
    return {
    }
  },
  methods:{

  }
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
}
</style>
