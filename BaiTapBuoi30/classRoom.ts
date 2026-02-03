import {Student} from "./student.js"

export interface ClassRoomI{
    addStudent:(student: Student) => void
    removeStudent: (student: Student) => void
    postAnnouncement:(message: string) => void // The teacher posts an announcement
    notify:(message: string) => void  // Send a notification to all students

}


export class ClassRoom implements ClassRoomI{

    private name: string
    private students: Student[] = []
    constructor(name: string) {
        this.name = name
    }

    notify(message: string): void {
        this.students.forEach(student => student.upDate(message))
    }
    addStudent(student: Student): void {
        this.students.push(student)
    }
    removeStudent(student: Student) {
        this.students = this.students.filter(students => students !== student)
       console.log(`${student.getStudentName()} đã rời khỏi lớp`)
    }
    postAnnouncement(message: string) {
        console.log(`${this.name} có thông báo mới`)
        this.notify(message)
    }

}

// const class1 = new classRoom("Class 1")
// class1.addStudent("Student 1")
// class1.addStudent("Student 2")
// class1.addStudent("Student 3")
// class1.removeStudent("Student 2")
// class1.postAnnouncement("Good morning everyone!")
//
// console.log(class1)




