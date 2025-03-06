var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// external-global-plugin:react
var require_react = __commonJS({
  "external-global-plugin:react"(exports, module) {
    module.exports = window.boomi.flow.React;
  }
});

// node_modules/fcmlib/lib/FlowObjectDataProperty.js
var FlowObjectDataProperty = class _FlowObjectDataProperty {
  constructor(property) {
    this.ContentFormat = "";
    this.ContentType = eContentType.unknown;
    this.DeveloperName = "";
    this.TypeElementId = "";
    this.TypeElementPropertyId = "";
    if (property) {
      this.DeveloperName = property.developerName;
      this.ContentType = eContentType[property.contentType];
      this.ContentFormat = property.contentFormat ? property.contentFormat : "";
      this.TypeElementId = property.typeElementId ? property.typeElementId : "";
      this.TypeElementPropertyId = property.typeElementPropertyId;
      switch (this.ContentType) {
        case eContentType.ContentObject:
          this.Value = property.objectData ? new FlowObjectData(property.objectData) : void 0;
          break;
        case eContentType.ContentList:
          this.Value = property.objectData ? new FlowObjectDataArray(property.objectData) : new FlowObjectDataArray([]);
          break;
        case eContentType.ContentNumber:
          this.Value = property.contentValue ? parseFloat("" + property.contentValue) : null;
          break;
        case eContentType.ContentBoolean:
          this.Value = ("" + property.contentValue).trim().toLowerCase() === "true" ? true : false;
          break;
        case eContentType.ContentDateTime:
          this.Value = new Date(property.contentValue);
          break;
        default:
          this.Value = property.contentValue ? "" + property.contentValue : "";
          break;
      }
    }
  }
  static newInstance(developerName, contentType, value) {
    let cv;
    let objd = [];
    switch (contentType) {
      case eContentType.ContentObject:
        const od = value;
        objd.push(od.iObjectData());
        break;
      case eContentType.ContentList:
        const oda = value;
        objd = oda.iFlowObjectDataArray();
        break;
      case eContentType.ContentNumber:
        cv = value;
        break;
      case eContentType.ContentBoolean:
        cv = value;
        break;
      default:
        cv = value;
        break;
    }
    const data = {
      contentFormat: "",
      contentType: eContentType[contentType],
      contentValue: cv,
      developerName,
      objectData: objd,
      typeElementId: "",
      typeElementPropertyId: ""
    };
    return new this(data);
  }
  get contentFormat() {
    return this.ContentFormat;
  }
  set contentFormat(contentFormat) {
    this.contentFormat = contentFormat;
  }
  get contentType() {
    return this.ContentType;
  }
  set contentType(contentType) {
    this.ContentType = contentType;
  }
  get developerName() {
    return this.DeveloperName;
  }
  set developerName(developerName) {
    this.DeveloperName = developerName;
  }
  get typeElementId() {
    return this.TypeElementId;
  }
  set typeElementId(typeElementId) {
    this.TypeElementId = typeElementId;
  }
  get typeElementPropertyId() {
    return this.TypeElementPropertyId;
  }
  set typeElementPropertyId(typeElementPropertyId) {
    this.TypeElementPropertyId = typeElementPropertyId;
  }
  get value() {
    switch (this.contentType) {
      case eContentType.ContentNumber:
        return this.Value;
      case eContentType.ContentBoolean:
        return this.Value;
      case eContentType.ContentDateTime:
        return this.Value;
      default:
        return this.Value;
    }
  }
  set value(value) {
    switch (this.contentType) {
      case eContentType.ContentNumber:
        this.Value = parseFloat(value ? "" + value : "0");
        break;
      case eContentType.ContentBoolean:
        this.Value = new String(value).toLowerCase() === "true" ? true : false;
      case eContentType.ContentDateTime:
        this.Value = new Date(value);
      default:
        this.Value = value;
    }
  }
  clone() {
    let value;
    switch (this.contentType) {
      case eContentType.ContentList:
        value = new FlowObjectDataArray();
        this.value.items.forEach((item) => {
          value.addItem(item.clone(item.developerName));
        });
        break;
      case eContentType.ContentObject:
        value = this.value.clone(this.value.developerName);
        break;
      default:
        value = this.value;
    }
    const clone = _FlowObjectDataProperty.newInstance(this.developerName, this.contentType, value);
    return clone;
  }
  iFlowObjectDataProperty() {
    let contentValue = "";
    let objectData = [];
    switch (this.ContentType) {
      case eContentType.ContentObject:
        const od = this.Value;
        if (od && od.developerName && od.developerName.length > 0) {
          objectData.push(od.iObjectData());
        }
        break;
      case eContentType.ContentList:
        const oda = this.Value;
        objectData = oda.iFlowObjectDataArray();
        break;
      case eContentType.ContentNumber:
        contentValue = "" + parseFloat(this.Value ? this.Value : "0");
        break;
      case eContentType.ContentBoolean:
        contentValue = "" + (new String(this.Value).toLowerCase() === "true");
        break;
      case eContentType.ContentDateTime:
        contentValue = isNaN(this.Value.getTime()) ? "" : this.Value.toISOString();
        break;
      default:
        contentValue = this.Value;
        break;
    }
    const output = {
      contentFormat: this.ContentFormat,
      contentType: eContentType[this.ContentType],
      contentValue,
      developerName: this.DeveloperName,
      objectData,
      typeElementId: this.TypeElementId,
      typeElementPropertyId: this.TypeElementPropertyId
    };
    return output;
  }
  get displayString() {
    let label = "";
    if (this.Value) {
      switch (this.ContentType) {
        case eContentType.ContentString:
        case eContentType.ContentNumber:
          label = this.Value;
          break;
        case eContentType.ContentBoolean:
          if (this.Value === true) {
            label = "True";
          } else {
            label = "False";
          }
          break;
        case eContentType.ContentDateTime:
          const d = Date.parse(this.Value);
          if (!isNaN(d)) {
            const dt = new Date(d);
            if (label.length <= 10) {
              return dt.toLocaleDateString();
            } else {
              return dt.toLocaleString();
            }
          }
          break;
        default:
          label = eContentType[this.ContentType];
          break;
      }
    } else {
      label = "Undefined";
    }
    return label;
  }
};

