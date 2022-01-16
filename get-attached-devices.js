module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            msg.ip = node.ip;
            msg.pw = node.password;
            msg.config = config;

            node.send(msg);
        });
    }
    RED.nodes.registerType("get-attached-devices",LowerCaseNode);
}