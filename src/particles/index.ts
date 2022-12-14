import { Application, utils } from 'pixi.js';
import Fire from './fire';

/*
 * Particles - make a demo that shows an awesome fire effect.
 * Please keep number of images low (max 10 sprites on screen at once).
 * Feel free to use existing libraries how you would use them in a real project.
 */

class ParticleSystem {
	_app: Application;
	_max = 10;
	fires: Fire[] = [];

	constructor(app: Application, max = 10) {
		this._app = app;
		this._max = (max > 10) ? 10 : max;
	}

	start() {
		for(let i = 0; i < this._max; ++i) {
			const fire = new Fire(this._app, {
				x: Math.random() * (window.innerWidth * (utils.isMobile.any ? 0.75 : 0.85)),
				y: Math.random() * (window.innerHeight * (utils.isMobile.any ? 0.75 : 0.85)),
			});
			this.fires.push(fire);
		}
		console.log('[fire]: start');
	}

	stop() {
		for(const fire of this.fires) {
			fire.stop();
		}
		this.fires.length = 0;
		console.log('[fire]: end');
	}
}

export default ParticleSystem;