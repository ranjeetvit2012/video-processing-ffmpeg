const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;
const util = require("util");
const ffprobe = util.promisify(ffmpeg.ffprobe);

export class Utils {

  static async checkVedioValidation(url:any) {
    try {
      ffmpeg.setFfmpegPath(ffmpegPath);
      ffmpeg.setFfprobePath(ffprobePath);
      const metadata = await ffprobe(url);
      let vedioError = {};
      const videoInfo = {
        duration_time: metadata?.format?.duration,
        frame_rate: metadata?.streams[0]?.r_frame_rate,
        bit_rate: metadata?.format?.bit_rate,
        width: metadata.streams[0].width,
        height: metadata.streams[0].height,
        padding_color: "black",
        size: metadata?.format?.size,
      };

      // vedioError["videoInfo"] = videoInfo;
      if (
        metadata?.streams[0]?.width > 1920 ||
        metadata?.streams[0]?.height > 1080
      ) {
        vedioError = {
          status: 400,
          message: "Video dimensions must be 1920x1080 or lower.",
        };
      }

      // Validate video duration (up to 30 seconds)
      if (metadata?.format?.duration > 30) {
        vedioError = {
          status: 400,
          message: "Video duration must be up to 30 seconds.",
        };
      }

      // Validate video file size (up to 30MB)
      if (metadata?.format?.size > 30 * 1024 * 1024) {
        vedioError = {
          status: 400,
          message: "Video file size must be up to 30MB.",
        };
      }

      // Validate bit rate (more than 3 MBps)
      if (metadata?.format?.bit_rate < 3 * 1024 * 1024) {
        vedioError = {
          status: 400,
          message: "Bit rate must be more than 3 MBps.",
        };
      }

      // Validate frame rate (at least 25 fps)
      if (metadata?.streams[0]?.r_frame_rate < "25/1") {
        vedioError = {
          status: 400,
          message: "Frame rate must be at least 25 fps.",
        };
      }
      console.log("vedioError", vedioError);
      return { vedioError, videoInfo };
    } catch (err:any) {
      throw new Error(err);
    }
  }

    static tokenVerify(req:any,res:any,next:any){
        try{
          const token = req.headers["authorization"];
          if(token){
             req.user = {
              name:"ranjeet",
              id:12,
             }
             next()
          }else{
              throw new Error("invild token")
          }
        }catch(err){
            const error:any = err
          throw new Error(error);
        }
      }
}