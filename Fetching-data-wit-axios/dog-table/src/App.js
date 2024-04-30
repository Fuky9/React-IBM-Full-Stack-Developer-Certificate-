import axios from "axios";
import React, { useState, useEffect } from "react";

const App = (props) => {
  // Define the state for API data
  const [breeds, setBreeds] = useState([]);

  // Fetching data from API on component mount
  useEffect(() => {
    const url = "https://dogapi.dog/api/v2/breeds";
    axios
      .get(url)
      .then((response) => {
        // Set the fetched data to state
        setBreeds(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);
  // Table cell CSS
  const tableCellStyle = { border: "1px solid black" };

  // Rendering the list of breeds
  return (
    <div style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
      <h2>List of Dog Breeds</h2>
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          border: "2px solid black",
        }}
      >
        <thead>
          <tr>
            <th style={tableCellStyle}>Name:</th>
            <th style={tableCellStyle}>Life Span:</th>
            <th style={tableCellStyle}>Male Weight:</th>
            <th style={tableCellStyle}>Female Weight</th>
            <th style={tableCellStyle}>Hypoallergenic</th>
          </tr>
        </thead>

        <tbody>
          {breeds.map((breed, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{breed.attributes.name}</td>
              <td style={tableCellStyle}>
                {breed.attributes.life.min} - {breed.attributes.life.max} years
              </td>
              <td style={tableCellStyle}>
                {breed.attributes.male_weight.min} -{" "}
                {breed.attributes.male_weight.max} kg
              </td>
              <td style={tableCellStyle}>
                {breed.attributes.female_weight.min} -{" "}
                {breed.attributes.female_weight.max} kg
              </td>
              <td style={tableCellStyle}>
                {breed.attributes.hypoallergenic ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

// Room for improvement:
// 1. Avoid inline styles (Use className="nameofclass" inside elements and external CSS)
// 2. Table can be broken into component itself
// 3. Use environment variable for the API URL e.g. const url = process.env.REACT_APP_API_URL;
// 4. Improved loading state management
