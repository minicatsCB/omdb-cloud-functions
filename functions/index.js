const express = require("express");
const app = express();

const functions = require('firebase-functions');

exports.widgets = functions.https.onRequest(app);
