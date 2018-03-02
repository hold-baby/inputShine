(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.inputShine = factory());
}(this, (function () { 'use strict';

/**
 * Particle Class
 */
function Particle(id, group, position, velocity, size, life, behavior) {

	this._id = id || 'default';
	this._group = group || 'default';

	this._position = position || new Vector();
	this._velocity = velocity || new Vector();
	this._size = size || 1;
	this._life = Math.round(life || 0);

	this._behavior = behavior || [];
}

Particle.prototype = {
	get id() {
		return this._id;
	},
	get group() {
		return this._group;
	},
	get life() {
		return this._life;
	},
	get size() {
		return this._size;
	},
	set size(size) {
		this._size = size;
	},
	get position() {
		return this._position;
	},
	get velocity() {
		return this._velocity;
	},
	update: function (stage) {

		this._life++;

		var i = 0;
		var l = this._behavior.length;

		for (; i < l; i++) {
			this._behavior[i].call(stage, this);
		}
	},
	toString: function () {
		return 'Particle(' + this._id + ') ' + this._life + ' pos: ' + this._position + ' vec: ' + this._velocity;
	}
};

/**
 * 2D Vector Class
 */
function Vector$1(x, y) {
	this._x = x || 0;
	this._y = y || 0;
}

Vector$1.create = function (x, y) {
	return new Vector$1(x, y);
};

Vector$1.add = function (a, b) {
	return new Vector$1(a.x + b.x, a.y + b.y);
};

Vector$1.subtract = function (a, b) {
	return new Vector$1(a.x - b.x, a.y - b.y);
};

Vector$1.random = function (range) {
	var v = new Vector$1();
	v.randomize(range);
	return v;
};

Vector$1.distanceSquared = function (a, b) {
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	return dx * dx + dy * dy;
};

Vector$1.distance = function (a, b) {
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
};

Vector$1.prototype = {
	get x() {
		return this._x;
	},
	get y() {
		return this._y;
	},
	set x(value) {
		this._x = value;
	},
	set y(value) {
		this._y = value;
	},
	get magnitudeSquared() {
		return this._x * this._x + this._y * this._y;
	},
	get magnitude() {
		return Math.sqrt(this.magnitudeSquared);
	},
	get angle() {
		return Math.atan2(this._y, this._x) * 180 / Math.PI;
	},
	clone: function () {
		return new Vector$1(this._x, this._y);
	},
	add: function (v) {
		this._x += v.x;
		this._y += v.y;
	},
	subtract: function (v) {
		this._x -= v.x;
		this._y -= v.y;
	},
	multiply: function (value) {
		this._x *= value;
		this._y *= value;
	},
	divide: function (value) {
		this._x /= value;
		this._y /= value;
	},
	normalize: function () {
		var magnitude = this.magnitude;
		if (magnitude > 0) {
			this.divide(magnitude);
		}
	},
	limit: function (treshold) {
		if (this.magnitude > treshold) {
			this.normalize();
			this.multiply(treshold);
		}
	},
	randomize: function (amount) {
		amount = amount || 1;
		this._x = amount * 2 * (-.5 + Math.random());
		this._y = amount * 2 * (-.5 + Math.random());
	},
	rotate: function (degrees) {
		var magnitude = this.magnitude;
		var angle = (Math.atan2(this._x, this._y) * PI_HALF + degrees) * PI_180;
		this._x = magnitude * Math.cos(angle);
		this._y = magnitude * Math.sin(angle);
	},
	flip: function () {
		var temp = this._y;
		this._y = this._x;
		this._x = temp;
	},
	invert: function () {
		this._x = -this._x;
		this._y = -this._y;
	},
	toString: function () {
		return this._x + ', ' + this._y;
	}
};

var PI_2, PI_180$1, MAX_LIFE, rgb, cssFile;

PI_2 = Math.PI / 2;
PI_180$1 = Math.PI / 180;
MAX_LIFE = 50;

/**
 * 光点色值配置
 */
rgb = {
	d: "255,255,255", // 光点内部白色色值
	white: "231,244,255",
	black: "0,0,0",
	red: "247,32,16",
	orange: "255,152,0",
	yellow: "255,244,0",
	green: "173,255,47",
	young: "0,128,0",
	blue: "27,84,208",
	purple: "231,100,255"

	/**
  * css样式内容
  */
};cssFile = "input[shine=shine]:focus{outline:0}canvas{position:absolute;left:0;right:0;top:0;bottom:0;pointer-events:none}::-webkit-input-placeholder{text-shadow:0 0 .125em transparent;-webkit-transition:all .25s;transition:all .25s}input[shine=shine]:focus::-webkit-input-placeholder{opacity:.5}::-moz-placeholder{text-shadow:0 0 .125em transparent;-webkit-transition:all .25s;transition:all .25s}input[shine=shine]:focus::-moz-placeholder{opacity:.5}:-ms-input-placeholder{text-shadow:0 0 .125em transparent;-webkit-transition:all .25s;transition:all .25s}input[shine=shine]:focus:-ms-input-placeholder{opacity:.5}";

var styles = document.getElementsByTagName("style");
var inpStyle;
for (var i = 0; i < styles.length; i++) {
	if (styles[i].id == "inpShineStyle") {
		inpStyle = styles[i];
		break;
	}
}
if (typeof inpStyle == "undefined") {
	inpStyle = document.createElement("style");
	inpStyle.id = "inpShineStyle";
	inpStyle.innerHTML = cssFile;
	document.head.appendChild(inpStyle);
}

/**
 * Random
 */
var Random = {
	between: function (min, max) {
		return min + Math.random() * (max - min);
	}

	/**
  * 创建input.keyup样式
  */
};var inpKeyUp = function (el, opt) {
	var textColor = "rgb(" + (opt.textColor ? rgb[opt.textColor] : rgb.white) + ")";
	var borderColor = "rgb(" + (opt.borderColor ? rgb[opt.borderColor] : rgb.white) + ")";
	var classId = "_Shine" + Math.floor(Math.random() * 100000000);
	var classContent = "input[shine=shine].keyup" + classId + " {" + "color:" + textColor + ";" + "text-shadow: 0 0 .125em " + textColor + ";" + "border-color:" + borderColor + ";" + "box-shadow: 0 0 .25em white,inset 0 0 .25em " + borderColor + ";" + "}";
	inpStyle.innerHTML = inpStyle.innerHTML + classContent;
	el.classList.add(classId);
	return classId;
};

// 创建dom
function simulate(input, caret, field, opt) {
	// 变量声明
	var particles = [];
	var destroyed = [];
	var canvas;
	var context;
	var _this = this;

	var keyUpClass = inpKeyUp(input, opt);

	this.init = function () {}, this.tick = function (particles) {

		if (!particles) {
			return;
		}

		particles.forEach(function (p) {

			if (p.life > MAX_LIFE) {
				_this.destroy(p);
			}
		});
	}, this.beforePaint = function () {
		_this.clear();
	}, this.paints = function (particle) {

		var p = particle.position;
		var s = particle.size;
		var o = 1 - particle.life / MAX_LIFE;

		// 光点内部颜色
		this.paint.circle(p.x, p.y, s, 'rgba(' + rgb.d + ',' + o + ')');
		// 光点外层颜色
		this.paint.circle(p.x, p.y, s + 2, 'rgba(' + (opt.shine && rgb[opt.shine] ? rgb[opt.shine] : rgb.white) + ',' + o * .25 + ')');
	}, this.afterPaint = function () {
		// nothing
	}, this.action = function (x, y) {

		caret.textContent = input.value;

		burst.call(this, 10);

		input.classList.add('keyup' + keyUpClass);
		setTimeout(function () {
			input.classList.remove('keyup' + keyUpClass);
		}, 100);
	};

	if (document.readyState === 'interactive') {
		setup();
	} else {
		document.addEventListener('DOMContentLoaded', setup);
	}

	function burst(intensity) {

		var behavior = [this.behavior.cohesion(), this.behavior.move()];

		var size = .75;
		var force = .7;
		var lifeMin = 0;
		var progress = Math.min(field.width, caret.offsetWidth) / field.width;
		var offset = field.left + field.width * progress;
		var rangeMin = Math.max(field.left, offset - 30);
		var rangeMax = Math.min(field.right, offset + 10);

		this.spray(intensity, function () {
			return [null, null, Vector$1.create(Random.between(rangeMin + 10, rangeMax - 20), Random.between(field.top + 15, field.bottom - 15)), Vector$1.random(force), size + Math.random(), Random.between(lifeMin, 0), behavior];
		});

		// top edge
		this.spray(intensity * .5, function () {
			return [null, null, Vector$1.create(Random.between(rangeMin, rangeMax), field.top), Vector$1.random(force), size + Math.random(), Random.between(lifeMin, 0), behavior];
		});

		// bottom edge
		this.spray(intensity * .5, function () {
			return [null, null, Vector$1.create(Random.between(rangeMin, rangeMax), field.top + field.height), Vector$1.random(force), size + Math.random(), Random.between(lifeMin, 0), behavior];
		});

		// left edge
		if (input.value.length === 1) {

			this.spray(intensity * 2, function () {
				return [null, null, Vector$1.create(field.left, Random.between(field.top, field.bottom)), Vector$1.random(force), size + Math.random(), Random.between(lifeMin, 0), behavior];
			});
		}

		// right edge
		if (rangeMax == field.right) {

			this.spray(intensity * 2, function () {
				return [null, null, Vector$1.create(field.right, Random.between(field.top, field.bottom)), Vector$1.random(force), size + Math.random(), Random.between(lifeMin, 0), behavior];
			});
		}
	}

	// 重置画布大小
	function fitCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	// 创建画布及监听
	function setup() {

		// 创建画布
		canvas = document.createElement('canvas');
		document.body.appendChild(canvas);

		// 监听窗口大小 重置画布大小
		window.addEventListener('resize', fitCanvas);

		// 开始
		go();
	}

	function go() {

		// 设置初始化画布大小
		fitCanvas();

		// 获取画布上下文
		context = canvas.getContext('2d');

		// simulation update loop
		function act() {

			// update particle states
			var i = 0;
			var l = particles.length;
			var p;
			for (; i < l; i++) {
				particles[i].update(_this);
			}

			// clean destroyed particles
			while (p = destroyed.pop()) {

				do {

					// has not been found in destroyed array?
					if (p !== particles[i]) {
						continue;
					}

					// remove particle
					particles.splice(i, 1);
				} while (i-- >= 0);
			}

			// repaint context
			_this.beforePaint.call(_this);

			// repaint particles
			i = 0;
			l = particles.length;
			for (; i < l; i++) {
				_this.paints.call(_this, particles[i]);
			}

			// after particles have been painted
			_this.afterPaint.call(_this);
		}

		function tick() {

			// call update method, this allows for inserting particles later on
			_this.tick.call(_this, particles);

			// update particles here
			act();

			// on to the next frame
			window.requestAnimationFrame(tick);
		}

		/**
   * API
   **/
		function clear() {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}

		function destroy(particle) {
			destroyed.push(particle);
		}

		function add(id, group, position, velocity, size, life, behavior) {
			particles.push(new Particle(id, group, position, velocity, size, life, behavior));
		}

		function spray(amount, config) {
			var i = 0;
			for (; i < amount; i++) {
				add.apply(_this, config());
			}
		}

		function debug(particle) {
			_this.paint.circle(particle.position.x, particle.position.y, particle.size, 'rgba(255,0,0,.75)');
			context.beginPath();
			context.moveTo(particle.position.x, particle.position.y);
			context.lineTo(particle.position.x + particle.velocity.x * 10, particle.position.y + particle.velocity.y * 10);
			context.strokeStyle = 'rgba(255,0,0,.1)';
			context.stroke();
			context.closePath();
		}
		_this.clear = clear;
		_this.destroy = destroy;
		_this.add = add;
		_this.spray = spray;
		_this.debug = debug;

		_this.paint = {
			circle: function (x, y, size, color) {
				context.beginPath();
				context.arc(x, y, size, 0, 2 * Math.PI, false);
				context.fillStyle = color;
				context.fill();
			},
			square: function (x, y, size, color) {
				context.beginPath();
				context.rect(x - size * .5, y - size * .5, size, size);
				context.fillStyle = color;
				context.fill();
			}
		};

		_this.behavior = {
			cohesion: function (range, speed) {
				range = Math.pow(range || 100, 2);
				speed = speed || .001;
				return function (particle) {

					var center = new Vector$1();
					var i = 0;
					var l = particles.length;
					var count = 0;

					if (l <= 1) {
						return;
					}

					for (; i < l; i++) {

						// don't use self in group
						if (particles[i] === particle || Vector$1.distanceSquared(particles[i].position, particle.position) > range) {
							continue;
						}

						center.add(Vector$1.subtract(particles[i].position, particle.position));
						count++;
					}

					if (count > 0) {

						center.divide(count);

						center.normalize();
						center.multiply(particle.velocity.magnitude);

						center.multiply(.05);
					}

					particle.velocity.add(center);
				};
			},
			separation: function (distance) {

				var distance = Math.pow(distance || 25, 2);

				return function (particle) {

					var heading = new Vector$1();
					var i = 0;
					var l = particles.length;
					var count = 0;
					var diff;

					if (l <= 1) {
						return;
					}

					for (; i < l; i++) {

						// don't use self in group
						if (particles[i] === particle || Vector$1.distanceSquared(particles[i].position, particle.position) > distance) {
							continue;
						}

						// stay away from neighbours
						diff = Vector$1.subtract(particle.position, particles[i].position);
						diff.normalize();

						heading.add(diff);
						count++;
					}

					if (count > 0) {

						// get average
						heading.divide(count);

						// make same length as current velocity (so particle won't speed up)
						heading.normalize();
						heading.multiply(particle.velocity.magnitude);

						// limit force to make particle movement smoother
						heading.limit(.1);
					}

					particle.velocity.add(heading);
				};
			},
			alignment: function (range) {
				range = Math.pow(range || 100, 2);
				return function (particle) {

					var i = 0;
					var l = particles.length;
					var count = 0;
					var heading = new Vector$1();

					if (l <= 1) {
						return;
					}

					for (; i < l; i++) {

						// don't use self in group also don't align when out of range
						if (particles[i] === particle || Vector$1.distanceSquared(particles[i].position, particle.position) > range) {
							continue;
						}

						heading.add(particles[i].velocity);
						count++;
					}

					if (count > 0) {

						heading.divide(count);
						heading.normalize();
						heading.multiply(particle.velocity.magnitude);

						// limit
						heading.multiply(.1);
					}

					particle.velocity.add(heading);
				};
			},
			move: function () {
				return function (particle) {
					particle.position.add(particle.velocity);

					// handle collisions?
				};
			},
			eat: function (food) {
				food = food || [];
				return function (particle) {

					var i = 0;
					var l = particles.length;
					var prey;

					for (; i < l; i++) {

						prey = particles[i];

						// can't eat itself, also, needs to be tasty
						if (prey === particle || food.indexOf(prey.group) === -1) {
							continue;
						}

						// calculate force vector
						if (Vector$1.distanceSquared(particle.position, neighbour.position) < 2 && particle.size >= neighbour.size) {
							particle.size += neighbour.size;
							destroy(neighbour);
						}
					}
				};
			},
			force: function (x, y) {
				return function (particle) {
					particle.velocity.x += x;
					particle.velocity.y += y;
				};
			},
			limit: function (treshold) {
				return function (particle) {
					particle.velocity.limit(treshold);
				};
			},
			attract: function (forceMultiplier, groups) {
				forceMultiplier = forceMultiplier || 1;
				groups = groups || [];
				return function (particle) {

					// attract other particles
					var totalForce = new Vector$1(0, 0);
					var force = new Vector$1(0, 0);
					var i = 0;
					var l = particles.length;
					var distance;
					var attractor;
					var grouping = groups.length;

					for (; i < l; i++) {

						attractor = particles[i];

						// can't be attracted by itself or mismatched groups
						if (attractor === particle || grouping && groups.indexOf(attractor.group) === -1) {
							continue;
						}

						// calculate force vector
						force.x = attractor.position.x - particle.position.x;
						force.y = attractor.position.y - particle.position.y;
						distance = force.magnitude;
						force.normalize();

						// the bigger the attractor the more force
						force.multiply(attractor.size / distance);

						totalForce.add(force);
					}

					totalForce.multiply(forceMultiplier);

					particle.velocity.add(totalForce);
				};
			},
			wrap: function (margin) {
				return function (particle) {

					// move around when particle reaches edge of screen
					var position = particle.position;
					var radius = particle.size * .5;

					if (position.x + radius > canvas.width + margin) {
						position.x = radius;
					}

					if (position.y + radius > canvas.height + margin) {
						position.y = radius;
					}

					if (position.x - radius < -margin) {
						position.x = canvas.width - radius;
					}

					if (position.y - radius < -margin) {
						position.y = canvas.height - radius;
					}
				};
			},
			reflect: function () {

				return function (particle) {

					// bounce from edges
					var position = particle.position;
					var velocity = particle.velocity;
					var radius = particle.size * .5;

					if (position.x + radius > canvas.width) {
						velocity.x = -velocity.x;
					}

					if (position.y + radius > canvas.height) {
						velocity.y = -velocity.y;
					}

					if (position.x - radius < 0) {
						velocity.x = -velocity.x;
					}

					if (position.y - radius < 0) {
						velocity.y = -velocity.y;
					}
				};
			},
			edge: function (action) {
				return function (particle) {

					var position = particle.position;
					var velocity = particle.velocity;
					var radius = particle.size * .5;

					if (position.x + radius > canvas.width) {
						action(particle);
					}

					if (position.y + radius > canvas.height) {
						action(particle);
					}

					if (position.x - radius < 0) {
						action(particle);
					}

					if (position.y - radius < 0) {
						action(particle);
					}
				};
			}
		};

		Object.defineProperties(input, {
			'particles': {
				get: function () {
					return particles;
				}
			},
			'width': {
				get: function () {
					return canvas.width;
				}
			},
			'height': {
				get: function () {
					return canvas.height;
				}
			},
			'context': {
				get: function () {
					return context;
				}
			}
		});

		// 初始化
		_this.init.call(input);

		tick();

		// 监听keyup事件
		input.addEventListener('keyup', function (e) {
			_this.action.call(_this, e.pageX, e.pageY);
		});
	}
}

function inputShine(id, opt) {

	var el = document.getElementById(id);
	var input = el; // 目标dom
	input.setAttribute("shine", "shine");

	var opt = opt || {};

	var field = {}; // 显示范围

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

	input.onfocus = function () {
	};
	input.onblur = function () {
	};

	// start particle simulation
	new simulate(input, caret, field, opt);
}

// 检验是否浏览器环境
try {
} catch (ex) {
    throw new Error('请在浏览器环境下运行');
}

return inputShine;

})));
