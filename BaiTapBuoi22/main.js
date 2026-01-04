//============Lesson One===============//

function classifyScore(score) {
    switch (true) {
        case score < 0 || score > 10:
            console.log("Invalid score");
            break;

        case score >= 9:
            console.log("Excellent");
            break;

        case score >= 8:
            console.log("Very Good");
            break;

        case score >= 6.5:
            console.log("Good");
            break;

        case score >= 5:
            console.log("Average");
            break;

        default:
            console.log("Weak");
    }
}

classifyScore(4.9);


//==================Lesson Two===============//
function  getDaysInMonth(month){
    switch (true) {
        case month < 1 || month > 12:
            console.log("Invalid month")
            break;
        case month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12:
            console.log("31 days")
            break;
        case month === 2:
            console.log("28 days")
            break;
        default:
            console.log("30 days")
    }
}

getDaysInMonth(1)



//==================Lesson Three===============//

function getEvenOdd(n) {
    return n % 2 === 0 ? "Even" : "Odd";
}

console.log(getEvenOdd(10));


//==================Lesson Four===============//

function getTicketPrice(age) {
    return  age < 13 ? 50000 : 100000

}
console.log(getTicketPrice(10));


//==================Lesson Five===============//

function  convertCtoF(celsius){
    return  celsius * 1.8 + 32
}

console.log(convertCtoF(100));



//==================Lesson Six===============//

function  getElectricityBill(kWh){
    if(kWh < 0)
        return "Invalid kWh"

    let sum = 0

    if (kWh <= 50){
        sum = kWh * 1678
    }
    else if(kWh <= 100){
        sum = 50 * 1678 +  (kWh - 50) * 1734
    }
    else if(kWh <= 200){
        sum = 50 * 1678 +  50 * 1734 + (kWh - 100) * 2014
    }
    else{
        sum = 50 * 1678 + 50 * 1734 + 100 * 2014 + (kWh - 200) * 2536

    }
    return sum
}

console.log(getElectricityBill(80))



























































