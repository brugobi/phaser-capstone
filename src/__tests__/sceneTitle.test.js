import { SceneTitle } from '../scenes/sceneTitle';

const scene = new SceneTitle();

test('sceneTitle is a function', () => {
  expect(typeof SceneTitle).toBe('function');
});

test('sceneTitle has SceneTitle as key name', () => {
  expect(scene.sys.config).toBe('SceneTitle');
});

test('sceneTitle is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
