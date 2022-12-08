import React, { useState } from "react";
import Model from "../Model";
import {
  useDeletePostsMutation,
  useGetPostsQuery,
} from "../services/EmployeSlice";

const EmployeeCard = () => {
  const [editData, seteditData] = useState(null);
  const [viewCard, setViewCard] = useState(null);
  const { data, isLoading, error } = useGetPostsQuery();
  const [deleteData] = useDeletePostsMutation();

  const deleteItem = (id) => {
    // alert(id);
    deleteData(id);
  };

  return (
    <>
      <center>
        <button
          onClick={() => {
            seteditData(null);
            setViewCard(null);
          }}
          className="btn btn-success mt-2"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add New Employee
        </button>
      </center>
      <div className="container">
        <div className="row">
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            data.map((ele, index) => {
              return (
                <div
                  className="col-3 card"
                  style={{ width: "18rem" }}
                  key={index}
                >
                  {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                  <div className="card-body">
                    <h2 className="card-title">{ele.name}</h2>
                    <p className="card-text">
                      <h5>Salary:-{ele.salary}</h5>
                    </p>
                    {/* <a href="#" className="btn btn-primary">
                        Go somewhere
                      </a> */}
                  </div>
                  <div className="row">
                    <button
                      onClick={() => setViewCard(ele)}
                      className="btn btn-success m-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteItem(ele.id)}
                      className="btn btn-danger m-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        seteditData(ele);
                        setViewCard(null);
                      }}
                      className="btn btn-warning m-1"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })
          ) : null}
        </div>
      </div>

      <Model
        editData={editData}
        seteditData={seteditData}
        viewCard={viewCard}
      />
    </>
  );
};

export default EmployeeCard;
