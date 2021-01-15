import { BaseScene } from "./baseScene";
import { FlatButton } from "../common/ui/flatButton";
import { TextStyles } from "../common/ui/textStyles";
import { ToggleButton } from "../common/ui/toggleButton";
import { Align } from "../common/util/align";

//
//
export class SceneTitle extends BaseScene {
    constructor() {
        super('SceneTitle');
    }
    preload() {
        super.preload();
        //this.load.image('background_title', background_title);
    }
    create() {
        super.create();
        //
        //
        // uncomment to turn on music
        this.mm.setBackgroundMusic("TWD_title");
        this.setBackground('background_title');
        //
        //
        this.makeAlignGrid(11, 11);
       // this.aGrid.showNumbers();
        //
        //
        //
      //  this.placeImage('title', 27, .8);
        this.placeText("THE WALKERS",27,"TITLE_TEXT");
        //
        //
      //  let buttonStyle = this.textStyles.getStyle(TextStyles.BUTTON_STYLE);
        let btnNext = new FlatButton({
            scene: this,
            textStyle: 'BUTTON_STYLE',
            key: "button",
            text: "START GAME",
            callback: this.startGame.bind(this)
        });
        this.aGrid.placeAtIndex(104, btnNext);
        
        let btnScore = new FlatButton({
            scene: this,
            textStyle: 'BUTTON_STYLE',
            key: "button",
            text: "See Score",
            callback: this.seeScore.bind(this)
        });
        this.aGrid.placeAtIndex(60, btnScore);

        this.makeUi();
        // this.placeText("Test Me!!",49,"frost");
    }
    makeUi() {
        super.makeSoundPanel();
        super.makeGear();
    }

    seeScore() {
        this.scene.start("SceneScore");
    }
    
    startGame() {
        this.scene.start("SceneMain");
    }
    update() {}
}