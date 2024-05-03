const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.login = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received login request data:', data);

    if(!data.email || !data.password) {
      logger.log('Required fields email or password are missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'email and password are required'
      );
    } 
    
    const { email, password } = data;
    
    const userRecord = await admin.auth().getUserByEmail(email);
    
    if (userRecord) {
      const { uid, email: userEmail } = userRecord;
      logger.log('User found:', { uid, email: userEmail });
      return { status: "success", user: { uid, email: userEmail } };
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
        'An error occurred while logging in',
        e.message
      );
    }
  }
);
