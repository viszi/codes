// https://www.codewars.com/kata/5629db57620258aa9d000014

function mix(s1, s2) {
    const frequencies = {};

    const genFrequency = (str, pos) => {
        const re = new RegExp(/[a-z]/);
        str.split('').forEach(char => {
            // count only lowercase letters
            if (re.test(char)) {
                if (char in frequencies) {
                    frequencies[char][pos] += 1;
                } else {
                    frequencies[char] = [0, 0];
                    frequencies[char][pos] += 1;
                }
            }
        });
    }

    genFrequency(s1, 0);
    genFrequency(s2, 1);

    let keys = [];
    for (const [key, value] of Object.entries(frequencies)) {
        const [l1, l2] = value;
        if (l1 > 1 || l2 > 1) {
            if (l1 === l2) {
                keys.push(`=:${key.repeat(l1)}`);
            } else if (l2 > l1) {
                keys.push(`2:${key.repeat(l2)}`);
            } else {
                keys.push(`1:${key.repeat(l1)}`);
            }
        }
    }
    // sort lexicographic
    keys.sort();

    // sort by length
    keys.sort((a, b) => b.length - a.length);

    return keys.join('/');
}

console.log(mix(")pnjgFvjovTbpvq<vjik1ojhx<jwfh", "Vcawb#wksg4ieni5hrqb/lrlm+niau"), "=> 1:jjjjj/1:vvvv/2:iii/1:hh/1:oo/1:pp/2:aa/2:bb/2:ll/2:nn/2:rr/2:ww");
console.log(mix("Grcce$djooVjjusWbpvyGssexHpbox", "Rhaeq-lauaApznfSbrhe2afksYeany"), "=> 2:aaaaa/1:jjj/1:ooo/1:sss/2:eee/1:bb/1:cc/1:pp/1:xx/2:ff/2:hh/2:nn");
console.log(mix("Are they here", "yes, they are here"), "=> 2:eeeee/2:yy/=:hh/=:rr");
console.log(mix("looping is fun but dangerous", "less dangerous than coding"), "=> 1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg");
console.log(mix(" In many languages", " there's a pair of functions"), "=> 1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt");
console.log(mix("Lords of the Fallen", "gamekult"), "=> 1:ee/1:ll/1:oo");
console.log(mix("codewars", "codewars"), "=> ");
console.log(mix("A generation must confront the looming ", "codewarrs"), "=> 1:nnnnn/1:ooooo/1:tttt/1:eee/1:gg/1:ii/1:mm/=:rr");
