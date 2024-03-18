class ApiResponse{
    constructor(response, parent) {
        this.response = response;
        this.parent   = parent;
    }


    getStatus(){return this.parent.api.status;}
    getResponse(){return this.response.response;}
    getCode(){return this.response.response["code"];}
    getMessage(){return this.response.response["msg"];}
    getData(){return this.response.response["data"];}

    fields(fields){
        this.response.fields = fields;
        return this;
    }

    getParent(){ return this.parent; }
}


