"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_bro_1 = __importDefault(require("admin-bro"));
const sequelize_1 = __importDefault(require("@admin-bro/sequelize"));
const user_resource_1 = require("./admin/resources/user/user-resource");
const sequelize_2 = require("./databases/sequelize");
const express_1 = require("./plugins/express");
const options_1 = require("./admin/options");
admin_bro_1.default.registerAdapter(sequelize_1.default);
const run = async () => {
    await sequelize_2.connect();
    const admin = new admin_bro_1.default(Object.assign(Object.assign({}, options_1.options), { resources: [{
                options: user_resource_1.UserResource,
                resource: sequelize_2.models.User,
            }] }));
    express_1.listen(admin);
};
run();
