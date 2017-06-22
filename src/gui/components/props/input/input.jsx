import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ style, className, name, value, onChange, type }) => {
  return (
    <div style={style} className={className}>
      <div>{name}</div>
      <input type={type} value={value} checked={value} onChange={onChange} />
    </div>
  )
}

Input.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

Input.defaultProps = {
  style: {},
  className: '',
  value: undefined,
}

export default Input
