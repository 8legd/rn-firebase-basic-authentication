import Profile from './Profile'
import FirebaseConnect from '../connectors/FirebaseConnect'
import RealmConnect from '../connectors/RealmConnect'

export default RealmConnect(FirebaseConnect(Profile), ['users'])
