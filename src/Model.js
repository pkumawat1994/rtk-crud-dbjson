import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Model.css";
import {
  useAddPostMutation,
  useUpdatePostMutation,
} from "./services/EmployeSlice";

const Model = ({ editData, viewCard }) => {
  console.log(111, viewCard);
  const [addPost] = useAddPostMutation();
  const [updatepost] = useUpdatePostMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (editData !== null) {
      const id = editData.id;
      updatepost({ data, id });
    } else {
      addPost(data);
    }
    reset();
    var closeButton = document.getElementById("closeModel");
    closeButton.click();
  };

  useEffect(() => {
    setValue("name", editData?.name);
    setValue("salary", editData?.salary);
    if (viewCard !== null) {
      // debugger;
      setValue("name", viewCard?.name);
      setValue("salary", viewCard?.salary);
    }
  }, [editData, viewCard]);

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="0"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {console.log("editDtaaNULL", editData)}
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {viewCard
                  ? null
                  : editData !== null
                  ? "UPDATE EMPLOYEE"
                  : "ADD NEW EMPLOYEE"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    readOnly={viewCard ? true : null}
                    {...register("name", { required: "name is required" })}
                    className="form-control inpt"
                    placeholder="Enter Employee Name"
                    type="text"
                  />
                  {errors.name && (
                    <p className="text-anger">{errors.name?.message}</p>
                  )}
                </div>
                <div className="form-group mt-2">
                  <input
                    readOnly={viewCard ? true : null}
                    {...register("salary", { required: "salary is required" })}
                    className="form-control inpt"
                    placeholder="Enter Employee Salary"
                    type="number"
                  />
                </div>
                {errors.salary && <p role="alert">{errors.salary?.message}</p>}
                {viewCard ? null : editData ? (
                  <button type="submit" className="btn btn-success mt-2 inpt">
                    UPDATE EMPLOYEE
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success mt-2 inpt">
                    ADD NEW EMPLOYEE
                  </button>
                )}
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary inpt"
                data-bs-dismiss="modal"
                id="closeModel"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
