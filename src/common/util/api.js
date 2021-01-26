/* eslint-disable import/no-extraneous-dependencies */
//
// "result": "Game with ID: cuig3ur42E7tOxtOcx0r added."
//
import 'regenerator-runtime';

const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cuig3ur42E7tOxtOcx0r/scores/';

export const postScore = async (user, score) => {
  const body = JSON.stringify({ user, score });
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  };
  const response = await fetch(URL, data);
  const result = await response.json();
  return result;
};

export const getScore = async () => {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      mode: 'no-cors',
    },
  };
  const response = await fetch(URL, data);
  const score = await response.json();
  return score.result;
};