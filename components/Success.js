import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Success extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

Success.propTypes = {
  children: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#98fb98',
    padding: 8,
    borderRadius: 8
  }
})
