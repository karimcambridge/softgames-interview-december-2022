import { Application, BitmapText, Ticker } from 'pixi.js';

class FPS {
	private _fpsBitmapText: BitmapText;
	private _ticker: Ticker;

	constructor() {
		this._fpsBitmapText = new BitmapText('FPS: 0', {
			fontName: 'Comic Sans 32',
			fontSize: 32,
			tint: 0xFFFFFF,
			align: 'left',
		});

		this._ticker = Ticker.shared;
		this._ticker.autoStart = false;
		this._ticker.stop();
	}

	render(app: Application, time: number) {
		this._fpsBitmapText.text = `FPS: ${this.fps(app).toFixed(0)}`;
		this._ticker.update(time);
		requestAnimationFrame(time => this.render(app, time));
	}

	start(app: Application) {
		app.stage.addChild(this._fpsBitmapText);
		this.render(app, performance.now());
	}

	// eslint-disable-next-line class-methods-use-this
	fps(app: Application) {
		return app?.ticker.FPS;
	}

	get bitmapText () {
		return this._fpsBitmapText;
	}
}

export default FPS;