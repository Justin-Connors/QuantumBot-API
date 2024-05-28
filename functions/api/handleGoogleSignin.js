const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.handleGoogleSignin = async (firestore, credentials) => {
  // Extract user info from credentials
  const userId = credentials.uid;
  const name = credentials.displayName;
  const email = credentials.email;

  try {
    // Check if user already exists in database
    const userRef = firestore.collection('users').doc(userId);
    const getUserDoc = await userRef.get();

    if (!getUserDoc.exists) {
      // Create new user
      const userData = {
        uid: userId,
        name: name,
        email: email,
      };
      await userRef.set(userData);
      logger.log('User created successfully:', userId);
    } else {
      logger.log('User already exists:', userId);
    }
    
    return { status: 'success' };

  } catch (e) {
    logger.error(e);
    throw new functions.https.HttpsError(
      'internal',
      'An error occurred while handling Google Signin',
      e.message
    );
  }
};
