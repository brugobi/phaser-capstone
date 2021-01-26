import { SceneOver } from '../scenes/sceneOver';

const scene = new SceneOver();

test('sceneOver is a function', () => {
  expect(typeof SceneOver).toBe('function');
});

test('sceneOver has SceneTitle as key name', () => {
  expect(scene.sys.config).toBe('SceneOver');
});

test('sceneOver is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});