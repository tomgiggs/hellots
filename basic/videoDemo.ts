import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path'
// let source_filename = "./screen_demo.mp4";
let source_filename = '8ffa21dba15b4ba18a1349cb4e7f8494.ogg'
function cutvideo(cb){
    let xx = ffmpeg(source_filename).audioCodec('libmp3lame');
    xx.inputFormat("mp4");
    // xx.setFfmpegPath("E:\\win10\\ffmpeg\\bin\\ffmpeg.exe")
    xx.on('start', function (commandLine) {
            console.info( ',commandLine : ' + commandLine);
        })
        .on('end', function () {
            console.info('Guid:' +  ' finished');
        })
        .on('error', function(err) {
            console.error('ffmpeg error: ' + err.message);
            return;
        })
        // 添加ffmpeg命令参数
        .addOptions([
            '-ss ' + "00:00:03.950",
            '-t ' + "00:00:03.710",
            '-vcodec copy',
            '-acodec copy'
        ])
        // 新生成的文件名称
        .save("test_cuted.mp4");
}
let tmp = {"start_position":"00:00:03.950","cut_time":"00:00:03.710"}

// cutvideo("");
//需要先设置环境变量 FFMPEG_PATH = E:\win10\ffmpeg\bin\ffmpeg.exe 和FFPROBE_PATH=E:\win10\ffmpeg\bin\ffprobe.exe，注意这里要具体到可执行文件而不是目录
function video_demo() {
    let converter = ffmpeg(source_filename);
    converter.on('start', function (commandLine) {
        console.info( ',commandLine : ' + commandLine);
    })
        .on('end', function () {
            console.info('Guid:' +  ' finished');
            return
        })
        .on('error', function(err) {
            console.error('ffmpeg error: ' + err.message);
            return;
        })
        // 添加ffmpeg命令参数
        .addOptions([
            '-ss ' + "00:00:03.950",
            '-t ' + "00:00:03.710",
            '-vcodec copy',
            '-acodec copy'
        ])
        // 新生成的文件名称
        .save("test_cuted.mp4");
}

// video_demo()
let audio_source = './basic/rain_sound.wma';
// let audio_source = './basic/8ffa21dba15b4ba18a1349cb4e7f8494.ogg';
// let suffix:any = path.basename(audio_source).split(".");
// suffix = suffix.length>1?suffix[suffix.length-1]:suffix;
// console.log(suffix);
// console.log(path.basename(audio_source));
function audio_demo() {
    let converter = ffmpeg(audio_source);
    converter.on('start', function (commandLine) {
        console.info( ',commandLine : ' + commandLine);
    })
        .on('end', function () {
            console.info('Guid:' +  ' finished');
            return
        })
        .on('error', function(err) {
            console.error('ffmpeg error: ' + err.message);
            return;
        })
        // 添加ffmpeg命令参数
        .addOptions([
            '-acodec libmp3lame'
        ])
        // 新生成的文件名称
        .save("audio_rain.mp3");
}
// audio_demo();
function cut_audio() {

    let extSuffix:any = path.basename(audio_source).split(".");
    extSuffix = extSuffix.length>1?extSuffix[extSuffix.length-1]:"mp3";
    let converter = ffmpeg(audio_source);
    let editOptions = [
        '-ss ' + "00:00:03.950",
        '-t ' + "00:00:13.0",
    ];
    if(extSuffix!=="wma"){
        editOptions.push("-vcodec copy");
        editOptions.push('-acodec copy')
    }

    converter.on('start', function (commandLine) {
        console.info( ',commandLine : ' + commandLine);
    })
        .on('end', function () {
            console.info('Guid:' +  ' finished');
            return
        })
        .on('error', function(err) {
            console.error('ffmpeg error: ' + err.message);
            return;
        })
        // 添加ffmpeg命令参数
        .addOptions(editOptions)
        // 新生成的文件名称
        .save("wma_audio_rainxxx.mp3");
}

// cut_audio();
function converte_audio() {

    let extSuffix:any = path.basename(audio_source).split(".");
    extSuffix = extSuffix.length>1?extSuffix[extSuffix.length-1]:"mp3";
    let converter = ffmpeg(audio_source);
    let editOptions = [
        "-acodec libmp3lame"
    ];
    // if(extSuffix=="wma"){
    //     editOptions.push("-vcodec copy");
    //     editOptions.push('-acodec copy')
    // }

    converter.on('start', function (commandLine) {
        console.info( ',commandLine : ' + commandLine);
    })
        .on('end', function () {
            console.info('Guid:' +  ' finished');
            return
        })
        .on('error', function(err) {
            console.error('ffmpeg error: ' + err.message);
            return;
        })
        // 添加ffmpeg命令参数
        .addOptions(editOptions)
        // 新生成的文件名称
        .save("wma_audio_rainyyyxx.mp3");
}
// converte_audio()

function compress_audio() {
    const max_rate = 192000;
    const max_hz = 44100;
    // let converter = ffmpeg(audio_source);
    ffmpeg.ffprobe(audio_source, (err, res) => {
        if (err) {
            console.error("ffprobe err", err);
            return;
        }
        let rate = Number(res.streams[0].bit_rate);
        let hz = res.streams[0].sample_rate;

        if (rate && hz) {
            let options = [];
            if (rate > max_rate) {
                options.push('-ab ' + max_rate);
            }
            if (hz > max_hz) {
                options.push('-ar ' + max_hz);
            }
            let suffix = "00002.mp3";
            let target_filename = path.join("./", suffix);
            options.push('-acodec libmp3lame'); // 转换成mp3格式

            ffmpeg(audio_source)
                .on('end', function (commandLine) {
                    console.info('ffmpeg finished, commandLine : ' + commandLine);
                    return;
                })
                .on('error', function(err) {
                    console.error('ffmpeg error: ' + err.message);
                    return;
                })
                .addOptions(options)
                // 新生成的文件名称
                .save(target_filename);
        }
    });

}


compress_audio()
