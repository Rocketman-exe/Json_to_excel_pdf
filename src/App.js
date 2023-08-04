import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Table } from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

const App = () => {
  const [jsonData] = useState([
    { name: "John Doe", age: 30, email: "john@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
    { name: "Bob Johnson", age: 35, email: "bob@example.com" }
  ]);

  const convertJsonToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx"
    });
    saveAs(new Blob([excelBuffer]), "data.xlsx");
  };

  const convertJsonToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Name", "Age", "Email"]],
      body: jsonData.map(({ name, age, email }) => [name, age, email])
    });
    doc.save("data.pdf");
  };

  return (
    <div>
      <h1>Download Data</h1>
      <div className="container">
        <button onClick={convertJsonToExcel}>Download Excel</button>
        <button onClick={convertJsonToPDF}>Download PDF</button>
      </div>
      <h2>Data</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map(({ name, age, email }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{age}</td>
              <td>{email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default App;
