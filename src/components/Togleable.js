import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
const Togleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togleable.displayName = 'Togleable'
Togleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element
}
export default Togleable