// node_modules/fcmlib/lib/FlowObjectData.js
var FlowObjectData = class _FlowObjectData {
  constructor(data) {
    this.DeveloperName = "";
    this.ExternalId = "";
    this.InternalId = "";
    this.IsSelected = false;
    this.Order = 0;
    this.TypeElementId = "";
    this.Properties = {};
    if (data && data[0]) {
      const objectData = data[0];
      this.DeveloperName = objectData.developerName;
      this.InternalId = objectData.internalId;
      this.ExternalId = objectData.externalId;
      this.Order = objectData.order;
      this.IsSelected = objectData.isSelected;
      this.TypeElementId = objectData.typeElementId;
      if (objectData.properties && objectData.properties.length > 0) {
        for (const property of objectData.properties) {
          this.Properties[property.developerName] = new FlowObjectDataProperty(property);
        }
      }
    } else {
      console.log("null data");
    }
  }
  get developerName() {
    return this.DeveloperName;
  }
  set developerName(developerName) {
    this.DeveloperName = developerName;
  }
  get externalId() {
    return this.ExternalId;
  }
  set externalId(externalId) {
    this.ExternalId = externalId;
  }
  get internalId() {
    return this.InternalId;
  }
  set internalId(internalId) {
    this.InternalId = internalId;
  }
  get isSelected() {
    return this.IsSelected;
  }
  set isSelected(isSelected) {
    this.IsSelected = isSelected;
  }
  get order() {
    return this.Order;
  }
  set order(order) {
    this.Order = order;
  }
  get typeElementId() {
    return this.TypeElementId;
  }
  set typeElementId(typeElementId) {
    this.TypeElementId = typeElementId;
  }
  get properties() {
    return this.Properties;
  }
  static newInstance(developerName) {
    const data = {
      developerName,
      externalId: "",
      internalId: crypto.randomUUID(),
      isSelected: false,
      order: 0,
      properties: [],
      typeElementId: ""
    };
    return new this([data]);
  }
  addProperty(newProperty) {
    this.Properties[newProperty.developerName] = newProperty;
  }
  removeProperty(key) {
    delete this.Properties[key];
  }
  clone(newTypeName) {
    const clone = _FlowObjectData.newInstance(newTypeName || this.DeveloperName);
    Object.keys(this.properties).forEach((key) => {
      const newProp = this.properties[key].clone();
      clone.properties[key] = newProp;
    });
    return clone;
  }
  iObjectData(selected) {
    const props = [];
    for (const key of Object.keys(this.properties)) {
      props.push(this.properties[key].iFlowObjectDataProperty());
    }
    const objectData = {
      developerName: this.developerName,
      externalId: this.externalId,
      internalId: this.internalId,
      isSelected: selected || this.isSelected,
      order: this.order,
      properties: props,
      typeElementId: this.TypeElementId
    };
    return objectData;
  }
  iFlowObjectDataArray(selected) {
    const output = [];
    output.push(this.iObjectData(selected));
    return output;
  }
};

