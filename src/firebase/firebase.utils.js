import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCMAGAwHO_qM8Av8yiPTkka395ETJFRg6Y',
  authDomain: 'teju-clothing.firebaseapp.com',
  projectId: 'teju-clothing',
  storageBucket: 'teju-clothing.appspot.com',
  messagingSenderId: '160897551095',
  appId: '1:160897551095:web:81cda35f145e186a52e1f2',
  measurementId: 'G-SP2QQW165G',
}

firebase.initializeApp(config)

// export const auth = firebase.auth()

// export const firestore = firebase.firestore()

// const provider = new firebase.auth.GoogleAuthProvider()

// provider.setCustomParameters({ promt: 'select_account' })

// export const signInWithGoogle = () => auth.signInWithPopup(provider)
// export default firebase

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
