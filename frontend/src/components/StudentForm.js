import { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = ({ initialData = {}, onSubmit }) => {
  const [departments, setDepartments] = useState([]);
  const [student, setStudent] = useState({
    id: initialData.id || "",
    rollno: initialData.rollno || "",
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    dob: initialData.dob ? initialData.dob.split("T")[0] : "",
    address: initialData.address || "",
    year: initialData.year || "",
    deparid: initialData.deparid || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!student.rollno.trim()) newErrors.rollno = "Roll No is required";
    if (!student.name.trim()) newErrors.name = "Name is required";
    if (!student.email.trim()) newErrors.email = "Email is required";
    if (!student.phone.trim()) newErrors.phone = "Phone number is required";
    if (!student.dob) newErrors.dob = "Date of Birth is required";
    if (!student.address.trim()) newErrors.address = "Address is required";
    if (!student.year) newErrors.year = "Year is required";
    if (!student.deparid) newErrors.deparid = "Department is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // console.log("Submitting student data:", student);

    setLoading(true);
    try {
      await onSubmit(student);
      alert("Student data updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">
          {initialData.id ? "Edit Student" : "Add Student"}
        </h2>

        {fetching ? (
          <p className="text-center text-gray-500">Loading departments...</p>
        ) : (
          <div className="space-y-4">
            {/* Roll No */}
            <div>
              <input
                className="w-full p-3 border rounded-md"
                type="text"
                name="rollno"
                placeholder="Roll No"
                value={student.rollno}
                onChange={handleChange}
              />
              {errors.rollno && <p className="text-red-500">{errors.rollno}</p>}
            </div>

            {/* Name */}
            <div>
              <input
                className="w-full p-3 border rounded-md"
                type="text"
                name="name"
                placeholder="Name"
                value={student.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                className="w-full p-3 border rounded-md"
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                className="w-full p-3 border rounded-md"
                type="text"
                name="phone"
                placeholder="Phone"
                value={student.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <input
                className="w-full p-3 border rounded-md"
                type="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
              />
              {errors.dob && <p className="text-red-500">{errors.dob}</p>}
            </div>

            {/* Address */}
            <div>
              <textarea
                className="w-full p-3 border rounded-md"
                name="address"
                placeholder="Address"
                value={student.address}
                onChange={handleChange}
              ></textarea>
              {errors.address && (
                <p className="text-red-500">{errors.address}</p>
              )}
            </div>

            {/* Year Selection */}
            <div>
              <select
                className="w-full p-3 border rounded-md"
                name="year"
                value={student.year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              {errors.year && <p className="text-red-500">{errors.year}</p>}
            </div>

            {/* Department Selection */}
            <div>
              <select
                className="w-full p-3 border rounded-md"
                name="deparid"
                value={student.deparid}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.deparid} value={dept.deparid}>
                    {dept.departname}
                  </option>
                ))}
              </select>
              {errors.deparid && (
                <p className="text-red-500">{errors.deparid}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              className={`w-full mt-4 font-semibold py-3 rounded-md transition duration-300 ${
                loading
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : initialData.id
                ? "Update Student"
                : "Add Student"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentForm;
