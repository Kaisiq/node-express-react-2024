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
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = require("../models/Product");
var authRoutes_1 = require("./authRoutes");
var ProductService_1 = require("../services/ProductService");
var express_1 = require("express");
var productService = new ProductService_1.ProductService();
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
    .post(authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, POST(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router
    .route("/featured")
    .post(authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                products = req.body;
                return [4 /*yield*/, productService.removeAllFeatured()];
            case 1:
                _a.sent();
                return [4 /*yield*/, productService.setNewFeatured(products)];
            case 2:
                result = _a.sent();
                res.status(204).send(result);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var featuredProducts, randomNumber, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, productService.getFeatured()];
            case 1:
                featuredProducts = _a.sent();
                randomNumber = Math.floor(Math.random() * featuredProducts.length);
                return [2 /*return*/, res.json(featuredProducts[randomNumber])];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router
    .route("/:_id")
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, document_1, exists, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.params._id;
                return [4 /*yield*/, productService.getProduct(_id)];
            case 1:
                document_1 = _a.sent();
                exists = !!document_1;
                res.json({ exists: exists });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: "Failed to fetch product" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .put(authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
        var ids, data_1, input, data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    ids = req.body.ids;
                    if (!ids) return [3 /*break*/, 2];
                    return [4 /*yield*/, Product_1.Product.find({
                            _id: ids,
                        })];
                case 1:
                    data_1 = _a.sent();
                    res.json(data_1);
                    return [2 /*return*/];
                case 2:
                    input = Product_1.ProductValidateSchema.parse(req.body);
                    return [4 /*yield*/, productService.createProduct(input)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, res.json(data)];
                case 4:
                    err_3 = _a.sent();
                    console.log(err_3);
                    return [2 /*return*/, res.status(500).send("Server error: " + err_3)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function GET(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data, data, data, toGet, data, data, data, page, filter, data, maxPages, _a, _b;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!((_c = req.query) === null || _c === void 0 ? void 0 : _c.status)) return [3 /*break*/, 4];
                    if (!req.query.number) return [3 /*break*/, 2];
                    return [4 /*yield*/, productService.getNewestStatusProducts(req.query.status, req.query.number)];
                case 1:
                    data = _g.sent();
                    return [2 /*return*/, res.json(data)];
                case 2: return [2 /*return*/, res.json(undefined)];
                case 3: return [3 /*break*/, 19];
                case 4:
                    if (!((_d = req.query) === null || _d === void 0 ? void 0 : _d.category)) return [3 /*break*/, 9];
                    if (!req.query.number) return [3 /*break*/, 6];
                    return [4 /*yield*/, productService.getCategoryN(req.query.category, req.query.number)];
                case 5:
                    data = _g.sent();
                    return [2 /*return*/, res.json(data)];
                case 6: return [4 /*yield*/, productService.getCategory(req.query.category)];
                case 7:
                    data = _g.sent();
                    return [2 /*return*/, res.json(data)];
                case 8: return [3 /*break*/, 19];
                case 9:
                    if (!((_e = req.query) === null || _e === void 0 ? void 0 : _e.id)) return [3 /*break*/, 11];
                    toGet = req.query.id;
                    return [4 /*yield*/, productService.getProduct(toGet)];
                case 10:
                    data = _g.sent();
                    return [2 /*return*/, res.json(data)];
                case 11:
                    if (!((_f = req.query) === null || _f === void 0 ? void 0 : _f.newest)) return [3 /*break*/, 16];
                    if (!req.query.status) return [3 /*break*/, 13];
                    return [4 /*yield*/, productService.getNewestStatusProducts(req.query.status, req.query.newest)];
                case 12:
                    data = (_g.sent());
                    return [2 /*return*/, res.json(data)];
                case 13: return [4 /*yield*/, productService.getNewestProducts(req.query.newest)];
                case 14:
                    data = _g.sent();
                    return [2 /*return*/, res.json(data)];
                case 15: return [3 /*break*/, 19];
                case 16:
                    page = Number(req.query.page) || 1;
                    filter = req.query.filter || "";
                    return [4 /*yield*/, productService.getAllProducts(page, filter)];
                case 17:
                    data = _g.sent();
                    _b = (_a = Math).ceil;
                    return [4 /*yield*/, productService.countPages(filter)];
                case 18:
                    maxPages = _b.apply(_a, [_g.sent()]);
                    return [2 /*return*/, res.json({ products: data, maxPages: maxPages })];
                case 19: return [2 /*return*/];
            }
        });
    });
}
function PUT(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, input, data_2, data, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    _id = req.params._id;
                    input = Product_1.ProductValidateSchema.parse(req.body);
                    if (!(input._id != _id)) return [3 /*break*/, 2];
                    return [4 /*yield*/, productService.updateProduct(__assign(__assign({}, input), { _id: _id }))];
                case 1:
                    data_2 = _a.sent();
                    return [2 /*return*/, res.json(data_2)];
                case 2: return [4 /*yield*/, productService.updateProduct(input)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, res.json(data)];
                case 4:
                    err_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send("Server error: " + err_4)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function DELETE(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, data, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.params._id;
                    return [4 /*yield*/, productService.deleteProduct(_id)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, res.json(data)];
                case 2:
                    err_5 = _a.sent();
                    return [2 /*return*/, res.status(500).send("Server error: " + err_5)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
