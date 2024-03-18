/**
 * 本地用户缓存记录
 */
class LocalUserInfoManager {
    
    /**
     * 添加用户
     *
     * @param data
     * @param callback
     */
    static autoAddUser(data,callback){
        if(
            FunctionUtils.isNull(data) ||
            FunctionUtils.isNull(data.fullName) ||
            FunctionUtils.isNull(data.idCard) ||
            FunctionUtils.isNull(data.mobile) ||
            FunctionUtils.isNull(data.id)
        ) {
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure();
            return;
        }

        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT COUNT(1) as \`0\` FROM sampling_record WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.convArr([data.idType??1,data.idCard]),
                (transaction, resultSet)=>{
                    if(callback.process === true) return;
                    const item = resultSet.rows.item(0);
                    if(item === null || item === undefined || item.length <1 || item[0]<1){
                        transaction.executeSql(
                            `
                                INSERT INTO sampling_record(
                                    id            ,
                                    healthCode    ,
                                    passCode      ,
                                    fullName      ,
                                    idCard        ,
                                    idType        ,
                                    mobile        ,
                                    streetId      ,
                                    communityId   ,
                                    zoneId        ,
                                    category      ,
                                    address       ,
                                    remark        ,
                                    gridName      ,
                                    secondGridName,
                                    thirdGridName ,
                                    testNum       ,
                                    status        ,
                                    primaryId     ,
                                    secondaryId   ,
                                    thirdId       ,
                                    isNew         ,
                                    isPc          
                                ) values(
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?
                                );
                            `,
                            WebSQLUtils.convArr([
                                data["id"            ],
                                data["healthCode"    ],
                                data["passCode"      ],
                                data["fullName"      ],
                                data["idCard"        ],
                                data["idType"        ]??1,
                                data["mobile"        ],
                                data["streetId"      ],
                                data["communityId"   ],
                                data["zoneId"        ],
                                data["category"      ],
                                data["address"       ],
                                data["remark"        ],
                                data["gridName"      ],
                                data["secondGridName"],
                                data["thirdGridName" ],
                                data["testNum"       ],
                                data["status"        ],
                                data["primaryId"     ],
                                data["secondaryId"   ],
                                data["thirdId"       ],
                                data["isNew"         ],
                                data["isPc"          ],
                            ]),
                            (transaction, resultSet)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                if(resultSet.insertId === undefined){
                                    callback.onFailure();
                                }
                                else{
                                    callback.onSuccess();
                                }
                            },
                            (SQLTransaction, SQLError) => {
                                if(callback.process === true) return;
                                callback.process = true;
                                callback.onFailure(LocalUserInfoManager.errorCallback(e));
                            }
                        )
                    }
                    else{
                        transaction.executeSql(
                            `
                                UPDATE sampling_record 
                                SET
                                    id             = ?,
                                    fullName       = ?,
                                    idCard         = ?,
                                    idType         = ?,
                                    mobile         = ?,
                                    streetId       = ?,
                                    communityId    = ?,
                                    zoneId         = ?,
                                    category       = ?,
                                    address        = ?,
                                    remark         = ?,
                                    gridName       = ?,
                                    secondGridName = ?,
                                    thirdGridName  = ?,
                                    testNum        = ?,
                                    status         = ?,
                                    primaryId      = ?,
                                    secondaryId    = ?,
                                    thirdId        = ?,
                                    isNew          = ?,
                                    isPc           = ?
								WHERE 
									idType = ? AND idCard = ? ;
                            `,
                            WebSQLUtils.convArr([
                                data["id"            ],
                                data["fullName"      ],
                                data["idCard"        ],
                                data["idType"        ]??1,
                                data["mobile"        ],
                                data["streetId"      ],
                                data["communityId"   ],
                                data["zoneId"        ],
                                data["category"      ],
                                data["address"       ],
                                data["remark"        ],
                                data["gridName"      ],
                                data["secondGridName"],
                                data["thirdGridName" ],
                                data["testNum"       ],
                                data["status"        ],
                                data["primaryId"     ],
                                data["secondaryId"   ],
                                data["thirdId"       ],
                                data["isNew"         ],
                                data["isPc"          ],

                                data["idType"        ]??1,
                                data["idCard"        ],
                            ]),
                            (transaction, resultSet)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                if(resultSet.rowsAffected === undefined){
                                    callback.onFailure();
                                }
                                else{
                                    callback.onSuccess();
                                }
                            },
                            (t,e) => {
                                if(callback.process === true) return;
                                callback.process = true;
                                callback.onFailure(LocalUserInfoManager.errorCallback(e));
                            }
                        )
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 匹配id
     *
     * @param idType
     * @param idCard
     * @param callback
     */
    static queryUser(idType,idCard,callback){
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record 
                        WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.convArr([idType,idCard]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if((rows?.rows?.length??0) > 0){
                        callback.onSuccess(rows.rows.item(0));
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(err));
                }
            )
        })
    }

    /**
     * 匹配id
     * @param callback
     */
    static queryUserById(id,callback){
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE id = ?;
                `,
                WebSQLUtils.convArr([id]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if((rows?.rows?.length??0) > 0){
                        callback.onSuccess(WebSQLUtils.rows2Array(rows));
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(err));
                }
            )
        })
    }

    static parse2HealthCode(code){
        let c = code;
        if((c?.indexOf(":")??-1)>-1){
            c = c.substring(0,c.indexOf(":"))
            return c;
        }
        return null;
    }

    static enablePassCode = true;
    static parse2Passcode(code){
        let c = code;
        if(!LocalUserInfoManager.enablePassCode || c.indexOf("#")<0){
            return null;
        }
        c = c.substring(c.indexOf("#")+1,c.length);
        c = c.substring(0,56);
        let bytes = Base64Utils._decodeBase64Str2Bytes(c);
        for(let i=bytes.length-1;i>31;--i){
            delete(bytes[i]);
        }
        bytes.length = 32;
        c = Base64Utils._encodeBytes2Base64Str(bytes);
        return c;
    }

    /**
     * 匹配健康码
     *
     * @param code
     * @param callback
     */
    static queryUserByHealthyCode(code,callback){
        let c = LocalUserInfoManager.parse2HealthCode(code);
        if(FunctionUtils.isNull(c)){
            LocalUserInfoManager.queryUserInfoByPassCode(code,callback);
            return;
        }
        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE healthCode = ?;
                `,
                WebSQLUtils.convArr([c]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if((rows?.rows?.length??0) > 0){
                        callback.onSuccess(WebSQLUtils.rows2Array(rows));
                    }
                    else{
                        callback.onSuccess([]);
                    }
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(err));
                }
            )
        })
    }

    /**
     * 更新健康码
     *
     * @param idType
     * @param idCard
     * @param healthyCode
     */
    static updateHealthyCode(idType, idCard, healthyCode, callback){
        let c = LocalUserInfoManager.parse2HealthCode(healthyCode);
        if(FunctionUtils.isNull(c)){
            LocalUserInfoManager.updatePassCode(idType,idCard,healthyCode,callback);
            return;
        }

        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    UPDATE sampling_record SET healthCode = ? WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.convArr([c,idType,idCard]),
                (transaction, resultSet)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess();
                },
                (SQLTransaction, SQLError) => {
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(SQLError));
                }
            )
        });
    }

    static updatePassCode(idType,idCard,passCode,callback){
        const c = LocalUserInfoManager.parse2Passcode(passCode);
        if(FunctionUtils.isNull(c)){
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure("不是健康码，存储失败！");
            return;
        }

        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    UPDATE sampling_record SET passCode = ? WHERE idType = ? AND idCard = ?;
                `,
                WebSQLUtils.convArr([c,idType,idCard]),
                (transaction, resultSet)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess();
                },
                (SQLTransaction, SQLError) => {
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(SQLError));
                }
            );
        })
    };

    static queryUserInfoByPassCode(passCode,callback){
        const c = LocalUserInfoManager.parse2Passcode(passCode);
        if(FunctionUtils.isNull(c)){
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure("不是健康码，存储失败！");
            return;
        }

        LocalUserInfoManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE passCode = ?;
                `,
                WebSQLUtils.convArr([c]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    if((rows?.rows?.length??0) > 0){
                        callback.onSuccess(WebSQLUtils.rows2Array(rows));
                    }
                    else{
                        callback.onSuccess([]);
                    }
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalUserInfoManager.errorCallback(err));
                }
            )
        });
    }
}



LocalUserInfoManager.dbName = "local_user_info";
LocalUserInfoManager.version = "1.0";
LocalUserInfoManager.displayName = "HSCJ.LocalUserInfo";
LocalUserInfoManager.db = window.openDatabase(LocalUserInfoManager.dbName, LocalUserInfoManager.version, LocalUserInfoManager.displayName,100*1024*1024,(db)=>{
    db.transaction((t)=>{
        t.executeSql(
            `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            id            ,
                            healthCode    ,
                            passCode      ,
                            fullName      ,
							idCard        ,
							idType        ,
							mobile        ,
							streetId      ,
							communityId   ,
							zoneId        ,
							category      ,
							address       ,
							remark        ,
							gridName      ,
							secondGridName,
							thirdGridName ,
							testNum       ,
							status        ,
							primaryId     ,
							secondaryId   ,
							thirdId       ,
							isNew         ,
							isPc          ,
							PRIMARY KEY(idCard,idType)
                        );
                    `,
            WebSQLUtils.convArr([]),
            (t,r)=>{
                LogUtils.log("初始化数据库[LocalUserInfoDatabaseManager]完毕！")
            },
            (t,e)=>{
                alert("本地缓存数据库创建失败！\n\n"+LocalUserInfoManager.errorCallback());
            }
        )
    })
});

LocalUserInfoManager.db.transaction((t)=>{
    t.executeSql(
        `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            id            ,
                            healthCode    ,
                            passCode      ,
                            fullName      ,
							idCard        ,
							idType        ,
							mobile        ,
							streetId      ,
							communityId   ,
							zoneId        ,
							category      ,
							address       ,
							remark        ,
							gridName      ,
							secondGridName,
							thirdGridName ,
							testNum       ,
							status        ,
							primaryId     ,
							secondaryId   ,
							thirdId       ,
							isNew         ,
							isPc          ,
							PRIMARY KEY(idCard,idType)
                        );
                    `,
        WebSQLUtils.convArr([]),
        (t,r)=>{
        },
        (t,e)=>{
        }
    );
});

/*
LocalUserInfoManager.db.transaction(t=>{
    t.executeSql("alter table sampling_record add column passCode");
});
*/

/*
 LocalUserInfoManager.db.transaction(t=>{
    t.executeSql("delete from sampling_record");
});
 /**/

LocalUserInfoManager.errorCallback = function (SQLError){
    const message =
        "数据库操作错误！\n\n"+
        "错误代码："+ SQLError.code+"\n"+
        "错误信息："+ SQLError.message;

    LogUtils.warn(message);
    return message;
};
