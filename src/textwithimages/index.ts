import { Application, Text, utils } from 'pixi.js';
import randomWords from 'random-words';
import { easeInOutQuad, randomEmoji } from '../utils';

/*
 * Create a tool that will allow mixed text and images in an easy way
 * (for example displaying text with emoticons or prices with money icon).
 * It should come up every 2 seconds a random text with images in random configuration
 * (image + text + image, image + image + image, image + image + text, text + image + text etc) and a random font size.
*/

class TextWithImages {
	private _app: Application;
	private _interval: any;
	private _tweeners: any[] = [];

	constructor(app: any) {
		this._app = app;
	}

	private generateTextWithImage = () => {
		const
			text = randomWords({ exactly: Math.floor(Math.random() * 3) + 1, join: ' ' }) + ' ' + randomEmoji({ count: 1 }),
			movingText = new Text(text, {
				fontSize: Math.floor(Math.random() * (utils.isMobile.any ? 24 : 48)) + 12,
				align: 'center',
			}),
			startTime = Date.now(),
			positions = {
				startX: Math.random() * (window.innerWidth * (utils.isMobile.any ? 0.75 : 0.85)),
				startY: Math.random() * (window.innerHeight * (utils.isMobile.any ? 0.75 : 0.85)),
				endX: Math.random() * (window.innerWidth * (utils.isMobile.any ? 0.55 : 0.75)),
				endY: Math.random() * (window.innerHeight * (utils.isMobile.any ? 0.55 : 0.75)),
			}
		;
		movingText.x = positions.startX; // cheap quick way to create bounds
		movingText.y = positions.startY;

		movingText.zIndex = Math.floor(Math.random() * 50) + 1;

		this._app.stage.addChild(movingText);

		const tweener = (): void => {
			const
				time = Date.now(),
				progress = Math.min(1, (time - startTime) / 2000)
			;
			if(progress >= 1) {
				this._tweeners = this._tweeners.filter(e => e != tweener);
				this._app.ticker.remove(tweener);
				this._app.stage.removeChild(movingText);
			}
			const
				easing = easeInOutQuad(progress)
			;
			movingText.x = positions.startX + (positions.endX - positions.startX) * easing;
			movingText.y = positions.startY + (positions.endY - positions.startY) * easing;
		};
		this._tweeners.push(tweener);
		this._app.ticker.add(tweener);
	};

	public start(): void {
		this._interval = setInterval(this.generateTextWithImage, 1000);
		console.log('[textwithimages]: start');
	}

	public stop(): void {
		console.log('[textwithimages]: end');
		clearInterval(this._interval);
	}
}

export default TextWithImages;