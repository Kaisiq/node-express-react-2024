"use strict";
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
exports.adminCheckMiddleware = exports.adminOrStaffCheckMiddleware = exports.userOrGreaterCheckMiddleware = exports.userCheckMiddleware = void 0;
var UserService_1 = require("../services/UserService");
var express_1 = require("express");
var passport_1 = require("../config/passport");
var jsonwebtoken_1 = require("jsonwebtoken");
var AdminType;
(function (AdminType) {
    AdminType[AdminType["User"] = 0] = "User";
    AdminType[AdminType["Staff"] = 1] = "Staff";
    AdminType[AdminType["Admin"] = 2] = "Admin";
})(AdminType || (AdminType = {}));
var router = express_1.default.Router();
router.post("/password", function (req, res, next) {
    passport_1.default.authenticate("local", function (err, user, info) {
        if (err) {
            return res.status(400).send(err.message);
        }
        if (!user) {
            return res.status(400).send(info.message);
        }
        var token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET || "your_jwt_secret", {
            expiresIn: "1h", // Token expiry time
        });
        res.cookie("jwt", jsonwebtoken_1.default, { httpOnly: true, secure: true });
        return res.status(200).json({ user: user, token: token });
    })(req, res, next);
});
router.get("/profile", passport_1.default.authenticate("jwt", { session: false }), function (req, res) {
    res.status(200).json({ message: "Profile access granted.", user: req.user });
});
router.get("/admin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate("jwt", { session: false }, function (err, user) { return __awaiter(void 0, void 0, void 0, function () {
            var userService, fetchedUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(err || !user)) return [3 /*break*/, 1];
                        console.error(err);
                        console.log("An error occurred while checking admin status or user not found.");
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: "An error occurred while checking admin status or user not found." })];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userService = new UserService_1.UserService();
                        return [4 /*yield*/, userService.getSingleUser(user.email)];
                    case 2:
                        fetchedUser = _a.sent();
                        if (fetchedUser) {
                            return [2 /*return*/, res.json({ isAdmin: fetchedUser.admin })];
                        }
                        else {
                            return [2 /*return*/, res.json({ isAdmin: false })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        console.log("An error occurred while checking admin status.");
                        return [2 /*return*/, res.status(500).json({ error: "An error occurred while checking admin status." })];
                    case 4: return [2 /*return*/];
                }
            });
        }); })(req, res);
        return [2 /*return*/];
    });
}); });
exports.default = router;
function isAdminCheck(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    passport_1.default.authenticate("jwt", { session: false }, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                        var userService, fetchedUser, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(err || !user)) return [3 /*break*/, 1];
                                    console.log(err, user);
                                    console.log("An error occurred while checking admin status or user not found.");
                                    resolve(AdminType.User);
                                    return [3 /*break*/, 4];
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    userService = new UserService_1.UserService();
                                    return [4 /*yield*/, userService.getSingleUser(user.email)];
                                case 2:
                                    fetchedUser = _a.sent();
                                    if (fetchedUser && fetchedUser.admin) {
                                        resolve(fetchedUser.admin);
                                    }
                                    else {
                                        resolve(AdminType.User);
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _a.sent();
                                    console.log("An error occurred while checking admin status.");
                                    resolve(AdminType.User);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })(req, res);
                })];
        });
    });
}
function isUserRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    passport_1.default.authenticate("jwt", { session: false }, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                        var token, decodedToken, currentTime, timeLeft, threshold, newToken;
                        var _a;
                        return __generator(this, function (_b) {
                            if (err || !user) {
                                console.log("An error occurred while checking user status or user not found.");
                                return [2 /*return*/, resolve({})];
                            }
                            else {
                                try {
                                    token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                                    if (token) {
                                        decodedToken = jsonwebtoken_1.default.decode(token);
                                        currentTime = Date.now() / 1000;
                                        timeLeft = decodedToken.exp - currentTime;
                                        threshold = 60 * 5;
                                        if (timeLeft < threshold) {
                                            newToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "your_jwt_secret", {
                                                expiresIn: "15m",
                                            });
                                            return [2 /*return*/, resolve({ user: user, newToken: newToken })];
                                        }
                                    }
                                    return [2 /*return*/, resolve({ user: user })];
                                }
                                catch (error) {
                                    console.log("An error occurred while checking user status.");
                                    return [2 /*return*/, resolve({})];
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); })(req, res);
                })];
        });
    });
}
var userCheckMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, isUser, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                email = req.params.email;
                return [4 /*yield*/, isUserRequest(req, res)];
            case 1:
                isUser = _b.sent();
                if (!isUser) {
                    return [2 /*return*/, res.status(401).send("Cannot do that operation. Please log in")];
                }
                if (isUser === null || isUser === void 0 ? void 0 : isUser.newToken) {
                    res.setHeader("Authorization", "Bearer ".concat(isUser.newToken));
                }
                if (!email || email === ((_a = isUser.user) === null || _a === void 0 ? void 0 : _a.email))
                    next();
                return [2 /*return*/, res.status(401).send("Cannot do that operation. Please log in")];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(401).send("Unauthorized. Please log in")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userCheckMiddleware = userCheckMiddleware;
var userOrGreaterCheckMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, isUser, isAdmin, isAdmin, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                email = req.params.email;
                return [4 /*yield*/, isUserRequest(req, res)];
            case 1:
                isUser = _b.sent();
                if (!!isUser) return [3 /*break*/, 3];
                return [4 /*yield*/, isAdminCheck(req, res)];
            case 2:
                isAdmin = _b.sent();
                if (!isAdmin) {
                    return [2 /*return*/, res.status(401).send("Unauthorized. Please log in")];
                }
                next();
                _b.label = 3;
            case 3:
                if (isUser === null || isUser === void 0 ? void 0 : isUser.newToken) {
                    res.setHeader("Authorization", "Bearer ".concat(isUser.newToken));
                }
                if (!(!email || email === ((_a = isUser.user) === null || _a === void 0 ? void 0 : _a.email))) return [3 /*break*/, 4];
                next();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, isAdminCheck(req, res)];
            case 5:
                isAdmin = _b.sent();
                if (!isAdmin) {
                    return [2 /*return*/, res.status(401).send("Unauthorized. Please log in")];
                }
                next();
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(401).send("Unauthorized. Please log in")];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.userOrGreaterCheckMiddleware = userOrGreaterCheckMiddleware;
var adminOrStaffCheckMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isAdmin, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, isAdminCheck(req, res)];
            case 1:
                isAdmin = _a.sent();
                if (!isAdmin) {
                    return [2 /*return*/, res.status(401).send("Unauthorized. Please log in")];
                }
                next();
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(401).send("Unauthorized. Please log in")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.adminOrStaffCheckMiddleware = adminOrStaffCheckMiddleware;
var adminCheckMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isAdmin, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, isAdminCheck(req, res)];
            case 1:
                isAdmin = _a.sent();
                if (isAdmin != AdminType.Admin) {
                    return [2 /*return*/, res.status(401).send("Unauthorized. Please log in")];
                }
                next();
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(401).send("Unauthorized. Please log in")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.adminCheckMiddleware = adminCheckMiddleware;
