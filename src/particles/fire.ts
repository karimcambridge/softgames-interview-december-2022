import { Sprite, Texture } from 'pixi.js';

class Fire {
	_particle: Sprite;

	constructor(texture: Texture, width = 10, height = 10) {
		this._particle = new Sprite(texture);

		// Set the initial position of the particle at the bottom of the screen
		this._particle.position.x = Math.random() * width;
		this._particle.position.y = height;

		this._particle.anchor.set(0.5);
		this._particle.scale.set(0.5 + Math.random() * 0.5);
	}
}

export default Fire;