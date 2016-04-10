import Register from './Register'
import FirebaseConnect from '../connectors/FirebaseConnect'
import RealmConnect from '../connectors/RealmConnect'

export default RealmConnect(FirebaseConnect(Register))
