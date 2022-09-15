<template>
  <div ref="map" class="map">
  </div>
</template>

<script>
import {RadarOverlay} from './Radar';
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // eslint-disable-next-line no-undef
      const map = new BMap.Map(this.$refs.map);
      // eslint-disable-next-line no-undef
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
      // eslint-disable-next-line no-undef
      const point = new BMap.Point(116.404, 39.915);
      map.enableScrollWheelZoom(true);
// 添加自定义覆盖物
      const radar = new RadarOverlay(point, 40);
      map.addOverlay(radar);
    }
  }
}
</script>

<style lang="scss">
  .map {
    width: 100vw;
    height: 100vh;

  }

.radar-box {
  position: absolute;
.radar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: red;
  position: relative;
}

.radar .ripple {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid red;
  animation: ripple 2s linear infinite;
}

.radar :nth-child(1) {
  animation-delay: 0.666s;
}

.radar :nth-child(2) {
  animation-delay: 1.322s;
}

@keyframes ripple {
  to {
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}


}
</style>
