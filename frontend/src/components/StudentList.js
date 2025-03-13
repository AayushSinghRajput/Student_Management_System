import { useEffect, useState } from "react";
import { getStudents, getStudentDetails, deleteStudent } from "../api/students";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudents();
      //sorting the students accroding to their rollno
      const sortedStudents = res.data.sort((a, b) => a.rollno - b.rollno);
      setStudents(sortedStudents);
      setFilteredStudents(sortedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDetails = async (id) => {
    setLoading(true);
    try {
      const res = await getStudentDetails(id);
      const studentData = res.data;

      //  Calculate total Present days
      const totalPresent = studentData.attendance
        ? studentData.attendance.filter((a) => a.status === "Present").length
        : 0;

      setSelectedStudent({
        ...studentData,
        totalPresent, // Store total Present days separately
      });
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
        setSelectedStudent(null);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.rollno.toString().includes(query)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-4">
        {selectedStudent ? "Student Details" : "All Students"}
      </h2>

      {!selectedStudent && (
        <input
          type="text"
          placeholder="Search by name, email, or roll number..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
      )}

      {loading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : selectedStudent ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Total Attendance</th>
                <th className="p-3 text-left">Attendance</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 hover:bg-gray-200">
                <td className="p-3 text-left">{selectedStudent.rollno}</td>
                <td className="p-3 text-left">{selectedStudent.name}</td>
                <td className="p-3 text-left">{selectedStudent.email}</td>
                <td className="p-3 text-left">{selectedStudent.phone}</td>
                <td className="p-3 text-left">
                  {selectedStudent.dob.split("T")[0]}
                </td>
                <td className="p-3 text-left">{selectedStudent.address}</td>
                <td className="p-3 text-left">{selectedStudent.year}</td>
                <td className="p-3 text-left font-bold text-blue-600">
                  {selectedStudent.departname}
                </td>

                {/*  Total Attendance Column */}
                <td className="p-3 text-left font-bold text-green-600">
                  {
                    selectedStudent.attendance.filter(
                      (a) => a.status === "Present"
                    ).length
                  }{" "}
                  days
                </td>

                {/* Attendance Details Column */}
                <td className="p-3 text-left">
                  {selectedStudent.attendance.length > 0 ? (
                    <div className="grid grid-cols-5 gap-2 text-center">
                      {selectedStudent.attendance.map((record) => {
                        const day = record.date.split("T")[0].split("-")[2]; // Extracts only the day
                        return (
                          <div
                            key={record.attendanceid}
                            className="border p-2 rounded-md shadow-md"
                          >
                            <span className="font-bold">{day}</span>
                            <br />
                            <span
                              className={
                                record.status === "Present"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {record.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    "No attendance records"
                  )}
                </td>

                <td className="p-3 text-left">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-gray-600"
                  >
                    Back
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, index) => (
                <tr
                  key={s.id}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  } hover:bg-gray-200`}
                  onClick={() => fetchStudentDetails(s.id)}
                >
                  <td className="p-3 text-left">{s.rollno}</td>
                  <td className="p-3 text-left">{s.name}</td>
                  <td className="p-3 text-left">{s.email}</td>
                  <td className="p-3 text-left">{s.phone}</td>
                  <td className="p-3 text-left">{s.dob.split("T")[0]}</td>
                  <td className="p-3 text-left">{s.address}</td>
                  <td className="p-3 text-left">{s.year}</td>
                  <td className="p-3 text-left flex space-x-2">
                    <Link
                      to={`/edit/${s.id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(s.id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
