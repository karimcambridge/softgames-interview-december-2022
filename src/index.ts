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
	displayOption = <HTMLOptionElement>document.getElementById('display'),
	backDrop = document.getElementById('pixi-backdrop'),
	elements = {
		fps: new FPSCounter(),
		cardStack: new CardStack(app, settings.cards),
		textWithImages: new TextWithImages(app),
		particles: new ParticleSystem('fire2.png'),
	}
;

let
	lastDisplay = displayOption?.value
;

elements.fps.start(app);

const onDisplayChange = () => {
	switch(lastDisplay) {
		case 'cards':
			elements.cardStack.stop();
			break;
		case 'mixed':
			elements.textWithImages.stop();
			break;
		case 'fire':
			elements.particles.stop(app.stage);
			break;
	}
	switch(displayOption.value) {
		case 'cards':
			elements.cardStack.start();
			break;
		case 'mixed':
			elements.textWithImages.start();
			break;
		case 'fire':
			elements.particles.start(app.stage);
			break;
	}
	lastDisplay = displayOption.value;
};
displayOption.onchange = onDisplayChange;
onDisplayChange();

setTimeout(() => requestFullScreen(document.body), 500); // Make the body go full screen.

if(backDrop) {
	backDrop.onclick = () => requestFullScreen(document.body);
}