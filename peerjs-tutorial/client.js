var peer = new Peer({
  host: 'localhost',
  port: 3000 || (location.protocol === 'https:' ? 443 : 80),
  path: '/peerjs'
})
