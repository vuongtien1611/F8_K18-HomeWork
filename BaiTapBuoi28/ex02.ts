//==================Part One===============================

interface EmployeeI{
    id: number
    name: string
    salary: number
    getSalary():  number
}

//======================Part Tow==============================
class FullTimeEmployee implements EmployeeI {
    id: number
    name: string
    salary: number
    getSalary (): number {
        return this.salary
    }

}

const employee = new FullTimeEmployee()
employee.salary = 2000
console.log(employee.getSalary())   // => 2000




// =====================Part Three=====================================

interface PartTimeEmployeeI extends EmployeeI{
    hoursWorked: number
}

class PartTimeEmployee implements PartTimeEmployeeI{
    hoursWorked: number
    id: number
    name: string
    salary: number
    getSalary(): number {
        return this.salary * this.hoursWorked
    }

}

const emp1  = new PartTimeEmployee()
emp1.salary = 20
emp1.hoursWorked = 40
console.log(emp1.getSalary())   // => 800

const emp2 = new PartTimeEmployee()
emp2.salary = 10
emp2.hoursWorked = 20
console.log(emp2.getSalary())  // => 200
//================================Part Four=====================


function calculateTotalSalary(employees: EmployeeI[]): number{
    let totalSalary = 0

    for (const employee of employees){
        totalSalary += employee.getSalary()
    }

    return totalSalary
}

const e = calculateTotalSalary([employee, emp1, emp2])
console.log(e)   // => 3000
