var Waveform = function (selector) {
  this.canvas = document.querySelector(selector)
  this.canvas.width = document.body.clientWidth * 2
  this.canvas.height = document.body.clientHeight * 2
  this.context = this.canvas.getContext('2d')
  this.context.strokeStyle = '#34495e'
}

Waveform.prototype.update = function (data) {
  var slice = this.canvas.width / (data.length - 1)
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  this.context.beginPath()
  data.reduce((function (x, value, index) {
    var y = (0.5 + value / 128 / 8) * this.canvas.height
    if(index > 0) {
      this.context.lineTo(x, y)
    } else {
      this.context.moveTo(x, y)
    }
    return x + slice
  }).bind(this), 0)
  this.context.stroke()
}

var waveform = new Waveform('#canvas')
window.document.addEventListener('message', function (event) {
  waveform.update(event.data.split(',').map(function (value) {
    return parseInt(value)
  }))
})
