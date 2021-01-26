import { SceneMain } from '../scenes/sceneMain';

const scene = new SceneMain();

test('sceneMain is a function', () => {
  expect(typeof SceneMain).toBe('function');
});

test('sceneMain has SceneTitle as key name', () => {
  expect(scene.sys.config).toBe('SceneMain');
});

test('sceneMain is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});