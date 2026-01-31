interface EmployeeI{
    id: number
    name: string
    salary: number
    hoursWorked: number
}



const partTime: EmployeeI = {
    id: 2,
    name: "Binh",
    salary: 20,
    hoursWorked: 40
}




const newPartTime: EmployeeI = {
    ...partTime,
    hoursWorked: 45
}

console.log(newPartTime)








