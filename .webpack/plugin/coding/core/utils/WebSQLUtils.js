class WebSQLUtils{

    static convArr(arr){
        if(arr === null || arr === undefined) return[];
        const result = [];
        for(let i=0,ni=arr.length;i<ni;++i){
            const value = arr[i];
            if(value === undefined || value === null){
                result.push(null);
            }
            else{
                result.push(value.toString());
            }
        }

        return result;
    }

    static rows2Array(rs){
        let rows;
        if(!FunctionUtils.isNull(rs.rows)){
            rows = rs.rows;
        }
        else{
            rows = rs;
        }

        return rows;
    }

    static isInsert(resultSet){
        try{
            return resultSet.insertId > 0;
        }
        catch (e){
            return false;
        }
    }

    static isUpdate(resultSet){
        return this.updateCount(resultSet) > 0
    }

    static updateCount(resultSet){
        return resultSet?.rowsAffected??0;
    }

    static countRecords(rs){
        let rows;
        if(!FunctionUtils.isNull(rs.rows)){
            rows = rs.rows;
        }
        else{
            rows = rs;
        }

        if((rows?.length??0) <= 0) return 0;
        const item = rows[0];
        return item[0];
    }

    static dropTable(db,tableName,callback){
        db.transaction((t)=>{
            t.executeSql("DROP TABLE "+tableName +";",[],callback.onSuccess,callback.onFailure);
        });
        setTimeout(callback.onFailure,10000);
    }

    /**
     * 删除当前系统时钟15天前的数据，保证一定保留14天内的。
     * @param dbPrefix
     * @param tableName
     * @returns {Promise<void>}
     */
    static async dropDatabase(dbPrefix,tableName){
        const now = new Date().getTime();
        const end = now - 15*24*3600*1000;
        const tag = "_the_last_drop_timestamp_of_"+dbPrefix;
        /*最早的时间是2022年11月15号*/
        let start = parseInt(localStorage[tag]??1668998640000);
        while(start<end){
            const yyyy_MM_dd = new Date(start).Format("yyyy_MM_dd");
            const dbName = dbPrefix + yyyy_MM_dd;
            const version = "1.0";
            const displayName = "";
            const db = await window.openDatabase(dbName, version, displayName,10*1024*1024,(db)=>{});

            for(let i=0;i<10;++i){
                await new Promise((resolve, reject) => {
                    this.dropTable(db,tableName,{
                        onSuccess:()=>{
                            resolve();
                        },
                        onFailure:()=>{
                            reject();
                        }
                    })
                })
                    .then(async ()=>{
                        i=10;
                    })
                    .catch(async ()=>{});
            }
            localStorage[tag] = start;
            start += 24*3600*1000;
        }

    }
}

