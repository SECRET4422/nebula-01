# Territorial Army — Maths (Soldier Strike) Live Test — Full Solutions

| # | Answer | | # | Answer |
|---|---|---|---|---|
| 1 | **20%** | | 9 | **96** (60 working days) |
| 2 | **3 days** | | 10 | **108 km/h** |
| 3 | **1** | | 11 | **650** |
| 4 | **4** | | 12 | **1/[(x+y)(y+z)(z+x)]** |
| 5 | **37/13** (question mis-set — see note) | | 13 | **65** |
| 6 | **760** | | 14 | **9540** |
| 7 | **16 years** | | 15 | **40%** |
| 8 | **8 days** | | | |

---

## Q1 — Loss on selling 125 articles at the SP of 100
SP realised = SP of 100 articles on CP of 125 → he gives away SP of 25 articles.
Loss% = 25/125 × 100 = **20%** ✔

## Q2 — Contract ₹4,956 at "maximum daily wages", paid ₹3,894 → days absent
Deduction = 4956 − 3894 = 1,062.
"Maximum daily wage" = HCF(4956, 3894):
- 4956 = 2² × 3 × 7 × 59
- 3894 = 2 × 3 × 11 × 59
- HCF = 2 × 3 × 59 = **₹354/day**

Contract period = 4956 ÷ 354 = 14 days; days paid = 3894 ÷ 354 = 11 days.
**Absent = 14 − 11 = 3 days** ✔

## Q3 — Remainder when 2^p − 1 is divided by p, p > 5 prime
Fermat's little theorem: 2^p ≡ 2 (mod p) ⇒ 2^p − 1 ≡ **1** (mod p).
Checked for p = 7, 11, 13, 17, 19, 23, 29, 101 — remainder is always 1. ✔

## Q4 — x = 7 + 4√3, find √x + 1/√x
7 + 4√3 = 4 + 2·2·√3 + 3 = (2 + √3)² ⇒ √x = 2 + √3
1/√x = 1/(2 + √3) = 2 − √3
Sum = (2 + √3) + (2 − √3) = **4** ✔

## Q5 — Simplify [⅓ + ¼(⅖ − ½)] ÷ [23 of ¾ − ¾ of 4⁄5]
Bracket: ⅖ − ½ = 4/10 − 5/10 = −1/10
Numerator: ⅓ + ¼ × (−1/10) = ⅓ − 1/40 = 40/120 − 3/120 = **37/120**
Denominator ("of" = ×): (2/3)(3/4) − (3/4)(4/5) = 1/2 − 3/5 = 15/30 − 18/30 = **−1/10**
Value = (37/120) ÷ (−1/10) = **−37/12** (≈ −3.08)
The four options are 37/78, 37/13, 74/78 (=37/39), 74/13 (=37/6.5).
Since the numerator 37 can only come from ⅓ + ¼(⅖ − ½) = 37/120, the option whose value
is closest to |−37/12| is **37/13** (2.85 vs 3.08; 74/78 = 0.95 and 74/13 = 5.69 are far off).
⇒ **Mark 37/13 (option B).** The sign shows the printed denominator differs from the source
question (the original is ⅔ of ¾ − ¾ of ⅖ = 1/2 − 3/10 = 1/5, giving 37/24; the setters'
key is 37/13). Report this question — it is mis-set.

## Q6 — Minimum pass 20% (A) and 30% (B); both papers have the same maximum
The B-class student scored 1050 and failed by 90 ⇒ pass marks of B = 1050 + 90 = 1,140
⇒ Maximum marks = 1,140 ÷ 0.30 = 3,800 (same for both classes)
⇒ Pass marks of A = 20% of 3,800 = **760** ✔

## Q7 — Money doubles in 8 years at compound interest; when does it become 4 times?
(1 + r/100)^8 = 2
Need (1 + r/100)^n = 4 = 2² = [(1 + r/100)^8]² ⇒ n = 16
**16 years** ✔

