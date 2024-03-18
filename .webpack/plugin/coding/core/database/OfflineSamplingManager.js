
/**
 * 离线采样记录
 */
class OfflineSamplingManager {

    /**
     * 添加离线采样记录
     *
     * @param data
     * @param callback
     */
    static addOfflineRecord(data = new SamplingRequestEntity([]),callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                "SELECT COUNT(*) as \`0\` FROM sampling_record WHERE idType = ? AND idCard = ?;",
                WebSQLUtils.convArr([data.idType??1,data.idCard]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    if(WebSQLUtils.countRecords(rs)>0){
                        callback.process = true;
                        callback.onFailure("该用户已加入离线采样记录！");
                    }
                    else{
                        t.executeSql(
                            `
                                INSERT INTO sampling_record(
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
                                        optTime       ,
                                        err           ,
                                        mode
                                )
                                VALUES(
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?,?,?,
                                    ?,?,?
                                );
                            `,
                            WebSQLUtils.convArr([
                                data.fullName      ,
                                data.idCard        ,
                                data.idType        ??1,
                                data.mobile        ,
                                data.streetId      ,
                                data.communityId   ,
                                data.zoneId        ,
                                data.category      ,
                                data.address       ,
                                data.remark        ,
                                data.gridName      ,
                                data.secondGridName,
                                data.thirdGridName ,
                                data.testNum       ,
                                data.status        ,
                                data.primaryId     ,
                                data.secondaryId   ,
                                data.thirdId       ,
                                data.isNew         ,
                                data.isPc          ,
                                new Date().getTime(),
                                0,
                                data.mode
                            ]),
                            (t,rs)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                if(WebSQLUtils.isInsert(rs)){
                                    callback.onSuccess();
                                }
                                else{
                                    callback.onFailure("离线记录保存失败！");
                                }
                            },
                            (t,e)=>{
                                if(callback.process === true) return;
                                callback.process = true;
                                callback.onFailure(OfflineSamplingManager.errorCallback(e));
                            }
                        )
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        });
    }

    /**
     * 判断用户是否在离线采样记录中
     * @param idType
     * @param idCard
     * @param callback
     */
    static queryUserRecord(idType,idCard,callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT * FROM sampling_record WHERE idType=? AND idCard=?;
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 删除离线采样记录
     * @param idType
     * @param idCard
     * @param callback
     */
    static delOfflineRecord(idType,idCard,callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    DELETE FROM sampling_record WHERE idType = ? AND idCard = ?;
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 获取离线采样试管记录
     * @param callback
     */
    static listTubNo(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        DISTINCT(testNum), 
                        SUM(
                            CASE 
                                WHEN err = '2' THEN 1 
                                ELSE 0
                            END
                        ) as successNum,
                        SUM(
                            CASE 
                                WHEN err = '1' THEN 1 
                                ELSE 0
                            END
                        ) as failureNum,
                        SUM(
                            CASE 
                                WHEN err = '1' THEN 0
                                WHEN err = '2' THEN 0
                                ELSE 1
                            END
                        ) as samplingNum
                    FROM sampling_record
                    GROUP BY testNum;
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 获取所有的离线记录以供查看
     * @param callback
     */
    static listAll(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT *
                    FROM sampling_record
                    ORDER BY optTime DESC;
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 获取离线试管采样信息
     * @param tubNo
     * @param callback
     */
    static listOffline(tubNo,callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `SELECT * FROM sampling_record WHERE testNum = ? ORDER BY optTime ASC;`,
                WebSQLUtils.convArr([tubNo]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    rs.rows
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 控制面板——查询整体进度信息
     *
     * 返回 剩余管数，剩余人数； 失败管数，失败人数
     * @param callback
     */
    static displayOfflineInfo(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        SUM(restOfTubs)  as restOfTubs,
                        SUM(restOfNums)  as restOfNums,
                        SUM(failureTubs) as failureTubs,
                        SUM(failureNums) as failureNums
                    FROM
                        (
                            SELECT COUNT(DISTINCT(testNum)) as failureTubs, COUNT(*) as failureNums,                       0 as restOfTubs,        0 as restOfNums FROM sampling_record WHERE err = '1' UNION
                            SELECT                        0 as failureTubs,        0 as failureNums,COUNT(DISTINCT(testNum)) as restOfTubs, COUNT(*) as restOfNums FROM sampling_record WHERE err != '1' AND err !='2'
                        )
                    ;
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        });
    }

    /**
     * 控制面板——查询试管进度信息
     * @param tubNo
     * @param callback
     */
    static displayTubNoInfo(tubNo, callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        SUM(
                            CASE 
                                WHEN err = '2' THEN 1 
                                ELSE 0
                            END
                        ) as successCount,
                        SUM(
                            CASE 
                                WHEN err = '1' THEN 1 
                                ELSE 0
                            END
                        ) as failureCount,
                        SUM(
                            CASE 
                                WHEN err = '1' THEN 0
                                WHEN err = '2' THEN 0
                                ELSE 1
                            END
                        ) as samplingCount
                    FROM sampling_record WHERE testNum = ?;
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        });
    }

    static displaySummery(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        COUNT(DISTINCT(testNum)) as tubsCount, 
                        COUNT(*) as allCount
                    FROM sampling_record where err != '1';
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            );
        })
    }

    static displaySummeryTubs(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `SELECT DISTINCT(testNum) as testNum FROM sampling_record where err != '1' group by testNum;`,
                WebSQLUtils.convArr([]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 获取离线采样整体进度信息
     * @param callback
     */
    static queryOfflineInfo(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        SUM(tubsCount    ) as tubsCount, 
                        SUM(successCount ) as successCount,
                        SUM(failureCount ) as failureCount,
                        SUM(samplingCount) as samplingCount,
                        SUM(allCount     ) as allCount
                    FROM
                        (
                            SELECT                        0 as tubsCount,        0 as allCount,        0 as successCount, COUNT(*) as failureCount,        0 as samplingCount FROM sampling_record WHERE err = '1' UNION
                            SELECT                        0 as tubsCount,        0 as allCount, COUNT(*) as successCount,        0 as failureCount,        0 as samplingCount FROM sampling_record WHERE err = '2' UNION
                            SELECT                        0 as tubsCount,        0 as allCount,        0 as successCount,        0 as failureCount, COUNT(*) as samplingCount FROM sampling_record WHERE err != '1' AND err != '2' UNION
                            SELECT COUNT(DISTINCT(testNum)) as tubsCount, COUNT(*) as allCount,        0 as successCount,        0 as failureCount,        0 as samplingCount FROM sampling_record
                        )
                    ;
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            );
        });
    }

    /**
     * 标记采样结果
     * @param idType
     * @param idCard
     * @param result
     * @param callback
     */
    static markSamplingResult(idType,idCard, result,callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                "UPDATE sampling_record SET err = ? WHERE idCard = ? AND idType = ?;",
                WebSQLUtils.convArr([result, idCard, idType]),
                (t,r)=>{
                    if(callback.process === true) return;
                    callback.process = true;

                    if(WebSQLUtils.isUpdate(r)){
                        callback.onSuccess();
                    }
                    else{
                        callback.onFailure();
                    }
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 列出处理队列试管列表
     * @param callback
     */
    static listProcessingTubNo(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `
                    SELECT 
                        testNum, 
                        MAX(optTime) as optTime
                    FROM (
                        SELECT * FROM sampling_record WHERE err != '1' AND err != '2'
                    )
                    GROUP BY testNum ORDER BY optTime;
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
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 获取试管中待上传的离线记录
     * @param tubNo
     * @param callback
     */
    static listProcessingOffline(tubNo,callback){
        if(tubNo==null || tubNo.length === 0){
            if(callback.process === true) return;
            callback.process = true;
            callback.onFailure();
        }
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                `SELECT * FROM sampling_record WHERE testNum = ? AND err != '1' AND err != '2' ORDER BY optTime ASC;`,
                WebSQLUtils.convArr([tubNo]),
                (t,rs)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    rs.rows
                    callback.onSuccess(WebSQLUtils.rows2Array(rs));
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    }

    /**
     * 清空数据库
     * @param callback
     */
    static clearDB(callback){
        OfflineSamplingManager.db.transaction((t)=>{
            t.executeSql(
                "DELETE FROM sampling_record",
                WebSQLUtils.convArr([]),
                (t,r)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onSuccess();
                },
                (t,e)=>{
                    if(callback.process === true) return;
                    callback.process = true;
                    callback.onFailure(OfflineSamplingManager.errorCallback(e));
                }
            )
        })
    };
}

OfflineSamplingManager.createTime = new Date();
OfflineSamplingManager.yyyy_MM_dd = OfflineSamplingManager.createTime.Format("yyyy_MM_dd");
OfflineSamplingManager.dbName = "offline_sampling_record_" + OfflineSamplingManager.yyyy_MM_dd;
OfflineSamplingManager.version = "1.0";
OfflineSamplingManager.displayName = "HSCJ.OfflineRecord" + OfflineSamplingManager.yyyy_MM_dd;
OfflineSamplingManager.db = window.openDatabase(OfflineSamplingManager.dbName, OfflineSamplingManager.version, OfflineSamplingManager.displayName,10*1024*1024,(db)=>{
    db.transaction((t)=>{
        t.executeSql(
            /* err: 1：采样失败 2： 已采样 其他：等待采样 */
            `
                        CREATE TABLE IF NOT EXISTS sampling_record(
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
						    optTime       ,
							err           ,
							mode          
                        );
                    `,
            WebSQLUtils.convArr([]),
            (t,r)=>{
                LogUtils.log("初始化数据库[OfflineSamplingDatabaseManager]完毕！")
            },
            (t,e)=>{
                alert("离线采样数据库创建失败！\n\n"+OfflineSamplingManager.errorCallback());
            }
        )
    })
});

OfflineSamplingManager.db.transaction((t)=>{
    t.executeSql(
        /* err: 1：采样失败 2： 已采样 其他：等待采样 */
        /* mode: 1:离线记录 其他:本地记录或网络记录 */
        `
                        CREATE TABLE IF NOT EXISTS sampling_record(
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
						    optTime       ,
							err           ,
							mode          
                        );
                    `,
        WebSQLUtils.convArr([]),
        (t,r)=>{
        },
        (t,e)=>{
        }
    )
})

/*
OfflineSamplingManager.db.transaction((t)=>{
    t.executeSql("delete from sampling_record" );
});
*/

OfflineSamplingManager.errorCallback = function (SQLError){
    const message =
        "数据库操作错误！\n\n"+
        "错误代码："+ SQLError.code+"\n"+
        "错误信息："+ SQLError.message;

    LogUtils.warn(message);
    return message;
};

try {WebSQLUtils.dropDatabase("offline_sampling_record_", "sampling_record");} catch (e) {}
