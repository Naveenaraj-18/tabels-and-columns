import { useState, useEffect } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [major, setMajor] = useState("");

  useEffect(() => {
    getStudents();
  }, []);

  function getStudents() {
    axios.get("http://localhost:3000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log("Error fetching students:", error);
      });
  }

  function addStudents() {
    axios.post("http://localhost:3000/Students", {
      name: name,
      batch: batch,
      major: major
    }).then(() => {
      getStudents();
      setName(""); 
      setBatch(""); 
      setMajor("");
    });
  }

//   function editStudents(student) {
//    // setId(student.Id);
//     setName(student.Name);
//     setBatch(student.Batch);
//     setMajor(student.Major);
//   }

//   function updateStudents() {
//     axios.put(`http://localhost:3000/Students/${id}`, {
//       Id: id,
//       Name: name,
//       Batch: batch,
//       Major: major
//     }).then(() => {
//       getStudents();
//       setId(""); setName(""); setBatch(""); setMajor("");
//     }).catch((error) => {
//       console.log("Data not updated:", error);
//     });
//   }

//   function deleteStudent(studentId) {
//     axios.delete(`http://localhost:3000/Students/${studentId}`)
//       .then(() => {
//         getStudents();
//       })
//       .catch((error) => {
//         console.log("Error deleting student:", error);
//       });
//   }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Student List</h1>
      <br />
      <div>
        <label>NAME:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your NAME"
        />
      </div>
      <br />
      <div>
        <label>BATCH:</label>
        <input
          type="text"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          placeholder="Enter your BATCH"
        />
      </div>
      <br />
      <div>
        <label>MAJOR:</label>
        <input
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="Enter your MAJOR"
        />
      </div>
      <br />
      <button onClick={addStudents}>Add Data</button>
      <button>Update Data</button>
      <br /><br />
      <table border="1" align="center" cellPadding="10">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Batch</th>
            <th>Major</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.batch}</td>
              <td>{item.major}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
