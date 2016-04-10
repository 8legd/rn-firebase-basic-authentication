import Login from './Login'
import FirebaseConnect from '../connectors/FirebaseConnect'
import RealmConnect from '../connectors/RealmConnect'

export default RealmConnect(FirebaseConnect(Login))
