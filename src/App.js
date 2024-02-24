import React, { useState, useEffect } from "react";
import { Resizable } from "re-resizable";
import "./App.css";
import axios from "axios";
const BASE_URL = "https://resizable-server.onrender.com";

function App() {

  const [sampleData, setSampleData] = useState([]);
  const [isAddSample0Open, setIsAddSample0Open] = useState(false);
  const [isAddSample1Open, setIsAddSample1Open] = useState(false);
  const [isAddSample2Open, setIsAddSample2Open] = useState(false);
  const [newSampleValue, setNewSampleValue] = useState("");
  const [loading, setLoading] = useState(true);

  //Add button to handle new data 
  const handleAddButton = (index) => {
    switch (index) {
      case 0:
        setIsAddSample0Open(true);
        break;
      case 1:
        setIsAddSample1Open(true);
        break;
      case 2:
        setIsAddSample2Open(true);
        break;
      default:
        break;
    }
  };

  //To handle updating data in table
  const handleUpdateButton = async (index) => {
    try {
      await axios.put(`${BASE_URL}/api/data/${sampleData[index]._id}`, {
        value: newSampleValue,
      });

      const response = await axios.get(`${BASE_URL}/api/data`);
      if (response.data.message === "Data fetched successfully") {
        setSampleData(response.data.sampleData);
      } else {
        window.alert("Failed in fetching components data");
      }

      switch (index) {
        case 0:
          setIsAddSample0Open(false);
          break;
        case 1:
          setIsAddSample1Open(false);
          break;
        case 2:
          setIsAddSample2Open(false);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error updating data:", error);
      window.alert("Failed to update data");
    }
  };
  
  //To fetch initial data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/data`);
        if (response.data.message === "Data fetched successfully") {
          setSampleData(response.data.sampleData);
        } else {
          window.alert("Failed in fetching components data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        window.alert("Failed in fetching components data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading resizable blocks...</p>;
  }


  return (
    <div className="resizable-app">
      <div className="row1">
        <Resizable
          className="sample1"
          minWidth="15vw"
          minHeight="23vh"
          defaultSize={{
            width: "20vw",
            height: "60vh",
          }}
        >
          <p>{sampleData.length > 0 && sampleData[0].value}</p>
          <p>Total updates:{sampleData.length > 0 && sampleData[0].count}</p>
          <button className="add-button" onClick={() => handleAddButton(0)}>
            Add
          </button>
          {isAddSample0Open && (
            <>
              <input
                placeholder={sampleData.length > 0 && sampleData[0].value}
                value={newSampleValue}
                onChange={(e) => setNewSampleValue(e.target.value)}
              ></input>
              <button
                className="update-button"
                onClick={() => handleUpdateButton(0)}
              >
                Update
              </button>
            </>
          )}
        </Resizable>
        <Resizable
          minWidth="15vw"
          minHeight="23vh"
          className="sample2"
          defaultSize={{
            width: "65vw",
            height: "60vh",
          }}
        >
          <p>{sampleData.length > 0 && sampleData[1].value}</p>
          <p>Total updates:{sampleData.length > 0 && sampleData[1].count}</p>
          <button className="add-button" onClick={() => handleAddButton(1)}>
            Add
          </button>
          {isAddSample1Open && (
            <>
              <input
                placeholder={sampleData.length > 0 && sampleData[1].value}
                value={newSampleValue}
                onChange={(e) => setNewSampleValue(e.target.value)}
              ></input>
              <button
                className="update-button"
                onClick={() => handleUpdateButton(1)}
              >
                Update
              </button>
            </>
          )}
        </Resizable>
      </div>
      <div className="row2">
        <Resizable
          minWidth="31vw"
          minHeight="23vh"
          className="sample3"
          defaultSize={{
            width: "86vw",
            height: "30vh",
          }}
        >
          <p>{sampleData.length > 0 && sampleData[2].value}</p>
          <p>Total updates:{sampleData.length > 0 && sampleData[2].count}</p>
          <button className="add-button" onClick={() => handleAddButton(2)}>
            Add
          </button>
          {isAddSample2Open && (
            <>
              <input
                placeholder={sampleData.length > 0 && sampleData[2].value}
                value={newSampleValue}
                onChange={(e) => setNewSampleValue(e.target.value)}
              ></input>
              <button
                className="update-button"
                onClick={() => handleUpdateButton(2)}
              >
                Update
              </button>
            </>
          )}
        </Resizable>
      </div>
    </div>
  );
}

export default App;
