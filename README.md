# LIVE STREAMING

#### Video Streaming
- Built with Peerjs for webrtc and socketio for websocket.
- Admin publishing client waits for users to join.
- When users join they emit an event containing their peerjs ID via websocket, which is relayed to Admin publishing client.
- The admin publishing client upon recieving the viewer's peerjs client initiates a peer to peer connection to the viewer, and begins streaming audio and video data across the network using webrtc.


### Technologies
- Node js, Typescript, Javascript, HTML, CSS, EJS, WebRtc (peer), Webscokets (Socket.io)

### How to run this?
- Have npm installed!
- npm i -g peerjs
- Create and set your local env variables: JWT_KEY, USERNAME, PASSWORD 
- npm i
- npm run start.
- Access localhost:3000/admin/signin to login and stream
- Access localhost:3000/ to view livestream and chat!
