import { ConditionType, PropertyType, DateFilter } from "../../shared/enum/enums";

export class GridFilter {
  PropertyName: string;
  PropertyType: PropertyType;
  ConditionType: string;
  Text: string;
  Value: any;
  Visible: boolean;
  Items?: any[] | null | undefined;
  isStatic: boolean;
  filterFunction: Function | null;
  TagType: string;
  Equals: GridFilter;
  IsAnd: boolean = true;
  Value2: any;
  dateFilterValue = DateFilter.Today;
  IsRelational: boolean;
  RelationalParentId?: string;
  Data?: any[] | null | undefined;
  Sortable: boolean = true;

  constructor(propertyName: string,
    propertyType: PropertyType,
    condition: ConditionType,
    text: string,
    selection?: any[] | null | undefined,
    isStatic?: boolean | false,
    value?: any | null,
    filterFunction?: Function | null,
    tagType?: string | null,
    isAnd?: boolean | true,
    isRelational?: boolean | false,
    relationalParentId?: string,
    sortable: boolean = true
  ) {
    this.PropertyName = propertyName;
    this.PropertyType = propertyType;
    this.ConditionType = String(Number(condition));
    this.Text = text;
    this.Visible = false;
    this.Items = selection;
    this.isStatic = isStatic;
    this.Value = value;
    this.filterFunction = filterFunction
    this.TagType = tagType;
    this.IsAnd = isAnd;
    this.IsRelational = isRelational;
    this.RelationalParentId = relationalParentId;
    this.Sortable = sortable;

    if (this.IsRelational == true && this.RelationalParentId != null) {
      this.Data = selection;
      this.Items = undefined;
    }
  }
}

export class ConditionTypeMapper {

  constructor() {

    this.mapping = new Map<string, ConditionType>();
    this.mapping.set("contains", ConditionType.Contains);
    this.mapping.set("equals", ConditionType.Equals);
    this.mapping.set("notEqual", ConditionType.NotEqual);
    this.mapping.set("startsWith", ConditionType.StartsWith);
    this.mapping.set("endsWith", ConditionType.EndsWith);
    this.mapping.set("lessThan", ConditionType.LessThan);
    this.mapping.set("lessThanOrEqual", ConditionType.LessThanOrEqual);
    this.mapping.set("greaterThan", ConditionType.GreaterThan);
    this.mapping.set("greaterThanOrEqual", ConditionType.GreaterThanOrEqual);

  }

  private mapping: Map<string, ConditionType>;

  getConditionType(columnFilterConditionTypeName: string): ConditionType {
    try {
      return this.mapping.get(columnFilterConditionTypeName)
    } catch (e) {
      console.log(e);
    }
  }

  getFilterCondition(propType: PropertyType): string[] {

    switch (propType) {
      case PropertyType.Number:
        return [/*"contains", */"equals", "notEqual", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"/*,"inRange"*/]
      case PropertyType.Text:
        return ["contains", "equals", "notEqual", "startsWith", "endsWith"]
      default:
        return ["contains", "equals", "notEqual", "startsWith", "endsWith", "lessThan", "lessThanOrEqual", "greaterThan", "greaterThanOrEqual"]
    }
  }
}
