module.exports = function(RED) {

    const axios = require("axios");
    const url = require('url');
    const https = require('https');

    const wrapper = require('axios-cookiejar-support').wrapper;
    const CookieJar = require('tough-cookie').CookieJar;

    const jar = new CookieJar();

    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async function(msg) {
            const ip = this.credentials.username;
            const instance =  wrapper(axios.create({
                baseURL: `https://${ip}`,
                withCredentials: true,
                httpsAgent: new https.Agent({  
                  rejectUnauthorized: false
                }),
                jar
              }));

            const params = new url.URLSearchParams();
            params.append('submit_flag', 'sso_login');
            params.append('localPasswd', this.credentials.password);
            params.append('sso_login_type', '0');

            const response = await instance.post(`/sso_login.cgi`, params)
            const token = response
            .headers["set-cookie"][0]
            .substring(10)
            .split(';')[0];

            const devicesResponse = await instance.get('/refresh_dev.htm');
            const devices = devicesResponse.data;

            msg.payload = devices;
            node.send(msg);
        });
    }
    RED.nodes.registerType("get-attached-devices",LowerCaseNode, {
        credentials: {
            username: {type:"text"},
            password: {type:"password"}
         }
    });
}