import { TranslateService } from '@ngx-translate/core';

export default class GridTraslator {

  private static items: any;

  static GetTranslatedText(translate: TranslateService): any {

    if (this.items)
      return this.items;

    this.items = {
      // for filter panel
      page: translate.instant("PAGE"),
      more: translate.instant("MORE"),
      to: translate.instant("GRID-TO"),
      of: translate.instant("GRID-OF"),
      next: translate.instant("GRID-NEXT"),
      last: translate.instant("GRID-LAST"),
      first: translate.instant("GRID-FIRST"),
      previous: translate.instant("GRID-PREVIOUS"),
      loadingOoo: translate.instant("GRID-LOADING"),

      // for set filter
      selectAll: translate.instant("GRID-SELECT-ALL"),
      searchOoo: translate.instant("GRID-SEARCH"),
      blanks: 'daBlanc',

      // for number filter and text filter
      filterOoo: translate.instant("FILTER_VALUE"),
      applyFilter: translate.instant("FILTER"),
      equals: translate.instant("GRID-EQUALS"),
      notEqual: translate.instant("GRID-NOT-EQUALS"),

      // for number filter
      lessThan: translate.instant("GRID-LESS-THAN"),
      greaterThan: translate.instant("GRID-GREATHER-THAN"),
      lessThanOrEqual: translate.instant("GRID-LESS-THAN-OR-EQUALS"),
      greaterThanOrEqual: translate.instant("GRID-GREATHER-THAN-OR-EQUALS"),
      inRange: translate.instant("GRID-IN-RANGE"),

      // for text filter
      contains: translate.instant("GRID-CONTAINS"),
      notContains: translate.instant("GRID-NOT-CONTAINS"),
      startsWith: translate.instant("GRID-START-WTIH"),
      endsWith: translate.instant("GRID-END-WITH"),

      // filter conditions
      andCondition: translate.instant("GRID-AND"),
      orCondition: translate.instant("GRID-OR"),

      // the header of the default group column
      group: 'laGroup',

      // tool panel
      columns: 'laColumns',
      filters: translate.instant("FILTER LIST"),
      rowGroupColumns: 'laPivot Cols',
      rowGroupColumnsEmptyMessage: 'la drag cols to group',
      valueColumns: 'laValue Cols',
      pivotMode: 'laPivot-Mode',
      groups: 'laGroups',
      values: 'laValues',
      pivots: 'laPivots',
      valueColumnsEmptyMessage: 'la drag cols to aggregate',
      pivotColumnsEmptyMessage: 'la drag here to pivot',
      toolPanelButton: 'la tool panel',

      // other
      noRowsToShow: translate.instant("GRID-NO-ROWS-TO-SHOW"),

      // enterprise menu
      pinColumn: translate.instant("GRID-PIN-COLUMN"),
      valueAggregation: 'laValue Agg',
      autosizeThiscolumn: translate.instant("GRID-AUTO-SIZE-THIS-COLUMN"),
      autosizeAllColumns: translate.instant("GRID-AUTO-SIZE-ALL-COLUMN"),
      groupBy: translate.instant("GRID-GROUP-BY"),
      unGroupBy: translate.instant("GRID-UN-GROUP-BY"),
      resetColumns: translate.instant("GRID-RESET-COLUMN"),
      expandAll: translate.instant("GRID-EXPAND-ALL"),
      collapseAll: translate.instant("GRID-COLLPASE-ALL"),
      toolPanel: translate.instant("GRID-TOOL-PANEL"),
      export: translate.instant("GRID-EXPORT"),
      csvExport: translate.instant("GRID-EXPORT-CSV"),
      excelExport: translate.instant("GRID-EXPORT-EXCEL"),
      excelXmlExport: translate.instant("GRID-EXPORT-XML"),

      // enterprise menu pinning
      pinLeft: translate.instant("GRID-PIN-LEFT"),
      pinRight: translate.instant("GRID-PIN-RIGHT"),
      noPin: translate.instant("GRID-NO-PIN"),

      // enterprise menu aggregation and status bar
      sum: 'laSum',
      min: 'laMin',
      max: 'laMax',
      none: 'laNone',
      count: 'laCount',
      average: 'laAverage',
      filteredRows: 'laFiltered',
      selectedRows: 'laSelected',
      totalRows: 'laTotal Rows',
      totalAndFilteredRows: 'laRows',

      // standard menu
      copy: translate.instant("GRID-COPY"),
      copyWithHeaders: translate.instant("GRID-COPY-WITH-HEADERS"),
      ctrlC: translate.instant("GRID-CTRL-C"),
      paste: translate.instant("GRID-PASTE"),
      ctrlV: translate.instant("GRID-CTRL-V"),
    }

    return this.items;
  }
}
