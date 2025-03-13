import { useEffect, useState } from "react";
import { getFaculty } from "../api/faculty";

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await getFaculty();
      //   console.log("Fetched Faculty Data:", res.data);
      setFaculty(res.data);
    } catch (error) {
      console.error("Error fetching faculty members:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-4">
        Faculty Members
      </h2>

      {loading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Position</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f, index) => (
                <tr
                  key={f.facultyid}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                >
                  <td className="p-3 text-left">{f.name}</td>
                  <td className="p-3 text-left">{f.email}</td>
                  <td className="p-3 text-left">{f.phone}</td>
                  <td className="p-3 text-left font-bold text-blue-600">
                    {f.departname}
                  </td>
                  <td className="p-3 text-left">{f.position || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FacultyList;
