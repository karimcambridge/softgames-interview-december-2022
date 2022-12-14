import { Application } from 'pixi.js';
import { requestFullScreen, preloadGameData } from './utils';
import FPSCounter from './fps';
import CardStack from './cardstack';
import TextWithImages from './textwithimages';
import ParticleSystem from './particles';

preloadGameData();

const
	app = new Application({
		view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
		resolution: window.devicePixelRatio || 1,
		autoDensity: true,
		backgroundColor: 0x6495ed,
		resizeTo: window,
	}),
	settings = Object.freeze({
		cards: 144,
	}),
	options = {
		cards: <HTMLInputElement>document.getElementById('cards'),
		mixed: <HTMLInputElement>document.getElementById('mixed'),
		fire: <HTMLInputElement>document.getElementById('fire'),
	},
	backDrop = document.getElementById('pixi-backdrop'),
	elements = {
		fps: new FPSCounter(),
		cardStack: new CardStack(app, settings.cards),
		textWithImages: new TextWithImages(app),
		particles: new ParticleSystem(app),
	}
;

elements.fps.start(app);

options.cards.onclick = () => {
	if(options.cards.checked) {
		elements.cardStack.start();
	} else {
		elements.cardStack.stop();
	}
};

options.mixed.onclick = () => {
	if(options.mixed.checked) {
		elements.textWithImages.start();
	} else {
		elements.textWithImages.stop();
	}
};

options.fire.onclick = () => {
	if(options.fire.checked) {
		elements.particles.start();
	} else {
		elements.particles.stop();
	}
};

setTimeout(() => requestFullScreen(document.body), 500); // Make the body go full screen.

if(backDrop) {
	backDrop.onclick = () => requestFullScreen(document.body);
}