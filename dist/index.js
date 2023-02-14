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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var readline_sync_1 = __importDefault(require("readline-sync"));
function stringify(unicode) {
    return String.fromCharCode(unicode);
}
function run(code) {
    return __awaiter(this, void 0, void 0, function () {
        var statements, variables, pointer, evaluate, execute, statement, evaluated;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    statements = code.trim().split(code.includes('~') ? '~' : '\n').map(function (line) { return line.trim(); });
                    if (statements[0] !== '어떻게' || !statements.slice(-1)[0].startsWith('이 사람이름이냐')) {
                        throw new Error('Error: 어떻게 이 코드가 엄랭이냐ㅋㅋ');
                    }
                    variables = [];
                    pointer = 0;
                    evaluate = function (x) { return __awaiter(_this, void 0, void 0, function () {
                        var n, answer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    n = 0;
                                    if (!x.includes(' ')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Promise.all(x.split(' ').map(evaluate))];
                                case 1: return [2 /*return*/, (_a.sent()).reduce(function (a, b) { return a * b; })];
                                case 2:
                                    if (x.includes('식?')) {
                                        answer = readline_sync_1.default.question();
                                        x = x.replace('식?', '.'.repeat(Number(answer)));
                                    }
                                    if (x.includes('어'))
                                        n += variables[x.split('어').length - 1];
                                    if (x.includes('.'))
                                        n += x.split('.').length - 1;
                                    if (x.includes(','))
                                        n -= x.split(',').length - 1;
                                    return [2 /*return*/, n];
                            }
                        });
                    }); };
                    execute = function (statement) { return __awaiter(_this, void 0, void 0, function () {
                        var condition, variablePointer, setteeValue, _a, _b, _c, _d, _e, _f;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    if (!(statement.includes('동탄') && statement.includes('?'))) return [3 /*break*/, 2];
                                    return [4 /*yield*/, evaluate(statement.substring(2, statement.lastIndexOf('?') + 1))];
                                case 1:
                                    condition = _g.sent();
                                    if (condition === 0) {
                                        return [2 /*return*/, execute(statement.substr(statement.lastIndexOf('?') + 1))];
                                    }
                                    return [2 /*return*/];
                                case 2:
                                    if (!statement.includes('엄')) return [3 /*break*/, 4];
                                    variablePointer = statement.split('엄')[0].split('어').length;
                                    return [4 /*yield*/, evaluate(statement.split('엄')[1])];
                                case 3:
                                    setteeValue = _g.sent();
                                    variables[variablePointer] = setteeValue;
                                    _g.label = 4;
                                case 4:
                                    if (!(statement.includes('식') && statement[statement.length - 1] === '!')) return [3 /*break*/, 6];
                                    _b = (_a = process.stdout).write;
                                    _c = String;
                                    return [4 /*yield*/, evaluate(statement.slice(1, -1))];
                                case 5:
                                    _b.apply(_a, [_c.apply(void 0, [_g.sent()])]);
                                    _g.label = 6;
                                case 6:
                                    if (!(statement.includes('식') && statement[statement.length - 1] === 'ㅋ')) return [3 /*break*/, 8];
                                    if (statement === '식ㅋ')
                                        process.stdout.write('\n');
                                    _e = (_d = process.stdout).write;
                                    _f = stringify;
                                    return [4 /*yield*/, evaluate(statement.slice(1, -1))];
                                case 7:
                                    _e.apply(_d, [_f.apply(void 0, [_g.sent()])]);
                                    _g.label = 8;
                                case 8:
                                    if (!statement.includes('준')) return [3 /*break*/, 10];
                                    return [4 /*yield*/, evaluate(statement.split('준')[1])];
                                case 9:
                                    pointer = (_g.sent()) - 1;
                                    _g.label = 10;
                                case 10:
                                    if (statement.indexOf('화이팅!') === 0) {
                                        return [2 /*return*/, evaluate(statement.split('화이팅!')[1])];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    _a.label = 1;
                case 1:
                    if (!!statements[pointer].startsWith('이 사람이름이냐')) return [3 /*break*/, 3];
                    statement = statements[pointer++];
                    return [4 /*yield*/, execute(statement)];
                case 2:
                    evaluated = _a.sent();
                    if (evaluated)
                        return [2 /*return*/, evaluated];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function bootstrap(path) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_1.promises.access(path)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    throw new Error("Error: ".concat(path, "\uAC00 \uC5B4\uB5BB\uAC8C \uD30C\uC77C\uC774\uB984\uC774\uB0D0\u314B\u314B"));
                case 4:
                    _a = run;
                    return [4 /*yield*/, fs_1.promises.readFile(path, 'utf-8')];
                case 5: return [4 /*yield*/, _a.apply(void 0, [(_b.sent())])];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _b.sent();
                    process.stderr.write("".concat(e_2.message, "\n"));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
if (process.argv[2])
    bootstrap(process.argv[2]);
