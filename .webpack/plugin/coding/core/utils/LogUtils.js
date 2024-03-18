class LogUtils{
    /**
     * 控制台日志-console.log
     * @param msg 要打印的对象
     * @param tag 是否要打印TAG，如果msg是String或obj=false&&JSON.stringify(msg)!=""则打印标签
     * @param obj 是否要对msg格式化成JSON,true不格式化，false格式化
     */
    static log(msg,tag="",obj=true){
        try{
           if(msg == null) return;
           if(msg.constructor === String){
               if(tag!=null && tag?.length>0){
                   console.log(tag+"->"+msg);
               }
               else{
                   console.log(msg);
               }
           }
           else{
               if(obj){
                    console.log(msg);
               }
               else{
                   try {
                       const json = JSON.stringify(msg);
                       if(json.length>0){
                           if(tag!=null && tag?.length>0){
                               console.log(tag+"->"+json);
                           }
                           else{
                               console.log(json);
                           }
                       }
                       else{
                           let str = msg?.toString();
                           console.log(str.length>0?str:msg);
                       }
                   } catch (e) {
                       console.log(msg);
                   }
               }
           }
        }
        catch(e){}
    }

    /**
     * 控制台日志-console.warn
     * @param msg
     * @param tag
     * @param obj
     */
    static warn(msg,tag="",obj=true){
        try{
            if(msg == null) return;
            if(msg.constructor === String){
                if(tag!=null && tag?.length>0){
                    console.warn(tag+"->"+msg);
                }
                else{
                    console.warn(msg);
                }
            }
            else{
                if(obj){
                    console.warn(msg);
                }
                else{
                    try {
                        const json = JSON.stringify(msg);
                        if(json.length>0){
                            if(tag!=null && tag?.length>0){
                                console.warn(tag+"->"+json);
                            }
                            else{
                                console.warn(json);
                            }
                        }
                        else{
                            console.warn(msg);
                        }
                    } catch (e) {
                        console.warn(msg);
                    }
                }
            }
        }
        catch(e){}
    }
}