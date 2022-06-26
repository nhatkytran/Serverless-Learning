'use strict';

const studentsList = document.querySelector('.students');

console.log(123);

const fetchStudents = async function () {
  try {
    const { data } = await axios('/api/basic');
    const students = data
      .map(student => {
        return `
          <li>
            <h4>Name: ${student.name}</h4>
            <p>Ag: ${student.age}</p>
          </li>
        `;
      })
      .join('');

    studentsList.insertAdjacentHTML('afterbegin', students);
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
};

fetchStudents();
