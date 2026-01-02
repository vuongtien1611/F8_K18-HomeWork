//===============================Task One====================//

//Step One:

    const classA = ["An" , "Binh" ,"Chi"]

//Step Two:
    let classB = classA

//Step Three:
    classB[0] = "An Update"

//Step Four:
    console.log(classA)


//classA and classB both point to the same memory address (0x01), so when the data is modified through classB, the content of classA is also changed.


//===========================Task Two====================//

// console.log(x + y);      // Result 1

    // The + operator is special in JavaScript:
    //      If one operand is a string, + performs string concatenation.
    //      So "10" + 2 becomes "10" + "2" → "102".


// console.log(x - y);      // Result 2
    //The - operator is numeric-only:
    //      JavaScript forces both operands to numbers.
    //      "10" is converted to 10, then 10 - 2 = 8.

// What does the result NaN in the last calculation mean?

    // JavaScript tries to convert "Hello" into a number.
    // "Hello" cannot be converted to a valid number.
    // NaN stands for "Not a Number" — it indicates an invalid numeric result.

// Why did it happen?

    // The numeric conversion fails, so the operation results in NaN.


//==================================Task Three=======================//

//Write a code snippet to check if a student is eligible to join the Programming Club.
    let age = 9
    let mathScore = 10
    let isVIP = false

    let canEnter = (age >= 10 && mathScore > 7) || isVIP
    console.log(canEnter)


// Logic Question: Is !(age < 10) mathematically the same as age >= 10?

    // !(age < 10) is mathematically equivalent to age >= 10 because
    // !(age < 10) excludes all values less than 10 (that is, it removes all numbers from negative infinity up to 9), leaving only values from 10 to positive infinity.

    // age >= 10 directly selects values from 10 to positive infinity.
    // Therefore, these two expressions are mathematically equivalent.



//================================Task Four=======================//
    const laptop = {
        brand: "Dell",
        price: 1000,
        spec: { ram: "8GB", ssd: "256GB" }
    };

    const myLaptop = laptop;
    myLaptop.brand = "Apple";

    const mySpec = laptop.spec;
    mySpec.ram = "16GB";

    console.log(laptop.brand);
    console.log(laptop.spec.ram);

// Answer the Questions:
    // The values of laptop.brand and laptop.spec.ram are Apple and 16GB, respectively.

    // This happens because myLaptop and laptop both reference the same memory address
    // (const myLaptop = laptop;). Therefore, when myLaptop.brand = "Apple" is modified, the value of laptop.brand is also updated.

    // Similarly, mySpec and laptop.spec reference the same nested object in memory
    // (const mySpec = laptop.spec;). As a result, when mySpec.ram = "16GB" is changed, the value of laptop.spec.ram is changed as well.







































