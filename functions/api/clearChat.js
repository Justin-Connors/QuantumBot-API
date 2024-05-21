const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.clearChat = functions.https.onRequest(async (req, res) => {
  try {

  } catch(e) {
    logger.error(e);
    res.status(500).send('Error clearing chat');
  }

});
