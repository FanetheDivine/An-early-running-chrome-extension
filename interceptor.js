debugger
//作为示例
//修改MediaSource和SourceBuffer的原型 拦截数据流并保存(不一定能播放)
SourceBuffer.prototype.appendBuffer=(function(appendBuffer){
    const buffers = []
    MediaSource.prototype.endOfStream=(function(endOfStream){
        const downloader = document.createElement('a')
        downloader.href=URL.createObjectURL(new Blob(buffers))
        downloader.download='1.mp4'
        return function(...args){
            console.log(`endOfStream`)
            downloader.click()
            return endOfStream.call(this,...args)
        }
    })(MediaSource.prototype.endOfStream)
    return function(buffer){
        buffers.push(buffer)
        console.log(`buffers.length:${buffers.length}`)
        return appendBuffer.call(this,buffer)
    }
})(SourceBuffer.prototype.appendBuffer)