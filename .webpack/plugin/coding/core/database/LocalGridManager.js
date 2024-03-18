/**
 * 本地网格街道信息缓存
 */
class LocalGridManager {
    static expiredKeyOfParentId(parentId){
        return "local_grid_exp_of_"+parentId;
    }

    static setParentIdExpired(parentId){
        const key   = LocalGridManager.expiredKeyOfParentId(parentId);
        const exp   = new Date().getTime() + 3600*1000*24;
        localStorage[key] = exp;
    }

    static isParentIdExpired(parentId){
        const key   = LocalGridManager.expiredKeyOfParentId(parentId);
        const value = localStorage[key] ?? 0;
        let time = 0;
        try {time = parseInt(value);} catch (e) {}
        return time < new Date().getTime();
    }

    static autoAdd(parentId, data){
        LocalGridManager.dataHolder[parentId] = data;
        LocalGridManager.setParentIdExpired(parentId);
    }

    static query(parentId){
        if(LocalGridManager.isParentIdExpired(parentId)){
            return {};
        }
        return LocalGridManager.dataHolder[parentId];
    }
}

LocalGridManager.dataHolder = {};
