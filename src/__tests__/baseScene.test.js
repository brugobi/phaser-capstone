import { BaseScene } from '../scenes/baseScene';

const scene = new BaseScene();

test('sceneBase is a function', () => {
  expect(typeof BaseScene).toBe('function');
});

test('sceneBase is not undefined', () => {
  expect(scene.sys.config).toBe(undefined);
});