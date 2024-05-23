const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.addChat = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received request to add chat:', data);

    if(!data.userId) {
      logger.log('Required fields userId is missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'userId is required'
      );
    }

    const { userId } = data;

    const chatData = {
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const chatRef = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('chats')
      .add(chatData);

    logger.log('Chat added:', chatRef.id);

    return { status: 'success', chatId: chatRef.id };
      
  } catch(e) {
    logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while adding chat',
        e.message
      );
  }

});
