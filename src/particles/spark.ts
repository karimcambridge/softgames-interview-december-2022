import { Graphics } from 'pixi.js';
import { getRandomInt } from '../utils';

class Spark {
	_particle: Graphics;
	_positions: { startY: number; endY: number; } = { startY: 0, endY: 0 };

	constructor(position: { x: number; y: number; }, minOffsetFromFire: any = { x: 40, y: 35 }) {
		this._particle = new Graphics();
		//const rand = anime.random(1, this.colors.length);
		this._particle.beginFill(parseInt('0xFF2200'));
		this._particle.drawCircle(0, 0, 4);
		this._particle.endFill();
		this._particle.x = (getRandomInt(0, 1) == 0) ? (position.x + getRandomInt(0, minOffsetFromFire.x)) : (position.x - getRandomInt(0, minOffsetFromFire.x));
		this._particle.y = position.y - Math.random() * (getRandomInt(0, minOffsetFromFire.y) + minOffsetFromFire.y);
		this._positions.startY = this._particle.y;
		this._positions.endY = this._particle.y - 50;
		this._particle.zIndex = 0;
	}

	public get particle() {
		return this._particle;
	}

	public get positions() {
		return this._positions;
	}
}

export default Spark;