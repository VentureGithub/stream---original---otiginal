"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const socket_io_1 = require("socket.io");
const app_1 = require("../app");
const http = __importStar(require("http"));
const httpServer = new http.Server(app_1.app);
exports.httpServer = httpServer;
app_1.app.get('/', (req, res) => {
    res.render('index');
});
const socketServer = new socket_io_1.Server(httpServer);
let viewerCount = 0;
const messageList = [];
function purgeLastHundred() {
    if (messageList.length > 200) {
        messageList.slice(100);
    }
}
setInterval(purgeLastHundred, 10000);
socketServer.on('connection', (socket) => {
    viewerCount++;
    console.log('a user connected. Total viewer count:', viewerCount);
    socket.emit('viewer-count', viewerCount);
    socket.on('disconnect', () => {
        viewerCount--;
        console.log('A user disconnected. Total viewer count:', viewerCount);
        socket.emit('viewer-count', viewerCount);
    });
    socket.on('join-as-streamer', (streamerId) => {
        socket.broadcast.emit('streamer-joined', streamerId);
    });
    socket.on('disconnect-as-streamer', (streamerId) => {
        socket.broadcast.emit('streamer-disconnected', streamerId);
    });
    socket.on('join-as-viewer', (viewerId) => {
        socket.broadcast.emit('viewer-connected', viewerId);
        socket.emit('backfill-messages', messageList);
    });
    socket.on('add-message-to-live-chat', (messageText) => {
        const message = {
            text: messageText,
            date: new Date(),
        };
        messageList.push(message);
        socket.emit('new-message', message);
        socket.broadcast.emit('new-message', message);
    });
});
