import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class LinkButton extends Component {
  render () {
    return (
      <TouchableHighlight
        style={styles.link}
        onPress={() => Actions[this.props.to]() }
        underlayColor='#99d9f4'
      >
        <Text style={styles.linkText}>
          {this.props.children}
        </Text>
      </TouchableHighlight>
    )
  }
}

LinkButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]),
  to: PropTypes.string.isRequired
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
