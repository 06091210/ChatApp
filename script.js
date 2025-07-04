function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

let a = 1, b = -6, c = 2;
let D = b*b - 4*a*c;
let E = Math.sqrt(D);
let A1, B1, A2, B2;

if (b !== 0) {
    let g = gcd(Math.abs(b), 2*a);
    A1 = -b / g;
    B1 = 2*a / g;
} else {
    A1 = 0;
    B1 = 1;
}

if (D > 0) {
    if (Number.isInteger(E)) {
        let g = gcd(E, 2*a);
        A2 = E / g;
        B2 = 2*a / g;
    } else {
        // 有理化されていない無理数
        let n = D;
        let d = 1;
        for (let i = 1; i <= Math.sqrt(n); i++) {
            if (n % (i*i) === 0) d = i;
        }
        let e = n / (d*d);
        let g = gcd(d, 2*a);
        d = d / g;
        B2 = 2*a / g;
        A2 = (d === 1 ? "" : d) + "√" + e;
    }
} else if (D === 0) {
    A2 = 0;
    B2 = 1;
} else {
    console.log("Imaginary roots not supported.");
    return;
}

// 出力（簡略表示：完全なPython再現ではなくロジック確認用）
if (typeof A2 === "string") {
    if (A1 === 0) {
        console.log(`±${A2}/${B2}`);
    } else {
        console.log(`(${A1}±${A2})/${B2}`);
    }
} else {
    let r1 = (A1 + A2) / B1;
    let r2 = (A1 - A2) / B1;
    if (r1 === r2) {
        console.log(`${r1}`);
    } else {
        console.log(`${r1}, ${r2}`);
    }
}
