import { ParticleContainer, Texture } from 'pixi.js';
import { Emitter } from '@pixi/particle-emitter';
//import * as particleSettings from './emitter.json';

class ParticleSystem extends ParticleContainer {
	_texture: Texture;
	_particles: Emitter[] = [];
	_particleContainer: ParticleContainer;

	constructor(textureFile: string, max = 1) {
		super();
		this._texture = Texture.from(textureFile);

		this._particleContainer = new ParticleContainer();
		this._particleContainer.position.set(0);
		for(let i = 0; i < ((max > 10) ? 10 : max); ++i) {
			const emitter = new Emitter(this._particleContainer, {
				lifetime: {
					min: 0.5,
					max: 0.5
				},
				frequency: 0.008,
				spawnChance: 1,
				particlesPerWave: 1,
				emitterLifetime: 0.31,
				maxParticles: 1000,
				pos: {
					x: 0,
					y: 0
				},
				addAtBack: false,
				behaviors: [
					{
						type: 'alpha',
						config: {
							alpha: {
								list: [
									{
										value: 0.8,
										time: 0
									},
									{
										value: 0.1,
										time: 1
									}
								],
							},
						}
					},
					{
						type: 'scale',
						config: {
							scale: {
								list: [
									{
										value: 1,
										time: 0
									},
									{
										value: 0.3,
										time: 1
									}
								],
							},
						}
					},
					{
						type: 'color',
						config: {
							color: {
								list: [
									{
										value: 'fb1010',
										time: 0
									},
									{
										value: 'f5b830',
										time: 1
									}
								],
							},
						}
					},
					{
						type: 'moveSpeed',
						config: {
							speed: {
								list: [
									{
										value: 200,
										time: 0
									},
									{
										value: 100,
										time: 1
									}
								],
								isStepped: false
							},
						}
					},
					{
						type: 'rotationStatic',
						config: {
							min: 0,
							max: 360
						}
					},
					{
						type: 'spawnShape',
						config: {
							type: 'torus',
							data: {
								x: 0,
								y: 0,
								r: 10
							}
						}
					},
					{
						type: 'textureSingle',
						config: {
							texture: Texture.from('fire2.png')
						}
					}
				],
			});

			emitter.autoUpdate = true;
			emitter.emit = true;

			this._particles.push(emitter);
		}
	}

	start(stage: any) {
		stage.addChild(this._particleContainer);
		for(const emitter of this._particles) {
			emitter.parent = this._particleContainer;
		}
	}

	stop(stage: any) {
		stage.removeChild(this._particleContainer);
	}
}

export default ParticleSystem;