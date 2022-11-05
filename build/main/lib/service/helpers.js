"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAttack = exports.getAttack = void 0;
function getAttack(attack) {
    const [rolls, sides, modifier] = parseAttack(attack);
    return rollDices(rolls, sides, modifier);
}
exports.getAttack = getAttack;
const AttackPattern = /(\d+)d(\d+)\+(\d+)/;
function parseAttack(attack) {
    const matches = attack.match(AttackPattern);
    if (matches === null) {
        throw new Error(`Invalid attack format for ${attack}. Should be in <Sides>d<Rolls>+Modifier format`);
    }
    return [Number(matches[1]), Number(matches[2]), Number(matches[3])];
}
exports.parseAttack = parseAttack;
function rollDices(sides, rolls, modifier) {
    let res = 0;
    for (let i = 0; i < rolls; i++) {
        res += getRandom(1, sides);
    }
    return res + modifier;
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvc2VydmljZS9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFNBQVMsQ0FBQyxNQUFjO0lBQ3RDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxPQUFPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFIRCw4QkFHQztBQUVELE1BQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDO0FBRTNDLFNBQWdCLFdBQVcsQ0FBQyxNQUFjO0lBQ3hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFNUMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLE1BQU0sZ0RBQWdELENBQUMsQ0FBQztLQUN0RztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFSRCxrQ0FRQztBQUVELFNBQVMsU0FBUyxDQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsUUFBZ0I7SUFDL0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM5QixHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDM0QsQ0FBQyJ9