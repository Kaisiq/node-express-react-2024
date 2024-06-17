"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var authRoutes_1 = require("./authRoutes");
var express_1 = require("express");
var OrderService_1 = require("../services/OrderService");
var Order_1 = require("../models/Order");
var zod_1 = require("zod");
var ProductService_1 = require("../services/ProductService");
var OrderPatchSchema = zod_1.default.object({
    flname: zod_1.default.string().optional(),
    tel: zod_1.default.string().optional(),
    address: zod_1.default.string().optional(),
    info: zod_1.default.string().optional(),
    city: zod_1.default.string().optional(),
    email: zod_1.default.string(),
    price: zod_1.default.number().optional(),
    status: zod_1.default.string().optional(),
    productIDs: zod_1.default.array(zod_1.default.string()).optional(),
    productNames: zod_1.default.array(zod_1.default.string()).optional(),
    createdAt: zod_1.default.string().optional(),
});
var orderService = new OrderService_1.OrderService();
var router = express_1.default.Router();
router
    .route("/")
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, GET(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, POST(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get("/totalrevenue", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderService.getTotalRevenue()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/newest/:number", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var number, data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                number = req.params.number;
                return [4 /*yield*/, orderService.getLatestNOrders(Number(number))];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_2)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/monthrevenue", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderService.getTotalRevenueLastMonth()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_3)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/weekrevenue", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderService.getWeeklyRevenue()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_4)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/dayrevenue", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderService.getDailyRevenue()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_5)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/incomplete", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderService.getIncompleteOrders()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_6)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/complete", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderService.getCompleteOrders()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_7 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_7)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/user/:email", authRoutes_1.userOrGreaterCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, data, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.params.email;
                return [4 /*yield*/, orderService.getOrdersOf(email)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_8 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_8)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id/products", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productService_1, _id, data, result_1, err_9;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                productService_1 = new ProductService_1.ProductService();
                _id = req.params._id;
                return [4 /*yield*/, orderService.getSingleOrder(_id)];
            case 1:
                data = _b.sent();
                result_1 = [];
                (_a = data === null || data === void 0 ? void 0 : data.productIDs) === null || _a === void 0 ? void 0 : _a.forEach(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var product;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, productService_1.getSingleProduct(id)];
                            case 1:
                                product = _a.sent();
                                if (product)
                                    result_1.push(product);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, res.json(result_1)];
            case 2:
                err_9 = _b.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_9)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router
    .route("/:_id")
    .get(authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, data, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.params._id;
                return [4 /*yield*/, orderService.getSingleOrder(_id)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_10 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_10)];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .patch(authRoutes_1.userOrGreaterCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PATCH(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .put(authRoutes_1.userOrGreaterCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PUT(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .delete(authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DELETE(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
function POST(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var order, data, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    order = Order_1.OrderFormSchema.parse(req.body);
                    return [4 /*yield*/, orderService.createOrder(order)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, res.json(data)];
                case 2:
                    err_11 = _a.sent();
                    console.log(err_11);
                    return [2 /*return*/, res.status(500).send(err_11)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function GET(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, orderService.getAllOrders()];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, res.json(data)];
                case 2:
                    err_12 = _a.sent();
                    return [2 /*return*/, res.status(500).send("Server error: " + err_12)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function PUT(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, data, result, err_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.params._id;
                    data = Order_1.OrderFormSchema.parse(req.body);
                    return [4 /*yield*/, orderService.updateOrder(__assign(__assign({}, data), { _id: _id }))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, res.json(result)];
                case 2:
                    err_13 = _a.sent();
                    console.log(err_13);
                    return [2 /*return*/, res.status(500).send("Server error: " + err_13)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function PATCH(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, _a, email, rest_1, result, err_14;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _id = req.params._id;
                    _a = OrderPatchSchema.parse(req.body), email = _a.email, rest_1 = __rest(_a, ["email"]);
                    Object.keys(rest_1).forEach(function (key) {
                        if (rest_1[key] === undefined) {
                            delete rest_1[key];
                        }
                    });
                    return [4 /*yield*/, orderService.patchOrder(_id, rest_1)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, res.json(result)];
                case 2:
                    err_14 = _b.sent();
                    console.log(err_14);
                    return [2 /*return*/, res.status(500).send("Server error: " + err_14)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function DELETE(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, data, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.params._id;
                    return [4 /*yield*/, orderService.deleteOrder(_id)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, res.json(data)];
                case 2:
                    err_15 = _a.sent();
                    console.log(err_15);
                    return [2 /*return*/, res.status(500).send("Server error: " + err_15)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
