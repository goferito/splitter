/** @jsx React.DOM */
var React = require('react')

var Splittable = require('./Splittable')


var $body = document.querySelector("body > #main")

React.render(<Splittable />, $body);
