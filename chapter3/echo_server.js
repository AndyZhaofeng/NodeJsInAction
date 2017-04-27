/**
 * Created by zhaofeng on 2017/4/26.
 */

var net=require('net');

var server=net.createServer(function(socket){
    socket.on('data',function (data) {
        socket.write(data);
    });
    socket.once('data',function (data) {
        socket.write('once,'+data)
    });
});
server.listen(8000);