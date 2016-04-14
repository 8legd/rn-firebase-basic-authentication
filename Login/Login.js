import React, {
  Component,
  PropTypes,
  StyleSheet
} from 'react-native'
import Container from '../components/Container'
import Error from '../components/Error'
import SubmitButton from '../components/SubmitButton'
import Success from '../components/Success'
import t from 'tcomb-form-native'
import { Actions } from 'react-native-router-flux'

let Form = t.form.Form

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      success: false,
      vm: null
    }
  }
  onPress () {
    let vm = this.refs.form.getValue()
    let { props } = this

    if (vm) {
      props.rootRef.authWithPassword(vm, (err, data) => {
        if (err) {
          this.setState({ error: err.message })
        } else {
          this.setState({ success: true })
          Actions.pop()
          //Actions['home']()
        }
      })
    }
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
        <Success>Login successfull!</Success>
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
          type={LoginVM}
          value={this.state.vm}
        />
        <SubmitButton onPress={this.onPress.bind(this)} />
        {this.renderError()}
        {this.renderSuccess()}
      </Container>
    )
  }
}

Login.propTypes = {
  rootRef: PropTypes.object.isRequired
}

const styles = StyleSheet.create({

})

var LoginVM = t.struct({
  email: t.String,
  password: t.String
})

var options = {
  fields: {
    password: {
      password: true
    }
  }
}
