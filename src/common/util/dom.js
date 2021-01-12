export class Dom {
  createInputName() {
    const fieldSet = document.createElement('fieldset');
    fieldSet.innerHTML = "<legend>Player's name</legend> < input id = 'inpName' type = 'text' placeholder = 'What is your name' > <button type='button' id='btnAddName'>Add</button>";
  }

  displayScore() {
    // const fieldSetScore = document.createElement('fieldset');
    // fieldSet.innerHTML = "<legend>Result</legend> < input id = 'inpName' type = 'text' placeholder = 'What is your name' > <button type='button' id='btnAddName'>Add</button>";
  }
}

