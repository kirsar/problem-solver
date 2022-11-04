import _ from 'lodash';

import { Dragon } from './../model/dragon';
import { getAttack } from './helpers';

export class DragonService {
  /** Task 1: Sort the dragons by their hit points to get a picture of who the strongest dragon is */
  sortByHitPoints(dragons: Dragon[]): Dragon[] {
    return _.orderBy(dragons, (d) => d.hitPoints, 'desc');
  }

  /** Task 2: What is the combined flying speed of all the dragons? */
  getTotalFlyingSpeed(dragons: Dragon[]): number {
    return _.sumBy(dragons, (d) => d.speed.fly ?? 0);
  }

  /**
   * Task 3: Create a snippet that tells us if every dragon has the same flight speed
   * and also if they have the same walk speed.
   * */
  hasSameWalkAndFlySpeed(dragons: Dragon[]): [boolean, boolean] {
    if (dragons.length === 0) {
      return [true, true];
    }

    const firstFlySpeed = dragons[0].speed.fly ?? 0;
    const firstWalkSpeed = dragons[0].speed.walk ?? 0;

    return [
      dragons.every((d) => (d.speed.fly ?? 0) === firstFlySpeed),
      dragons.every((d) => (d.speed.walk ?? 0) === firstWalkSpeed),
    ];
  }

  /** Task 4: Create a function called `attack` to calculate and return the attack damage of a dragon.
   * Example:
   * Adult Black Dragon deals 2d10+6 damage.
   * This means that you roll 2x 10-sided dice (1-10), and adds 6 as a modifier.
   * For instance, dice 1 rolled as a 3, dice 2 rolled as a 7, so the damage will be 3+7 for the dice, and +6 for the modifier = 16.
   * */
  getAttack(dragon: Dragon): number {
    return getAttack(dragon.attack);
  }

  /** Task 5: Create a function called `battle` that allows you to match 2 dragons against each other,
   * in a battle to the death!
   * Using the `attack` function, simulate attacks from each dragon that subtracts the dragons hit points.
   * The battle is over once one or the other dragon reaches 0 hit points.
   * Return the winning dragon
   * */
  battle(dragon1: Dragon, dragon2: Dragon): Dragon {
    let hitPoints1 = dragon1.hitPoints;
    let hitPoints2 = dragon2.hitPoints;

    while (hitPoints1 > 0 && hitPoints2 > 0) {
      hitPoints2 -= getAttack(dragon1.attack);
      hitPoints1 -= getAttack(dragon2.attack);
    }

    return hitPoints2 <= 0 ? dragon1 : dragon2;
  }

  /** Task 6: Imagine that fair battle van be only for dragons whose hit points differ not more then k percents
   * Find the dragons which can have fair battle with most dragons
   * */
  getMostBalancedDragons(dragons: Dragon[], hitPointsDeltaPercentage: number): Dragon[] {
    if (hitPointsDeltaPercentage < 0 || hitPointsDeltaPercentage > 1) {
      throw new Error(
        `Invalid argument value for hitPointsDeltaPercentage ${hitPointsDeltaPercentage}. Should be between 0 and 1`,
      );
    }

    // sort dragons by hit points ascending to enable binary search on the array
    const sortedDragons = _.orderBy(dragons, (d) => d.hitPoints, 'asc');

    let maxPartners = 0;
    let balancedDragons: Dragon[] = [];

    for (const dragon of sortedDragons) {
      const lowerHp = Math.ceil(dragon.hitPoints * (1 - hitPointsDeltaPercentage));
      const upperHp = Math.floor(dragon.hitPoints * (1 + hitPointsDeltaPercentage));

      // find indices at which lower and upper hp can be inserted to keep array sorted
      const lowerIndex = _.sortedIndexBy(sortedDragons, <Dragon>{ hitPoints: lowerHp }, (d) => d.hitPoints);
      const upperIndex = _.sortedLastIndexBy(sortedDragons, <Dragon>{ hitPoints: upperHp }, (d) => d.hitPoints);

      // count number of dragons in the index range and subtract subject dragon itself
      const numberOfPartners = upperIndex - lowerIndex - 1;

      if (numberOfPartners > maxPartners) {
        maxPartners = numberOfPartners;
        balancedDragons = [dragon];
      } else if (numberOfPartners === maxPartners) {
        balancedDragons.push(dragon);
      }
    }

    return balancedDragons;
  }
}
