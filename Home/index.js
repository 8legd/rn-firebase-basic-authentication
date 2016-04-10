import Home from './Home'
import FirebaseConnect from '../connectors/FirebaseConnect'
import RealmConnect from '../connectors/RealmConnect'

export default RealmConnect(FirebaseConnect(Home))
