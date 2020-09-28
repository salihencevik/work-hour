export enum AreaType {
  Ofis = 1,
  Ev = 2
}
export enum BusinessStatus {
  Active = 1,
  Completed = 2,
  Waiting = 3,
  Cancel = 4,
  TobeTested = 5, 
  PostTestCorrection = 6
}

export enum ConditionType {
  Equals = 1,
  GreaterThan = 2,
  LessThan = 3,
  GreaterThanOrEqual = 4,
  LessThanOrEqual = 5,
  IsFalse = 6,
  IsTrue = 7,
  NotEqual = 8,
  StartsWith = 9,
  EndsWith = 10,
  Contains = 11,
  Between = 12
}

export enum PropertyType {
  Number = 1,
  Text = 2,
  Date = 3,
  Boolean = 4,
  Selection = 5,
  Tag = 6,
  Phone = 7
}

export enum PageMode {
  List = 1,
  Create = 2,
  Update = 3,
  View = 4
}

export enum DateFilter {
  Yesterday = 1,
  Today = 2,
  ThisWeek = 3,
  ThisMonth = 4,
  ThisYear = 5,
  LastWeek = 6,
  LastMonth = 7,
  Custom = 8
}

export const DateFilterValues = [
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



export enum CustomDateFilterRangeNames {
  Start = 1,
  End = 2
}

