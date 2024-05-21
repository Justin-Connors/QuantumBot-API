const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.addChat = functions.https.onCall(async (data, context) => {
  try {

  } catch(e) {
    logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while adding chat',
        e.message
      );
  }

});
