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
var authRoutes_1 = require("./authRoutes");
var express_1 = require("express");
var User_1 = require("../models/User");
var UserService_1 = require("../services/UserService");
var bcrypt_1 = require("bcrypt");
var userService = new UserService_1.UserService();
var router = express_1.default.Router();
router
    .route("/")
    .get(authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userService.getAllUsers()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, hashedPass, created, created, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                user = User_1.UserCreationFormSchema.parse(req.body);
                if (!user.password) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.hash(user.password, Number(process.env.NEXTAUTH_HASHLEVELS))];
            case 1:
                hashedPass = _a.sent();
                return [4 /*yield*/, userService.createUser(__assign(__assign({}, user), { hashedPassword: hashedPass }))];
            case 2:
                created = _a.sent();
                return [2 /*return*/, res.json(created)];
            case 3: return [4 /*yield*/, userService.createUser(user)];
            case 4:
                created = _a.sent();
                return [2 /*return*/, res.json(created)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                console.error(err_2);
                return [2 /*return*/, res.status(500).send("Server error: " + err_2)];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.get("/total", authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userService.getUserCount()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_3)];
            case 3: return [2 /*return*/];
        }
    });
}); });
router
    .route("/:email")
    .patch(authRoutes_1.userOrGreaterCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, input, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.params.email;
                input = req.body;
                return [4 /*yield*/, userService.patchUser(email, input)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_4)];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .get(authRoutes_1.userOrGreaterCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, data, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.params.email;
                return [4 /*yield*/, userService.getUser(email)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_5)];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .put(authRoutes_1.userOrGreaterCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, hashedPass, created, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                data = User_1.UserCreationFormSchema.parse(req.body);
                if (!data.password) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.hash(data.password, Number(process.env.NEXTAUTH_HASHLEVELS))];
            case 1:
                hashedPass = _a.sent();
                return [4 /*yield*/, userService.updateUser(__assign(__assign({}, data), { hashedPassword: hashedPass }))];
            case 2:
                created = _a.sent();
                return [2 /*return*/, res.json(created)];
            case 3: return [4 /*yield*/, userService.updateUser(data)];
            case 4:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_6)];
            case 7: return [2 /*return*/];
        }
    });
}); })
    .delete(authRoutes_1.adminOrStaffCheckMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, deleted, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userService.deleteUser(email)];
            case 2:
                deleted = _a.sent();
                return [2 /*return*/, res.json(deleted)];
            case 3:
                err_7 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server error: " + err_7)];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
