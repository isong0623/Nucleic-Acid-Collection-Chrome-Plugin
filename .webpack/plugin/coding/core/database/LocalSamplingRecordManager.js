/**
 * 本地采样记录
 */
class LocalSamplingRecordManager {

    /**
     * 添加记录
     * @param data
     * @param callback
     */
    static addRecord(data,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT COUNT(*) as \`0\` FROM sampling_record WHERE idType = ? AND idNo = ?;
                `,
                WebSQLUtils.convArr([data.idType??1,data.idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    if(WebSQLUtils.countRecords(rs)>0){
                        callback.process = true;
                        callback.onSuccess();
                    }
                    else{
                        t.executeSql(
                            `
                                INSERT INTO sampling_record(
                                    idType,
                                    idNo,
                                    name,
                                    phone,
                                    tubNo,
                                    address,
                                    samplingTime,
                                    ids
                                )
                                VALUES(
                                    ?,?,?,?,?,?,?,?
                                );
                            `,
                            WebSQLUtils.convArr([
                                data["idType"],
                                data["idCard"],
                                data["fullName"],
                                data["mobile"],
                                data["testNum"],
                                data["address"],
                                new Date().getTime(),
                                ""
                            ]),
                            (t,rs)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                if(WebSQLUtils.isInsert(rs)){
                                    callback.onSuccess();
                                }
                                else{
                                    callback.onFailure();
                                }
                            },
                            (t,e)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                            }
                        );
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 删除采样记录
     * @param idType
     * @param idCard
     * @param callback
     */
    static delRecord(idType,idCard,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    DELETE FROM sampling_record WHERE idType = ? AND idNo = ?;
                `,
                WebSQLUtils.convArr([idType,idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;

                    if(WebSQLUtils.isUpdate(rs)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 依据id删除采样记录
     * @param ids 删除id
     * @param callback
     */
    static delRecordByIds(ids,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    DELETE FROM sampling_record WHERE ids = ?;
                `,
                WebSQLUtils.convArr([ids]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;

                    if(WebSQLUtils.isUpdate(rs)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 获取所有采样试管编号
     * @param callback
     */
    static listTubs(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT tubNo, COUNT(DISTINCT(tubNo)) as tubCount FROM sampling_record GROUP BY tubNo ;
                `,
                WebSQLUtils.convArr([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 获取所有成员记录
     * @param callback
     */
    static listRecords(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT idType, idNo as tubCount FROM sampling_record;
                `,
                WebSQLUtils.convArr([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 获取试管内采样记录
     * @param tubNo
     * @param callback
     */
    static getTubInfo(tubNo,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE tubNo = ? ORDER BY samplingTime ASC;
                `,
                WebSQLUtils.convArr([tubNo]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    static localSamplingInfo(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT COUNT(DISTINCT(tubNo)) as tubCount, COUNT(*) as recordCount FROM sampling_record;
                `,
                WebSQLUtils.convArr([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 列出所有已采集的记录
     * @param callback
     */
    static listAll(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record ORDER BY samplingTime DESC;
                `,
                WebSQLUtils.convArr([]),
                (t,rows)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.rows2Array(rows));
                },
                (t,err)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(err));
                }
            );
        });
    }

    /**
     * 获取用户采样信息
     * @param idType
     * @param idCard
     * @param callback
     */
    static queryUser(idType,idCard,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE idType = ? AND idNo = ?;
                `,
                WebSQLUtils.convArr([idType,idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 获取用户采样信息
     * @param ids
     * @param callback
     */
    static queryUserByDeleteIds(ids,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE ids = ?;
                `,
                WebSQLUtils.convArr([ids]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 更新删除标记
     */
    static updateDelFlag(idType,idCard,ids,callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    UPDATE sampling_record SET ids = ? WHERE idType = ? AND idNo = ?;
                `,
                WebSQLUtils.convArr([ids,idType,idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;

                    if(WebSQLUtils.isUpdate(rs)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }

    static clear(callback){
        LocalSamplingRecordManager.db.transaction((t)=>{
            t.executeSql(
                `
                    DELETE FROM sampling_record;
                `,
                WebSQLUtils.convArr([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess();
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(LocalSamplingRecordManager.errorCallback(e));
                }
            );
        });
    }
}

LocalSamplingRecordManager.time  = new Date();
LocalSamplingRecordManager.yyyy_MM_dd = LocalSamplingRecordManager.time.Format("yyyy_MM_dd");
LocalSamplingRecordManager.dbName = "local_sampling_record_" + LocalSamplingRecordManager.yyyy_MM_dd;
LocalSamplingRecordManager.version = "1.0";
LocalSamplingRecordManager.displayName = "HSCJ.SamplingRecord" + LocalSamplingRecordManager.yyyy_MM_dd;
LocalSamplingRecordManager.db = window.openDatabase(LocalSamplingRecordManager.dbName,LocalSamplingRecordManager.version,LocalSamplingRecordManager.displayName,10*1024*1024,(db)=>{
    db.transaction((t)=>{
        t.executeSql(
            `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            idType,
                            idNo,
                            name,
                            phone,
                            tubNo,
                            address,
                            samplingTime,
                            ids
                        );
                    `,
            WebSQLUtils.convArr([]),
            (t,r)=>{
                LogUtils.log("初始化数据库[LocalSamplingRecordDatabaseManager]完毕！");
            },
            (t,e)=>{
                alert("采样记录数据库创建失败！\n\n"+LocalSamplingRecordManager.errorCallback());
            }
        );
    });
});

LocalSamplingRecordManager.db.transaction((t)=>{
    t.executeSql(
        `
                        CREATE TABLE IF NOT EXISTS sampling_record(
                            idType,
                            idNo,
                            name,
                            phone,
                            tubNo,
                            address,
                            samplingTime,
                            ids
                        );
                    `,
        WebSQLUtils.convArr([]),
        (t,r)=>{},
        (t,e)=>{}
    );
});

/*
LocalSamplingRecordManager.db.transaction((t)=>{
   t.executeSql("delete from sampling_record" );
});
/**/

LocalSamplingRecordManager.errorCallback = function (SQLError){
    const message =
        "数据库操作错误！\n\n"+
        "错误代码："+ SQLError.code+"\n"+
        "错误信息："+ SQLError.message;

    LogUtils.warn(message);
    return message;
};

try {WebSQLUtils.dropDatabase("local_sampling_record_", "sampling_record");} catch (e) {}
