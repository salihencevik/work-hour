"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AreaType;
(function (AreaType) {
    AreaType[AreaType["Ofis"] = 1] = "Ofis";
    AreaType[AreaType["Ev"] = 2] = "Ev";
})(AreaType = exports.AreaType || (exports.AreaType = {}));
var BusinessStatus;
(function (BusinessStatus) {
    BusinessStatus[BusinessStatus["Active"] = 1] = "Active";
    BusinessStatus[BusinessStatus["Completed"] = 2] = "Completed";
    BusinessStatus[BusinessStatus["Waiting"] = 3] = "Waiting";
    BusinessStatus[BusinessStatus["Cancel"] = 4] = "Cancel";
    BusinessStatus[BusinessStatus["TobeTested"] = 5] = "TobeTested";
    BusinessStatus[BusinessStatus["PostTestCorrection"] = 6] = "PostTestCorrection";
})(BusinessStatus = exports.BusinessStatus || (exports.BusinessStatus = {}));
var ConditionType;
(function (ConditionType) {
    ConditionType[ConditionType["Equals"] = 1] = "Equals";
    ConditionType[ConditionType["GreaterThan"] = 2] = "GreaterThan";
    ConditionType[ConditionType["LessThan"] = 3] = "LessThan";
    ConditionType[ConditionType["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
    ConditionType[ConditionType["LessThanOrEqual"] = 5] = "LessThanOrEqual";
    ConditionType[ConditionType["IsFalse"] = 6] = "IsFalse";
    ConditionType[ConditionType["IsTrue"] = 7] = "IsTrue";
    ConditionType[ConditionType["NotEqual"] = 8] = "NotEqual";
    ConditionType[ConditionType["StartsWith"] = 9] = "StartsWith";
    ConditionType[ConditionType["EndsWith"] = 10] = "EndsWith";
    ConditionType[ConditionType["Contains"] = 11] = "Contains";
    ConditionType[ConditionType["Between"] = 12] = "Between";
})(ConditionType = exports.ConditionType || (exports.ConditionType = {}));
var PropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["Number"] = 1] = "Number";
    PropertyType[PropertyType["Text"] = 2] = "Text";
    PropertyType[PropertyType["Date"] = 3] = "Date";
    PropertyType[PropertyType["Boolean"] = 4] = "Boolean";
    PropertyType[PropertyType["Selection"] = 5] = "Selection";
    PropertyType[PropertyType["Tag"] = 6] = "Tag";
    PropertyType[PropertyType["Phone"] = 7] = "Phone";
})(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
var PageMode;
(function (PageMode) {
    PageMode[PageMode["List"] = 1] = "List";
    PageMode[PageMode["Create"] = 2] = "Create";
    PageMode[PageMode["Update"] = 3] = "Update";
    PageMode[PageMode["View"] = 4] = "View";
})(PageMode = exports.PageMode || (exports.PageMode = {}));
var DateFilter;
(function (DateFilter) {
    DateFilter[DateFilter["Yesterday"] = 1] = "Yesterday";
    DateFilter[DateFilter["Today"] = 2] = "Today";
    DateFilter[DateFilter["ThisWeek"] = 3] = "ThisWeek";
    DateFilter[DateFilter["ThisMonth"] = 4] = "ThisMonth";
    DateFilter[DateFilter["ThisYear"] = 5] = "ThisYear";
    DateFilter[DateFilter["LastWeek"] = 6] = "LastWeek";
    DateFilter[DateFilter["LastMonth"] = 7] = "LastMonth";
    DateFilter[DateFilter["Custom"] = 8] = "Custom";
})(DateFilter = exports.DateFilter || (exports.DateFilter = {}));
exports.DateFilterValues = [
    {
        value: DateFilter.Yesterday,
        text: 'YESTERDAY'
    },
    {
        value: DateFilter.Today,
        text: 'TODAY'
    },
    {
        value: DateFilter.ThisWeek,
        text: 'THIS-WEEK'
    },
    {
        value: DateFilter.ThisMonth,
        text: 'THIS-MONTH'
    },
    {
        value: DateFilter.ThisYear,
        text: 'THIS-YEAR'
    },
    {
        value: DateFilter.LastWeek,
        text: 'LAST-WEEK'
    },
    {
        value: DateFilter.LastMonth,
        text: 'LAST-MONTH'
    },
    {
        value: DateFilter.Custom,
        text: 'CUSTOM'
    }
];
var CustomDateFilterRangeNames;
(function (CustomDateFilterRangeNames) {
    CustomDateFilterRangeNames[CustomDateFilterRangeNames["Start"] = 1] = "Start";
    CustomDateFilterRangeNames[CustomDateFilterRangeNames["End"] = 2] = "End";
})(CustomDateFilterRangeNames = exports.CustomDateFilterRangeNames || (exports.CustomDateFilterRangeNames = {}));
//# sourceMappingURL=enums.js.map