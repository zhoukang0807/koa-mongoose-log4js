exports.resultCode = {
    Success_Code: "0", //处理成功
    Error_Code_DB: "1001", //数据库异常
    Error_Code_NoExit: "1002", //参数在库中不存在
    Error_Code_IsExit: "1003", //已存在无法重复插入 
    Error_Code_Send: "1004", //发送验证码失败
    Error_Code_Format: "2001", //参数格式不正确
    Error_Code_Param: "2002", //参数缺失
    Error_Code_Verify: "2003", //验证码错误，或已失效
}