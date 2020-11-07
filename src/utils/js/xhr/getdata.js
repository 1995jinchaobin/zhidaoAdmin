import axios from "axios";

export default {
    getdata(obj){
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
        // response.setHeader("Access-Control-Allow-Origin", "http://192.168.1.115:8888");
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } 
        }
        return new Promise((resolve,reject) =>{
            axios.post(obj.url,obj.formdata,config).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
  }