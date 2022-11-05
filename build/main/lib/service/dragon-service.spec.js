"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dragon_data_json_1 = __importDefault(require("./dragon-data.json"));
const dragon_service_1 = require("./dragon-service");
const helpers_1 = require("./helpers");
const service = new dragon_service_1.DragonService();
const dragons = dragon_data_json_1.default;
const [adultBlackDragon, adultBlueDragon, adultBrassDragon, adultBronzeDragon, adultCopperDragon, adultGoldDragon, adultGreenDragon, walkingDragon, powerlessDragon,] = dragons;
describe('dragon service tests', () => {
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
        const [rolls, sides, modifier] = (0, helpers_1.parseAttack)(adultBlueDragon.attack);
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
        console.log(`In a battle between a ${powerlessDragon.name} and a ${adultBlackDragon.name}, the winner is ${winner.name}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ29uLXNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvc2VydmljZS9kcmFnb24tc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsMEVBQTZDO0FBQzdDLHFEQUFpRDtBQUNqRCx1Q0FBd0M7QUFFeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBYSxFQUFFLENBQUM7QUFDcEMsTUFBTSxPQUFPLEdBQUcsMEJBQXVCLENBQUM7QUFFeEMsTUFBTSxDQUNKLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZUFBZSxFQUNoQixHQUFHLE9BQU8sQ0FBQztBQUVaLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFTLEVBQUU7SUFDMUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFFNUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUNsQyxPQUFPLENBQUMsR0FB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