import { BaseScene } from "./baseScene";
import { Align } from "../common/util/align";
import { FormUtil } from "../common/util/formUtil";
//
import background from '../../assets/images/background_main.png';
//
export class SceneMain extends BaseScene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image('background', background);
    }

    create() {
        super.create();
        this.makeAlignGrid(11, 11);
        this.setBackground('background');
        this.aGrid.showNumbers();
        this.makeUi();     
    }
   
    makeUi() {
        super.makeSoundPanel();
        super.makeGear();
    }
    update() {}
}