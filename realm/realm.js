import Realm from 'realm'

class Auth {}
Auth.schema = {
  name: 'Auth',
  properties: {
    token: 'string'
  }
}

let realm = new Realm({ schema: [Auth] })

export default realm
