const students = []

const tableBody = document.querySelector("#studentsTable tbody")
const averageDiv = document.getElementById("average")

document.getElementById("studentForm").addEventListener('submit', function(e){
    e.preventDefault();

    const name=document.getElementById('name').value.trim();
    const lastName=document.getElementById('lastName').value.trim();
    const grade=document.getElementById('grade').value.trim();

    if(grade < 1 || grade > 7 || isNaN(grade) ){
        alert("Error Datos Incorrectos")
        return
    }

    const student={name, lastName, grade};
    students.push(student)

    addStudentToTable(student)
    calcularPromedio()

    this.reset()

})

function addStudentToTable(student)
{
    const row=document.createElement("tr")
    row.innerHTML = 
    `
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td><button class="btn btn-danger delete">Eliminar</button></td>
    `;

    row.querySelector(".delete").addEventListener("click",function(){
        deleteEstudiante(student,row);
    })
    tableBody.appendChild(row)
}

function deleteEstudiante(student,row){
    // buscar el estudiante en el array
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}

function calcularPromedio()
{
    if(students.length === 0){
        return averageDiv.textContent="Promedio general del curso: No Disponible";
    }
    let total = 0
    for (let i = 0; i < students.length; i++) {
        total += Math.floor(students[i].grade * 100) * 0.01;
    }
    const average = total/students.length
    averageDiv.textContent=`Promedio General del Curso: ${average.toFixed(2)}`
}