import simulate from './simulate.js'
import Vector from './Vector.js'
import {Random} from './config.js'

function inputShine(id, opt){

	var el = document.getElementById(id)
	var input = el;  // 目标dom
	input.setAttribute("shine", "shine");

	var opt = opt || {};

	var field = {}  // 显示范围
	var hasFocus = false;  // 是否是选中状态

	var caret = document.createElement('span');
	caret.style.cssText = document.defaultView.getComputedStyle(input, '').cssText;
	caret.style.position = 'absolute';
	caret.style.left = 0;
	caret.style.top = 0;
	caret.style.width = 'auto';
	caret.style.visibility = 'hidden';
	document.body.appendChild(caret);

	function reposition() {
		field = input.getBoundingClientRect();
	}
	window.onload = reposition;
	window.onresize = reposition;
	reposition();

	input.onfocus = function() {
		hasFocus = true
	}
	input.onblur = function() {
		hasFocus = false
	}

	function rain() {

	}

	// start particle simulation
	new simulate(
		input,
		caret,
		field,
		opt
	);
}

export default inputShine