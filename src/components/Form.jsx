import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, postData } from "../redux/slice";
import Input from "../common/Input";
import Loader from "../common/Loader";
import * as Yup from "yup";
import { useFormik } from "formik";
function Form() {
  const { data, loading, responseData, success, error, message } = useSelector(
    (state) => state.form
  );
  //   console.log(data, "data");
  // console.log(message, "message")
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  useEffect(() => {
    if (data.length > 0) {
      // forEach
      const initialFormData = {};
      data.forEach((ele) => {
        initialFormData[ele.fieldName] = ele.value;
      });
      setFormData(initialFormData);
    }
  }, [data]);
  // validation schema
  const createValidation = (data) => {
    const initialSchema = {};
    if (data.length > 0) {
      for (let ele of data) {
        if (
          ele.type == "text" ||
          ele.type == "select" ||
          ele.type == "multiline"
        ) {
          initialSchema[ele.fieldName] = Yup.string()
            .trim()
            .required(`${ele.fieldName} is required`);
        } else if (ele.type == "email") {
          initialSchema[ele.fieldName] = Yup.string()
            .trim()
            .email()
            .required(`${ele.fieldName} is required`);
        } else if (ele.type == "number") {
          initialSchema[ele.fieldName] = Yup.number()
            .positive()
            .required(`${ele.fieldName} is required`);
        }
      }
      return initialSchema;
    }
  };
  const validateSchema = createValidation(data);
  // formik and yup
  const formik = useFormik({
    // when we update a form
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object(validateSchema),
    onSubmit: (values) => {
      dispatch(postData(values));
    },
  });
  console.log("commit")
  // user can't enter space in input field
  // const onKeyDown = (event) => {
  //     if (event.code === 'Space') event.preventDefault()
  // }
  // check errors
  useEffect(() => {
    if (error && message) {
      alert(message);
    }
  }, [error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h4 className="text-center mt-3 text-primary">Dynamic Form</h4>
          <div className="container">
            <div className="d-flex justify-content-center mt-3">
              <form
                onSubmit={formik.handleSubmit}
                className="w-50 shadow-lg p-3 rounded mt-3"
              >
                <div className="mb-3">
                  {data?.map((input) => (
                    <>
                      <Input
                        key={input.fieldName}
                        name={input.fieldName}
                        type={input.type}
                        value={formik.values[input.fieldName]}
                        options={input.options}
                        onChange={formik.handleChange}
                      // onKeyDown={onKeyDown}
                      />
                      {formik.touched[input.fieldName] &&
                        formik.errors[input.fieldName] && (
                          <div style={{ color: "red" }}>
                            {formik.errors[input.fieldName]}
                          </div>
                        )}
                    </>
                  ))}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            {success && (
              <div className="mt-3 mb-3 border border-primary rounded">
                <h5 className="text-center text-primary mt-3 mb-3">Response</h5>
                <p className="text-center">{JSON.stringify(responseData)}</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Form;
