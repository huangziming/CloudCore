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
cordova.define("com.cloudcore.cordova.plugin.CCUtils", function(require, exports, module) {

    var cordova = require('cordova');
    var exec = require('cordova/exec');
    var datePickerObject = require('cordova-plugin-datepicker.DatePicker');

    var CCUtils = {
        telephone: function(phone, callback) {
            exec(callback, callback, "CCUtils", "telephone", [phone]);
        },
        openBrowser: function(url, callback) {
            exec(callback, callback, "CCUtils", "openBrowser", [url]);
        },
        httpGet: function(url, callback) {
            exec(callback, callback, "CCUtils", "httpGet", [url]);
        },
        httpPost: function(url, jsonArg, callback) {
            exec(callback, callback, "CCUtils", "httpPost", [url, jsonArg]);
        },

        /**
         * 做httpPost请求，请求到第三方
         * 接口调用： CCUtils.httpPostForThirdServer(url, [data, [config]], success, [error]);
         * 传入参数：
         *          @param url     传入的请求地址
         *          @param data    可选参数，请求数据
         *          @param config  可选参数，网络数据格式等信息
         *            {
         *                "thirdName"  :    ""   第三方保持cookie的对应的key
         *                "timeout"    :    60000  超时时间，单位：毫秒。默认时间在CBuildConfig中定义
         *                                     60000 or "60000"  整型或者字符串都可以
         *                "dataType"   :    "JSON" data的格式，默认JSON，取值如下:
         *                                        "JSON": data为一JS对象，服务端收到的是JSON字符串
         *                                        "FormURLEncoded": data为特殊形式的JS对象，必须是一个字典，
         *                                                        服务端收到的是form表单
         *                 "resultType":    "JSON" 期望的返回值，默认JSON，取值如下:
         *                                          "JSON": 返回一个JS对象
         *                                          "XML": 返回一个XML片段
         *                                          "DATA": 返回一个二进制数据，BASE64编码
         *              ...  其他（TODO）
         *            }
         *          @param success  成功回调
         *          @param error    失败回调
         * 返回码：
         *          ErrorCode :  0, 1, 5, 6, 7   没有网络返回7，status为0
         */

        httpPostForThirdServer: function(url, jsonArg, config, callback) {
            exec(callback, callback, "CCUtils", "httpPostForThirdServer", [url, jsonArg,config]);
        },
        openPDFFile: function(url, callback) {
            exec(callback, callback, "CCUtils", "openPDFFile", [url]);
        },
        getDeviceId: function(callback) {
            exec(callback, callback, "CCUtils", "getDeviceId", []);
        },

        /**
         * 获得设备信息
         * 传入参数： 无
         * 返回值：
                     0 - 成功   4 - 失败
           返回内容：
                     {
                       'deviceId'     :  '',    // 设备ID， 使用Mac地址，IMEI, SIM序列号，UUID作为设备ID
                                                //          首先获取Mac地址，当Mac地址为空时，使用IMEI
                                                //          如果IMEI为空，使用SIM序列号，如果SIM序列号
                                                //          为空，则生成一个UUID
                       'deviceType'   :  '',    // 设备类型  比如  'android' or 'ios'
                       'deviceName'   :  '',    // 设备名称  比如 'MI 4LTE'
                       'deviceVersion':  '',    // 设备版本号 比如  '4.4.4'
                       'supportFingerprint': 'true', //是否支持指纹识别 true false
                     }
         */
        getDeviceInfo : function(callback) {
            exec(callback, callback, "CCUtils", "getDeviceInfo", []);
        },

        getSystemVersion : function(callback) {
            exec(callback, callback, "CCUtils", "getSystemVersion", []);
        },
        
        /**
         * 选择日期
         * 传入参数： date
         * 返回值：
         *           0 - 成功   4 - 失败
         *  返回内容：
         *           'dateString'    //日期，例如：2015-01-01
         */
        datePicker: function(date, callback) {
            var options = {
               'date': date?new Date(date):new Date(),
               mode: 'date',
               locale: 'zh_CN',
               doneButtonLabel: '完成',
               cancelButtonLabel: '取消'
            };
               
            function onSuccess(dateObject) {
                if (dateObject) {
                    var year = dateObject.getFullYear();
                    var month = dateObject.getMonth()+1;
                    if (month <10) {
                        month = '0'+month;
                    }
                    var selectedDate = dateObject.getDate();
                    if (selectedDate < 10) {
                        selectedDate = '0' + selectedDate
                    }
                    var value = {
                                    Value:year +'-' + month + '-' + selectedDate,
                                    ErrorCode: 0,
                                    ErrorDescription: ''
                                };
                    callback(value);
                }
                else {
                    var value = {
                                    ErrorCode: 4,
                                    ErrorDescription: '已取消'
                                };
                    callback(value);
                }
            }
               
            datePickerObject.show(options, onSuccess);
        },
        
        /**
         * 选择时间
         * 传入参数：
         *          is24HourView    //BOOLEAN 是否为二十四小时
         *          time
         * 返回值：
         *          0 - 成功   4 - 失败
         *  返回内容：
         *          'timeString'    //时间，例如：09:00
         */
        timePicker: function(is24HourView, time, callback) {
            exec(callback, callback, "CCUtils", "timePicker", [is24HourView, time]);
        },

        /**
         * 接口说明： 创建二维码
         * 接口调用： CCUtils.createQRCode(info, success, [error])
         * 传入参数：
         *          @param info     字符串
         *          @param success  成功回调
         *          @param error    失败回调
         * 返回值：
         *          ErrorCode :  0, 1, 4
         * 返回内容：
         *          当创建二维码后，会返回二维码数据(Base64格式)
         */
        createQRCode: function(info, success, error){
            if (!error) error = success;
            exec(success, error, "CCUtils", "createQRCode", [info]);
        },
        
        /**
         * 获取应用信息
         * 传入参数：无
         * 返回值：
         *           0 - 成功   4 - 失败
         * 返回内容：
         *         
                     {
                       'name' : '',       // 应用中文名称
                       'version' : '',    // 应用版本
                       'h5resources' : [ resouceInfo, resourceInfo, ...]  //H5资源包信息
                     }
                     
                     resourceInfo 定义如下:
                     {
                         'name' : '',   //资源包名字
                         'version' : ''  //资源包版本
                     }
         */
        getApplicationInfo: function(callback) {
            exec(callback, callback, "CCUtils", "getApplicationInfo", []);
        },

        /**
         * HMAC签名
         * 传入参数： data 待签名的数据(json格式字符串)
         * 返回值：
         *           0 - 成功   其它 - 失败
         * 返回内容：
         *           HMAC签名
         */
        sign: function(data, callback){
            exec(callback, callback, "CCUtils", "sign", [data]);
        },
        
        /**
         * md5签名
         * 传入参数： data 待签名的数据(json格式)
         * 返回值：
         *           0 - 成功   其它 - 失败
         * 返回内容：
         *           签名原文   签名密文
         */
        MD5: function(data, callback){
            exec(callback, callback, "CCUtils", "MD5", [data]);
        },

        /**
         * 设置存储
         * 传入参数：
         *      @params key 存储键
         *      @params value 存储值(字符串)
         *      @params scope 0-永久 1-应用 2-会话
         * 返回值：
         *           0 - 成功   其它 - 失败
         * 返回内容：
         *
         */
        setStorage: function(key, value, scope, callback){
            exec(callback, callback, "CCUtils", "setStorage", [key, value, scope]);
        },

        /**
         * 获取存储
         * 传入参数：
         *      @params key 存储键
         *      @params scope 0-永久 1-应用 2-会话
         * 返回值：
         *           0 - 成功   其它 - 失败
         * 返回内容：存储值(字符串)
         *
         */
        getStorage: function(key, scope, callback){
            exec(callback, callback, "CCUtils", "getStorage", [key, scope]);
        },

        /**
         * 清除存储
         * 传入参数：
         *      @params key 存储键
         *      @params scope 0-永久 1-应用 2-会话
         * 返回值：
         *           0 - 成功   其它 - 失败
         * 返回内容：
         *
         */
        clearStorage: function(key, scope, callback){
            exec(callback, callback, "CCUtils", "clearStorage", [key, scope]);
        },

        /**
         * 跳转appstore评价
         *
         * 传入参数：
         *          @param marketPkg    可对app评分的第三方应用包名(字符串) 仅安卓使用
         *
         * 返回值：
         *          ErrorCode :  0, 1, 501
         */
        appComment: function(marketPkg, callback) {
        	exec(callback, callback, "CCUtils", "appComment", [marketPkg]);
        },
        
        /**
         * 开启系统webview加载html标签
         *
         * 传入参数： 
         *        @param url    传入获取html语法标签参数的url地址
         *        @param param - json格式，可以为空; 例如
         *         {
         *             'title'     : '',             // 标题
         *             ...
         *         }
         * 返回码： 
         *          返回码：0,1,5
         **/
        startWebviewLoadData: function(url, param, callback){

            exec(callback, callback, "CCUtils", "startWebviewLoadData", [url, param]);
        },

        /**
         * 跳转支付收银台界面
         *
         * 传入参数：
         *
         *        @param
         *        param - json格式  收银台界面展示数据
         *         {
         *             'orderSum'  : '12.01',    //订单总金额
         *             'payIntro'  : '使用XX支付享受8折优惠'  // XX支付优惠活动简介
         *             ...
         *         }
         * 返回值：
         *        ErrorCode : 0,1
         *        'payWay' :  ''   //支付方式   例如：AliPay 支付宝
         *
         *
         **/
        selectPayMode: function(param, callback){

            exec(callback, callback, "CCUtils", "selectPayMode", [param]);
        },

        /**
         * 订单的签名数据 (先调用selectPayMode后)
         *
         * 传入参数：
         *
         *        @param
         *        paySign : ''  //调用selectPayMode后，回调的订单签名数据(String)
         *
         * 返回值：
         *        ErrorCode : 0,1
         *
         **/
        setPaySign: function(paySign, callback){

            exec(callback, callback, "CCUtils", "setPaySign", [paySign]);
        },

        /**
         * 对当前屏幕进行截屏
         * 传入参数：
         *      @params picName 截图保存的名称
         *
         * 返回值：
         *           0,1
         * 返回内容：
         *
         */
        screenShot: function(picName, callback){
            exec(callback, callback, "CCUtils", "screenShot", [picName]);
        },


        /**
         * 跳转系统wallet应用进行添加卡片
         * 传入参数：
         *     无
         *
         * 返回值：
         *
         */
        appleWallet: function(callback){
            exec(callback, callback, "CCUtils", "appleWallet", []);
        },
        /**
         * 接口说明： 开启长轮询
         * 接口调用： CCUtils.startNotificationService(url, data, timeout, success, [error])
         * 传入参数：
         *        @param url      传入的请求地址
         *        @param data     可选参数，请求数据
         *        @param success  成功回调
         *        @param error    失败回调
         * 返回值：
         *          ErrorCode :  0, 1
         *
         */
        startNotificationService: function(url, data, timeout, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "startNotificationService", [url, data, timeout]);
        },

        /**
         * 接口说明： 停止长轮询
         * 接口调用： CCUtils.stopNotificationService(success, [error])
         * 传入参数：
         *        @param success  成功回调
         *        @param error    失败回调
         * 返回值：
         *          ErrorCode :  0, 1
         *
         */
        stopNotificationService: function(success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "stopNotificationService", []);
        },

        /**
         * 接口说明： 更换长轮询的数据
         * 接口调用： CCUtils.updateNotificationInfo(url, data, success, [error])
         * 传入参数：
         *        @param url     传入的请求地址
         *        @param data    可选参数，请求数据
         *        @param success  成功回调
         *        @param error    失败回调
         * 返回值：
         *          ErrorCode :  0, 1
         *
         */
        updateNotificationInfo: function(url, data, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "updateNotificationInfo", [url, data]);
        },

        /**
         * 接口说明： 传用户信息给原生
         * 接口调用： CCUtils.userInfo(json, success, [error])
         * 传入参数：
         *        @param  json
         *        @param success  成功回调
         *        @param error    失败回调
         * 返回值：
         *          ErrorCode :  0, 1
         *
         */
        userInfo: function(json, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "userInfo", [json]);
        },

        /**
         * 获得位置经纬度
         * 传入参数： 无
         * 返回值：
         0 - 成功   502 - 失败
         返回内容：
         {
           'longitude'     :  '',    // 地图经度

           'latitude'   :  '',    // 地图纬度

         }
         */
        getLocationInfo : function(callback) {
            exec(callback, callback, "CCUtils", "getLocationInfo", []);
        },

        /**
         * 获得百度地图经纬度
         * 传入参数： 无
         * 返回值：
         0 - 成功   502 - 失败
         返回内容：
         {
           'longitude'     :  '',    // 地图经度

           'latitude'   :  '',    // 地图纬度

         }
         */
        getBaiduLocationInfo : function(callback) {
            exec(callback, callback, "CCUtils", "getBaiduLocationInfo", []);
        },

        /**
         * 根据URL保存图片到相册
         * 传入参数： 无
         * 返回值：
         0 - 成功
         返回内容：
         {
           'path'     :  '',    // 图片的相对路径

         }
         */
        photoSave : function(path ,callback) {
            exec(callback, callback, "CCUtils", "photoSave", [path]);
        },



        /**
         * 接口说明： 下载合同
         * 接口调用： openCertPDFFile(urlPdf, success, [error])
         * 合同下载
         * 传入参数： 合同下载地址
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        openCertPDFFile : function(urlPdf, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "openCertPDFFile", [urlPdf]);
        },

        /**
         * 接口说明： 获取合同序列号
         * 接口调用： getCertSn(mobileNum, success, [error])
         * 获取合同序列号
         * 传入参数：
         *     mobileNum : ''        // 用户手机号
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *    certSn   // SRA00117请求数据
         *
         */
        getCertSn : function(mobileNum, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "getCertSn", [mobileNum]);
        },

        /**
         * 接口说明： 签章pdf下载
         * 接口调用： signPdfFile(data, success, [error])
         * 签章pdf下载
         * 传入参数：
         *       data:
         *       [
         *       "souceFile": "html",
         *       "resultFile": "SignPdfFile.pdf"
         *       ]
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        signPdfFile : function(data, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "signPdfFile", [data]);
        },

        /**
         * 接口说明： 删除证书
         * 接口调用： deleteCer(mobileNum, success, [error])
         * 删除证书
         * 传入参数：
         *       mobileNum : ''           // 用户手机号
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        deleteCer : function(mobileNum, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "deleteCer", [mobileNum]);
        },

        /**
         * 接口说明： 获取申请证书p10数据
         * 接口调用： getP10(pinPassword, success, [error])
         * 获取申请证书p10数据  // 申请书base64
         * 传入参数：
         *       pinPassword : ''   //  用户输入pin码
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *       p10       :   ''  // SRA00113请求数据
         */
        getP10 : function(pinPassword, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "getP10", [pinPassword]);
        },

        /**
         * 接口说明： 证书导入
         * 接口调用： setCert(cert, success, [error])
         * 证书导入
         * 传入参数：
         *       cert : ''   //  证书信息
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        setCert : function(cert, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "setCert", [cert]);
        },

        /**
         * 接口说明： 更新pin码
         * 接口调用： updatePin(data, success, [error])
         * 更新pin码
         * 传入参数：
         *      data
         *      [
         *        "sourcePinPassword": '',  // 旧密码
         *        "newPinPassword": '',     // 新密码
         *        "mobileNum": '',          // 手机号
         *      ]
         *
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        updatePin : function(data, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "updatePin", [data]);
        },

        // TODO webScoket连接相关
        /**
         * 接口说明： webScoket建立连接
         * 接口调用： webScoketConnect(data, success, [error])
         * 传入参数：
         *    data
         *    [
         *       "url"          :         ""     // webScoket连接的地址
         *       "funName"      :         ""     // webScoket接收消息后，事件通知方法名
         *    ]
         *
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        webScoketConnect : function(data, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "webScoketConnect", [data]);
        },

        /**
         * 接口说明： webScoket请求推送消息   必须先调用 webScoketConnect
         * 接口调用： webScoketSend(data, success, [error])
         * 传入参数：
         *    data
         *    [
         *       "message"           :          ""       // webScoket推送消息
         *    ]
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        webScoketSend : function(data, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "webScoketSend", [data]);
        },

        /**
         * 接口说明： webScoket断开
         * 接口调用： webScoketDisconnect(success, [error])
         * 传入参数：
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        webScoketDisconnect : function(success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "webScoketDisconnect", []);
        },

        /**
         * 接口说明： 设置屏幕亮度
         * 接口调用： setScreenBrightness(type, brightness, success, [error])
         * 传入参数：
         *
         *      type : ""           // "0"代表设置屏幕亮度   "1"代表恢复到原来的屏幕亮度
         *      brightness : ""     // 屏幕亮度取值范围 "0"~"255"
         *
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *
         */
        setScreenBrightness : function(type, brightness, success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "setScreenBrightness", [type, brightness]);
        },

        /**
         * 接口说明： 数据采集开始页面
         * 接口调用： trackPageDataBegin(pageName , success, [error])
         * 传入参数：
         *
         *      pageName : ""           // 页面名
         *
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *     无
         */
        trackPageDataBegin : function(pageName , success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "trackPageDataBegin", [pageName]);
        },

        /**
         * 接口说明： 数据采集结束页面
         * 接口调用： trackPageDataEnd(pageName , success, [error])
         * 传入参数：
         *
         *      pageName : ""           // 页面名
         *
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *     无
         */
        trackPageDataEnd : function(pageName , success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "trackPageDataEnd", [pageName]);
        },

        /**
         * 接口说明： 打开滴滴
         * 接口调用： openDIDISdk(success, [error])
         * 传入参数：
         *
         * 返回值：
         *     0 - 成功
         * 返回内容：
         *     无
         */
        openDIDISdk : function(success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "openDIDISdk", []);
        },

         /**
         * 接口说明： 发送短信
         * 接口调用： sendSMS(info , success, [error])
         * 传入参数：
         *		param info     //Json
         *			{
		 *				telephoneNum :  电话号码
		 *				content      :  短信内容
         *			 }
         * 返回值：
         *     0 - 成功  3 - 取消 4 - 失败  
         * 返回内容：
         *     无
         */
        sendSMS : function(info,success, error) {
            if (!error) error = success;
            exec(success, error, "CCUtils", "sendSMS", [info]);
        },

    };

    module.exports = CCUtils;
});
