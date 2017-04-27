/**
 * Created by zhaofeng on 2017/4/27.
 */

var flow=require('nimble');
var exec=require('child_process').exec;

function downloadNodeVersion(version,destination,callback) {
    var url='https://nodejs.org/dist/v'+version+'/node-v'+version+'-darwin-x64.tar.gz';
    var filepath=destination+'/'+version+'.tgz';
    exec('curl '+url+' >'+filepath,callback);
}

flow.series([
    function (callback) {
        flow.parallel([
            function (callback) {
                console.log('Downloading Node 6.10.2');
                downloadNodeVersion('6.10.2','/tmp',callback);
            },
            function (callback) {
                console.log('Downloading Node 7.9.0');
                downloadNodeVersion('7.0.0','/tmp',callback);
            }
        ],callback);
    },
    function (callback) {
        console.log('Creating archive of download files...');
        exec(
            'tar cvf node_distros.tar /tmp/7.0.0.tgz',
            function (error,stdout,stderr) {
                console.log('All done!');
                callback()
            }
        );
    }
]);
