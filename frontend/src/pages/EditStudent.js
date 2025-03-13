import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudents, updateStudent } from "../api/students";
import StudentForm from "../components/StudentForm";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    getStudents().then((res) => {
      const found = res.data.find((s) => s.id === Number(id));
      setStudent(found);
    });
  }, [id]);

  const handleSubmit = async (updatedStudent) => {
    await updateStudent(id, updatedStudent);
    navigate("/");
  };

  return student ? (
    <StudentForm initialData={student} onSubmit={handleSubmit} />
  ) : (
    <p>Loading...</p>
  );
};

export default EditStudent;
