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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
exports.OrderService = void 0;
var Order_1 = require("../models/Order");
var Product_1 = require("../models/Product");
var ProductService_1 = require("./ProductService");
var mongoose_1 = require("mongoose");
// const timeToDeletion = 50400000; // 14h
var timeToDeletion = 30000; // 30s
var productService = new ProductService_1.ProductService();
var OrderService = /** @class */ (function () {
    function OrderService() {
        var _this = this;
        this.getRevenueBetweenDatesWithPercentage = function (now, oneBefore, twoBefore) { return __awaiter(_this, void 0, void 0, function () {
            var result, lastMonth, percentage, percentage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.Order.aggregate([
                            {
                                $match: {
                                    status: { $ne: "canceled" },
                                    createdAt: {
                                        $gte: oneBefore,
                                        $lt: now,
                                    },
                                },
                            },
                            {
                                $group: {
                                    _id: null,
                                    total_sales: {
                                        $sum: "$price",
                                    },
                                },
                            },
                        ])];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, Order_1.Order.aggregate([
                                {
                                    $match: {
                                        status: { $ne: "canceled" },
                                        createdAt: {
                                            $gte: twoBefore,
                                            $lt: oneBefore,
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        total_sales: {
                                            $sum: "$price",
                                        },
                                    },
                                },
                            ])];
                    case 2:
                        lastMonth = _a.sent();
                        if (result.length > 0 && lastMonth.length > 0) {
                            if (lastMonth[0].total_sales > result[0].total_sales) {
                                percentage = "-".concat((result[0].total_sales / lastMonth[0].total_sales) * 100, "%");
                                return [2 /*return*/, { total_sales: result[0].total_sales, percentage: percentage }];
                            }
                            else {
                                percentage = "+".concat((lastMonth[0].total_sales / result[0].total_sales) * 100, "%");
                                return [2 /*return*/, { total_sales: result[0].total_sales, percentage: percentage }];
                            }
                        }
                        else if (result.length === 0) {
                            return [2 /*return*/, { total_sales: 0, percentage: "-100%" }];
                        }
                        else if (lastMonth.length === 0) {
                            return [2 /*return*/, { total_sales: result[0].total_sales, percentage: "+100%" }];
                        }
                        else {
                            return [2 /*return*/, { total_sales: 0, percentage: "+0%" }];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    OrderService.prototype.createOrder = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.Order.create(input)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { message: result ? "success" : "error" }];
                }
            });
        });
    };
    /* eslint-disable */
    OrderService.prototype.getOrder = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(input)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Order_1.Order.find({
                                _id: input,
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2: return [4 /*yield*/, this.getSingleOrder(input)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService.prototype.getLatestNOrders = function (n) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.Order
                            .find({}, null, {
                            sort: { updatedAt: -1 },
                        })
                            .limit(n)];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderService.prototype.getSingleOrder = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = new mongoose_1.default.Types.ObjectId(input);
                        return [4 /*yield*/, Order_1.Order
                                .findById(_id)
                                .lean() // Use lean query
                                .exec()];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            console.log("Order not found");
                            return [2 /*return*/, null];
                        }
                        else {
                            return [2 /*return*/, result];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error retrieving order:", err_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getOrdersOf = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.Order
                            .find({
                            email: input,
                        })
                            .sort({ createdAt: -1 })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /* eslint-enable */
    OrderService.prototype.getAllOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.Order
                            .find()
                            .sort({ createdAt: -1 })
                            .limit(50)];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderService.prototype.removePicturesFromOrderProducts = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, productId, images, e_1_1, err_2;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (order.status !== "complete")
                            return [2 /*return*/, false];
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 16, , 17]);
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues(order.productIDs);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        productId = _f;
                        return [4 /*yield*/, productService.getImages(productId)];
                    case 5:
                        images = _g.sent();
                        return [4 /*yield*/, productService.deleteImages(images)];
                    case 6:
                        _g.sent();
                        return [2 /*return*/, true];
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _g.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _e.call(_b)];
                    case 11:
                        _g.sent();
                        _g.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        err_2 = _g.sent();
                        console.log(err_2);
                        return [2 /*return*/, err_2];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.patchOrder = function (_id, input) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, _c, id, res, res, e_2_1;
            var _this = this;
            var _d, e_2, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, Order_1.Order.findOneAndUpdate({ _id: _id }, input, { new: true })];
                    case 1:
                        result = (_g.sent());
                        if (!result)
                            return [2 /*return*/, { message: "error" }];
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 10, 11, 16]);
                        _a = true, _b = __asyncValues(result.productIDs);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 9];
                        _f = _c.value;
                        _a = false;
                        id = _f;
                        if (!["new", "shipped", "completed"].includes(result.status)) return [3 /*break*/, 6];
                        if (result.status === "completed") {
                            setTimeout(function () {
                                _this.removePicturesFromOrderProducts(result).catch(function (err) {
                                    console.log(err);
                                });
                            }, timeToDeletion);
                        }
                        return [4 /*yield*/, Product_1.Product.updateOne({ _id: id }, { status: "sold" })];
                    case 5:
                        res = _g.sent();
                        if (!res)
                            return [2 /*return*/, { message: "error" }];
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(result.status === "canceled")) return [3 /*break*/, 8];
                        return [4 /*yield*/, Product_1.Product.updateOne({ _id: id }, { status: "ok" })];
                    case 7:
                        res = _g.sent();
                        setTimeout(function () {
                            _this.deleteOrder(_id).catch(function (err) {
                                console.log(err);
                            });
                        }, timeToDeletion);
                        if (!res)
                            return [2 /*return*/, { message: "error" }];
                        _g.label = 8;
                    case 8:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _g.trys.push([11, , 14, 15]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _e.call(_b)];
                    case 12:
                        _g.sent();
                        _g.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, { message: "success" }];
                }
            });
        });
    };
    OrderService.prototype.updateOrder = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, rest, result, _a, _b, _c, _id_1, res, res, e_3_1;
            var _this = this;
            var _d, e_3, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _id = input._id, rest = __rest(input, ["_id"]);
                        if (!input._id)
                            return [2 /*return*/, { message: "error", description: "No order ID" }];
                        return [4 /*yield*/, Order_1.Order.findOneAndUpdate({ _id: _id }, __assign({}, rest), { new: true })];
                    case 1:
                        result = (_g.sent());
                        if (!result)
                            return [2 /*return*/, { message: "error" }];
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 10, 11, 16]);
                        _a = true, _b = __asyncValues(rest.productIDs);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 9];
                        _f = _c.value;
                        _a = false;
                        _id_1 = _f;
                        if (!["new", "shipped", "completed"].includes(rest.status)) return [3 /*break*/, 6];
                        if (result.status === "completed") {
                            setTimeout(function () {
                                _this.removePicturesFromOrderProducts(result).catch(function (err) {
                                    console.log(err);
                                });
                            }, timeToDeletion);
                        }
                        return [4 /*yield*/, Product_1.Product.updateOne({ _id: _id_1 }, { status: "sold" })];
                    case 5:
                        res = _g.sent();
                        if (!res)
                            return [2 /*return*/, { message: "error" }];
                        _g.label = 6;
                    case 6:
                        if (!(rest.status === "canceled")) return [3 /*break*/, 8];
                        return [4 /*yield*/, Product_1.Product.updateOne({ _id: _id_1 }, { status: "ok" })];
                    case 7:
                        res = _g.sent();
                        setTimeout(function () {
                            _this.deleteOrder(input._id).catch(function (err) {
                                console.log(err);
                            });
                        }, timeToDeletion);
                        if (!res)
                            return [2 /*return*/, { message: "error" }];
                        _g.label = 8;
                    case 8:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _g.trys.push([11, , 14, 15]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _e.call(_b)];
                    case 12:
                        _g.sent();
                        _g.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, { message: "success" }];
                }
            });
        });
    };
    OrderService.prototype.deleteOrder = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var orderToDelete, _a, _b, _c, _id, res, e_4_1;
            var _d, e_4, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.getSingleOrder(input)];
                    case 1:
                        orderToDelete = _g.sent();
                        if (!orderToDelete || (orderToDelete === null || orderToDelete === void 0 ? void 0 : orderToDelete.status) !== "canceled") {
                            return [2 /*return*/, { message: "error" }];
                        }
                        return [4 /*yield*/, Order_1.Order.deleteOne({
                                _id: input,
                            })];
                    case 2:
                        _g.sent();
                        if (!orderToDelete)
                            return [2 /*return*/, { message: "error" }];
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 9, 10, 15]);
                        _a = true, _b = __asyncValues(orderToDelete.productIDs);
                        _g.label = 4;
                    case 4: return [4 /*yield*/, _b.next()];
                    case 5:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        _id = _f;
                        return [4 /*yield*/, Product_1.Product.updateOne({ _id: _id }, { status: "ok" })];
                    case 6:
                        res = _g.sent();
                        if (!res)
                            return [2 /*return*/, { message: "error" }];
                        _g.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_4_1 = _g.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _g.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _e.call(_b)];
                    case 11:
                        _g.sent();
                        _g.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/, { message: "success" }];
                }
            });
        });
    };
    OrderService.prototype.getCompleteOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.Order.countDocuments({
                            status: { $eq: "completed" },
                        })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderService.prototype.getIncompleteOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.Order
                            .find({
                            $and: [{ status: { $ne: "completed" } }, { status: { $ne: "canceled" } }],
                        })
                            .countDocuments()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderService.prototype.getTotalRevenue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, oneMonthAgo, currentDay, result, lastMonth, percentage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        oneMonthAgo = new Date(now);
                        currentDay = now.getDate();
                        oneMonthAgo.setMonth(now.getMonth() - 1);
                        if (oneMonthAgo.getDate() !== currentDay) {
                            oneMonthAgo.setDate(0);
                        }
                        return [4 /*yield*/, Order_1.Order.aggregate([
                                {
                                    $match: {
                                        status: { $ne: "canceled" },
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        total_sales: {
                                            $sum: "$price",
                                        },
                                        count: {
                                            $sum: 1,
                                        },
                                    },
                                },
                            ])];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, Order_1.Order.aggregate([
                                {
                                    $match: {
                                        status: { $ne: "canceled" },
                                        createdAt: {
                                            $lt: oneMonthAgo,
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        total_sales: {
                                            $sum: "$price",
                                        },
                                    },
                                },
                            ])];
                    case 2:
                        lastMonth = _a.sent();
                        if (result.length > 0 && lastMonth.length > 0) {
                            percentage = "+".concat((lastMonth[0].total_sales / result[0].total_sales) * 100, "%");
                            return [2 /*return*/, { total_count: result[0].count, total_sales: result[0].total_sales, percentage: percentage }];
                        }
                        else {
                            return [2 /*return*/, 0];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getTotalRevenueLastMonth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, oneMonthAgo, twoMonthsAgo, currentDay, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        oneMonthAgo = new Date(now);
                        twoMonthsAgo = new Date(now);
                        currentDay = now.getDate();
                        oneMonthAgo.setMonth(now.getMonth() - 1);
                        twoMonthsAgo.setMonth(now.getMonth() - 2);
                        if (oneMonthAgo.getDate() !== currentDay) {
                            oneMonthAgo.setDate(0);
                        }
                        if (twoMonthsAgo.getDate() !== currentDay) {
                            twoMonthsAgo.setDate(0);
                        }
                        return [4 /*yield*/, this.getRevenueBetweenDatesWithPercentage(now, oneMonthAgo, twoMonthsAgo)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderService.prototype.getWeeklyRevenue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, oneWeekAgo, twoWeeksAgo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        twoWeeksAgo = new Date(oneWeekAgo.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return [4 /*yield*/, this.getRevenueBetweenDatesWithPercentage(now, oneWeekAgo, twoWeeksAgo)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderService.prototype.getDailyRevenue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, yesterday, twoDaysAgo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                        twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
                        return [4 /*yield*/, this.getRevenueBetweenDatesWithPercentage(now, yesterday, twoDaysAgo)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderService.prototype.getTotalSales = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return OrderService;
}());
exports.OrderService = OrderService;
