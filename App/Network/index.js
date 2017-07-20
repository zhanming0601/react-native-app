/**
 * Created by zhanming on 2017/6/23.
 */


const SDServerHttp = 'https://api.sudaizhijia.com/';

const method={

    GET:'GET',
    POST:'POST',
}

export default class SDHttpRequest {

    /**
     * GET请求
     * @param url
     * @param param
     */
    static GET(url, param) {

        return SDHttpRequest.Request(method.GET,SDServerHttp+url,param);
    }
    /**
     * POST请求
     * @param url
     * @param param
     */
    static POST(url, param) {

        return SDHttpRequest.Request(method.POST,SDServerHttp+url,param);
    }
    static Request(type,url,param){

        if(type == 'GET' && param != null){

            url = url+'?';

            for(let key in param) {
                url = url+key+'='+param[key];
                if(Object.keys(param).length >1){
                    url = url +'&';
                }
            }

        }

       return  new Promise((resolve,reject) => {

           fetch(url, {
                    method: type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Content-Encoding':'gzip',
                    },
                    body: type == 'GET'?null:JSON.stringify(param)
                }).then(data => data.json()

                ).then(json => {

                    let code = json.code;

                    let errorCode = json.error_code;

                    //服务器在code为200   1600为没有数据所以也为成功

                    if(code == 200 & (errorCode == 0 || errorCode == 1600)){

                        resolve(json.data);
                    }
                    else {
                        reject(json.error_message);
                    }

                }).catch(error=>{

                    reject('网络信号差，请稍后再试')
                })

            }
        )
    }


}


