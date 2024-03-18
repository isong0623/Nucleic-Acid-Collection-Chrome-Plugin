class ApiRequest{
    constructor(request, parent) {
        this.parent = parent;
        this.api    = parent.api;
        this.request = request;
        this.request.params = {};
        this.request.headers = {};
    }

    getHost(){ return this.request["host"]; }
    getMethod(){ return this.request["method"]; }
    getParams(){ return this.request["params"]; }
    getBody(){ return this.request["body"]; }
    getHeaders(){return this.request["headers"];}

    getParent(){ return this.parent; }

    host(url){
        this.request.host = url;
        return this;
    }

    headers(key,value){
        if(value === null ||value === undefined){
            try {delete this.request.headers[key];} catch (e) {}
        }
        else{
            this.request.headers[key] = value;
        }

        return this;
    }

    composeParams(url){
        if(this.request.params == null || this.request.params.length === 0) return url;
        let result = url;
        let compose = "?";
        Object.keys(this.request.params).forEach(
            (key, index, parent)=>{
                const value = this.request.params[key];
                if(compose !== "?"){
                    compose = compose + "&";
                }
                compose = compose + key + "=" + encodeURIComponent(value);
            }
        );
        return result + compose;
    }

    params(key,value){
        if(value == null) {
            try {delete this.request.params[key];} catch (e) {}
        }
        else{
            this.request.params[key] = value;
        }
        return this;
    }

    body(body){
        this.request.body = body;
        return this;
    }

    fields(fields){
        this.request.fields = fields;
        return this;
    }

    /**
     *   “”	                        将 responseType 设为空字符串与设置为"text"相同， 是默认类型 （实际上是 DOMString）。
     *   “arraybuffer”	            response 是一个包含二进制数据的 JavaScript ArrayBuffer 。
     *   “blob”	                    response 是一个包含二进制数据的 Blob 对象 。
     *   “document”	                response 是一个 HTML Document 或 XML XMLDocument ，这取决于接收到的数据的 MIME 类型。请参阅 HTML in XMLHttpRequest 以了解使用 XHR 获取 HTML 内容的更多信息。
     *   “json”	                    response 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
     *   “text”	                    response 是包含在 DOMString 对象中的文本。
     *   “moz-chunked-arraybuffer”	与"arraybuffer"相似，但是数据会被接收到一个流中。
     *                              使用此响应类型时，响应中的值仅在 progress 事件的处理程序中可用，
     *                              并且只包含上一次响应 progress 事件以后收到的数据，而不是自请求发送以来收到的所有数据。
     *                              在 progress 事件处理时访问 response 将返回到目前为止收到的数据。
     *                              在 progress 事件处理程序之外访问， response 的值会始终为 null 。
     *   “ms-stream”	            response 是下载流的一部分；此响应类型仅允许下载请求，并且仅受Internet Explorer支持。
     *
     * @param type
     * @returns {ApiRequest}
     */
    responseType(type){
        this.request.responseType = type;
        return this;
    }


    doGet(callback,sync = false){
        this.request.method = "get";
        this.request.sync = sync;
        let response = {};
        this.api.onload = ()=>{
            response = this.api.response ?? {};
            response.status = this.api.status??500;
            if(this.request.responseType === "document"){
                response.doc  = this.api.responseXML;
            }
            else if(this.request.responseType === "text"){
                response.text = this.api.responseText;
            }
            callback(response);
        }
        this.api.responseType = this.request.responseType ?? "json";
        this.api.open("get",this.composeParams(this.request.host),!sync);
        Object.keys(this.request.headers).forEach((key, index, parent)=>{
            const value = this.request.headers[key];
            this.api.setRequestHeader(key,value);
        });
        this.api.send();
        if(sync){
            return response;
        }
    }

    doPost(callback,sync = false){
        this.request.method = "post";
        this.request.sync = sync;
        let response = {};
        this.api.onload = ()=>{
            response = this.api.response ?? {};
            response.status = this.api.status??500;
            callback(response);
        }
        this.api.responseType = this.request.responseType ?? "json";
        this.api.open("post",this.composeParams(this.request.host),!sync);
        Object.keys(this.request.headers).forEach((key, index, parent)=>{
            const value = this.request.headers[key];
            this.api.setRequestHeader(key,value);
        });
        if(this.request.body != null){
            this.api.send(this.request.body);
        }
        else{
            this.api.send();
        }

        if(sync){
            return response;
        }
    }
}

