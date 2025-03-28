import React from 'react'
import PropTypes from 'prop-types'

const FormInput = ({ name, type, register }) => {
  return (
    <>
      <label htmlFor={name} className="form-label">{name}</label>
      <input type={type || 'text'} placeholder={`Enter ${name}`} {...register(name)} className='form-control' name={name} id={name} />
    </>
  )
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired
}

export default FormInput