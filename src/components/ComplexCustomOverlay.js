// eslint-disable-next-line no-undef
export class ComplexCustomOverlay extends BMap.Overlay {
    constructor(point, bMap,scanRadarLayer) {
      super();
      this.point = point;
      this.bMap = bMap;
      this.scanRadarLayer = scanRadarLayer
    }

    initialize(map) {
      this._map = map;
      let div = this._div = this.scanRadarLayer.init()
      this.bMap.getPanes().labelPane.appendChild(div)
      this._div = div;
      return div;
    }
    draw() {
    }
  }
