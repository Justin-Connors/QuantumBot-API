const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.deleteChat = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received request to delete chat:', data);

    if(!data.chatId || !data.userId) {
      logger.log('Required fields chatId or userId are missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'chatId and userId are required'
      );
    }

    const { chatId, userId } = data;

    await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('chats')
      .doc(chatId)
      .delete();

    logger.log('Chat deleted successfully:', data);

    return { success: true };

  } catch(e) {
    logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while deleting chat',
        e.message
      );
  }

});
