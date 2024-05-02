const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

// Create a new chat

exports.createChat = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received chat request data:', data);

    if(!data.userId) {
      logger.log('Required field userId is missing:', data);
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
    
    // Adds the chat to the chats collection in firestore
    const chatRef = await admin
      .firestore()
      .collection("chats")
      .add(chatData);

    logger.log('Chat added:', chatRef.id);

    return { status: "success", chatId: chatRef.id };

  } catch (e) {
      logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while adding the chat',
        e.message
      );
    }
  }
);
