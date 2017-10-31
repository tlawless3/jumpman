/*
 * `assets` module
 * ===============
 *
 * Declares static asset packs to be loaded using the `Phaser.Loader#pack`
 * method. Use this module to declare game assets.
 */

'use strict';

//  -- Splash screen assets used by the Preloader.
exports.preloaderAssets = [{
  key: 'splash-screen',
  type: 'image'
}, {
  key: 'progress-bar',
  type: 'image'
}, {
  key:'jumpmanTitleScreen',
  type: 'image'
}, {
  key: 'startButton',
  type: 'image'
}];

//  -- General assets used throughout the game.
exports.gameAssets = [{
  key: 'phaser',
  type: 'image'
}, {
  key:'sky',
  type:'image'
}, {
  key:'jumpman',
  type: 'image'
}, {
  key:'bricks',
  type: 'image'
}, {
  key:'enemy',
  type:'image'
}];