// node_modules/fcmlib/lib/FlowObjectDataArray.js
var eSortOrder;
(function(eSortOrder2) {
  eSortOrder2[eSortOrder2["ascending"] = 0] = "ascending";
  eSortOrder2[eSortOrder2["descending"] = 1] = "descending";
})(eSortOrder || (eSortOrder = {}));
var FlowObjectDataArray = class _FlowObjectDataArray {
  constructor(array) {
    this.Items = [];
    for (const item of array || []) {
      this.Items.push(new FlowObjectData([item]));
    }
  }
  get items() {
    return this.Items;
  }
  sort(order, fieldName) {
    if (order === eSortOrder.ascending) {
      if (fieldName) {
        return this.Items.sort((a, b) => {
          let valA;
          let valB;
          switch (a.properties[fieldName].contentType) {
            case eContentType.ContentNumber:
              valA = parseFloat(a.properties[fieldName].value);
              valB = parseFloat(b.properties[fieldName].value);
              break;
            case eContentType.ContentDateTime:
              valA = new Date(a.properties[fieldName].value);
              valB = new Date(b.properties[fieldName].value);
              break;
            default:
              valA = a.properties[fieldName].value;
              valB = b.properties[fieldName].value;
              break;
          }
          switch (true) {
            case valA < valB:
              return -1;
            case valA > valB:
              return 1;
            default:
              return 0;
          }
        });
      } else {
        return this.Items.sort((a, b) => a.order - b.order);
      }
    } else {
      if (fieldName) {
        return this.Items.sort((a, b) => {
          if (a && b && a.properties && b.properties && a.properties[fieldName] && b.properties[fieldName] && a.properties[fieldName].value && b.properties[fieldName].value) {
            if (a.properties[fieldName]) {
              switch (true) {
                case a.properties[fieldName].value < b.properties[fieldName].value:
                  return 1;
                case a.properties[fieldName].value > b.properties[fieldName].value:
                  return -1;
                default:
                  return 0;
              }
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        });
      } else {
        return this.Items.sort((a, b) => a.order - b.order);
      }
    }
  }
  static fromJSONString(json, primaryKey, columns, flowTypeName) {
    let objDataArray = new _FlowObjectDataArray();
    let model = JSON.parse(json);
    model.forEach((item) => {
      let objData = FlowObjectData.newInstance(flowTypeName);
      columns.forEach((col) => {
        let val = item[col.developerName];
        if (col.developerName === primaryKey) {
          objData.externalId = val;
        }
        switch (col.contentType) {
          case eContentType.ContentDateTime:
            val = new Date(val);
            if (val && !isNaN(val.getTime())) {
              val = val.toISOString();
            } else {
              val = "";
            }
            break;
          case eContentType.ContentNumber:
            val = parseFloat("" + val);
            if (val && !isNaN(val)) {
              val = "" + val;
            } else {
              val = "";
            }
            break;
          case eContentType.ContentBoolean:
            val = new String(val).toLowerCase() === "true";
            break;
        }
        objData.addProperty(FlowObjectDataProperty.newInstance(col.developerName, col.contentType, val));
        objData.properties[col.developerName].typeElementPropertyId = col.typeElementPropertyId;
      });
      objDataArray.addItem(objData);
    });
    return objDataArray;
  }
  addItem(item) {
    this.Items.push(item);
  }
  clearItems() {
    this.Items = [];
  }
  clone() {
    const clone = new _FlowObjectDataArray();
    this.items.forEach((obj) => {
      clone.addItem(obj.clone());
    });
    return clone;
  }
  iFlowObjectDataArray(selected) {
    const output = [];
    for (const od of this.Items) {
      output.push(od.iObjectData(selected));
    }
    return output;
  }
  getItemWithPropertyName(findProperty, withValue, returnProperty) {
    for (const item of this.Items) {
      if (item.properties[findProperty] && item.properties[findProperty].value != void 0) {
        let value = item.properties[findProperty].value;
        let compareTo = withValue;
        switch (item.properties[findProperty].contentType) {
          case eContentType.ContentString:
            value = value.toLowerCase();
            compareTo = compareTo.toLowerCase();
            break;
          case eContentType.ContentNumber:
            value = value;
            compareTo = parseFloat(compareTo.toLowerCase());
            break;
          case eContentType.ContentBoolean:
            value = value;
            compareTo = new String(compareTo).toLowerCase() === "true";
            break;
          default:
            break;
        }
        if (value === compareTo) {
          return item.properties[returnProperty];
        }
      }
    }
    return null;
  }
  getSelectedItems() {
    const results = new _FlowObjectDataArray();
    for (const item of this.Items) {
      if (item.isSelected === true) {
        results.addItem(item);
      }
    }
    return results;
  }
  getItemWithPropertyValue(findProperty, withValue) {
    for (const item of this.Items) {
      if (item.properties[findProperty] && item.properties[findProperty].value != void 0) {
        let value = item.properties[findProperty].value;
        let compareTo = withValue;
        switch (item.properties[findProperty].contentType) {
          case eContentType.ContentString:
            value = value.toLowerCase();
            compareTo = new String(compareTo).toLowerCase();
            break;
          case eContentType.ContentNumber:
            value = value;
            compareTo = parseFloat(new String(compareTo).toLowerCase());
            break;
          case eContentType.ContentBoolean:
            value = value;
            compareTo = new String(compareTo).toLowerCase() === "true";
            break;
          default:
            break;
        }
        if (value === compareTo) {
          return item;
        }
      }
    }
  }
  getIndexOfItemWithPropertyValue(findProperty, withValue) {
    for (let pos = 0; pos < this.items.length; pos++) {
      const item = this.items[pos];
      if (item.properties[findProperty] && item.properties[findProperty].value != void 0) {
        let value = item.properties[findProperty].value;
        let compareTo = withValue;
        switch (item.properties[findProperty].contentType) {
          case eContentType.ContentString:
            value = value.toLowerCase();
            compareTo = compareTo.toLowerCase();
            break;
          case eContentType.ContentNumber:
            value = value;
            compareTo = parseFloat(new String(compareTo).toLowerCase());
            break;
          case eContentType.ContentBoolean:
            value = value;
            compareTo = new String(compareTo).toLowerCase() === "true";
            break;
          default:
            break;
        }
        if (value === compareTo) {
          return pos;
        }
      }
    }
    return -1;
  }
  removeItemWithPropertyValue(findProperty, withValue) {
    let modifiedCount = 0;
    for (let pos = 0; pos < this.items.length; pos++) {
      const item = this.items[pos];
      if (item.properties[findProperty] && item.properties[findProperty].value != void 0) {
        let value = item.properties[findProperty].value;
        let compareTo = withValue;
        switch (item.properties[findProperty].contentType) {
          case eContentType.ContentString:
            value = value.toLowerCase();
            compareTo = compareTo.toLowerCase();
            break;
          case eContentType.ContentNumber:
            value = value;
            compareTo = parseFloat(new String(compareTo).toLowerCase());
            break;
          case eContentType.ContentBoolean:
            value = value;
            compareTo = new String(compareTo).toLowerCase() === "true";
            break;
          default:
            break;
        }
        if (value === compareTo) {
          this.items.splice(pos, 1);
          modifiedCount++;
        }
      }
    }
    return modifiedCount;
  }
  removeItemAtIndex(index) {
    let modifiedCount = 0;
    if (this.items[index]) {
      this.items.splice(index, 1);
      modifiedCount = index;
    }
    return modifiedCount;
  }
};

// node_modules/fcmlib/lib/FlowAttribute.js
var FlowAttribute = class {
  constructor(name, value) {
    this.Name = name;
    this.Value = value;
  }
  get name() {
    return this.Name;
  }
  get value() {
    return this.Value;
  }
  set value(val) {
    this.Value = val;
  }
};

// node_modules/fcmlib/lib/FlowOutcome.js
var ePageActionBindingType;
(function(ePageActionBindingType2) {
  ePageActionBindingType2["Save"] = "SAVE";
  ePageActionBindingType2["PartialSave"] = "PARTIAL_SAVE";
  ePageActionBindingType2["NoSave"] = "NO_SAVE";
})(ePageActionBindingType || (ePageActionBindingType = {}));
var ePageActionType;
(function(ePageActionType2) {
  ePageActionType2["New"] = "NEW";
  ePageActionType2["Query"] = "QUERY";
  ePageActionType2["Insert"] = "INSERT";
  ePageActionType2["Update"] = "UPDATE";
  ePageActionType2["Upsert"] = "UPSERT";
  ePageActionType2["Delete"] = "DELETE";
  ePageActionType2["Remove"] = "REMOVE";
  ePageActionType2["Add"] = "ADD";
  ePageActionType2["Edit"] = "EDIT";
  ePageActionType2["Next"] = "NEXT";
  ePageActionType2["Back"] = "BACK";
  ePageActionType2["Done"] = "DONE";
  ePageActionType2["Save"] = "SAVE";
  ePageActionType2["Cancel"] = "CANCEL";
  ePageActionType2["Apply"] = "APPLY";
  ePageActionType2["Import"] = "IMPORT";
  ePageActionType2["Close"] = "CLOSE";
  ePageActionType2["Open"] = "OPEN";
  ePageActionType2["Submit"] = "SUBMIT";
  ePageActionType2["Escalate"] = "ESCALATE";
  ePageActionType2["Reject"] = "REJECT";
  ePageActionType2["Delegate"] = "DELEGATE";
})(ePageActionType || (ePageActionType = {}));
var FlowOutcome = class {
  constructor(outcome) {
    this.developerName = outcome.developerName;
    this.id = outcome.id;
    this.isBulkAction = outcome.isBulkAction;
    this.isOut = outcome.isOut;
    this.label = outcome.label;
    this.order = outcome.order;
    this.pageActionBindingType = outcome.pageActionBindingType;
    this.pageActionType = outcome.pageActionType;
    this.pageObjectBindingId = outcome.pageObjectBindingId;
    this.attributes = {};
    if (outcome.attributes) {
      for (const key of Object.keys(outcome.attributes)) {
        this.attributes[key] = new FlowAttribute(key, outcome.attributes[key]);
      }
    }
  }
};

// node_modules/fcmlib/lib/FlowDisplayColumn.js
var FlowDisplayColumn = class {
  constructor(column) {
    this.componentType = column.componentType;
    this.contentFormat = column.contentFormat;
    this.contentType = eContentType[column.contentType];
    this.developerName = column.developerName;
    this.order = column.order;
    this.label = column.label;
    this.isEditable = column.isEditable;
    this.typeElememtPropertyToDisplayId = column.typeElememtPropertyToDisplayId;
    this.typeElementPropertyId = column.typeElementPropertyId;
    this.isDisplayValue = column.isDisplayValue;
  }
};

// node_modules/fcmlib/lib/FCMCore.js
var import_react = __toESM(require_react());

// node_modules/fcmlib/lib/FlowValue.js
var FlowValue = class {
  constructor(field) {
    this.ContentType = eContentType.unknown;
    this.DeveloperName = "";
    this.TypeElementDeveloperName = "";
    this.TypeElementId = "";
    this.TypeElementPropertyDeveloperName = "";
    this.TypeElementPropertyId = "";
    this.ValueElementId = "";
    if (field) {
      this.ContentType = eContentType[field.contentType];
      this.DeveloperName = field.developerName;
      this.TypeElementDeveloperName = field.typeElementDeveloperName;
      this.TypeElementId = field.typeElementId;
      this.TypeElementPropertyDeveloperName = field.typeElementPropertyDeveloperName;
      this.TypeElementPropertyId = field.typeElementPropertyId;
      this.ValueElementId = field.valueElementId;
      switch (this.ContentType) {
        case eContentType.ContentObject:
          this.Value = field.objectData ? new FlowObjectData(field.objectData) : void 0;
          break;
        case eContentType.ContentList:
          this.Value = field.objectData && field.objectData[0] ? new FlowObjectDataArray(field.objectData) : new FlowObjectDataArray([]);
          break;
        default:
          this.Value = field.contentValue;
          break;
      }
    }
  }
  get contentType() {
    return this.ContentType;
  }
  get developerName() {
    return this.DeveloperName;
  }
  get typeElementDeveloperName() {
    return this.TypeElementDeveloperName;
  }
  get typeElementId() {
    return this.TypeElementId;
  }
  get typeElementPropertyDeveloperName() {
    return this.TypeElementPropertyDeveloperName;
  }
  get typeElementPropertyId() {
    return this.TypeElementPropertyId;
  }
  get valueElementId() {
    return this.ValueElementId;
  }
  get value() {
    return this.Value;
  }
  set value(value) {
    this.Value = value;
  }
  iFlowField() {
    let contentValue = "";
    let objectData = [];
    switch (this.ContentType) {
      case eContentType.ContentObject:
        const od = this.Value;
        objectData.push(od.iObjectData());
        break;
      case eContentType.ContentList:
        const oda = this.Value;
        objectData = oda.iFlowObjectDataArray();
        break;
      default:
        contentValue = this.Value ? this.Value : "";
        break;
    }
    const output = {
      contentType: eContentType[this.ContentType],
      contentValue,
      developerName: this.DeveloperName,
      objectData,
      typeElementDeveloperName: this.TypeElementDeveloperName,
      typeElementId: this.TypeElementId,
      typeElementPropertyDeveloperName: this.TypeElementPropertyDeveloperName,
      typeElementPropertyId: this.TypeElementPropertyId,
      valueElementId: this.ValueElementId
    };
    return output;
  }
};

// node_modules/fcmlib/lib/FCMCore.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var FCMCore = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.attributes = {};
    this.fields = {};
    this.outcomes = {};
    this.suppressEvents = false;
    this.triggerOutcome = this.triggerOutcome.bind(this);
    this.getPageComponentDataSource = this.getPageComponentDataSource.bind(this);
    this.loadModel = this.loadModel.bind(this);
    this.getOutcomeById = this.getOutcomeById.bind(this);
    this.triggerOutcome = this.triggerOutcome.bind(this);
    this.getPageComponentDataSource = this.getPageComponentDataSource.bind(this);
    this.loadModel(props);
  }
  /* Generic Fetch From FLOW API 1*/
  callRequest(endpoint, method, data, newEndpoint = false) {
    return __awaiter(this, void 0, void 0, function* () {
      let results;
      const request = {};
      let uri = this.flowBaseUri || window.location.origin;
      if (newEndpoint) {
        uri += "/api/run/2/state/" + this.stateId;
      } else {
        uri += "/api/run/1/state/" + this.stateId;
      }
      if (endpoint && endpoint.length > 0) {
        uri += "/" + endpoint;
      }
      request.method = method;
      request.headers = {
        "Content-Type": "application/json",
        "ManyWhoTenant": this.tenantId
      };
      if (this.authenticationToken) {
        request.headers.Authorization = this.authenticationToken;
      }
      request.credentials = "same-origin";
      if (method === "POST" || method === "PUT") {
        request.body = JSON.stringify(data);
      }
      let response = yield fetch(uri, request);
      if (response.status === 200) {
        results = yield response.json();
      } else {
        const errorText = yield response.text();
        console.log("Fetch Failed - " + errorText);
      }
      return results;
    });
  }
  /* Attribute access */
  getAttribute(attributeName, defaultValue) {
    var _a;
    if ((_a = this.attributes) === null || _a === void 0 ? void 0 : _a[attributeName]) {
      return this.attributes[attributeName];
    } else {
      return defaultValue || "";
    }
  }
  getOutcomeById(outcomeId) {
    let oc;
    Object.keys(this.outcomes).forEach((key) => {
      if (this.outcomes[key].id === outcomeId) {
        oc = this.outcomes[key];
      }
    });
    return oc;
  }
  getStateValue() {
    return this.stateValue;
  }
  getOriginalStateValue() {
    var _a;
    switch (this.contentType) {
      case eContentType.ContentObject:
        return this.objectData.items[0];
      case eContentType.ContentList:
        return this.objectData;
      case eContentType.ContentBoolean:
        return ((_a = this.contentValue) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "true";
      case eContentType.ContentNumber:
        let num = parseFloat(this.contentValue);
        if (!isNaN(num)) {
          return num;
        } else {
          return void 0;
        }
      case eContentType.ContentDateTime:
        let dt = new Date(this.contentValue);
        if (!isNaN(dt.getTime())) {
          return dt;
        } else {
          return void 0;
        }
      default:
        return this.contentValue;
    }
  }
  getValue(valueName) {
    return __awaiter(this, void 0, void 0, function* () {
      let value;
      try {
        value = yield this.callRequest("values/name/" + valueName, "GET", {});
      } catch (e) {
        console.error(e);
      } finally {
        if (value) {
          this.fields[value.developerName] = new FlowValue(value);
        }
        return this.fields[value.developerName];
      }
    });
  }
  setValues(values) {
    return __awaiter(this, void 0, void 0, function* () {
      const updateFields = [];
      if (values.constructor.name === FlowValue.name) {
        updateFields.push(values.iFlowField());
      } else {
        for (const field of values) {
          updateFields.push(field.iFlowField());
        }
      }
      yield this.callRequest("values", "POST", updateFields);
      if (this.hasEvents) {
      }
      return Promise.resolve();
    });
  }
  // this takes a string value and if it is the {{FieldName->property}} notation it will
  // load the base flow value, save it to the Fields list and extapolate the requested property
  inflateValue(input, forceRefresh = false) {
    return __awaiter(this, void 0, void 0, function* () {
      if (input) {
        let value;
        let match;
        const matches = [];
        while (match = RegExp(/{{([^}]*)}}/).exec(input)) {
          const fldElements = match[1].split("->");
          let fld;
          if (!this.fields[fldElements[0]] || forceRefresh === true) {
            fld = yield this.getValue(fldElements[0]);
            this.fields[fldElements[0]] = fld;
          } else {
            fld = this.fields[fldElements[0]];
          }
          if (fld) {
            let od = fld.value;
            if (od) {
              if (fldElements.length > 1) {
                for (let epos = 1; epos < fldElements.length; epos++) {
                  od = od.properties[fldElements[epos]].value;
                }
                value = od;
              } else {
                value = fld.value;
              }
            } else {
              value = fld.value;
            }
            input = input.replace(match[0], value);
          }
        }
      }
      return input;
    });
  }
};

