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
        node.on('input', function(msg) {

            const params = new url.URLSearchParams();
            params.append('submit_flag', 'sso_login');
            params.append('localPasswd', this.credentials.password);
            params.append('sso_login_type', '0');

            const ip = this.credentials.username;
            instance.post(`https://${ip}/sso_login.cgi`, params)
            .then(r => {
                msg.response = r;
                node.send(msg);
            })
            .catch(r => {
                msg.response = r;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("get-attached-devices",LowerCaseNode, {
        credentials: {
            username: {type:"text"},
            password: {type:"password"}
         }
    });
}