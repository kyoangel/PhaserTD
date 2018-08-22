/// <reference path="./defs/phaser.d.ts"/>
import AttackingAdams from './states/AttackingAdams';
import Phaser from './lib/phaser';

var w = 800;
var h = 600;
if (screen.width < 1500) {
    w = window.innerWidth;
    h = window.innerHeight;
}
var config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    backgroundColor: '#99DDFF',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};
var game = new Phaser.Game(config);
game.scene.add("AttackingAdams", AttackingAdams);
game.scene.start("AttackingAdams");