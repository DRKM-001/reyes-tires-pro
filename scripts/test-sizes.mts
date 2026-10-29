import { parseSize, isPlausibleSize } from "../modules/tire-quote/core.ts";
const cases: [string, string, boolean][] = [
  ["2254517","225/45R17",true],["225 45 17","225/45R17",true],["225-45-17","225/45R17",true],["225/45/17","225/45R17",true],
  ["p225 45r17","225/45R17",true],["P225/60R16","225/60R16",true],["22545r17","225/45R17",true],["225.45.17","225/45R17",true],
  ["lt2657017","LT265/70R17",true],["LT 265/70 R 17","LT265/70R17",true],["lt265 70 17","LT265/70R17",true],
  ["245/40zr18","245/40ZR18",true],["24540zr18","245/40ZR18",true],["215/55 r16 93v","215/55R16",true],
  ["35x1250r17","35X12.50R17",true],["35 12.50 17","35X12.50R17",true],["35125017","35X12.50R17",true],["35x12.5x17","35X12.50R17",true],
  ["31x10.5r15","31X10.50R15",true],["33/12.5/20","33X12.50R20",true],["LT35x12.50R20","LT35X12.50R20",true],["37x13.50r22","37X13.50R22",true],
  ["11r22.5","11R22.5",true],["11 22.5","11R22.5",true],["295/75r22.5","295/75R22.5",true],
  ["11225","11R22.5",true],["1122.5","11R22.5",true],["11r225","11R22.5",true],["11-225","11R22.5",true],["11 225","11R22.5",true],["11R24.5","11R24.5",true],["11245","11R24.5",true],["8195","8R19.5",true],["12r225","12R22.5",true],
  ["29575225","295/75R22.5",true],["295 75 225","295/75R22.5",true],["2857524.5","285/75R24.5",true],["2257019.5","225/70R19.5",true],["315/80r22.5","315/80R22.5",true],
  ["22/45R16","22/45R16",false],["2254","2254",false],["abc","ABC",false],
];
let bad = 0;
for (const [i, want, valid] of cases) {
  const p = parseSize(i);
  const ok = p.size === want && p.valid === valid;
  if (!ok) bad++;
  console.log(ok ? "ok  " : "FAIL", i.padEnd(16), "->", p.size.padEnd(15), p.kind.padEnd(9), p.valid, ok ? "" : `(want ${want} ${valid})`);
}
console.log(bad ? `${bad} FAILED` : `ALL ${cases.length} PASS`);
if (bad) process.exit(1);
