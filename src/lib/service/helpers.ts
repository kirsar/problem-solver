export function getAttack(attack: string): number {
  const [rolls, sides, modifier] = parseAttack(attack);
  return rollDices(rolls, sides, modifier);
}

const AttackPattern = /(\d+)d(\d+)\+(\d+)/;

export function parseAttack(attack: string): [number, number, number] {
  const matches = attack.match(AttackPattern);

  if (matches === null) {
    throw new Error(`Invalid attack format for ${attack}. Should be in <Sides>d<Rolls>+Modifier format`);
  }

  return [Number(matches[1]), Number(matches[2]), Number(matches[3])];
}

function rollDices(sides: number, rolls: number, modifier: number): number {
  let res = 0;
  for (let i = 0; i < rolls; i++) {
    res += getRandom(1, sides);
  }
  return res + modifier;
}

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
