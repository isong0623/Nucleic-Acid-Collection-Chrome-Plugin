/**
 * 接口Api暴露
 */
class ApiProvider{
    constructor() {
        this.token = function (){
            try {
                return decodeURI(document.cookie.split(";").filter((value)=>{return value.trim().startsWith("vue_admin_template_token")})[0].trim().replace("vue_admin_template_token=",""));
            } catch (e) {
                return null;
            }
        };
    }

    login(username,password){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/login")
            .params("password",CryptUtils.encryptLogin(password))
            .params("username",CryptUtils.encryptLogin(username))
            .params("verifyCode","")
            .params("captcha","")
            .params("point","1")
            .params("appId","A424625631078450")
            .params("skey",CryptUtils.encryptLogin("A424625631078450;"+new Date().getTime()))
            .fields(
                [
                    ["username", "STRING" , "登录账号", "NOEMPTY"],
                    ["password", "STRING" , "登录密码", "NOEMPTY"],
                    ["point"   , "INTEGER", ""       , "1"],
                    ["appId"   , "STRING" , "设备号" ,  "A424625631078450" ],
                    ["skey"    , "STRING" , ""       , "AH7KqML9YtSSESUxROPTnjczbxNsDcW4Up2/+6evFEk="]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    ["token"     , "STRING"                  , "令牌"       , ""],
                    ["expireAt"  , "DATE:yyyy-MM-dd HH:mm:ss", "到期时间"    , ""],
                    ["username"  , "STRING"                  , "登录用户名"  , ""],
                    ["isAdmin"   , "BOOL"                    , "管理权限"    , ""],
                    ["fullName"  , "STRING"                  , "管理员"      , ""],
                    ["mobile"    , "STRING"                  , "管理员手机号" , ""],
                    ["regionCode", "STRING"                  , "市区号"      , ""],
                    ["regionName", "STRING"                  , "市区"        , ""],
                    ["gridId"    , "STRING"                  , "乡镇号"      , ""],
                    ["gridName"  , "STRING"                  , "乡镇"        , ""],
                    ["siteCode"  , "STRING"                  , "采样点ID"    , ""],
                    ["siteName"  , "STRING"                  , "采样点"      , ""],
                    ["testSiteId", "STRING"                  , "测试点ID"    , ""]
                ]
            )
            .getParent()
    }

    /**
     * 获取试管采样信息
     *
     * @param tubNo
     * @returns {Api}
     */
    tubInfo(tubNo){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/caiyang/getTestedListByTubeNum")
            .headers("Authorization",this.token())
            .params("tubeNum",tubNo)
            .fields(
                [
                    ["tubeNum", "STRING", "采样管ID", "NOEMPTY", "" , "INPUT"]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    [
                        ["peopleId"    , "STRING" , "用户ID"    , ""],
                        ["idCard"      , "STRING" , "身份号"    , ""],
                        ["fullName"    , "STRING" , "姓名"      , ""],
                        ["address"     , "STRING" , "地址"      , ""],
                        ["mobile"      , "STRING" , "手机"      , ""],
                        ["testSiteId"  , "STRING" , "采集点ID"  , ""],
                        ["testSiteName", "STRING" , "采集点名称" , ""],
                        ["testStatus"  , "INTEGER", "采集状态"   , "", "{\"0\":\"待送检\",\"1\":\"已送检\",\"2\":\"已送检\",\"3\":\"已完成\"}"]
                    ]
                ]
            )
            .getParent()
    }

    /**
     * 提交采样记录
     * @param tubNo
     * @param data
     * @returns {*}
     */
    samplingRecordByData(tubNo, data){
        data["testNum"] = tubNo;
        return this.samplingRecord(
            tubNo??data["testNum"],
            data["fullName"],
            data["idCard"],
            data["mobile"],
            data["idType"],
            data["tubeCapacity"],
            data["streetId"],
            data["communityId"],
            data["zoneId"],
            data["category"],
            data["address"],
            data["remark"],
            data["gridName"],
            data["secondGridName"],
            data["thirdGridName"],
            data["status"],
            data["primaryId"],
            data["secondaryId"],
            data["thirdId"],
            data["isNew"],
            data["isPc"]
        )
    }

