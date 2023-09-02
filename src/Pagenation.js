import React, { useEffect, useState } from "react";
import axios from "axios";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [slicedData, setSlicedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://63aa73707d7edb3ae628645c.mockapi.io/users"
      );
      if (response && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const initialIndex = (currentPage - 1) * itemsPerPage;
    const finalIndex = initialIndex + itemsPerPage;
    setSlicedData(data.slice(initialIndex, finalIndex));
  }, [data, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {slicedData.map((values) => (
        <h2 key={values.id}>{values.id}</h2>
      ))}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
