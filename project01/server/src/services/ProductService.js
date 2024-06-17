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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
var axios_1 = require("axios");
var Product_1 = require("../models/Product");
var mongoose_1 = require("mongoose");
function linksToFileKeys(links) {
    if (!links)
        return "";
    var fileKeys = [];
    links.forEach(function (link) {
        if (link) {
            var splittedLink = link.split("/");
            var fk = splittedLink ? splittedLink.at(-1) : "";
            if (!!fk) {
                fileKeys.push(fk);
            }
        }
    });
    return fileKeys;
}
var ProductService = /** @class */ (function () {
    function ProductService() {
        this.productsPerPage = 24;
        /* eslint-enable */
        this.stringFilterToObj = function (filter) {
            var actualFilter = {};
            if (filter === "male") {
                actualFilter = { $or: [{ sex: "male" }, { sex: "both" }] };
            }
            else if (filter === "female") {
                actualFilter = { $or: [{ sex: "female" }, { sex: "both" }] };
            }
            else if (filter === "sale") {
                actualFilter = { sellPercent: { $gt: 0 } };
            }
            return actualFilter;
        };
    }
    ProductService.prototype.deleteImages = function (imagesArr) {
        return __awaiter(this, void 0, void 0, function () {
            var fileKeys, bearer, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileKeys = linksToFileKeys(imagesArr);
                        bearer = process.env.UPLOADTHING_SECRET;
                        options = {
                            method: "POST",
                            url: "https://uploadthing.com/api/deleteFile",
                            headers: {
                                "Content-Type": "application/json",
                                "X-Uploadthing-Api-Key": bearer,
                                "X-Uploadthing-Version": "6.5.0",
                            },
                            data: { fileKeys: fileKeys },
                        };
                        return [4 /*yield*/, axios_1.default.request(options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.getImages = function (productID) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.findOne({
                            _id: productID,
                        })];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, data.images];
                }
            });
        });
    };
    ProductService.prototype.deleteProcess = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var images, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getImages(input)];
                    case 1:
                        images = _a.sent();
                        return [4 /*yield*/, this.deleteImages(images)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Product_1.Product.deleteOne({ _id: input })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "success" }];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [2 /*return*/, { message: error_1 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.updateProduct = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, rest, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = input._id, rest = __rest(input, ["_id"]);
                        return [4 /*yield*/, Product_1.Product.findOneAndUpdate({ _id: _id }, __assign({}, rest), { new: true })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { message: result ? "success" : "error" }];
                }
            });
        });
    };
    ProductService.prototype.createProduct = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.create(input)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { message: result ? "success" : "error" }];
                }
            });
        });
    };
    ProductService.prototype.deleteProduct = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var el, result, e_1_1, res;
            var _a, input_1, input_1_1;
            var _b, e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!Array.isArray(input)) return [3 /*break*/, 14];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 7, 8, 13]);
                        _a = true, input_1 = __asyncValues(input);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, input_1.next()];
                    case 3:
                        if (!(input_1_1 = _e.sent(), _b = input_1_1.done, !_b)) return [3 /*break*/, 6];
                        _d = input_1_1.value;
                        _a = false;
                        el = _d;
                        return [4 /*yield*/, this.deleteProcess(el)];
                    case 4:
                        result = _e.sent();
                        if (!result) {
                            return [2 /*return*/, { message: "error" }];
                        }
                        _e.label = 5;
                    case 5:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _e.trys.push([8, , 11, 12]);
                        if (!(!_a && !_b && (_c = input_1.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _c.call(input_1)];
                    case 9:
                        _e.sent();
                        _e.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, { message: "success" }];
                    case 14: return [4 /*yield*/, this.deleteProcess(input)];
                    case 15:
                        res = _e.sent();
                        return [2 /*return*/, { message: res }];
                }
            });
        });
    };
    /* eslint-disable */
    ProductService.prototype.getProduct = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(input)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Product_1.Product.find({
                                _id: input,
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2: return [4 /*yield*/, this.getSingleProduct(input)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.getSingleProduct = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = new mongoose_1.default.Types.ObjectId(input);
                        return [4 /*yield*/, Product_1.Product.findById(_id).lean()];
                    case 1:
                        result = (_a.sent());
                        if (!result) {
                            console.log("Product not found");
                            return [2 /*return*/, null];
                        }
                        else {
                            return [2 /*return*/, result];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error retrieving product:", err_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.getAllProducts = function (page, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var actualPage, actualFilter, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actualPage = page - 1;
                        actualFilter = this.stringFilterToObj(filter);
                        return [4 /*yield*/, Product_1.Product
                                .find(actualFilter)
                                .skip(actualPage * this.productsPerPage)
                                .limit(this.productsPerPage)];
                    case 1:
                        results = (_a.sent());
                        return [2 /*return*/, results];
                }
            });
        });
    };
    ProductService.prototype.removeAllFeatured = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.updateMany({ featured: true }, { $set: { featured: false } })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ProductService.prototype.setNewFeatured = function (newFeaturedIds) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.updateMany({ _id: { $in: newFeaturedIds } }, { $set: { featured: true } })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ProductService.prototype.getFeatured = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product
                            .find({
                            featured: true,
                        })
                            .limit(10)];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ProductService.prototype.countPages = function (filterParams) {
        return __awaiter(this, void 0, void 0, function () {
            var actualFilter, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actualFilter = this.stringFilterToObj(filterParams);
                        return [4 /*yield*/, Product_1.Product.find(actualFilter).countDocuments()];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count / this.productsPerPage];
                }
            });
        });
    };
    ProductService.prototype.getNewestProducts = function (n) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product
                            .find({}, null, {
                            sort: { updatedAt: -1 },
                        })
                            .limit(n)];
                    case 1:
                        results = (_a.sent());
                        return [2 /*return*/, results];
                }
            });
        });
    };
    ProductService.prototype.getNewestStatusProducts = function (status, n) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product
                            .find({ status: status }, null, {
                            sort: { updatedAt: -1 },
                        })
                            .limit(n)];
                    case 1:
                        results = (_a.sent());
                        if (n === 1) {
                            return [2 /*return*/, results[0]];
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    ProductService.prototype.getCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product
                            .find({
                            category: category,
                        })
                            .limit(50)];
                    case 1:
                        results = (_a.sent());
                        return [2 /*return*/, results];
                }
            });
        });
    };
    ProductService.prototype.getCategoryN = function (category, n) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product
                            .find({
                            category: category,
                        })
                            .limit(n)];
                    case 1:
                        results = (_a.sent());
                        return [2 /*return*/, results];
                }
            });
        });
    };
    return ProductService;
}());
exports.ProductService = ProductService;
