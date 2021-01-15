 import { SceneMain } from "./scenes/sceneMain";
 import { SceneLoad } from "./scenes/sceneLoad";
 import { SceneTitle } from "./scenes/sceneTitle";
 import { SceneOver } from "./scenes/sceneOver";
import { SceneScore } from "./scenes/sceneLeaderBoard";
  
 //
 //
 //
 var isMobile = navigator.userAgent.indexOf("Mobile");
 if (isMobile == -1) {
     isMobile = navigator.userAgent.indexOf("Tablet");
 }
 var w = 980;
 var h = 640;
 //
 //
 if (isMobile != -1) {
     w = window.innerWidth;
     h = window.innerHeight;
 }
 var config = {
     type: Phaser.AUTO,
     width: w,
     height: h,
     parent: 'phaser-game',
     physics: {
         default: "arcade",
         arcade: {
             //debug: true,
             gravity: { x: 0, y: 0 }
         }
     },
     dom: {
         createContainer: true
     },
     scene: [SceneLoad, SceneTitle, SceneMain, SceneOver, SceneScore],
     pixelArt: true,
     roundPixels: true
 };
 let game = new Phaser.Game(config);