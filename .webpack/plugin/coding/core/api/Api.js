class Api{
    constructor() {
        this.api = new XMLHttpRequest();
        this.mRequest  = {};
        this.mResponse = {};
        this.request  = new ApiRequest (this.mRequest ,this);
        this.response = new ApiResponse(this.mResponse,this);
    }

    getRequest (){ return this.request ; }

    getResponse(){ return this.response; }

};
