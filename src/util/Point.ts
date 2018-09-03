export const Orientation: ReadonlyArray<string> = Object.freeze(['N','E','S','W']);
export interface GridPoint {
  x: number; 
  y: number;
}
export default interface Point extends GridPoint {
  orientation: number;
}