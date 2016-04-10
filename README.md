#React-Native Firebase - Basic authentication app

```
git clone https://github.com/giacomorebonato/rn-firebase-basic-authentication.git   
npm install  
react-native run-ios
react-native run-android
```  
Set your Firebase URL in ```FirebaseConnect.js```.  
This is a sample application that works both on Android and IOS with the 
same codebase.  
It just allows you to register, login and change your profile data.  

##Navigator
I have chosen [```react-native-router-flux```](https://github.com/aksonov/react-native-router-flux) 
because it is a great project that I am following 
and it is based on the [new Navgation experimental API](https://github.com/facebook/react-native/tree/master/Examples/UIExplorer/NavigationExperimental).

##Connectors  
In the connectors folders I have created 2 higher order components  
1. FirebaseConnect.js listen to specified collection changes and authenticates 
the user with the stored token  
2. RealmConnect.js is used only for storing the user token on login  

##Contribute  
If you think that this project could become an useful boilerplate, help me 
to improve it!  
The UI and the graphics are really raw at the moment