import React, {
  Component,
  Text
} from 'react-native'
import Container from '../components/Container'
import SubmitButton from '../components/SubmitButton'
import t from 'tcomb-form-native'
import Error from '../components/Error'
import Success from '../components/Success'

let Form = t.form.Form

export default class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      vm: null
    }
  }
  componentWillReceiveProps (nextProps) {
    let { authData, rootRef } = nextProps

    if (authData) {
      console.log('rootRef.getAuth()', rootRef.getAuth())
      rootRef
        .child('users')
        .child(authData.uid)
        .once('value', (data) => {
          this.setState({ vm: data.val() })
        })
    }
  }
  onPress () {
    let { props } = this

    props.rootRef
        .child('users')
        .child(props.authData.uid)
        .update(this.state.vm, (err) => {
          if (err) {
            this.setState({ error: err.message })
          } else {
            this.setState({ success: true })
          }
        })
  }
  renderError () {
    if (this.state.error) {
      return (
        <Error>{this.state.error}</Error>
      )
    }
  }
  renderSuccess () {
    if (this.state.success) {
      return (
        <Success>Profile changed!</Success>
      )
    }
  }
  render () {
    return (
      <Container>
        <Form
          onChange={(vm) => {
            this.setState({
              error: null,
              vm
            })
          }}
          options={options}
          ref='form'
          type={profileVM}
          value={this.state.vm}
        />
        <SubmitButton onPress={this.onPress.bind(this)} />
        {this.renderError()}
        {this.renderSuccess()}
      </Container>
    )
  }
}

var profileVM = t.struct({
  username: t.String
})

var options = {
  fields: {
    username: {
    }
  }
}
