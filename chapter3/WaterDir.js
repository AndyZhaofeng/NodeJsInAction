/**
 * Created by zhaofeng on 2017/4/27.
 */

var fs=require('fs'),watchDir='./watch',processedDir='./done';
var events=require('events');
var util=require('util');


function Watcher(watcherDir,processedDir){
    this.watchDir=watcherDir;
    this.processedDir=processedDir;
}

util.inherits(Watcher,events.EventEmitter);

Watcher.prototype.watch=function(){
    var watcher=this;
    fs.readdir(this.watchDir,function(err,files){
        if(err) throw err;
        for(var index in files){
            watcher.emit('process',files[index]);
        }
    })
};
Watcher.prototype.start=function(){
    var watcher=this;
    fs.watchFile(watchDir,function(){
        watcher.watch();
    })
};

var watcher=new Watcher(watchDir,processedDir);
watcher.on('process',function(file){
    var watchFile=this.watchDir+'/'+file;
    var processedFile=this.processedDir+'/'+file.toLowerCase();

    fs.rename(watchFile,processedFile,function(err){
        if(err) throw err;
    });
});
watcher.start();
