import { Application, utils } from 'pixi.js';
import Fire from './fire';

class ParticleSystem {
	_app: Application;
	_max = 10;
	fires: Fire[] = [];

	constructor(app: Application, max = 10) {
		this._app = app;
		this._max = max;
	}

	start() {
		console.log('[fire]: start');
		for(let i = 0; i < this._max; ++i) {
			const fire = new Fire(this._app, {
				x: Math.random() * (window.innerWidth * (utils.isMobile.any ? 0.75 : 0.85)),
				y: Math.random() * (window.innerHeight * (utils.isMobile.any ? 0.75 : 0.85)),
			});
			this.fires.push(fire);
		}
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