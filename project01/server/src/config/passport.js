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
var passport_1 = require("passport");
var passport_local_1 = require("passport-local");
var passport_jwt_1 = require("passport-jwt");
var UserService_1 = require("../services/UserService");
var bcrypt = require("bcrypt");
var mongoose_1 = require("../lib/mongoose");
// Initialize passport strategy
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, // specify that we're using email instead of username
function (email, password, done) {
    return __awaiter(this, void 0, void 0, function () {
        var userService, exists, hashedPass, user, passwordsMatch, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mongoose_1.mongooseConnect)()];
                case 1:
                    _a.sent();
                    userService = new UserService_1.UserService();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 10, , 11]);
                    if (!email || !password) {
                        return [2 /*return*/, done(null, false, {
                                message: "Не сте попълнили всички полета.",
                            })];
                    }
                    return [4 /*yield*/, userService.getSingleUser(email)];
                case 3:
                    exists = _a.sent();
                    if (!!exists) return [3 /*break*/, 6];
                    return [4 /*yield*/, bcrypt.hash(password, Number(process.env.NEXTAUTH_HASHLEVELS))];
                case 4:
                    hashedPass = _a.sent();
                    return [4 /*yield*/, userService.createUser({
                            email: email,
                            hashedPassword: hashedPass,
                        })];
                case 5:
                    user = _a.sent();
                    return [2 /*return*/, done(null, user, { message: "" })];
                case 6:
                    if (!!exists.hashedPassword) return [3 /*break*/, 7];
                    return [2 /*return*/, done(null, false, {
                            message: "Вече сте създали акаунт с този имейл чрез Google. Моля влезте чрез Google.",
                        })];
                case 7: return [4 /*yield*/, bcrypt.compare(password, exists.hashedPassword)];
                case 8:
                    passwordsMatch = _a.sent();
                    if (!passwordsMatch) {
                        return [2 /*return*/, done(null, false, { message: "Грешен Имейл или Парола." })];
                    }
                    return [2 /*return*/, done(null, exists, { message: "" })];
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    console.error("Error parsing request body:", error_1);
                    return [2 /*return*/, done(null, false, { message: "Грешка в подадените данни." })];
                case 11: return [2 /*return*/];
            }
        });
    });
}));
// JWT strategy
var jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "your_jwt_secret",
};
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, function (jwt_payload, done) { return __awaiter(void 0, void 0, void 0, function () {
    var userService, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.mongooseConnect)()];
            case 1:
                _a.sent();
                userService = new UserService_1.UserService();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, userService.getSingleUser(jwt_payload.email)];
            case 3:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, done(null, user)];
                }
                else {
                    return [2 /*return*/, done(null, false)];
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                return [2 /*return*/, done(error_2, false)];
            case 5: return [2 /*return*/];
        }
    });
}); }));
exports.default = passport_1.default;
