import axios, { URLSearchParams } from "axios";

module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {

            const params = new URLSearchParams();
            params.append('submit_flag', 'sso_login');
            params.append('localPasswd', this.credentials.password);
            params.append('sso_login_type', '0');

            var ip = this.credentials.username;
            axios.post(`https://${ip}/sso_login.cgi`, params)
            .then(r => {
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