import { useNavigate } from "react-router-dom";
import { addStudent } from "../api/students";
import StudentForm from "../components/StudentForm";

const AddStudent = () => {
  const navigate = useNavigate();

  const handleSubmit = async (student) => {
    await addStudent(student);
    navigate("/");
  };

  return <StudentForm onSubmit={handleSubmit} />;
};

export default AddStudent;
