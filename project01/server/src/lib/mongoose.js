"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnect = void 0;
var mongoose_1 = require("mongoose");
function mongooseConnect() {
    if (mongoose_1.default.connection.readyState === mongoose_1.default.ConnectionStates.connected) {
        return mongoose_1.default.connection.asPromise();
    }
    else {
        var uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";
        return mongoose_1.default.connect(uri);
    }
}
exports.mongooseConnect = mongooseConnect;
