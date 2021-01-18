/* eslint-disable no-unused-vars */
import {
  AlignGrid,
} from './alignGrid';
import {
  Align,
} from './align';

export class FormUtil {
  constructor(config) {
    // super();
    this.scene = config.scene;
    // get the game height and width
    this.gameWidth = this.scene.game.config.width;
    this.gameHeight = this.scene.game.config.height;
    this.alignGrid = new AlignGrid({
      scene: this.scene,
      rows: config.rows,
      cols: config.cols,
    });
  }

  showNumbers() {
    this.alignGrid.showNumbers();
  }

  scaleToGameW(elName, per) {
    const el = document.getElementById(elName);
    const w = this.gameWidth * per;
    el.style.width = `${w}px`;
  }

  scaleToGameH(elName, per) {
    const el = document.getElementById(elName);
    const h = this.gameHeight * per;
    el.style.height = `${h}px`;
  }

  placeElementAt(index, elName, centerX = true, centerY = false) {
    // get the position from the grid
    const pos = this.alignGrid.getPosByIndex(index);
    console.log(pos);
    // extract to local vars
    let { x } = pos;
    let { y } = pos;
    // get the element
    const el = document.getElementById(elName);
    // set the position to absolute
    el.style.position = 'absolute';
    // get the width of the element
    let w = el.style.width;
    // convert to a number
    w = this.toNum(w);
    console.log(`w=${w}`);
    //
    //
    // center horizontal in square if needed
    if (centerX == true) {
      x -= w / 2;
    }
    //
    // get the height
    //
    let h = el.style.height;
    // convert to a number
    h = this.toNum(h);
    //
    // center verticaly in square if needed
    //
    if (centerY == true) {
      y -= h / 2;
    }
    console.log(`x=${x}`);
    // set the positions
    el.style.top = `${y}px`;
    el.style.left = `${x}px`;
  }

  // changes 100px to 100
  toNum(s) {
    s = s.replace('px', '');
    s = parseInt(s);
    return s;
  }

  // add a change callback
  addChangeCallback(elName, fun, scope = null) {
    const el = document.getElementById(elName);
    if (scope == null) {
      el.onchange = fun;
    } else {
      el.onchange = fun.bind(scope);
    }
  }

  hideElement(elName) {
    const el = document.getElementById(elName);
    el.style.display = 'none';
  }

  showElement(elName) {
    const el = document.getElementById(elName);
    el.style.display = 'block';
  }

  getTextAreaValue(elName) {
    const el = document.getElementById(elName);
    return el.value;
  }

  getTextValue(elName) {
    const el = document.getElementById(elName);
    return el.innerText;
  }

  setTextValue(elName, val) {
    const el = document.getElementById(elName);
    window.el = el;
    el.value = val;
  }

  copyFrom(elName) {
    const el = document.getElementById(elName);
    el.select();
    document.execCommand('copy');
  }

  addClickCallback(elName, fun, scope = null) {
    const el = document.getElementById(elName);
    if (scope == null) {
      el.onclick = fun;
    } else {
      el.onclick = fun.bind(scope);
    }
  }

  addOption(dropDown, text, item) {
    const select = document.getElementById(dropDown);
    const option = document.createElement('option');
    option.text = text;
    option.data = item;
    select.add(option, 0);
  }

  getSelectedItem(dropDown) {
    const e = document.getElementById(dropDown);
    return e.options[e.selectedIndex].data;
  }

  getSelectedIndex(dropDown) {
    const el = document.getElementById(dropDown);
    return el.selectedIndex;
  }

  getSelectedText(dropDown) {
    const e = document.getElementById(dropDown);
    return e.options[e.selectedIndex].text;
  }
}