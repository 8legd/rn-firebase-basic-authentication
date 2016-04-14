import React, {
  Component,
  PropTypes
} from 'react-native'
import Container from '../components/Container'
import Error from '../components/Error'
import Success from '../components/Success'
import SubmitButton from '../components/SubmitButton'
import t from 'tcomb-form-native'
import { Actions } from 'react-native-router-flux'

let Form = t.form.Form

export default class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null
    }
  }
  handleSubmit () {
    let vm = this.refs.form.getValue()

    if (vm) {
      this.props.rootRef.createUser(vm, (err, data) => {
        if (err) {
          this.setState({ error: err })
        } else {
          this.setState({ success: true })
          this.props.rootRef
            .child('users')
            .child(data.uid)
            .set({
              username: vm.username,
              email: vm.email
            })
          Actions.pop()
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
        <Success>Registration successfull!</Success>
      )
    }
  }
  render () {
    return (
      <Container>
        <Form
          ref='form'
          type={RegisterVM}
          options={options}
        />
        <SubmitButton onPress={this.handleSubmit.bind(this)} />
        {this.renderError()}
        {this.renderSuccess()}
      </Container>
    )
  }
}

Register.propTypes = {
  rootRef: PropTypes.object.isRequired
}

let RegisterVM = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  repeatPassword: t.String
})

let options = {
  fields: {
    password: {
      password: true
    },
    repeatPassword: {
      password: true
    }
  }
}
