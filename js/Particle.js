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
	update: function(stage) {

		this._life++;

		var i = 0;
		var l = this._behavior.length;

		for (; i < l; i++) {
			this._behavior[i].call(stage, this);
		}

	},
	toString: function() {
		return 'Particle(' + this._id + ') ' + this._life + ' pos: ' + this._position + ' vec: ' + this._velocity;
	}
}

export default Particle