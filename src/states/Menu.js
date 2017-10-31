/*
*
*'Menu Module'
* ===========
*
* Start menu for game overs and the uh, start.
*
*/

var assets = require('../assets');

exports.create = function(game){
    game.add.image(0, 0, 'jumpmanTitleScreen');
    game.add.button(325, 490, 'startButton', advanceState);
    function advanceState(){
      game.state.start('Game');
    }
}
