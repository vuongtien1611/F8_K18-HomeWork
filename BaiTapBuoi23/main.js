//========================Exercise 1==============//

function getTriangle(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
        console.log("Not a Triangle")
        return
    }

    if (a === b && b === c) {
        console.log("Equilateral Triangle")
        return
    }

    if (
        a * a === b * b + c * c ||
        b * b === a * a + c * c ||
        c * c === a * a + b * b
    ) {
        console.log("Right Triangle")
        return
    }

    if (a === b || b === c || a === c) {
        console.log("Isosceles Triangle")
        return
    }

    if(a === b && a * a + b * b === c * c ||
    b === c && b * b + c * c === a * a ||
    c === a && c * c + a * a === b * b
    ) {
        console.log("Right Isosceles")
        return
    }

    console.log("Scalene Triangle")
}

getTriangle(1, 2, 3)


//=================================Exercied 2===========================//

function isPerfectSquare(a) {
    if (a < 0) {
        console.log("This is not a perfect square");
        return;
    }

    const sqrt = Math.sqrt(a);

    if (Number.isInteger(sqrt)) {
        console.log("This is a perfect square");
    } else {
        console.log("This is not a perfect square");
    }
}


isPerfectSquare(12)