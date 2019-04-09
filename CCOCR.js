/*
 *    Copyright (c) 2015年 Beijing Cloud Core Network Technology Co., Ltd. All rights reserved.
 *
 *  接口返回格式：JSON对象
 *    ErrorCode:      见CCError.js中的定义
 *    ErrorMessage:   见CCError.js中的定义
 *    Value:          当执行成功（ErrorCode为0），返回内容。（不需要返回内容，Value内容为空）
 *
 *    接口中的返回内容为Value内容
 */
cordova.define("com.cloudcore.cordova.plugin.CCOCR", function(require, exports, module) {

    var cordova = require('cordova'),
        exec = require('cordova/exec');

    var CCOCR = {


        /**
         * 接口说明： 扫描银行卡
         * 接口调用： CCOCR.scanBankCard( success, [error]);
         * 传入参数：
         *
         *          @param success    成功回调
         *          @param error      失败回调
         * 返回码：
         *          ErrorCode :  0
         * 返回内容：
         *{
         *           BankName = "\U519c\U4e1a\U94f6\U884c";//银行卡名
         *           CardNum = "622848 0608778618975";//卡号
         *           CardType = "\U501f\U8bb0\U5361";//卡类型
         *
         *  }
         */
        scanBankCard: function( success, error) {
            if (!error) error = success;
            exec(success, error, "CCOCR", "scanBankCard", []);
        },


        /**
         * 接口说明： 扫描身份证
         * 接口调用： CCOCR.scanIDCard(front, success, [error]);
         * 传入参数：
         *          @param front       身份证正面传 "1"  身份证反面传 "0"
         *
         *          @param success        成功回调
         *          @param error          失败回调
         * 返回码：
         *          ErrorCode :  0, 
         * 返回内容：
         *  front值为 1 时的返回值
         *       {
         *                                 @"address" : address,     //地址
         *                                 @"birthday": birthday,    //出生日期
         *                                 @"cardno"  : cardno,      //身份证号
         *                                 @"name"    : name,        //姓名
         *                                 @"sex"     : sex,         //性别
         *                                 @"folk"    : folk,        //民族
         *                                 @"image"   : imageBase64  //身份证正面图片
         *
         *       }
         *   front值为 0 时的返回值
         *   {
         *                                 @"validdate1" : validdate1,//有效期限起始日期
         *                                 @"validdate2" : validdate2,//有效期限结束日期
         *                                 @"authority"  : authority, //签发机关
         *                                 @"image"      : imageBase64//身份证反面图片
         *   }
         */

        scanIDCard: function(front, success, error) {
            if (!error) error = success;
            exec(success, error, "CCOCR", "scanIDCard", [front]);
        },
        /**
         * 接口说明： OCR人体检测
         * 接口调用： CCOCR.scanLivingBody( success, [error]);
         * 传入参数：
         *          @param 无
         *
         *          @param success        成功回调
         *          @param error          失败回调
         * 返回码：
         *          ErrorCode :  0,
         * 返回内容：
         *          {
         *            faceImage   人体检测返回图片
         *          }
         */

        scanLivingBody: function( success, error) {
            if (!error) error = success;
            exec(success, error, "CCOCR", "scanLivingBody", []);
        },
    };

    module.exports = CCOCR;
});