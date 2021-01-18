import 'regenerator-runtime';
import { postScore, getScore } from './api';

class Dom {
  constructor() {

  }

  createInputName() {
    const fieldSet = document.createElement('fieldset');
    fieldSet.innerHTML = "<legend>Player's name</legend> <input id='inpName' type='text' placeholder='What is your name'/> <button type='button' id='btnAddName'>Add</button>";
    return fieldSet;
  }

  addBtnEvent(player) {
    const btnAdd = document.getElementById('btnAddName');
    btnAdd.addEventListener('click', () => {
      const playerName = document.getElementById('inpName');
      postScore(playerName.value, player.score);
      console.log(player);
      player.scene.scene.start('SceneOver');
    });
  }

  displayScore() {
    const arrScores = getScore();

    const scoreTable = document.createElement('table');
    const tr = document.createElement('tr');
    const thPlayerName = document.createElement('th');
    thPlayerName.innerText = 'Name';
    const thPlayerScore = document.createElement('th');
    thPlayerScore.innerText = 'Points';
    tr.append(thPlayerName, thPlayerScore);
    scoreTable.appendChild(tr);

    arrScores.forEach(obj => {
      const trS = document.createElement('tr');
      scoreTable.appendChild(trS);

      const td_name = document.createElement('td');
      const td_score = document.createElement('td');
      td_name.innerText = `${obj.user}`;
      td_score.innerText = `${obj.score}`;
      trS.append(td_name, td_score);
    });

    return scoreTable;
  }
}

export default Dom;

// < !-- < table style = "width:100%" >
//             <tr>
//                 <th>Player</th>
//                 <th>Score</th>
//             </tr>
//             <tr>
//                 <td>Jill</td>
//                 <td>Smith</td>
//             </tr>
//         </table > -->