import { ClassRoom } from "./classRoom.js"
import { Student } from "./student.js"

const jsClass = new ClassRoom("Lớp JS Cơ Bản")

const an = new Student("An")
const binh = new Student("Bình")
const chi = new Student("Chi")

jsClass.addStudent(an)
jsClass.addStudent(binh)
jsClass.addStudent(chi)

jsClass.postAnnouncement("Mai kiểm tra OOP")
