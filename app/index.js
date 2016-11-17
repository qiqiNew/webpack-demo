// var sub = require('./sub')
// var $ = require('jquery')
// var moment = require('moment')

// require('./main.css')
// require('./main.scss')

import './main.scss'
import './main.css'
import $ from 'jquery'
import moment from 'moment'
import sub from './sub'

var app = document.createElement('div')
app.innerHTML = '<h1>Hello World</h1>'
app.appendChild(sub())
document.body.appendChild(app)

$('body').append('<p>look at me! now is '+moment().format()+'</p>')
