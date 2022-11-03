import { ProblemSolver } from "./problem-solver";

describe('problem solver tests', () => {
  test('problem solver returns zero', async () => {
    const result = await new ProblemSolver().solve();
    expect(result).toBe(0);
  });
})

