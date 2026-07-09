import { useState, useEffect } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [major, setMajor] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  function getStudents() {
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log("Error fetching students:", error);
      });
  }

  function resetForm() {
    setId("");
    setName("");
    setBatch("");
    setMajor("");
    setIsEditing(false);
  }

  function addStudents() {
    if (!name || !batch || !major) return;

    axios
      .post("http://localhost:3000/students", {
        name,
        batch,
        major,
      })
      .then(() => {
        getStudents();
        resetForm();
      })
      .catch((error) => {
        console.log("Error adding student:", error);
      });
  }

  function editStudents(student) {
    setId(student.id);
    setName(student.name);
    setBatch(student.batch);
    setMajor(student.major);
    setIsEditing(true);
  }

  function updateStudents() {
    if (!id) return;

    axios
      .put(`http://localhost:3000/students/${id}`, {
        id,
        name,
        batch,
        major,
      })
      .then(() => {
        getStudents();
        resetForm();
      })
      .catch((error) => {
        console.log("Data not updated:", error);
      });
  }

  function deleteStudent(studentId) {
    axios
      .delete(`http://localhost:3000/students/${studentId}`)
      .then(() => {
        getStudents();
      })
      .catch((error) => {
        console.log("Error deleting student:", error);
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

      <button onClick={isEditing ? updateStudents : addStudents}>
        {isEditing ? "Update Data" : "Add Data"}
      </button>

      {isEditing && (
        <button onClick={resetForm} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      )}

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
          {students.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.batch}</td>
              <td>{item.major}</td>
              <td>
                <button onClick={() => editStudents(item)}>Edit</button>
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

export default Students;