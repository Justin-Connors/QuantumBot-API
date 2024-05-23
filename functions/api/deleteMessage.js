const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.deleteMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received request to delete message:', data);

    if(!data.messageId || !data.userId || !data.chatId) {
      logger.log('Required felds messageId, userId or chatId are missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'messageId, userId and chatId are required'
      );
    }

    const { messageId, userId, chatId } = data;

    await admin
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .doc(messageId)
    .delete();

    logger.log('Message deleted successfully:', data);

    return { success: true };
  } catch(e) {
    logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while deleting message',
        e.message
      );
  }

});
