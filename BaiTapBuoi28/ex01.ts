interface EmployeeI{
    id: number
    name: string
    salary: number
    hoursWorked: number
}



const partTime = {
    id: 2,
    name: "Binh",
    salary: 20,
    hoursWorked: 40
}




const newPartTime = {
    ...partTime,
    hoursWorked: 45
}

console.log(newPartTime)








