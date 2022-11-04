import { Speed } from './speed';

export interface Dragon {
  name: string;
  hitPoints: number;
  speed: Speed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  xp: number;
  attack: string;
}
