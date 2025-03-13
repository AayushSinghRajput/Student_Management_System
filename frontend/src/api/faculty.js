import axios from "axios";
const API_URL = "http://localhost:5000/faculty";

export const getFaculty = async () => {
  return await axios.get(API_URL);
};
