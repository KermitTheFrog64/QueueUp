import React from 'react'
import './input.scss'
import { FieldProps } from 'formik'

interface FormInputProps extends FieldProps {
    end?: React.ReactNode
    error?: React.ReactNode
    className?: string
    
}

const FormInput: React.FC<FormInputProps> = ({ field, form, meta, end, error, className, ...props }) => {

    const classList = ['input']

    if (className) {
        classList.push(className)
    }

    return (
        <div className='input-wrapper' >
            <div className={classList.join(' ')}>
                <input {...field} {...props} />
                {end && <div className='end'>{end}</div>}
            </div>
        </div>
    )
}

export default FormInput