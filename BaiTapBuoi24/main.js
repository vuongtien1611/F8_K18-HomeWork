//-----------Lesson 1-----------//

function isPrime(n){
    if(n <= 1) return false;
    if(n === 2 ) return true;
    if(n % 2 === 0) return false;
    for (let i = 3; i * i<= n; i = i + 2) {
        if (n % i === 0) return false;
    }
    return true;
}

console.log(isPrime(13))


//----------Lesson 2-----------//

function isPerfectNumber(n) {
    if (n <= 1) return false

    let sum = 1

    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            sum += i
            if (i !== n / i)
                sum += n / i
        }
    }

    return sum === n
}


console.log(isPerfectNumber(28))