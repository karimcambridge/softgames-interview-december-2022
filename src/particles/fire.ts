import { Application, Sprite, Texture } from 'pixi.js';
import { easeInOutQuad } from '../utils';
import Spark from './spark';

class Fire {
	private _app: Application;
	private _particles: Spark[] = [];
	private _interval: any;
	private _position: { x: number; y: number; } = { x: window.innerWidth, y: window.innerHeight };
	private _tweeners: any[] = [];
	private _sprite: Sprite;

	constructor(app: any, position: { x: number; y: number; }) {
		this._app = app;
		this._position = position;

		this._sprite = new Sprite(Texture.from('fire_cartoon.png'));
		this._sprite.anchor.set(0.5, 0.5);
		this._sprite.scale.set(0.35, 0.35);
		this._sprite.x = position.x;
		this._sprite.y = position.y;
		this._app.stage.addChild(this._sprite);

		this._interval = setInterval(this.sparkle, 1000);
	}

	private sparkle = () => {
		const
			spark = new Spark(this._position),
			startTime = Date.now()
		;
		this._particles.push(spark);
		this._app.stage.addChild(spark.particle);

		const tweener = (): void => {
			const
				time = Date.now(),
				progress = Math.min(1, (time - startTime) / 5000)
			;
			if(progress >= 1) {
				this._tweeners = this._tweeners.filter(e => e != tweener);
				this._particles = this._particles.filter(e => e != spark);
				this._app.ticker.remove(tweener);
				this._app.stage.removeChild(spark.particle);
			}
			const
				easing = easeInOutQuad(progress),
				positions = spark.positions
			;
			spark.particle.y = positions.startY + (positions.endY - positions.startY) * easing;
		};
		this._tweeners.push(tweener);
		this._app.ticker.add(tweener);
	};

	public stop() {
		if(this._interval) {
			clearInterval(this._interval);
			this._interval = null;
		}
		for(const obj of this._particles) {
			this._app.stage.removeChild(obj.particle);
		}
		this._app.stage.removeChild(this._sprite);
	}
}

export default Fire;