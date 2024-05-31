const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.endChat = functions.https.onCall(async (data, context) => {
  try {
    const { chatId, userId } = data;

    // Get the chat document
    const chatDoc = await admin.firestore()
                               .collection('users')
                               .doc(userId)
                               .collection('chats')
                               .doc(chatId)
                               .get();

    const chatData = chatDoc.data();

    // Create a new document in the archive collection
    await admin.firestore()
               .collection('archive')
               .doc(userId)
               .collection('chats')
               .doc(chatId)
               .set(chatData);

    // Delete the chat document
    await chatDoc.ref.delete();

    // Return success message
    return { message: 'Chat ended successfully' };
  } catch(e) {
    logger.error(e);
    throw new functions.https.HttpsError(
      'internal',
      'An error occurred while ending chat',
      e.message
    );
  }

});
