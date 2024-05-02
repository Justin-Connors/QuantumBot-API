const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

// Send message to specific chat

exports.sendMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received message request data:', data);

    if(!data.chatId || !data.message) {
      logger.log('Required fields chatId or message is missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'chatId and message are required'
      );
    } 
    
    const { chatId, message } = data;
    
    const messageData = {
      chatId,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Adds the message to the messages collection in firestore
    const messageRef = await admin
      .firestore()
      .collection("messages")
      .add(messageData);

    logger.log('Message added:', messageRef.id);

    return { status: "success", messageId: messageRef.id };

  } catch (e) {
      logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while adding the message',
        e.message
      );
    }
  }
);
