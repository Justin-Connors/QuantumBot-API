const admin = require('firebase-admin');
admin.initializeApp();

// Function imports
const {addChat} = require('./api/addChat');
const {endChat} = require('./api/endChat');
const {deleteChat} = require('./api/deleteChat');
const {deleteMessage} = require('./api/deleteMessage');
const {addMessage} = require('./api/addMessage');

// Function exports
exports.addChat = addChat;
exports.endChat = endChat;
exports.deleteChat = deleteChat;
exports.deleteMessage = deleteMessage;
exports.addMessage = addMessage;
