"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");
var store_1 = require("./store");
var AbstractComponent = /** @class */ (function () {
    function AbstractComponent(p) {
        this.props = p || {};
        this.state = __assign({}, p);
        this.view = null;
    }
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
var StateComponent = /** @class */ (function (_super) {
    __extends(StateComponent, _super);
    function StateComponent(p) {
        var _this = _super.call(this, p) || this;
        _this.relevantProperties = [];
        _this.state = store_1.getState();
        StateComponent.stateListeners.push(_this);
        return _this;
    }
    StateComponent.setState = function (s) {
        StateComponent.stateListeners.forEach(function (l) {
            var names = misc_utils_of_mine_generic_1.objectKeys(s).filter(function (n) { return l.relevantProperties.includes(n); });
            var filtered = misc_utils_of_mine_generic_1.arrayToObject(names, function (a) { return s[a]; });
            l.stateChanged(names, filtered);
        });
        store_1.setState(s);
    };
    StateComponent.prototype.setState = function (s) {
        StateComponent.setState(s);
    };
    StateComponent.prototype.stateChanged = function (names, s) {
    };
    StateComponent.stateListeners = [];
    return StateComponent;
}(AbstractComponent));
exports.StateComponent = StateComponent;
//# sourceMappingURL=abstractComponent.js.map