import React from 'react'
import { connect } from 'react-redux'
import { buyCake, buyIceCream } from '../redux'

function ItemContainer({ type, num }) {
  return (
    <div>
      {type} - {num}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const itemState = ownProps.cake
    ? { num: state.cake.numOfCakes, type: 'cake' }
    : { num: state.iceCream.numOfIceCreams, type: 'iceCream' }
  return itemState
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const dispatchFunction = ownProps.cake
    ? () => dispatch(buyCake())
    : () => dispatch(buyIceCream())
return dispatchFunction
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
