import {ScanRadarLayer} from './ScanRadarLayer'
// eslint-disable-next-line no-undef
export class ComplexCustomOverlay extends BMap.Overlay {
    constructor(point, bMap) {
      super();
      this.point = point;
      this.bMap = bMap;
    }

    initialize(map) {
      this._map = map;
      this._scanRadarLayer1 = new ScanRadarLayer(
        {
            opacity: 70,
            datatime: this.datatime,
            degree: this.degree,
        },
        this.bMap
    )
    console.log(this._scanRadarLayer1,'this._scanRadarLayer1')
      let div = this._div = this._scanRadarLayer1.frame()
      console.log(div, 'div')
      this.bMap.getPanes().labelPane.appendChild(div)
      this._div = div;
      return div;
    }

    draw() {

    }
  }
