const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

// Log event

exports.logEvent = functions.https.onCall(async (data, context) => {
  try {
    logger.log('Received event data:', data);

    if(!data.event) {
      logger.log('Required field event is missing:', data);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'event is required'
      );
    } 
    
    const { event } = data;
    
    const eventData = {
      event,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Adds the event to the events collection in firestore
    const eventRef = await admin
      .firestore()
      .collection("events")
      .add(eventData);

    logger.log('Event added:', eventRef.id);

    return { status: "success", eventId: eventRef.id };

  } catch (e) {
      logger.error(e);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while adding the event',
        e.message
      );
    }
  }
);
