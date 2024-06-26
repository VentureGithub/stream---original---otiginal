import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io('', {
    transports: ['websocket'],
});
const peerClient = new Peer();

const videoRecorder = document.getElementById("videoRecording");
videoRecorder.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(videoRecorder, stream);

    socket.on('viewer-connected', viewerId => {
        connectToNewViewer(viewerId, stream);
    });
});

peerClient.on("open", streamerId => {
    socket.emit('join-as-streamer', streamerId);
}
);

peerClient.on("close", streamerId => {
    socket.emit('disconnect-as-streamer', streamerId);
});

socket.on("disconnect", () => {
    socket.emit('disconnect-as-streamer', streamerId);
})

function addVideoStream(video, stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
}

function connectToNewViewer(viewerId, stream){
    peerClient.call(viewerId, stream);
};

async function getMediaStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      // Use the stream for your live streaming
    } catch (err) {
      console.error('Failed to get media stream:', err);
    }
  }
  
  // Call the function to prompt for permissions
  getMediaStream();
  
