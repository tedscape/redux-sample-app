import Server from 'socket.io';

export default function startServer(store){
    "use strict";
    const io=new Server().attach(8090);
    store.subscribe(
        ()=>io.emit('state',store.getState.toJS())
    );
    io.on('connection',(socket)=>{
        socket.emit(store.getState().toJs());
        socket.on('action', store.dispatch.bind(store));
    });

}