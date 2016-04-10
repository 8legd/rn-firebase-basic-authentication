import React, { Component, StyleSheet} from 'react-native'
import { Reducer, Router, Scene } from 'react-native-router-flux'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import Register from './Register'

const reducerCreate = (params) => {
  const defaultReducer = Reducer(params)
  return (state, action) => {
    console.log('LOGIN:', state)
    console.log('ACTION:', action)
    return defaultReducer(state, action)
  }
}

export default class App extends Component {
  render () {
    return (
      <Router createReducer={reducerCreate}>
        <Scene key='root'>
          <Scene
            key='home'
            component={Home}
            title='Home'
            style={styles.scene} />
          <Scene key='login' component={Login} title='Login' />
          <Scene key='profile' component={Profile} title='Profile' />
          <Scene key='register' component={Register} title='Register' />
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: 'green'
  }
})
