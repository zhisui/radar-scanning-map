import { ScanRadarLayer } from './ScanRadarLayer'
// eslint-disable-next-line no-undef
export class ScanRadarOverlay  {
	_isVisible = false
	_valueByRealDistance
	constructor(x, y, datatime, degree, bMap) {
		this.x = x
		this.y = y
		this.datatime = datatime
		this.degree = degree
		this.bMap = bMap
	}

	init() {
		this._scanRadarLayer1 = new ScanRadarLayer(
			{
				opacity: 70,
				datatime: this.datatime,
				degree: this.degree,
			},
			this.bMap
		)

		function ComplexCustomOverlay(point) {
			this._point = point
		}
// eslint-disable-next-line no-undef
		ComplexCustomOverlay.prototype = new BMap.Overlay()
		ComplexCustomOverlay.prototype.initialize = function(map) {
			this._map = map
			var div = (this._div = this._scanRadarLayer1.frame())
			this._bMap.getPanes().labelPane.appendChild(div)
			return div
		}
		ComplexCustomOverlay.prototype.draw = function() {}
		this._myCompOverlay = new ComplexCustomOverlay(
      // eslint-disable-next-line no-undef
			new BMap.Point(this.x, this.y)
		)
		//myCompOverlay.pointType="radar";
		console.log(this._myCompOverlay, 111111)
		this.bMap.addOverlay(this._myCompOverlay)

		this.bMap.addEventListener('zoomstart', function() {})
		this.bMap.addEventListener('zoomend', function() {
			this._valueByRealDistance = this.GetPiexValueByRealDistance(5000)
			this._overlayDraw()
			this._reDrawScan()
		})
	}

	_overlayDraw() {
		if (this._isVisible) {
			let map = this._myCompOverlay._map
			var pixel = map.pointToOverlayPixel(this._myCompOverlay._point)
			this._myCompOverlay._div.style.left =
				pixel.x - this._valueByRealDistance + 'px'
			this._myCompOverlay._div.style.top =
				pixel.y - this._valueByRealDistance + 'px'
		}
	}

	_reDrawScan() {
		if (this._isVisible) {
			let scanFm = this.scanRadarLayer1.frame()
			if (null == this._valueByRealDistance) {
				scanFm.style.display = 'none'
				return
			} else {
				scanFm.style.display = ''
			}
			this._scanRadarLayer1.setRadius(this._valueByRealDistance)
			this._scanRadarLayer1.frame().style.filter =
				'blur(' + this._valueByRealDistance / 1000 + 'px)'
        // eslint-disable-next-line no-undef
			$(this._scanRadarLayer1.frame())
				.find('div')
				.remove()
			if (this._bMap.getZoom() == 13 && this._datatime) {
				const startTime = this._datatime.split('~')[0]
				const endTime = this._datatime.split('~')[1]
				var html =
					"<div style='margin-left:48px;background-color:#000000;color:white;width:62%;border-radius:5px;font-size:12px;padding:7px;' class='raderTime'><div>始:" +
					startTime +
					'</div><div>止:' +
					endTime +
					'</div></div>'
          // eslint-disable-next-line no-undef
				$(this._scanRadarLayer1.frame()).append(html)
			}
			this._scanRadarLayer1.draw()
		}
	}
	_GetPiexValueByRealDistance(realDistance) {
		const pointA = this.bMap.getCenter()
		const pointAPixel = this.bMap.pointToOverlayPixel(pointA)
    // eslint-disable-next-line no-undef
		const pointB = new BMap.Point(pointA.lng, pointA.lat + 10)
		const pointBPixel = this.bMap.pointToOverlayPixel(pointB)

		const piexlDistanceBetween2Points = Math.abs(
			pointBPixel.y - pointAPixel.y
		)
		if (piexlDistanceBetween2Points <= 1) {
			return null
		}
		const realDistanceBetween2Points = this.bMap.getDistance(pointA, pointB)
		const cp = realDistanceBetween2Points / piexlDistanceBetween2Points
		const pixelDistance = realDistance / cp
		return pixelDistance
	}

	show() {
		//$(".raderTime").remove();
		this._isVisible = true
		this._scanRadarLayer1.frame().style.display = ''
		this._valueByRealDistance = this._GetPiexValueByRealDistance(5000)
		this._overlayDraw()
		this._reDrawScan()
	}
	hide() {
		this._isVisible = false
		this._scanRadarLayer1.frame().style.display = 'none'
	}
	remove() {
		this._isVisible = false
		this._bMap.removeOverlay(this._myCompOverlay)
	}
	setData(data) {
		this._scanRadarLayer1.setData(data)
	}
	reColor() {
		this._scanRadarLayer1.reColor()
	}
	setOpacity(opacity) {
		this._scanRadarLayer1.setOpacity(opacity)
	}
}
