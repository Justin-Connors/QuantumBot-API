const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.logout = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received logout request data:', data);

    if(!data.email) {
      logger.log('Required fields email are missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'email is required'
      );
    } 
    
    const { email } = data;
    
    const userRecord = await admin.auth().getUserByEmail(email);

    if (userRecord) {
      const { uid, email } = userRecord;
      logger.log('User found:', { uid, email });
      return { status: "success", user: { uid, email } };
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
        'An error occurred while logging out',
        e.message
      );
    }
  }
);
