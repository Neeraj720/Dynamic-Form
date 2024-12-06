
import React, { useState } from 'react'
function Input({ name, type, value, options, onChange }) {
    console.log("value:", value)
    if (type == "text" || type == "email" || type == "number" ) {
        return (
            <>
                <label className='mb-3'>{name}</label>
                <input
                    className='form-control'
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </>
        )
    }
    // else if (type == "email") {
    //     return (<>
    //         <label className='mb-3'>{name}</label>
    //         <input
    //             className='form-control'
    //             type={type}
    //             name={name}
    //             value={value}
    //             onChange={onChange}
    //         />
    //     </>)
    // }
    // else if (type == "number") {
    //     return (<>
    //         <label className='mb-3'>{name}</label>
    //         <input
    //             className='form-control'
    //             type={type}
    //             name={name}
    //             value={value}
    //             onChange={onChange}
    //         />
    //     </>)
    // }
    else if (type == "select") {
        return (
            <>
                <label className='mb-2'>{name}</label>
                <select className='form-control' name={name} value={value} onChange={onChange}>
                    <option>Select Gender</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </>
        )
    }
    else if (type == "multiline") {
        return (
            <>
                <label className='mb-2'>{name}</label>
                <textarea
                    className='form-control'
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </>
        )
    }

}

export default Input