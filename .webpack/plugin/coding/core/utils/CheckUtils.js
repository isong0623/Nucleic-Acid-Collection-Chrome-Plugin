/**
 * 校验类
 */
class CheckUtils{

    static isValidIdCard(idNo){
        if(idNo == null) return false;
        const id = idNo.replace(RegExp("[^0-9xX]*"),"").toUpperCase();
        if(id.length !== 18) return false;

        const sfz_power  = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const sfz_verify = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        let sum = 0;
        for(let i=0;i<18;++i){
            const ch = id[i];
            if(i<17) sum = sum + sfz_power[i]*(ch - '0');
            if(ch>='0' && ch <='9') continue;
            if(ch==='X'&&i===17)continue;
            return false;
        }

        return id[17] === sfz_verify[sum % 11][0];
    }

    static isRegexMatch(regex,toMatch){
        const rules = regex?.split("\n")??[];
        for(let i=0,ni=rules.length;i<ni;++i){
            const rule = rules[i];
            if(rule.trim().length===0) continue;
            const reg = new RegExp(rule, "ig");
            if((toMatch?.replace(reg,"")?.length??-1) === 0){
                return true;
            }
        }
        return false;
    }
}