import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { writeFile, utils } from "xlsx"; // Import xlsx library for Excel file creation
import app from "./firebaseConfig";

const db = getFirestore(app); // Initialize Firestore

function NextPage() {
  const [patients, setPatients] = useState([]); // Store fetched patient data
  const [formData, setFormData] = useState({
    fev1: "",
    fvc: "",
    fev1_fvc: "",
    condition: "",
  });

  // Fetch data from Firestore
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patients"));
        const patientData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPatient = {
        fev1: Number(formData.fev1),
        fvc: Number(formData.fvc),
        fev1_fvc: Number(formData.fev1_fvc),
        condition: formData.condition,
      };

      const docRef = await addDoc(collection(db, "patients"), newPatient);
      console.log("Document written with ID: ", docRef.id);

      setPatients([...patients, { id: docRef.id, ...newPatient }]);
      setFormData({
        fev1: "",
        fvc: "",
        fev1_fvc: "",
        condition: "",
      }); // Clear the form
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownloadExcel = () => {
    // Prepare data for Excel
    const data = patients.map(({ fev1, fvc, fev1_fvc, condition }) => ({
      FEV1: fev1,
      FVC: fvc,
      "FEV1/FVC (%)": fev1_fvc,
      Condition: condition,
    }));

    // Create a new workbook and worksheet
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Patients");

    // Save the Excel file
    writeFile(workbook, "PatientData.xlsx");
  };

  return (
    <div
      style={{
        backgroundImage: `url('/images/lung-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <h1>Patient Data</h1>

      {/* Form for collecting data */}
      <form onSubmit={handleSubmit}>
        <label>
          FEV1 (e.g., 3.5)
          <input
            type="number"
            name="fev1"
            value={formData.fev1}
            onChange={handleChange}
            placeholder="FEV1"
            required
          />
        </label>
        <label>
          FVC (e.g., 4.2)
          <input
            type="number"
            name="fvc"
            value={formData.fvc}
            onChange={handleChange}
            placeholder="FVC"
            required
          />
        </label>
        <label>
          FEV1/FVC% (e.g., 83.33)
          <input
            type="number"
            name="fev1_fvc"
            value={formData.fev1_fvc}
            onChange={handleChange}
            placeholder="FEV1/FVC (%)"
            required
          />
        </label>
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          placeholder="Condition"
          required
        />
        <button type="submit">Add Patient</button>
      </form>

      {/* Button to download Excel file */}
      <button
        onClick={handleDownloadExcel}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "white",
          cursor: "pointer",
        }}
      >
        Download Excel
      </button>

      {/* Display fetched data */}
      <h2>Stored Patient Data:</h2>
      {patients.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>FEV1</th>
              <th>FVC</th>
              <th>FEV1/FVC (%)</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.fev1}</td>
                <td>{patient.fvc}</td>
                <td>{patient.fev1_fvc}</td>
                <td>{patient.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patient data available.</p>
      )}
    </div>
  );
}

export default NextPage;
