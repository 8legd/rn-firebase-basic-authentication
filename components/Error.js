import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Container extends Component {
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

Container.propTypes = {
  children: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f08080',
    padding: 8,
    borderRadius: 8
  }
})
