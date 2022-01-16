module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.ip = this.credentials.username;
            msg.pw = this.credentials.password;

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