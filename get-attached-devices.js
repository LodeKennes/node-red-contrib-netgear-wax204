module.exports = function(RED) {

    const axios = require("axios");
    const url = require('url');
    const https = require('https');

    const instance = axios.create({
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false
        })
      });

    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async function(msg) {

            const params = new url.URLSearchParams();
            params.append('submit_flag', 'sso_login');
            params.append('localPasswd', this.credentials.password);
            params.append('sso_login_type', '0');

            const ip = this.credentials.username;
            const response = instance.post(`https://${ip}/sso_login.cgi`, params)
            const token = response
            .headers["set-cookie"][0]
            .substring(10);

            msg.token = token;
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