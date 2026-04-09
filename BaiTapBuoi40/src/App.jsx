import {useState} from "react";

const Table = () => {

    const onEdit = (id) => {
        console.log("ID student:", id)
    }
    const onDelete = (id) => {
        const newStudents = students.filter(student => student.id !== id);
        setStudents(newStudents);
    };

    const columns  = [
        {
            value: 'id',
            text: 'ID',
            style: {
                textAlign: 'center',
            }
        },
        {
            value: 'name',
            text: 'Ten'
        },
        {
            value: 'age',
            text: 'Tuoi '
        },
        {
            value: 'class',
            text: 'Lop'
        },
        {
            value: 'address',
            text: 'Dia CHi'
        },
        {
            value: 'action',
            text: ''
        },
        {
            value: 'delete',
            text: 'Delete'
        }

    ]

    const [students, setStudents] = useState([
        { id: 1, name: "Nguyen Van A", age: 15, class: "10A1", address: "Ha Noi" },
        { id: 2, name: "Tran Thi B", age: 16, class: "10A2", address: "Hai Phong" },
        { id: 3, name: "Le Van C", age: 15, class: "10A1", address: "Da Nang" },
        { id: 4, name: "Pham Thi D", age: 17, class: "11A1", address: "Ha Noi" },
        { id: 5, name: "Hoang Van E", age: 16, class: "10A3", address: "Nam Dinh" },
        { id: 6, name: "Do Thi F", age: 15, class: "10A2", address: "Thai Binh" },
        { id: 7, name: "Bui Van G", age: 17, class: "11A2", address: "Hai Duong" },
        { id: 8, name: "Vu Thi H", age: 16, class: "10A3", address: "Ha Noi" },
        { id: 9, name: "Dang Van I", age: 15, class: "10A1", address: "Bac Ninh" },
        { id: 10, name: "Ngo Thi K", age: 17, class: "11A1", address: "Ha Nam" }
    ]);


    return (
        <table width="100%" border={1}>
            <thead>
            <tr>
                {columns.map(column => (
                    <th key={column.value}>{column.text}</th>
                ))}
            </tr>
            </thead>

            <tbody>
            {students.map(student => (
                <tr key={student.id}>
                    {columns.map(column => {
                        if(column.value === 'delete'){
                            return(
                              <td key={column.value}>
                                  <button onClick={() => onDelete(student.id)}>Xóa</button>
                              </td>
                            )
                        }

                        if (column.value === 'action') {
                            return (
                                <td key={column.value}>
                                    <button onClick={() => onEdit(student.id)}>
                                        Edit
                                    </button>
                                </td>
                            )
                        }

                        return (
                            <td key={column.value} style={column.style}>
                                {student[column.value]}
                            </td>
                        )
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table