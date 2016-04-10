import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native'

export default class SubmitButton extends Component {
  render () {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.onPress}
        underlayColor='#99d9f4'
      >
        <Text style={styles.buttonText}>
          {
            this.props.children ? this.props.children : 'Submit'
          }
        </Text>
      </TouchableHighlight>
    )
  }
}

SubmitButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]),
  onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