    /**
     * 提交采样记录
     * @param testNum
     * @param fullName
     * @param idCard
     * @param mobile
     * @param idType
     * @param tubeCapacity
     * @param streetId
     * @param communityId
     * @param zoneId
     * @param category
     * @param address
     * @param remark
     * @param gridName
     * @param secondGridName
     * @param thirdGridName
     * @param status
     * @param primaryId
     * @param secondaryId
     * @param thirdId
     * @param isNew
     * @param isPc
     * @returns {*}
     */
    samplingRecord(testNum,fullName,idCard,mobile,idType,tubeCapacity,streetId,communityId,zoneId,category,address,remark,gridName,secondGridName,thirdGridName,status,primaryId,secondaryId,thirdId,isNew,isPc){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/caiyang/confirmed")
            .headers("Authorization",this.token())
            .body(JSON.stringify({
                fullName      : fullName                 ,
                idCard        : idCard                   ,
                idType        : idType         ?? "1"    ,
                mobile        : mobile                   ,
                tubeCapacity  : tubeCapacity   ?? HSCJLocalSettingManager.getBarcodeCommitNum() ,
                streetId      : streetId       ?? ""     ,
                communityId   : communityId    ?? ""     ,
                zoneId        : zoneId         ?? null   ,
                category      : category       ?? "null" ,
                address       : address        ?? ""     ,
                remark        : remark         ?? ""     ,
                gridName      : gridName       ?? ""     ,
                secondGridName: secondGridName ?? ""     ,
                thirdGridName : thirdGridName  ?? ""     ,
                testNum       : testNum                  ,
                status        : status         ?? null   ,
                primaryId     : primaryId      ?? ""     ,
                secondaryId   : secondaryId    ?? ""     ,
                thirdId       : thirdId        ?? ""     ,
                isNew         : isNew          ?? "1"    ,
                isPc          : parseInt(isPc           ?? "0")    ,
            }))
            .fields(
                [
                    ["fullName"      , "STRING", "姓名"      , "NOEMPTY"],
                    ["idCard"        , "STRING", "身份号"    , "NOEMPTY"],
                    ["idType"        , "STRING", "认证类型"  , "1"       ],
                    ["mobile"        , "STRING", "电话"      , "NOEMPTY"],
                    ["tubeCapacity"  , "STRING", "试管容量"   , "20"     ],
                    ["streetId"      , "STRING", "街道（镇）" , ""       ],
                    ["communityId"   , "STRING", "社区ID"     , ""       ],
                    ["zoneId"        , "STRING", "?"         , "null"   ],
                    ["category"      , "STRING", "人员类别"   , "nullstr"],
                    ["address"       , "STRING", "地址"       , ""       ],
                    ["remark"        , "STRING", "附加说明"   , ""       ],
                    ["gridName"      , "STRING", "街道"       , ""       ],
                    ["secondGridName", "STRING", "居委会"     , ""       ],
                    ["thirdGridName" , "STRING", "小区"       , "null"   ],
                    ["testNum"       , "STRING", "采样试管编号", ""       ,"" , "INPUT"],
                    ["status"        , "STRING", "状态"       , "null"   ],
                    ["primaryId"     , "STRING", "?"          , ""       ],
                    ["secondaryId"   , "STRING", "?"          , ""       ],
                    ["thirdId"       , "STRING", "?"          , ""       ],
                    ["isNew"         , "STRING", "?"          , "1"      ],
                    ["isPc"          , "INTEGER", "是否是PC"  , "0"       ]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    ["testNum", "STRING", "试管编号", ""],
                    ["value"  , "STRING", "状态"    , ""]
                ]
            )
            .getParent()
    }

    /**
     * 获取身份证信息
     * @param idCard
     * @param pageNum
     * @param pageSize
     * @returns {*}
     */
    cardNoInfo(idCard,pageNum,pageSize){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/caiyang/findPeopleListForInput")
            .headers("Authorization",this.token())
            .body(JSON.stringify({
                idCard:idCard,
                pageNum:parseInt(pageNum?.toString()??"1"),
                pageSize:parseInt(pageSize?.toString()??"30")
            }))
            .fields(
                [
                    ["idCard"  , "STRING" , "身份号", "NOEMPTY"],
                    ["pageNum" , "INTEGER", "页号"  , "1" ],
                    ["pageSize", "INTEGER", "页数"  , "30"]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    ["id"            , "STRING"                  , "id"     , ""    ],
                    ["fullName"      , "STRING"                  , "姓名"    , ""    ],
                    ["idCard"        , "STRING"                  , "身份号"  , ""    ],
                    ["mobile"        , "STRING"                  , "手机"    , ""    ],
                    ["category"      , "STRING"                  , "类别"    , "null"],
                    ["primaryId"     , "STRING"                  , "街道id"  , "null"],
                    ["secondaryId"   , "STRING"                  , "社区id"  , "null"],
                    ["thirdId"       , "STRING"                  , "?"       , "null"],
                    ["regionCode"    , "STRING"                  , "区域码"   , ""    ],
                    ["address"       , "STRING"                  , "地址"     , ""    ],
                    ["remark"        , "STRING"                  , "备注"     , "null"],
                    ["source"        , "INTEGER"                 , "?"        , "0"   ],
                    ["createdTime"   , "DATE:yyyy-MM-dd HH:mm:ss", "创建时间" , ""    ],
                    ["updatedTime"   , "DATE:yyyy-MM-dd HH:mm:ss", "更新时间" , ""    ],
                    ["openId"        , "STRING"                  , "?"        , "null"],
                    ["status"        , "STRING"                  , "?"        , "null"],
                    ["delFlag"       , "BOOL"                    , "?"        , ""    ],
                    ["checkStatus"   , "INTEGER"                 , "?"        , ""    ],
                    ["sex"           , "INTEGER"                 , "性别1男"  , ""    ],
                    ["idType"        , "INTEGER"                 , "认证类型" , ""   ],
                    ["createdBy"     , "STRING"                  , "创建人员" , "null"],
                    ["updatedBy"     , "STRING"                  , "更新人员" , "null"],
                    ["regionName"    , "STRING"                  , "区域"     , "null"],
                    ["gridName"      , "STRING"                  , "街道"     , ""    ],
                    ["secondGridName", "STRING"                  , "居委会"   , ""    ],
                    ["thirdGridName" , "STRING"                  , "小区"     , ""    ],
                    ["gridCode"      , "STRING"                  , "街道号"   , ""    ],
                    ["secondGridCode", "STRING"                  , "居委会号" , ""    ],
                    ["thirdGridCode" , "STRING"                  , "小区号"   , ""    ],
                    ["isNew"         , "STRING"                  , "是否新建" , "1"   ],
                    ["isPc"          , "STRING"                  , "电脑录入" , "0"   ],
                    ["testNum"       , "STRING"                  , "试管编号" , "null"]
                ]
            )
            .getParent()
    }

