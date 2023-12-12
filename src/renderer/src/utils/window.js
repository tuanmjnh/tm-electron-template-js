export const setWindowSize = (element = 'app', fixWidth = 17, fixHeight = 16) => {
  var el = document.querySelector(element)
  el.style.width = `${window.innerWidth - fixWidth}px`
  el.style.height = `${window.innerHeight - fixHeight}px`
}
