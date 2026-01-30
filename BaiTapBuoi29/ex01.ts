interface EmployeeI{
    getId(): number
    getName(): string
    setName(name: string): void
    getSalary(): number
    setSalary(salary: number): void
}

abstract class Employee implements EmployeeI{
    private id: number
    private name: string
    private salary: number
    constructor(id: number, name: string, salary: number) {
        this.id = id
        this.name = name
        this.setSalary(salary)
    }
    getId(): number {
        return this.id
    }
    getName(): string {
        return this.name
    }
    setName(name: string): void {
        this.name = name
    }
    getSalary(){

        return this.salary
    }
    setSalary(salary: number): void {
        if(salary <= 0){
            throw new Error("Salary must be greater than 0")
        }
        this.salary = salary
    }

    abstract calculateSalary(): number
}


class Developer extends Employee{

    private overTimeHours: number
    constructor(id: number, name: string, salary: number, overTimeHours: number) {
        super(id, name, salary)
        this.overTimeHours = overTimeHours
    }

    calculateSalary(): number {
        return this.getSalary()+ this.overTimeHours * 50000
    }

}


class Manager extends Employee{

    private teamSize: number
    
    constructor(id: number, name: string, salary: number, teamSize: number) {
        super(id, name, salary)
        this.teamSize = teamSize
    }
    calculateSalary() {
       return this.getSalary() + this.teamSize * 200000
    }
    
}






const man:Manager = new Manager(2, "Nguyen", 30000, 10)
console.log(man.calculateSalary()) // 2030000


const dev:Developer = new Developer(1, "Binh", 10000, 20)
console.log(dev.calculateSalary())  // 1010000

const man2: Manager = new Manager(7, "Long", 40000, 3)

console.log(man2.getName())     // Long
man2.setName("Long Updated")
console.log(man2.getName())     // Long Updated

console.log(man2.getSalary())   // 40000
