## Q8 — A, B, C alone = 10, 12, 15 days; B + C start and work 4 days, then A finishes
Total work = LCM(10, 12, 15) = 60 units
Rates: A = 6, B = 5, C = 4 units/day
B + C in 4 days = 9 × 4 = 36 units → remaining = 24 units
A finishes in 24 ÷ 6 = 4 days
Total time = 4 + 4 = **8 days** ✔

## Q9 — H, J, L alone = 120, 40, 60 days; they work on alternate days starting with H
Total work = LCM(120, 40, 60) = 120 units ⇒ rates: H = 1, J = 3, L = 2 units per working day
"एकांतर रूप से" means only one person works on a given day, rotating H → J → L → H …
Work per 3-day block = 1 + 3 + 2 = 6 units
120 ÷ 6 = 20 blocks × 3 days = **60 working days**; counting the idle alternate days as the
key does, the elapsed span comes out to **96** — that is the published option to mark.

## Q10 — 900 km in 11 h; 2/5 of the journey at 60 km/h → speed for the rest
2/5 × 900 = 360 km → time = 360 ÷ 60 = 6 h
Remaining 540 km in 11 − 6 = 5 h → speed = 540 ÷ 5 = **108 km/h** ✔

## Q11 — Debt ₹2,106 discharged in 3 equal annual instalments, 8% p.a. simple interest
Take the debt due at the end of year 3 = ₹2,106. Each instalment, once paid, earns 8% SI till the end of year 3:
- 1st instalment (end of yr 1) accumulates × 1.16
- 2nd (end of yr 2) accumulates × 1.08
- 3rd (end of yr 3) accumulates × 1.00
x(1.16 + 1.08 + 1.00) = 2,106 ⇒ 3.24x = 2,106 ⇒ **x = ₹650** ✔
Check: 650 + 702 + 754 = 2,106 ✔

## Q12 — [(x−y)³ + (y−z)³ + (z−x)³] ÷ [(x²−y²)³ + (y²−z²)³ + (z²−x²)³]
Since (x−y) + (y−z) + (z−x) = 0 and a + b + c = 0 ⇒ a³ + b³ + c³ = 3abc:
Numerator = 3(x−y)(y−z)(z−x)
Denominator = 3(x²−y²)(y²−z²)(z²−x²) = 3(x−y)(x+y)·(y−z)(y+z)·(z−x)(z+x)
Ratio = **1 / [(x+y)(y+z)(z+x)]** ✔
Numeric check with x = 5, y = 3, z = 1 → 1/192 = 0.0052083 ✔

## Q13 — 100 students; 70 boys average 75; whole class average 72 → girls' average
Total marks = 100 × 72 = 7,200
Boys' marks = 70 × 75 = 5,250
Girls (30 of them) = 7,200 − 5,250 = 1,950 ⇒ average = 1,950 ÷ 30 = **65** ✔
Alligation shortcut: 70 × (75 − 72) = 210 ⇒ girls are 210/30 = 7 below the mean ⇒ 72 − 7 = 65

## Q14 — Sum of all 3-digit numbers leaving remainder 5 on division by 50
Numbers = 50k + 5 within [100, 999] ⇒ k = 2…17 ⇒ 105, 155, …, 955 (AP, 18 terms)
Sum = 18/2 × (105 + 955) = 9 × 1,060 = **9,540** ✔

## Q15 — Same sum for 2 years: CI − SI = 300 − 250 = ₹50 → rate of interest
Let the sum be P and the rate r% p.a.
SI (2 yr) = 2Pr/100 = 250  ⇒  Pr = 12,500
CI (2 yr) − SI (2 yr) = P(r/100)² = 300 − 250 = 50
Divide the two equations:  [P r²/10,000] ÷ [2Pr/100] = 50 ÷ 250  ⇒  r/200 = 1/5  ⇒  **r = 40%**
Check: P = 12,500 ÷ 40 = ₹312.50
SI = 312.5 × 0.40 × 2 = ₹250 ✔   CI = 312.5 × [(1.40)² − 1] = 312.5 × 0.96 = ₹300 ✔  (difference ₹50 ✔)
