const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

// Retrieve and update profile information

exports.userProfile = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received user profile request data:', data);

    if(!data.userId) {
      logger.log('Required field userId is missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'userId is required'
      );
    } 
    
    const { userId } = data;
    
    const user = await admin
      .auth()
      .getUser(userId);

    if(user) {
      logger.log('User found:', user);
      return { status: "success", user };
    } else {
      logger.log('User not found');
      throw new functions.https.HttpsError(
        'not-found',
        'User not found'
      );
    }

  } catch (e) {
      logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while getting user profile',
        e.message
      );
    }
  }
);
