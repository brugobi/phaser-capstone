import { postScore, getScore } from '../common/util/api';

describe('The scores and usernames should be written and read from the API', () => {
  test('Retrieves an object from the API', () => {
    getScore().then(response => {
      expect(response).toBe('Succeed');
    });
  });
  test('Post a new score to database', () => {
    postScore('Bru', 10).then(data => {
      expect(data.result).toBe('Leaderboard score created correctly.');
    });
  });
  test('Retrieves an object from the API', () => {
    getScore().then(data => {
      expect(typeof data).toBe('object');
    });
  });
  test('The object should Retrieves the user name created', () => {
    getScore().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user: 'Bru',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
  test('The object should contain the score created', () => {
    getScore().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            score: '10',
          }),
        ]),
      );
    }).catch(() => {
    });
  });
});