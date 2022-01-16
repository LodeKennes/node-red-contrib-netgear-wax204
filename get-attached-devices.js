module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var details = {
                'submit_flag': 'sso_login',
                'localPasswd': this.credentials.password,
                'sso_login_type': '0'
            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            var ip = this.credentials.username;
            fetch(`https://${ip}/sso_login.cgi`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
              })
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