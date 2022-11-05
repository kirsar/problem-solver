import { Dragon } from './../model/dragon';
export declare class DragonService {
    /** Task 1: Sort the dragons by their hit points to get a picture of who the strongest dragon is */
    sortByHitPoints(dragons: Dragon[]): Dragon[];
    /** Task 2: What is the combined flying speed of all the dragons? */
    getTotalFlyingSpeed(dragons: Dragon[]): number;
    /**
     * Task 3: Create a snippet that tells us if every dragon has the same flight speed
     * and also if they have the same walk speed.
     * */
    hasSameWalkAndFlySpeed(dragons: Dragon[]): [boolean, boolean];
    /** Task 4: Create a function called `attack` to calculate and return the attack damage of a dragon.
     * Example:
     * Adult Black Dragon deals 2d10+6 damage.
     * This means that you roll 2x 10-sided dice (1-10), and adds 6 as a modifier.
     * For instance, dice 1 rolled as a 3, dice 2 rolled as a 7, so the damage will be 3+7 for the dice, and +6 for the modifier = 16.
     * */
    getAttack(dragon: Dragon): number;
    /** Task 5: Create a function called `battle` that allows you to match 2 dragons against each other,
     * in a battle to the death!
     * Using the `attack` function, simulate attacks from each dragon that subtracts the dragons hit points.
     * The battle is over once one or the other dragon reaches 0 hit points.
     * Return the winning dragon
     * */
    battle(dragon1: Dragon, dragon2: Dragon): Dragon;
    /** Task 6: Imagine that fair battle van be only for dragons whose hit points differ not more then k percents
     * Find the dragons which can have fair battle with most dragons
     * */
    getMostBalancedDragons(dragons: Dragon[], hitPointsDeltaPercentage: number): Dragon[];
}
