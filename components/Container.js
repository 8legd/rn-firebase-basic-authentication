import React, {
  Component,
  PropTypes,
  StyleSheet,
  View
} from 'react-native'

export default class Container extends Component {
  render () {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ])
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(240, 248, 255)',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 75
  }
})
