/**
 * Created by zhaofeng on 2017/4/26.
 */

var events=require('events');
var net=require('net');
var utils=require('util');

var channel=new events.EventEmitter();
channel.clients={};
channel.subscriptions={};

channel.on('join',function(id,client){
    this.clients[id]=client;
    this.subscriptions[id]=function(senderId,message){
        if(id!=senderId){
            this.clients[id].write(message);
        }
    };
    this.on('broadcast',this.subscriptions[id]);
});

channel.on('leave',function(id){
    channel.removeListener('broadcast',this.subscriptions[i]);
    channel.emit('broadcast',id,id+" has left the chat.\n");
});

channel.on('shutdown',function () {
    channel.emit('broadcast','',"Chat has shut down.\n");
    channel.removeAllListeners('broadcast');
});

function Watcher(watchDir,processedDir){
    this.watchDir=watchDir;
    this.processedDir=processedDir;
}

utils.inherits(Watcher,events.EventEmitter);

var server=net.createServer(function(client){
    var id=client.remoteAddress+':'+client.remotePort;
    channel.emit('join',id,client);
    client.on('data',function(data){
        data=data.toString();
        if(data=="shutdown\r\n"){
            channel.emit('shutdown');
        }
        data=data.toString();
        channel.emit('broadcast',id,data);
    });
    client.on('close',function(){
        channel.emit('leave',id);
    });
});



server.listen(8000);
