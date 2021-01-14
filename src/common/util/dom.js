import 'regenerator-runtime';
import { postScore } from "./api";

class Dom {
  constructor() {

  };

  createInputName() {
    const fieldSet = document.createElement('fieldset');
    fieldSet.innerHTML = "<legend>Player's name</legend> <input id='inpName' type='text' placeholder='What is your name'/> <button type='button' id='btnAddName'>Add</button>";
    return fieldSet;
  }

  addBtnEvent(player) {
    const btnAdd = document.getElementById('btnAddName');
    btnAdd.addEventListener('click', () => {
      let playerName = document.getElementById('inpName');
      postScore(playerName.value, player.score);
      console.log(player);
      player.scene.scene.start("SceneOver");
    });
  }
}

export default Dom;

