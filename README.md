# WebSockets_SimpleClientServer
Just a simple chat app between a client and server using websockets. Made for myself in order to understand how websockets worked.

I'll do the same thing for socket.io as well.

## How To Run
Run two instances of your CLI, each directed to the "client" and "server" folders respectively and run the command `node index.js` on the both of them.

## Log of the things I did: -
~~Currently works well with Postman acting as a client. Run "node index.js" for starting the server.~~<br>
~~Simple client and server programmed but needs to be run in separate CLI instances. Written messages can be sent from the server to clients but needs more work.~~<br>
~~Server messaging transmits across all clients but too many events created server side. Needs a fix! Also need to implement client nametags and messaging.~~<br>
~~Clients now have names but it can be done better. Client messages however are not broadcast to the everyone. Need to do that.~~<br>
~~Messages are now broadcast to everyone in the server! Need to handle messages on a client disconnecting. Should I try making some kind of server browser?~~<br>
~~Tried making the project run with Webpack and Serve.~~<br>
~~Trying to have Webpack and Websockets to run together but in vain. This part is gonna be lengthy.~~<br>
~~Fuck it. Gotta start over.~~<br>
~~Major overhaul accomplished. Only server frontend is remaining, along with some polishing.~~<br>
Started server frontend. Messages sent between the server and the clients are coming as Blobs and I wonder why.
