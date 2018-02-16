const Waveform = function (selector) {
  this.canvas = document.querySelector(selector)
  this.canvas.width = document.body.clientWidth * window.devicePixelRatio
  this.canvas.height = document.body.clientHeight * window.devicePixelRatio
  this.context = this.canvas.getContext('2d')
  this.context.strokeStyle = '#34495e'
}

Waveform.prototype.update = function (data) {
  const slice = this.canvas.width / (data.length - 1)
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  this.context.beginPath()
  data.reduce((function (x, value, index) {
    const y = (0.5 + value / 16384) * this.canvas.height
    if (index > 0) {
      this.context.lineTo(x, y)
    } else {
      this.context.moveTo(x, y)
    }
    return x + slice
  }).bind(this), 0)
  this.context.stroke()
}

// I don't know why android WebView can't get window width immediately
setTimeout(() => {
  const waveform = new Waveform('#canvas')
  window.document.addEventListener('message', function (event) {
    waveform.update(event.data.split(',').map(function (value) {
      return parseInt(value)
    }))
  })
}, 100)

document.ontouchmove = function (event) {
  event.preventDefault()
}
