

const User = require("../api/v1/model/user.model");


module.exports.requireAuth = async (req, res, next) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];

        const user = await User.findOne({
            token: token,
            deleted: false
        }).select("-password");

        if(!user){
            res.json({
                code: 400,
                message: "token không hợp lệ"
            })
            return;
        }
        
        req.user = user; //gắn thêm để qua controller khoi viết thêm code
        
        next();
    
    } else {
        res.json({
            code: 400,
            message: "Vui lòng gửi kèm token"
        })
    }
   

}