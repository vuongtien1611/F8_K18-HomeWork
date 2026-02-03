export interface StudentI {
    upDate(message: string): void
    getStudentName(): string

}


export class Student implements StudentI{
    constructor(private name: string) {
    }

    upDate(message: string): void {
        console.log(`👉 Học Sinh ${this.name} nhận được: ${message}`)
    }
    getStudentName(): string {
        return this.name
    }

}