import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [stores]);

  // Fetching all stores data
  const fetchData = () => {
    console.log("Fetching stores...");
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setAllStores(data);
      })
      .catch((error) => console.error("Error fetching stores:", error));
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-9 flex justify-center ml-4">
      <div className=" flex flex-col gap-2 w-screen">
        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl py-4 px-2">Manage Store</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 mr-2  text-xs  rounded"
            onClick={modalSetting}
          >
            Add Store
          </button>
        </div>
        {showModal && <AddStore />}
        {stores.map((element, index) => {
          return (
            <div
              className="bg-white w-50 h-fit flex flex-col gap-4 p-4 "
              key={element._id}
            >
              <div className="flex flex-col gap-3 justify-between items-start">
                <span className="font-bold">{element.name}</span>
                <div className="flex">
                  <span>{element.address + ", " + element.city}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Store;
