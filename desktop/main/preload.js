// 在上下文隔离启用的情况下使用预加载
const { contextBridge } = require('electron')
const child_process = require('child_process')
const iconv = require('iconv-lite')
const binary = 'binary'
const cp936 = 'cp936'
/*
* 命令行中文乱码的处理办法：
* 1.在命令前加上'chcp 65001 &&'，使命令行的返回值转变为英文，例如：'chcp 65001 && ipconfig'
* 2.使用iconv-lite插件的iconv.decode方法
* */
contextBridge.exposeInMainWorld('exec', {
    foo: () => {
        console.log('foo')
        // child_process.exec('ipconfig', { encoding: binaryEncoding }, function(err, stdout, stderr){
        //     console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
        // })
    },
    cmd(command, callback){
        child_process.exec(command, { encoding: binary }, function (error, stdout, stderr) {
            if (callback) callback({
                error:error,
                stdout:iconv.decode(new Buffer(stdout, binary), cp936),
                stderr:iconv.decode(new Buffer(stderr, binary), cp936)
            })
        })
    },
    net_en(action, serviceName, callback){
        child_process.exec('chcp 65001 && net ' + action + ' ' + serviceName, function (error, stdout, stderr) {
            if (callback) callback({error, stdout, stderr})
        })
    },
    stopApache:()=>{
        // exec('net stop apache',function(err,stdout,stderr) {
        //     if(err) {console.log('err:', err);}
        //     if (stdout) {
        //         console.log('stdout:', stdout);
        //         alert('停止Apache成功！')
        //     }
        //     if(stderr) {console.log('stderr:', stderr);}
        // })
    }
})
