const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.addMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received message request data:', data);

    if(!data.text || !data.userId) {
      logger.log('Required fields text or userId are missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'text and userId are required'
      );
    } 
    
    const { text, userId } = data;
    
    const messageData = {
      text,
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Adds the message to the users subcollection in firestore
    const messageRef = await admin
      .firestore()
      .collection("chats")
      .doc(userId)
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
