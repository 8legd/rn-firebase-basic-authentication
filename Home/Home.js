import React, {
  Component,
  PropTypes
} from 'react-native'
import Container from '../components/Container'
import LinkButton from '../components/LinkButton'
import LogoutButton from '../components/LogoutButton'

export default class Home extends Component {
  render () {
    let { props } = this

    if (props.authData) {
      return (
        <Container>
          <LinkButton to='profile'>Profile</LinkButton>
          <LogoutButton rootRef={props.rootRef}>Logout</LogoutButton>
        </Container>
      )
    }

    return (
      <Container>
        <LinkButton to='login'>Login</LinkButton>
        <LinkButton to='register'>Register</LinkButton>
      </Container>
    )
  }
}
