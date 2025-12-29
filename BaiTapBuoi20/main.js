//----------------------------------------Part One---------------------------//

let name = "Tien"
const age = 20
let isStudent = true

console.log(name, age, isStudent)

//---------------------------------------------------------

let a = 5
let b = 10
a=6
b=9
console.log(a,b)


//---------------------------------------Part Two-------------------//


//const khác let ở điểm nào?

    // const dung cho gia tri khong duoc phep thay doi sau khi da khoi tao
    // con let dung cho gia tri co the thay doi nhieu lan trong qua trinh chay code

        //VD:
                // --let---//
            // let a = 5; a = 6;
            //console.log(a) -> in ra a = 6

                // --const---//
            //const a = 5; a = 6;
            //console.log(a) -> loi!

//-------------------------------------------------------------------//

//Khi nào nên dùng const?

    // dung khi bien do khong can Update gia tri

//-------------------------------------------------------------------//

// Đoạn code sau đúng hay sai? Giải thích:

    // Doan code tren sai
    // do dang khoi tao bien x la const thi khi gia tri x thay doi chuong trinh se loi

//-------------------------Part three-----------------------------------------//


// Xác định kiểu dữ liệu của các giá trị sau (ghi comment):

    //100 -> Number
    //true -> Boolean
    // [1, 2, 3] -> Array
    // { name: "An", age: 20 } ->object
    // null -> object
    // undefined -> undefined(chua xac dinh)


// Tạo một object student

    const student = {
        name: "Tien",
        age: 20,
        scores : [10, 20, 30]
    }
    console.log(student)


//----------------------------Part Four-----------------------------------------//

let StringToNumber = "1000"
let n = Number(StringToNumber)

let numberToString = 1000
 let s =  String(numberToString)

let BooleanToString = true
let e = String(BooleanToString)

console.log(n,s,e)
console.log(typeof(n))
console.log(typeof(s))
console.log(typeof(e))


// ------------------------------Part Five-----------------------------------------//


    //Boolean(0) -> false
    //Boolean(1) -> true
    // Boolean("") -> false
    // Boolean("hello") -> true
    // Boolean(null) -> false
    // Boolean([]) -> true



//-----------------------------Part Six-----------------------------------------//


const number = [4,3,1,5,1]

console.log(number[0])
console.log(number[number.length-1])


// Khi khoi tao bien a voi kieu primitive, RAM cap phat o nho de luu gia tri cua a.
// Gan a = numbers thuc chat la copy gia tri, khong phai cung tro mot vung nho.




