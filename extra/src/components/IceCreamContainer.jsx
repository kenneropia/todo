import React from 'react'
import { connect } from 'react-redux'
import { buyIceCream } from '../redux'

function IceCreamContainer(props) {
  console.log('lolg')
  return (
    <div>
      <h1> num of IceCreams - {props.numOfIceCreams} </h1>
      <button onClick={props.buyIceCream}>buy numOfIceCreams</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { numOfIceCreams: state.iceCream.numOfIceCreams }
}

const mapDispatchToProps = (dispatch) => {
  return { buyIceCream: () => dispatch(buyIceCream()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(IceCreamContainer)
