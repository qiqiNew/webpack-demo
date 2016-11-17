// CommonJS 风格
function generateText() {
  var ele = document.createElement('h2')
  ele.innerHTML = 'hi'
  return ele
}
module.exports = generateText
