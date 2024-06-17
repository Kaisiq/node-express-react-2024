"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
var express_1 = require("uploadthing/express");
var f = (0, express_1.createUploadthing)();
exports.uploadRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "2MB",
            maxFileCount: 8,
        },
    }).onUploadComplete(function (data) {
        console.log("upload completed", data);
    }),
};
