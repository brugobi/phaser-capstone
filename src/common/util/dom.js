import { ToggleButton } from "../ui/toggleButton";

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
       // get the value from the name Input
       // make a POST request using the name and the player's score API
       // when the POST is done, inside the .then, redirect tothe scene over
       player.scene.scene.start("SceneOver");
     });
  }

  displayScore() {
    // const fieldSetScore = document.createElement('fieldset');
    // fieldSet.innerHTML = "<legend>Result</legend> < input id = 'inpName' type = 'text' placeholder = 'What is your name' > <button type='button' id='btnAddName'>Add</button>";
  }
}

// const dom = (() => {
//   function createInputName() {
//     const fieldSet = document.createElement('fieldset');
//     fieldSet.innerHTML = "<legend>Player's name</legend> < input id = 'inpName' type = 'text' placeholder = 'What is your name' > <button type='button' id='btnAddName'>Add</button>";
//     return fieldSet;
//   }
// })();

export default Dom;

