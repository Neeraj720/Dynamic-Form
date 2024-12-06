import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData, postData } from '../redux/slice'
import Input from '../common/Input'

function Form() {
    const { data, loading, responseData, success } = useSelector((state) => state.form)
    console.log(data, "data")
    console.log(success, "success")
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getData())
    }, [dispatch])
    useEffect(() => {
        if (data && data.length > 0) {
            // const initialFormData = data.reduce((acc, field) => {
            //     // console.log("field:" , field)
            //     acc[field.fieldName] = field.value;
            //     // console.log(acc, "acc")
            //     return acc;
            // }, {});
            // console.log("initialFormData", initialFormData)

            // second way forEach
            const initialFormData = {}
            data.forEach((ele) => {
                initialFormData[ele.fieldName] = ele.value
            })
            setFormData(initialFormData);
        }
    }, [data]);

 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    // console.log(formData ,"formData")
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData, "formData in handle submit")
        dispatch(postData(formData))
    }
    return (
        <>
            {loading ? (
                <h4 className='text-center'>Loading...</h4>
            ) : (
                <>
                    <h5 className='text-center mt-3'>Dynamic Form</h5>
                    <div className="container">
                        <div className='d-flex justify-content-center mt-3'>
                            <form onSubmit={handleSubmit} className='w-50 shadow-lg p-3 rounded mt-3'>
                                <div className="mb-3">
                                    {data?.map((input) => (
                                        <>
                                            <Input
                                                key={input.fieldName}
                                                name={input.fieldName}
                                                type={input.type}
                                                value={formData[input.fieldName]}
                                                options={input.options}
                                                onChange={handleInputChange}
                                            />
                                        </>
                                    ))}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        {
                            success && <div className='mt-3 container'>
                                <h5 className='text-center'>Response</h5>
                                <p className='text-center'>
                                    {
                                        JSON.stringify(responseData)
                                    }
                                </p>
                            </div>
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default Form;
