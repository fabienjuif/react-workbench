import { connect } from 'react-redux'
import { getComponentValue, updateProp } from '../../../../redux/model'
import { getProp } from '../../../../redux/docgen'
import Input from './input'

const getInputType = (type) => {
  switch (type) {
    case 'bool':
      return 'checkbox'
    default:
      return 'text'
  }
}

const getEventValue = (input, event) => {
  switch (input) {
    case 'checkbox':
      return event.target.checked
    default:
      return event.target.value
  }
}

const mapState = (state, { name }) => {
  const { type } = getProp(name)(state)
  const value = getComponentValue(name, type.name)(state)
  return {
    value,
    propType: type.name,
    type: getInputType(type.name),
  }
}

const mapDispatch = (dispatch, { name }) => ({
  onChange: (inputType, propType) => event =>
    dispatch(updateProp(name, propType, getEventValue(inputType, event))),
})

const merge = (state, dispatch, props) => ({
  ...state,
  ...dispatch,
  onChange: dispatch.onChange(state.type, state.propType),
  ...props,
})

export default connect(mapState, mapDispatch, merge)(Input)
