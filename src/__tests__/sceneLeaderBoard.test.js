import { SceneScore } from '../scenes/sceneLeaderBoard';

const scene = new SceneScore();

test('SceneScore is a function', () => {
  expect(typeof SceneScore).toBe('function');
});

test('SceneScore has SceneTitle as key name', () => {
  expect(scene.sys.config).toBe('SceneScore');
});

test('SceneScore is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});