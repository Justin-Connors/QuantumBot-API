const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

// Retrieve chat info and messages from a specific chat

exports.getChat = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received chat request data:', data);

    if(!data.chatId) {
      logger.log('Required field chatId is missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'chatId is required'
      );
    } 
    
    const { chatId } = data;
    
    // Fetches the chat from the chats collection in firestore
    const chatRef = await admin
      .firestore()
      .collection("chats")
      .doc(chatId)
      .get();

    if (!chatRef.exists) {
      logger.log('Chat not found:', chatId);
      throw new functions.https.HttpsError(
        'not-found',
        'Chat not found'
      );
    }

    logger.log('Chat found:', chatRef.id);

    return { status: "success", chat: chatRef.data() };

  } catch (e) {
      logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while fetching the chat',
        e.message
      );
    }
  }
);