    /**
     * 删除采样记录
     * @param ids
     * @param reason
     * @returns {*}
     */
    delSampling(ids,reason){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/testResult/delTestResult")
            .headers("Authorization",this.token())
            .body(JSON.stringify({
                ids: ids,
                reason:reason??""
            }))
            .fields(
                [
                    ["ids"    , "STRING", "采样ID"    , "NOEMPTY" , "" , "Api[6][\"id\"]"],
                    ["reason" , "STRING", "认证类型"  , ""         , "" , "INPUT" ]
                ]
            )
            .getParent()
    }

    /**
     * 获取历史采样记录
     * @param idCard
     * @param testNum
     * @param startTime
     * @param endTime
     * @param testStatus
     * @param pageNum
     * @param pageSize
     * @returns {*}
     */
    histSampling(idCard,testNum,startTime,endTime,testStatus,pageNum,pageSize){
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/testResult/findTestResult")
            .headers("Authorization",this.token())
            .body(JSON.stringify({
                pageNum:parseInt(pageNum??1),
                pageSize:parseInt(pageSize??30),
                idCard:idCard??null,
                startTime:startTime??null,
                endTime:endTime??null,
                testNum:testNum??null,
                testStatus:testStatus??null
            }))
            .fields(
                [
                    ["pageNum"     , "INTEGER"                  , "查询页号", "1"   , "{\"String.format\":\"第%d页\"}"                                     ,"INPUT"],
                    ["pageSize"    , "INTEGER"                  , "分页页数", "30"  , "{\"String.format\":\"共%d页\"}"                                     ,"INPUT"],
                    ["idCard"      , "STRING"                   , "身份号"  , "null", ""                                                                  ,"INPUT","datablock@idCard"],
                    ["startTime"   , "DATE:yyyy-MM-dd HH:mm:ss" , "开始时间", "null", ""                                                                   ,"INPUT"],
                    ["endTime"     , "DATE:yyyy-MM-dd HH:mm:ss" , "结束时间", "null", ""                                                                   ,"INPUT"],
                    ["testNum"     , "STRING"                   , "试管编号", "null", ""                                                                   ,"INPUT"],
                    ["testStatus"  , "STRING"                   , "采集状态", "null", "{\"0\":\"待送检\",\"1\":\"已送检\",\"2\":\"已送检\",\"3\":\"已完成\"}"   ,"INPUT"]
                ]
            )
            .getParent()
            .getResponse()
            .fields(
                [
                    ["id"              , "STRING", "采样ID"     , ""],
                    ["peopleId"        , "STRING", "人员ID"     , ""],
                    ["fullName"        , "STRING", "姓名"       , ""],
                    ["address"         , "STRING", "地址"       , ""],
                    ["mobile"          , "STRING", "手机号"     , ""],
                    ["idCard"          , "STRING", "身份号"     , ""],
                    ["testNum"         , "STRING", "试管编号"   , ""],
                    ["gatheringTime"   , "STRING", "采集时间"    , ""],
                    ["testOrgId"       , "STRING", "采样组织编号", ""],
                    ["testOrgName"     , "STRING", "采样组织名称", ""],
                    ["testSiteId"      , "STRING", "采样点编号"  , ""],
                    ["testSiteName"    , "STRING", "采样点名称"  , ""]
                ]
            )
            .getParent()
    }

    /**
     * 获取健康码信息
     * @param healthyQrCode
     * @returns {*}
     */
    healthyQrCodeInfo(healthyQrCode){
        const formData = new FormData();
        formData.append("healthCode",healthyQrCode);
        return new Api()
            .getRequest()
            .host("https://hsjc.qingdao.gov.cn/api/people/decryptHealthQr")
            .headers("Authorization",this.token())
            .body(formData)
            .getParent()
    }
}

const ApiProviderInstance = new ApiProvider();
