"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authRoutes_1 = require("./routes/authRoutes");
var orderRoutes_1 = require("./routes/orderRoutes");
var userRoutes_1 = require("./routes/userRoutes");
var mongoose_1 = require("./lib/mongoose");
var productRoutes_1 = require("./routes/productRoutes");
var passport_1 = require("./config/passport");
var express_1 = require("uploadthing/express");
var uploadthing_1 = require("./uploadthing");
var express_2 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var app = (0, express_2.default)();
dotenv_1.default.config();
var corsOptions = {
    origin: ["http://localhost:3000"], // explicitly allow the front-end origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions)); // Ensure CORS is applied before other middleware
app.use(express_2.default.json());
app.use(express_2.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
(0, mongoose_1.mongooseConnect)();
app.use("/products", productRoutes_1.default);
app.use("/auth", authRoutes_1.default);
app.use("/orders", orderRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/api/uploadthing", (0, express_1.createRouteHandler)({
    router: uploadthing_1.uploadRouter,
    config: {},
}));
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Server started on port ".concat(port));
});
