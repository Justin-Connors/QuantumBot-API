const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.deleteMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received message delete request data:', data);

    if(!data.messageId || !data.userId) {
      logger.log('Required fields messageId or userId are missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'messageId and userId are required'
      );
    }

    const { messageId, userId } = data;

    // Deletes the message from the users subcollection in firestore
    await admin
      .firestore()
      .collection("chats")
      .doc(userId)
      .collection("messages")
      .doc(messageId)
      .delete();

    logger.log('Message deleted:', messageId);

    return { status: "success" };
  } catch (e) {
      logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while deleting the message',
        e.message
      );
    }
  }
);