// node_modules/fcmlib/lib/FCMNew.js
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var eContentType;
(function(eContentType2) {
  eContentType2[eContentType2["unknown"] = 0] = "unknown";
  eContentType2[eContentType2["ContentString"] = 1] = "ContentString";
  eContentType2[eContentType2["ContentNumber"] = 2] = "ContentNumber";
  eContentType2[eContentType2["ContentObject"] = 3] = "ContentObject";
  eContentType2[eContentType2["ContentBoolean"] = 4] = "ContentBoolean";
  eContentType2[eContentType2["ContentList"] = 5] = "ContentList";
  eContentType2[eContentType2["ContentPassword"] = 6] = "ContentPassword";
  eContentType2[eContentType2["ContentContent"] = 7] = "ContentContent";
  eContentType2[eContentType2["ContentDateTime"] = 8] = "ContentDateTime";
  eContentType2[eContentType2["ContentEncrypted"] = 9] = "ContentEncrypted";
})(eContentType || (eContentType = {}));
var FCMNew = class extends FCMCore {
  setPageComponentState(componentName, value) {
    throw new Error("Method not implemented.");
  }
  getPageComponentId(componentName) {
    throw new Error("Method not implemented.");
  }
  setPageComponentValue(componentId, value) {
    let element = {
      elementId: componentId,
      elementPartial: {},
      triggersPageCondition: false
    };
    switch (typeof value) {
      case "boolean":
        element.elementPartial.contentValue = value === true ? "true" : "false";
        break;
      case "number":
        element.elementPartial.contentValue = "" + value;
        break;
      case "object":
        element.elementPartial.contentValue = isNaN(value.getTime()) ? "" : value.toISOString();
        break;
      default:
        element.elementPartial.contentValue = "" + value;
        break;
    }
    this.props.updateElement(element);
  }
  getPageComponentDataSource(componentName) {
    throw new Error("Method not implemented.");
  }
  requestObjectData(request) {
    throw new Error("Method not implemented.");
  }
  constructor(props) {
    super(props);
    this.flowBaseUri = window.flowBaseUri || window.location.origin;
  }
  componentDidMount() {
    let reload = true;
    switch (this.contentType) {
      case eContentType.ContentObject:
      case eContentType.ContentList:
        if (this.props.element.objectData === null || this.props.element.objectData.length === 0) {
          reload = false;
        }
        break;
      default:
        if (this.props.element.contentValue === null) {
          reload = false;
        }
        break;
    }
    if (reload) {
      this.loadModel(this.props);
    }
  }
  componentUpdated(changeDetected) {
  }
  loadModel(props) {
    var _a, _b, _c;
    let hasChanged = false;
    this.authenticationToken = props.authenticationToken;
    this.attributes = props.element.attributes;
    this.className = props.element.className;
    this.colSpan = props.element.colSpan;
    this.column = props.element.column;
    this.columns = [];
    (_a = props.element.columns) === null || _a === void 0 ? void 0 : _a.forEach((col) => {
      this.columns.push(new FlowDisplayColumn(col));
    });
    this.columns.sort((a, b) => {
      return a.order - b.order;
    });
    this.componentScriptURL = props.element.componentScriptURL;
    this.componentStyleSheetURL = props.element.componentStyleSheetURL;
    this.content = props.element.content;
    this.contentType = eContentType[props.element.contentType];
    if (this.contentValue !== props.element.contentValue) {
      hasChanged = true;
    }
    this.contentValue = props.element.contentValue;
    this.developerName = props.element.developerName;
    this.fields = {};
    this.fileDataRequest = props.element.fileDataRequest;
    this.hasEvents = props.element.hasEvents;
    this.hasSubmitted = props.hasSubmitted;
    this.height = props.element.height;
    this.helpInfo = props.element.helpInfo;
    this.hintValue = props.element.hintValue;
    if (this.id !== props.element.id) {
      hasChanged = true;
    }
    this.id = props.element.id;
    this.imageUri = props.element.imageUri;
    this.isEditable = props.element.isEditable;
    this.isEnabled = props.element.isEnabled;
    this.isMultiSelect = props.element.isMultiSelect;
    this.isRequired = props.element.isRequired;
    this.isSearchable = props.element.isSearchable;
    this.isSearchableDisplayColumns = props.element.isSearchableDisplayColumns;
    this.isValid = props.element.isValid;
    this.isVisible = props.element.isVisible;
    this.label = props.element.label;
    this.maxSize = props.element.maxSize;
    let newObjData = new FlowObjectDataArray(props.element.objectData);
    if (this.objectData) {
      if (newObjData) {
        if (JSON.stringify(this.objectData) !== JSON.stringify(newObjData)) {
          hasChanged = true;
        }
      } else {
        hasChanged = true;
      }
    } else {
      if (newObjData) {
        hasChanged = true;
      }
    }
    this.objectData = newObjData;
    this.objectDataRequest = props.element.objectDataRequest;
    this.order = props.element.order;
    this.outcomes = {};
    (_b = props.outcomes) === null || _b === void 0 ? void 0 : _b.forEach((outcome) => {
      let oc = new FlowOutcome(outcome);
      if (oc.pageObjectBindingId === this.id) {
        this.outcomes[oc.developerName] = oc;
      }
    });
    (_c = props.element.outcomes) === null || _c === void 0 ? void 0 : _c.forEach((outcome) => {
      let oc = new FlowOutcome(outcome);
      if (oc.pageObjectBindingId === this.id) {
        this.outcomes[oc.developerName] = oc;
      }
    });
    this.pageContainerId = props.element.pageContainerId;
    this.pageSize = props.element.pageSize || 20;
    this.row = props.element.row;
    this.rowSpan = props.element.rowSpan;
    this.selectedItems = props.element.selectedItems;
    this.size = props.element.size;
    this.stateId = props.stateId;
    this.tags = props.element.tags;
    this.tenantId = props.tenantId;
    this.type = props.element.type;
    this.validationMessage = props.element.validationMessage;
    this.validations = props.element.validations;
    this.width = props.element.width;
    return hasChanged;
  }
  redraw() {
    this.componentDidMount();
  }
  triggerOutcome(outcomeName) {
    return __awaiter2(this, void 0, void 0, function* () {
      if (this.outcomes[outcomeName]) {
        let trigger = {
          outcomeId: this.outcomes[outcomeName].id,
          invokeType: "FORWARD"
        };
        this.props.execute(trigger);
      }
    });
  }
  /*
  getStateValue(): string | boolean | number | Date | FlowObjectData | FlowObjectDataArray | undefined {
      // is it a complex type or simple?
      switch(this.contentType) {
          case eContentType.ContentObject:
              return this.objectData.items[0];
          case eContentType.ContentList:
              return this.objectData;
          case eContentType.ContentBoolean:
              return this.contentValue?.toLowerCase()==="true";
          case eContentType.ContentNumber:
              let num: number = parseFloat(this.contentValue);
              if(!isNaN(num)){
                  return num;
              }
              else {
                  return undefined;
              }
          case eContentType.ContentDateTime:
              let dt: Date = new Date(this.contentValue);
              if(!isNaN(dt.getTime())){
                  return dt;
              }
              else {
                  return undefined;
              }
          default:
              return this.contentValue;
      }
  }
  */
  setStateValue(value) {
    this.stateValue = value;
    let element = {
      elementId: this.id,
      elementPartial: {},
      triggersPageCondition: this.hasEvents
    };
    switch (this.contentType) {
      case eContentType.ContentObject:
        element.elementPartial.objectData = value.iFlowObjectDataArray(true);
        element.elementPartial.selectedItems = element.elementPartial.objectData;
        break;
      case eContentType.ContentList:
        element.elementPartial.objectData = value.iFlowObjectDataArray(true);
        element.elementPartial.selectedItems = element.elementPartial.objectData;
        break;
      case eContentType.ContentBoolean:
        element.elementPartial.contentValue = value === true ? "true" : "false";
        break;
      case eContentType.ContentNumber:
        element.elementPartial.contentValue = "" + value;
        break;
      case eContentType.ContentDateTime:
        element.elementPartial.contentValue = isNaN(value.getTime()) ? "" : value.toISOString();
        break;
      default:
        element.elementPartial.contentValue = "" + value;
        break;
    }
    this.props.updateElement(element);
  }
  getUserEmail() {
    let email = "admin@manywho.com";
    if (this.authenticationToken && this.authenticationToken.length > 0) {
      try {
        let tokStr = window.atob(this.authenticationToken.split(".")[1]);
        let json = JSON.parse(tokStr);
        email = json.email;
      } catch (e) {
        console.log("Error parsing token");
      }
    }
    return email;
  }
  sync() {
  }
};

