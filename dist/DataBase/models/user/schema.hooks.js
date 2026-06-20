"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveHook = saveHook;
exports.nullDataHook = nullDataHook;
const hash_1 = require("../../../common/utils/security/hash");
const encypt_1 = require("../../../common/utils/security/encypt");
function saveHook(schema) {
    schema.pre('save', function () {
        if (this.password)
            this.password = (0, hash_1.globalHash)(this.password);
        if (this.phone)
            this.password = (0, encypt_1.globalEncryption)(this.phone);
    });
}
function nullDataHook(schema) {
    schema.post(['find', 'findOne'], function () {
        console.log(this);
    });
}
//# sourceMappingURL=schema.hooks.js.map