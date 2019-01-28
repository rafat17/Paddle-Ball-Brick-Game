import Brick from "./brick.js";
import Brickorange from "./brickorange.js";

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 150 * brickIndex,
          y: 60 + 20 * rowIndex
        };

        bricks.push(new Brick(game, position));
      }

      if (brick === 2) {
        let position = {
          x: 150 * brickIndex,
          y: 60 + 20 * rowIndex
        };

        bricks.push(new Brickorange(game, position));
      }
    });
  });

  return bricks;
}

export const level1 = [
 [0, 1, 2, 0, 0, 0, 0, 2, 1, 0],
 [1, 1, 2, 0, 0, 1, 1, 0, 1, 0],
 [1, 0, 0, 1, 0, 1, 0, 0, 2, 1],
 [0, 0, 0, 0, 0, 1, 0, 0, 1, 0]

];

export const level2 = [
  [0, 2, 1, 0, 0, 0, 0, 2, 1, 0],
  [1, 1, 1, 1, 1, 0, 1, 1, 2, 1],
  [1, 2, 1, 1, 0, 1, 2, 1, 1, 0],
  [2, 1, 1, 2, 1, 1, 0, 1, 1, 1]
];

export const level3 = [
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 1, 0]
];
