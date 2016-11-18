import '../css/common.scss'
import '../css/mobile.css'
//import $ from 'jquery'
import moment from 'moment'

$(function(){
  let app = document.createElement('div')
  app.innerHTML = '<h1>hello：another mobile page</h1>'
  document.body.appendChild(app)
  $('body').append('<p>look at me! now is '+moment().format()+'</p>')
})
