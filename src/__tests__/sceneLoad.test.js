import { SceneLoad } from '../scenes/sceneLoad';

const scene = new SceneLoad();

test('sceneLoad is a function', () => {
  expect(typeof SceneLoad).toBe('function');
});

test('sceneLoad has sceneLoad as key name', () => {
  expect(scene.sys.config).toBe('SceneLoad');
});

test('sceneLoad is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});