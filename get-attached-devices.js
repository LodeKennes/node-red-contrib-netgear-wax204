module.exports = function (RED) {

    var axios = require("axios");
    var qs = require("qs");

    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {

            var data = {
                'submit_flag': 'sso_login',
                'localPasswd': this.credentials.password,
                'sso_login_type': '0'
            };

            var ip = this.credentials.username
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url: `https://${ip}/sso_login.cgi`
            };

            axios(options).then(r => {
                msg.response = r;
                node.send(msg);
            });

        });
    }
    RED.nodes.registerType("get-attached-devices", LowerCaseNode, {
        credentials: {
            username: { type: "text" },
            password: { type: "password" }
        }
    });
}