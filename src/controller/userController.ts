
import userService from "../service/userService"
import { userInterface } from "../lib/userInterface";
import { Utils } from "../utils/utils";
export class UserController{
    static async mediaFileData(req:any,res:any,next:any) {
      try{
          const videoInfo = await Utils.checkVedioValidation(req.file?.path)
          res.send(videoInfo)
      }catch(err){
        next(err);
      }
    }

    static async userData(req:any,res:any,next:any){
      try{
        let userData:userInterface = req.body;
        const userRes = await userService.userData(userData);
        res.send(userRes)
      
      }catch(err){
        next(err)
      }
    }
}