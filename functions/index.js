const admin = require('firebase-admin');
admin.initializeApp();

// Function imports
const {addMessage} = require('./api/addMessage');
const {userProfile} = require('./api/userProfile');
const {createChat} = require('./api/createChat');
const {getChat} = require('./api/getChat');
const {sendMessage} = require('./api/sendMessage');
const {logEvent} = require('./api/logEvent');
const {deleteMessage} = require('./api/deleteMessage');

// Function exports
exports.addMessage = addMessage;
exports.userProfile = userProfile;
exports.createChat = createChat;
exports.getChat = getChat;
exports.sendMessage = sendMessage;
exports.logEvent = logEvent;
exports.deleteMessage = deleteMessage;
