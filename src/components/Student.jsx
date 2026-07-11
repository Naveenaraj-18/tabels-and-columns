import { useState, useEffect } from "react";
import axios from "axios";

function Student() {
  const [student, setStudent] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [major, setMajor] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getStudent();
  }, []);

  function getStudent() {
    axios
      .get("http://localhost:3000/student")
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.log("Error fetching students:", error);
      });
  }

  function addStudent() {
    axios
      .post("http://localhost:3000/student", {
        id:id,
        name:name,
        batch:batch,
        major:major
      })
      .then(() => {
        getStudent();
     setId("");
    setName("");
    setBatch("");
    setMajor("");
      })

  }

  function editStudent(studentItem) {
    setId(studentItem.id);
    setName(studentItem.name);
    setBatch(studentItem.batch);
    setMajor(studentItem.major);

  }

  function updateStudent() {
    axios
      .put(`http://localhost:3000/student/${id}`, {
        id:id, 
        name:name,
        batch:batch,
        major:major,
      })
      .then(() => {
        getStudent();
      setId("");
    setName("");
    setBatch("");
    setMajor("");
      })
      .catch((error) => {
        console.log("Data not updated:", error);
      });
  }

  function deleteStudent() {
    axios
      .delete(`http://localhost:3000/student/${id}`)
      .then(() => {
        getStudent();
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

      <button onClick={addStudent}>Add Data</button>
      <button onClick={updateStudent}>Update</button>

      <br />
      <br />

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
          {student.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.batch}</td>
              <td>{item.major}</td>
              <td>
                <button onClick={() => editStudent(item)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteStudent(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;