import { Dragon } from '../model/dragon';

import dragonsJson from './dragon-data.json';
import { DragonService } from './dragon-service';
import { parseAttack } from './helpers';

const service = new DragonService();
const dragons = dragonsJson as Dragon[];

const [
  adultBlackDragon,
  adultBlueDragon,
  adultBrassDragon,
  adultBronzeDragon,
  adultCopperDragon,
  adultGoldDragon,
  adultGreenDragon,
  walkingDragon,
  powerlessDragon,
] = dragons;

describe('dragon service tests', (): void => {
  test('sort dragons by hit points', () => {
    console.log('------------------ Task 1 ------------------');

    const sortedDragons = service.sortByHitPoints(dragons);
    expect(sortedDragons[0].hitPoints).toBe(adultGoldDragon.hitPoints);
    expect(sortedDragons[dragons.length - 1].hitPoints).toBe(adultBrassDragon.hitPoints);

    console.log(sortedDragons);
  });

  test('get total flying speed', () => {
    console.log('------------------ Task 2 ------------------');

    const totalSpeed = service.getTotalFlyingSpeed(dragons);
    expect(totalSpeed).toBe(dragons.reduce((acc, d) => acc + (d.speed?.fly ?? 0), 0));

    console.log(`The combined flying speed of the dragons is ${totalSpeed}`);
  });

  test('walking dragon has zero flying speed', () => {
    const totalSpeed = service.getTotalFlyingSpeed([walkingDragon]);
    expect(totalSpeed).toBe(0);
  });

  test('different dragons has different fly and walk speeds', () => {
    console.log('------------------ Task 3 ------------------');

    const [hasSameWalkSpeeds, hasSameFlySpeeds] = service.hasSameWalkAndFlySpeed(dragons);
    expect(hasSameWalkSpeeds).toBeFalsy();
    expect(hasSameFlySpeeds).toBeFalsy();

    console.log(`Same flight speed: ${hasSameWalkSpeeds ? 'yes' : 'no'}`);
    console.log(`Same walk speed: ${hasSameFlySpeeds ? 'yes' : 'no'}`);
  });

  test('same dragons has same fly and walk speeds', () => {
    const [hasSameWalkSpeeds, hasSameFlySpeeds] = service.hasSameWalkAndFlySpeed([
      adultCopperDragon,
      adultCopperDragon,
    ]);
    expect(hasSameWalkSpeeds).toBeTruthy();
    expect(hasSameFlySpeeds).toBeTruthy();
  });

  test('empty dragon list has same fly and walk speeds', () => {
    const [hasSameWalkSpeeds, hasSameFlySpeeds] = service.hasSameWalkAndFlySpeed([]);
    expect(hasSameWalkSpeeds).toBeTruthy();
    expect(hasSameFlySpeeds).toBeTruthy();
  });

  test('dragon attack is in expected limits', () => {
    console.log('------------------ Task 4 ------------------');

    const attack = service.getAttack(adultBlueDragon);

    const [rolls, sides, modifier] = parseAttack(adultBlueDragon.attack);
    const min = rolls + modifier;
    const max = rolls * sides + modifier;

    expect(attack).toBeGreaterThanOrEqual(min);
    expect(attack).toBeLessThanOrEqual(max);

    console.log(`The ${adultBlueDragon.name} deals ${attack} points of damage`);
  });

  test('powerless dragon always loose the battle', () => {
    console.log('------------------ Task 5 ------------------');

    const winner = service.battle(powerlessDragon, adultBlackDragon);
    expect(winner.name).toBe(adultBlackDragon.name);

    console.log(
      `In a battle between a ${powerlessDragon.name} and a ${adultBlackDragon.name}, the winner is ${winner.name}`,
    );
  });

  test('find most balanced dragon to fight with most number of dragons', () => {
    console.log('------------------ Task 6 ------------------');

    const mostBalancedDragons = service.getMostBalancedDragons(dragons, 0.1);
    expect(mostBalancedDragons.length).toBe(5);
    expect(mostBalancedDragons).toContain(adultBlackDragon);
    expect(mostBalancedDragons).toContain(adultGreenDragon);
    expect(mostBalancedDragons).toContain(walkingDragon);
    expect(mostBalancedDragons).toContain(powerlessDragon);
    expect(mostBalancedDragons).toContain(adultBronzeDragon);

    console.log(`Most balanced dragon are ${mostBalancedDragons}`);
  });
});
