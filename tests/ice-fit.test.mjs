import test from 'node:test';
import assert from 'node:assert/strict';
import { ICE_FORMATS, checkFit, orderLink } from '../src/lib/ice-fit.ts';
const [cube, oldFashioned, collins, sphere] = ICE_FORMATS;
const round = (diameter, height=100) => ({ opening:diameter, base:diameter, height, irregular:false });
test('a 50 mm cube does not fit a 50 mm round opening', () => assert.equal(checkFit(cube, round(50)).fits, false));
test('cube uses diagonal and 4 mm total service clearance', () => {
 assert.equal(checkFit(cube, round(74)).fits, false);
 assert.equal(checkFit(cube, round(75)).fits, true);
 assert.equal(checkFit(cube, round(Math.hypot(50,50)+4)).fits, true);
});
test('sphere uses diameter, not diagonal', () => {
 assert.equal(checkFit(sphere, round(58)).fits, false);
 assert.equal(checkFit(sphere, round(59)).fits, true);
});
test('Collins checks width diagonal and 5 mm headroom', () => {
 assert.equal(checkFit(collins, round(61,124)).fits,false);
 assert.equal(checkFit(collins, round(61,125)).fits,true);
 assert.equal(checkFit(collins, round(60,150)).fits,false);
});
test('Old Fashioned cannot fit into a short rocks glass', () => assert.equal(checkFit(oldFashioned,round(85,74)).fits,false));
test('narrow tapered base is marked uncertain, not compatible', () => {
 const result = checkFit(cube,{opening:85,base:60,height:95,irregular:false});
 assert.equal(result.fits,false);assert.equal(result.uncertain,true);
});
test('curved glass never receives a compatibility guarantee', () => {
 const result = checkFit(sphere,{...round(90),irregular:true});
 assert.equal(result.fits,false);assert.equal(result.uncertain,true);
});
test('invalid measures never pass', () => {
 for (const n of [NaN,Infinity,0,-1]) for (const key of ['opening','base','height']) {
  assert.equal(checkFit(cube,{...round(90),[key]:n}).fits,false);
 }
});
test('default highball allows Collins but not 5 cm square blocks', () => {
 const glass={opening:66,base:62,height:155,irregular:false};
 assert.equal(checkFit(collins,glass).fits,true);
 assert.equal(checkFit(cube,glass).fits,false);
 assert.equal(checkFit(sphere,glass).fits,true);
});
test('product selection survives the order URL round trip', () => {
 const name='DELUXE CUBE 5x5x5 cm';const url=new URL(orderLink(name),'https://ice4riches.com');
 assert.equal(url.searchParams.get('product'),name);assert.equal(url.hash,'#Ice');
});
