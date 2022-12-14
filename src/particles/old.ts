import { Application, ParticleContainer, Rectangle, Sprite, Texture } from 'pixi.js';

class ParticleSystem {
	_texture: Texture;
	_particles: any[] = [];
	_particleContainer: ParticleContainer;
	_tick = 0;
	_bounds: Rectangle;
	_boundsPadding = 100;
	_app: Application;

	constructor(app: Application, textureFile: string, max = 10) {
		this._app = app;
		this._texture = Texture.from(textureFile);

		this._particleContainer = new ParticleContainer(10, {
			scale: true,
			position: true,
			rotation: true,
			uvs: true,
			alpha: true,
		});
		for(let i = 0; i < ((max > 10) ? 10 : max); ++i) {
			const emitter: any = Sprite.from(this._texture);

			// set the anchor point so the texture is centered on the sprite
			emitter.anchor.set(0.5);

			// different fire, different sizes
			emitter.scale.set(0.8 + Math.random() * 0.3);

			emitter.x = Math.random() * app.screen.width;
			emitter.y = Math.random() * app.screen.height;

			emitter.direction = Math.random() * Math.PI * 2;

			emitter.turningSpeed = Math.random() - 2.0;

			emitter.speed = (2 + Math.random() * 2) * 0.2;

			emitter.offset = Math.random() * 50;

			this._particles.push(emitter);
			this._particleContainer.addChild(emitter);
		}

		this._boundsPadding = 100;
		this._bounds = new Rectangle(
			-this._boundsPadding,
			-this._boundsPadding,
			app.screen.width + this._boundsPadding * 2,
			app.screen.height + this._boundsPadding * 2,
		);
	}

	update = () => {
		// iterate through the sprites and update their position
		for(const particle of this._particles) {
			particle.scale.y = 0.95 + Math.sin(this._tick + particle.offset) * 0.05;
			//particle.direction += particle.turningSpeed * 0.01;
			particle.x += Math.sin(particle.direction) * (particle.speed * particle.scale.y);
			particle.y += Math.cos(particle.direction) * (particle.speed * particle.scale.y);
			particle.rotation = -particle.direction + Math.PI;

			// wrap the fire
			if(particle.x < this._bounds.x) {
				particle.x += this._bounds.width;
			} else if(particle.x > this._bounds.x + this._bounds.width) {
				particle.x -= this._bounds.width;
			}

			if(particle.y < this._bounds.y) {
				particle.y += this._bounds.height;
			} else if(particle.y > this._bounds.y + this._bounds.height) {
				particle.y -= this._bounds.height;
			}
		}

		// increment the ticker
		this._tick += 0.1;
	};

	start() {
		this._app.stage.addChild(this._particleContainer);
		this._app.ticker.add(this.update);
	}

	stop() {
		this._app.stage.removeChild(this._particleContainer);
		this._app.ticker.add(this.update);
	}
}

export default ParticleSystem;