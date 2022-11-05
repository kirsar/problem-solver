"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragonService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("./helpers");
class DragonService {
    /** Task 1: Sort the dragons by their hit points to get a picture of who the strongest dragon is */
    sortByHitPoints(dragons) {
        return lodash_1.default.orderBy(dragons, (d) => d.hitPoints, 'desc');
    }
    /** Task 2: What is the combined flying speed of all the dragons? */
    getTotalFlyingSpeed(dragons) {
        return lodash_1.default.sumBy(dragons, (d) => d.speed.fly ?? 0);
    }
    /**
     * Task 3: Create a snippet that tells us if every dragon has the same flight speed
     * and also if they have the same walk speed.
     * */
    hasSameWalkAndFlySpeed(dragons) {
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
    getAttack(dragon) {
        return (0, helpers_1.getAttack)(dragon.attack);
    }
    /** Task 5: Create a function called `battle` that allows you to match 2 dragons against each other,
     * in a battle to the death!
     * Using the `attack` function, simulate attacks from each dragon that subtracts the dragons hit points.
     * The battle is over once one or the other dragon reaches 0 hit points.
     * Return the winning dragon
     * */
    battle(dragon1, dragon2) {
        let hitPoints1 = dragon1.hitPoints;
        let hitPoints2 = dragon2.hitPoints;
        while (hitPoints1 > 0 && hitPoints2 > 0) {
            hitPoints2 -= (0, helpers_1.getAttack)(dragon1.attack);
            hitPoints1 -= (0, helpers_1.getAttack)(dragon2.attack);
        }
        return hitPoints2 <= 0 ? dragon1 : dragon2;
    }
    /** Task 6: Imagine that fair battle van be only for dragons whose hit points differ not more then k percents
     * Find the dragons which can have fair battle with most dragons
     * */
    getMostBalancedDragons(dragons, hitPointsDeltaPercentage) {
        if (hitPointsDeltaPercentage < 0 || hitPointsDeltaPercentage > 1) {
            throw new Error(`Invalid argument value for hitPointsDeltaPercentage ${hitPointsDeltaPercentage}. Should be between 0 and 1`);
        }
        // sort dragons by hit points ascending to enable binary search on the array
        const sortedDragons = lodash_1.default.orderBy(dragons, (d) => d.hitPoints, 'asc');
        let maxPartners = 0;
        let balancedDragons = [];
        for (const dragon of sortedDragons) {
            const lowerHp = Math.ceil(dragon.hitPoints * (1 - hitPointsDeltaPercentage));
            const upperHp = Math.floor(dragon.hitPoints * (1 + hitPointsDeltaPercentage));
            // find indices at which lower and upper hp can be inserted to keep array sorted
            const lowerIndex = lodash_1.default.sortedIndexBy(sortedDragons, { hitPoints: lowerHp }, (d) => d.hitPoints);
            const upperIndex = lodash_1.default.sortedLastIndexBy(sortedDragons, { hitPoints: upperHp }, (d) => d.hitPoints);
            // count number of dragons in the index range and subtract subject dragon itself
            const numberOfPartners = upperIndex - lowerIndex - 1;
            if (numberOfPartners > maxPartners) {
                maxPartners = numberOfPartners;
                balancedDragons = [dragon];
            }
            else if (numberOfPartners === maxPartners) {
                balancedDragons.push(dragon);
            }
        }
        return balancedDragons;
    }
}
exports.DragonService = DragonService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ29uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3NlcnZpY2UvZHJhZ29uLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQXVCO0FBR3ZCLHVDQUFzQztBQUV0QyxNQUFhLGFBQWE7SUFDeEIsbUdBQW1HO0lBQ25HLGVBQWUsQ0FBQyxPQUFpQjtRQUMvQixPQUFPLGdCQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsb0VBQW9FO0lBQ3BFLG1CQUFtQixDQUFDLE9BQWlCO1FBQ25DLE9BQU8sZ0JBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztTQUdLO0lBQ0wsc0JBQXNCLENBQUMsT0FBaUI7UUFDdEMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4QixPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUVsRCxPQUFPO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxhQUFhLENBQUM7WUFDMUQsT0FBTyxD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