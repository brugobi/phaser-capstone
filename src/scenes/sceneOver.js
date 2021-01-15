import { BaseScene } from "./baseScene";
import { FlatButton } from '../common/ui/flatButton';

export class SceneOver extends BaseScene {
    constructor() {
        super('SceneOver');
    }
    preload() {}
    create() {
        super.create();
        this.setBackground('background_over');
        this.makeAlignGrid(11, 11);
        // this.aGrid.showNumbers();
        // this.formUtil = new FormUtil({ scene: this, rows: 11, cols: 11 });
        // this.formUtil.scaleToGameW("nameField", .4);
        // this.formUtil.placeAtIndex(60, "nameField");
        //  this.placeImage('title', 27, .8);
        this.placeText("Game Over", 27, "TITLE_TEXT");
        //
        //  let buttonStyle = this.textStyles.getStyle(TextStyles.BUTTON_STYLE);
        let btnNext = new FlatButton({
            scene: this,
            textStyle: 'BUTTON_STYLE',
            key: "button",
            text: "Play Again",
            callback: this.playAgain.bind(this)
        });
        this.aGrid.placeAtIndex(104, btnNext);
        //
        let btnScore = new FlatButton({
            scene: this,
            textStyle: 'BUTTON_STYLE',
            key: "button",
            text: "See Score",
            callback: this.seeScore.bind(this)
        });
        this.aGrid.placeAtIndex(60, btnScore);
        //
        this.makeUi();
        // this.placeText("Test Me!!",49,"frost");
    }
    makeUi() {
        super.makeSoundPanel();
        super.makeGear();
    }
    playAgain() {
        this.scene.start("SceneMain");
    }

    seeScore() {
        this.scene.start("SceneScore");
    }
    update() {}
}