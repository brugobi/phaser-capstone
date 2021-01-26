import { Player } from '../common/comps/player';
import { Entity } from '../common/comps/entities';
import { EventDispatcher } from '../common/mc/eventDispatcher';
import { Bar } from '../common/comps/bar';
import { Grid } from '../common/comps/grid';
import { Clock } from '../common/comps/clock';
import {
  ChaserShip,
  GunShip,
  CarrierShip,
  EnemyLaser,
} from '../common/comps/enemies';
import { UIBlock } from '../common/ui/uiblock';

test('Player inherits from Entity', () => {
  expect(Player.prototype).toBeInstanceOf(Entity);
});

test('Entity inherits from Phaser.GameObjects.Sprite', () => {
  expect(Entity.prototype).toBeInstanceOf(Phaser.GameObjects.Sprite);
});

test('EventDispatcher inherits from Phaser.Events.EventEmitter', () => {
  expect(EventDispatcher.prototype).toBeInstanceOf(Phaser.Events.EventEmitter);
});

test('Bar inherits from Phaser.GameObjects.Container', () => {
  expect(Bar.prototype).toBeInstanceOf(Phaser.GameObjects.Container);
});

test('Clock inherits from UIBlock', () => {
  expect(Clock.prototype).toBeInstanceOf(UIBlock);
});

test('Grid inherits from UIBlock', () => {
  expect(Grid.prototype).toBeInstanceOf(UIBlock);
});

test('ChaserShip inherits from Entity', () => {
  expect(ChaserShip.prototype).toBeInstanceOf(Entity);
});

test('GunShip inherits from Entity', () => {
  expect(GunShip.prototype).toBeInstanceOf(Entity);
});

test('CarrierShip inherits from Entity', () => {
  expect(CarrierShip.prototype).toBeInstanceOf(Entity);
});

test('EnemyLaser inherits from Entity', () => {
  expect(EnemyLaser.prototype).toBeInstanceOf(Entity);
});

test('ChaserShip inherits from Entity', () => {
  expect(ChaserShip.prototype).toBeInstanceOf(Entity);
});
