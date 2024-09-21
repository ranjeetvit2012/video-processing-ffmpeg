import express from "express";
import { UserController } from "../controller/userController";
import userValidation from "../validation/userValidation";
import globalErrorHandling from "../globalErrorHandling/globalErrorHandling";
import { Utils } from "../utils/utils";
import mediaFileUpload from "../utils/mediaFileUpload"
class UserRouter{
      public router:any
    constructor(){
        this.router = express.Router();
        this.getRouter();
        this.postRouter();
        this.putRouter();
        this.patchRouter();
    }


    getRouter(){
       
    }
    postRouter(){
        this.router.post("/create",
        Utils.tokenVerify,
        userValidation.userData(),
        globalErrorHandling.handleError,
        UserController.userData)
    }

    putRouter(){

    }
    patchRouter(){
       this.router.patch("/file",
       mediaFileUpload.single("file"),
       UserController.mediaFileData,
       )
    }
}


export default new UserRouter().router