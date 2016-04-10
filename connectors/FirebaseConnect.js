import React, { Component, PropTypes } from 'react'
import denormalize from './lib/denormalize'
import Firebase from 'firebase'

let rootRef = new Firebase('<FIREBASE_URL>')

export var FirebaseConnect = (ComposedComponent, collections = []) => class extends Component {
  constructor (props) {
    super(props)
    let { realm } = this.props
    this.state = {
      rootRef,
      take: 500
    }
    collections.forEach((collection) => {
      this.state[collection] = []
    })

    let auth = realm.objects('Auth').length > 0 ? realm.objects('Auth')[0] : null

    if (auth) {
      rootRef.authWithCustomToken(auth.token, (err, authData) => {
        if (err) {
          realm.write(() => {
            realm.delete(auth)
          })
        }
      })
    }
  }
  componentDidMount () {
    let { realm } = this.props

    this.state.rootRef
      .child('.info/connected')
      .on('value', (data) => {
        this.setState({ connected: data.val() === true })
      })

    this.onAuthCallback = (authData) => {
      if (authData) {
        this.setState({ authData })

        realm.write(() => {
          realm.delete(realm.objects('Auth'))

          realm.create('Auth', {
            token: authData.token
          })
        })
      } else {
        this.setState({ authData: null })
        realm.write(() => {
          realm.delete(realm.objects('Auth'))
        })
      }
    }

    rootRef.onAuth(this.onAuthCallback)

    this.listenToCollections()
  }
  stopListeningToCollections () {
    collections.forEach((collection) => {
      let ref = this.state.rootRef.child(collection)
      ref.off('child_added')
      ref.off('child_changed')
      ref.off('child_removed')
    })
  }
  listenToCollections () {
    this.stopListeningToCollections()
    collections.forEach((collection) => {
      let collectionRef = this.state.rootRef
        .child(collection)
        .limitToFirst(this.state.take)
        .orderByKey()

      collectionRef
        .on('child_added', (snap, prevKey) => {
          let data = snap.val()
          data.key = snap.key()

          denormalize(data, this.state.rootRef)
            .then((normalized) => {
              this.setState({
                [collection]: this.state[collection].concat([normalized])
              })
            })
        })

      collectionRef
        .on('child_removed', (data) => {
          this.setState({
            [collection]: this.state[collection].filter((c) => {
              return c.key !== data.key()
            })
          })
        })

      collectionRef
        .on('child_changed', (snap) => {
          let data = snap.val()
          data.key = snap.key()

          denormalize(data, this.state.rootRef).then((normalized) => {
            this.setState({
              [collection]: this.state[collection].map((item) => {
                if (item.key === normalized.key) {
                  return normalized
                }

                return item
              })
            })
          })
        })
    })
  }
  componentWillUnmount () {
    this.state.rootRef.offAuth(this.onAuthCallback)
    this.stopListeningToCollections()
  }
  render () {
    return <ComposedComponent {...this.props} {...this.state} />
  }
}

FirebaseConnect.propTypes = {
  realm: PropTypes.object.isRequired
}

export default FirebaseConnect