// src/URLChangerNew.tsx
var React3 = __toESM(require_react());

// src/URLChanger.tsx
var import_react2 = __toESM(require_react());
var _URLChanger = class extends import_react2.default.Component {
  constructor(props) {
    super(props);
    this.timerId = -1;
    this.timeout = this.timeout.bind(this);
    this.component = this.props.parent;
    if (this.component.getAttribute("outcomename") && this.component.outcomes[this.component.getAttribute("outcomename")]) {
      this.outcomeName = this.component.getAttribute("outcomename");
      this.delay = parseInt(this.component.getAttribute("delay", "0"));
      if (this.delay <= 1) {
        this.component.triggerOutcome(this.component.getAttribute("outcomeName"));
      } else {
        this.timerId = window.setTimeout(this.timeout.bind(this), this.delay);
      }
    } else {
      window.location.href = this.props.parent.contentValue;
    }
  }
  async timeout() {
    this.component.triggerOutcome(this.outcomeName);
  }
  render() {
    return /* @__PURE__ */ import_react2.default.createElement("div", null);
  }
};

// src/URLChangerNew.tsx
var URLChanger = class extends FCMNew {
  //FCMCore will trigger this if we should update
  componentDidMount() {
    if (this.childComponent && this.childComponent.componentDidMount) {
      this.childComponent.componentDidMount();
    }
  }
  render() {
    return /* @__PURE__ */ React3.createElement(
      _URLChanger,
      {
        parent: this,
        ref: (element) => {
          this.childComponent = element;
        }
      }
    );
  }
};
export {
  URLChanger as default
};
