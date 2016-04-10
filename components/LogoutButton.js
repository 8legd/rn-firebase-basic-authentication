import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native'

export default class LogoutButton extends Component {
  render () {
    return (
      <TouchableHighlight
        style={styles.link}
        onPress={() => this.props.rootRef.unauth() }
        underlayColor='#99d9f4'
      >
        <Text style={styles.linkText}>
          {this.props.children}
        </Text>
      </TouchableHighlight>
    )
  }
}

LogoutButton.propTypes = {
  rootRef: PropTypes.object
}

const styles = StyleSheet.create({
  linkText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  link: {
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
