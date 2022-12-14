import { Application, Container, Sprite, Texture } from 'pixi.js';
import { CardPositionSide } from '../types';
import { easeInOutQuad } from '../utils';

/*
 * Create 144 sprites (NOT graphics object) that are stacked on each other like cards in a deck
 * (so object above covers bottom one, but not completely).
 * Every second 1 object from top of stack goes to other stack - animation of moving should be 2 seconds long.
 * So at the end of whole process you should have reversed stack.
 * Display number of fps in left top corner and make sure, that this demo runs well on mobile devices.
 */

const
	settings = Object.freeze({
		positionOffset: 0.05,
	})
;

class CardStack {
	_app: Application;
	_texture!: Texture;
	_spriteCount = 0;
	_stacks: {
		left: Sprite[], right: Sprite[],
	} = {
		left: [], right: [],
	};
	_interval: any;
	_tweeners: any[] = [];

	_stacksContainer!: Container;
	_processingContainer!: Container;

	constructor(app: Application, spriteCount: number, textureFile = 'pokemon_card_back.png') {
		this._app = app;
		this._spriteCount = spriteCount;
		this.loadTexture(textureFile);
	}

	getCardPosition = (side: CardPositionSide) => {
		const
			x = (side === CardPositionSide.left) ? this._app.screen.width * 0.25 : this._app.screen.width * 0.75,
			y = this._app.screen.height * 0.5,
			displacement = settings.positionOffset * (side === CardPositionSide.left ? this._stacks.left : this._stacks.right).length
		;
		return { x: x + displacement, y: y + displacement };
	};

	loadTexture(textureFile: string) {
		if(!this._texture) {
			this._texture = Texture.from(textureFile);
		}
	}

	createStackOfSprites(spriteCount: number): void {
		this._stacksContainer = new Container();
		this._processingContainer = new Container();
		this._app.stage.addChild(this._stacksContainer);
		this._app.stage.addChild(this._processingContainer);

		for(let i = 0; i < spriteCount; ++i) {
			const
				card = new Sprite(this._texture)
			;
			// play with card size
			card.anchor.set(0.5, 0.5);
			card.scale.set(0.35, 0.35);
			const { x, y } = this.getCardPosition(CardPositionSide.left);
			// stack cards
			card.x = x;
			card.y = y;
			card.zIndex = i;
			// push to left side container
			this._stacks.left.push(card);
			this._stacksContainer.addChild(card);
		}
	}

	get topLeftCard(): any {
		return this._stacks.left?.pop();
	}

	moveCardFromLeftToRight(): any {
		const
			card = this.topLeftCard
		;
		if(card) {
			const
				rightLen = this._stacks.right.push(card)
			;
			card.zIndex = this._spriteCount + rightLen;

			const { x, y } = this.getCardPosition(CardPositionSide.right);
			return { card, x, y };
		}
		return null;
	}

	start(): void {
		this.createStackOfSprites(this._spriteCount);
		this._interval = setInterval(this.processCardMove, 1000);
		console.log('[card stack]: start');
	}

	processCardMove = (): void => {
		const
			cardData = this.moveCardFromLeftToRight()
		;
		if(cardData) {
			const
				{ card, x, y } = cardData,
				startTime = Date.now(),
				startX = card.position.x,
				startY = card.position.y
			;
			this._stacksContainer.cacheAsBitmap = false;
			this._stacksContainer.removeChild(card);
			this._stacksContainer.cacheAsBitmap = true;
			this._processingContainer.addChild(card);

			const tweener = (): void => {
				if(!card) return;
				const
					time = Date.now(),
					progress = Math.min(1, (time - startTime) / 2000)
				;
				if(progress >= 1) {
					this._tweeners = this._tweeners.filter(e => e != tweener);
					this._app.ticker.remove(tweener);
					this._processingContainer.removeChild(card);
					this._stacksContainer.cacheAsBitmap = false;
					this._stacksContainer.addChild(card);
					this._stacksContainer.cacheAsBitmap = true;
				}
				const
					easing = easeInOutQuad(progress)
				;
				card.position.set(startX + (x - startX) * easing, startY + (y - startY) * easing);
			};
			this._tweeners.push(tweener);
			this._app.ticker.add(tweener);
		} else {
			// TODO: make it restart?
			this.endMoving();
		}
	};

	endMoving(): void {
		clearInterval(this._interval);
	}

	stop(): void {
		this.endMoving();
		this._app.stage.removeChild(this._stacksContainer);
		this._app.stage.removeChild(this._processingContainer);
		this._stacksContainer?.destroy();
		this._processingContainer?.destroy();
		this._stacks = {
			left: [],
			right: [],
		};
		this._app.ticker.stop();
		this._tweeners = this._tweeners.map(tweener => this._app.ticker.remove(tweener));
		this._app.ticker.start();
		console.log('[card stack]: end');
	}
}

export default CardStack;