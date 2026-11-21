import assert from "node:assert/strict";
import test from "node:test";
import { engravingPrice } from "../src/lib/engraving.ts";

test("both 540-piece references match the supplied amounts to the cent", () => {
  const cube = engravingPrice("cube", 9, "cannes-2");
  const tall = engravingPrice("tall", 9, "cannes-2");
  assert.deepEqual([cube.quantity, cube.ht, cube.vat, cube.ttc], [540, 96278, 14685, 110963]);
  assert.deepEqual([tall.quantity, tall.ht, tall.vat, tall.ttc], [540, 102551, 15031, 117582]);
});

test("the calibration is per order and unpriced delivery is excluded", () => {
  const pickupEstimate = engravingPrice("cube", 1, "other");
  const cannes = engravingPrice("cube", 1, "cannes-1");
  assert.equal(pickupEstimate.shipping, null);
  assert.equal(pickupEstimate.calibration, 4000);
  assert.equal(engravingPrice("cube", 2, "other").calibration, 4000);
  assert.equal(cannes.ttc - pickupEstimate.ttc, 6000);
});
