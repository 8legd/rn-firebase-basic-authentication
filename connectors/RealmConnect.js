import React, { Component } from 'react'
import realm from '../realm'

export var RealmConnect = (ComposedComponent) => class extends Component {
  render () {
    return <ComposedComponent {...this.props} realm={realm} />
  }
}

export default RealmConnect
