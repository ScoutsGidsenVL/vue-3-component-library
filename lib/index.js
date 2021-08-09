'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script$6 = vue.defineComponent({
    name: 'HelloWorld'
});

const _hoisted_1$5 = { class: "hello" };
const _hoisted_2$4 = /*#__PURE__*/vue.createVNode("h1", null, "test123", -1 /* HOISTED */);

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$5, [
    _hoisted_2$4
  ]))
}

script$6.render = render$6;
script$6.__file = "src/components/helloWorld/HelloWorld.vue";

/**
  * vee-validate v4.4.9
  * (c) 2021 Abdelrahman Awad
  * @license MIT
  */

function isCallable(fn) {
    return typeof fn === 'function';
}
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
const isObject = (obj) => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj);
function isIndex(value) {
    return Number(value) >= 0;
}
function toNumber(value) {
    const n = parseFloat(value);
    return isNaN(n) ? value : n;
}

const RULES = {};
/**
 * Gets an already defined rule
 */
function resolveRule(id) {
    return RULES[id];
}

const FormContextKey = Symbol('vee-validate-form');
const FormErrorsKey = Symbol('vee-validate-form-errors');
const FormInitialValuesKey = Symbol('vee-validate-form-initial-values');
const FieldContextKey = Symbol('vee-validate-field-instance');
const IS_ABSENT = Symbol('Default empty value');

function isLocator(value) {
    return isCallable(value) && !!value.__locatorRef;
}
/**
 * Checks if an tag name is a native HTML tag and not a Vue component
 */
function isHTMLTag(tag) {
    return ['input', 'textarea', 'select'].includes(tag);
}
/**
 * Checks if an input is of type file
 */
function isFileInputNode(tag, attrs) {
    return isHTMLTag(tag) && attrs.type === 'file';
}
function isYupValidator(value) {
    return !!value && isCallable(value.validate);
}
function hasCheckedAttr(type) {
    return type === 'checkbox' || type === 'radio';
}
function isContainerValue(value) {
    return isObject(value) || Array.isArray(value);
}
/**
 * True if the value is an empty object or array
 */
function isEmptyContainer(value) {
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    return isObject(value) && Object.keys(value).length === 0;
}
/**
 * Checks if the path opted out of nested fields using `[fieldName]` syntax
 */
function isNotNestedPath(path) {
    return /^\[.+\]$/i.test(path);
}
/**
 * Checks if an element is a native HTML5 multi-select input element
 */
function isNativeMultiSelect(el) {
    return el.tagName === 'SELECT' && el.multiple;
}
/**
 * Checks if a tag name with attrs object will render a native multi-select element
 */
function isNativeMultiSelectNode(tag, attrs) {
    // The falsy value array is the values that Vue won't add the `multiple` prop if it has one of these values
    const hasTruthyBindingValue = ![false, null, undefined, 0].includes(attrs.multiple) && !Number.isNaN(attrs.multiple);
    return tag === 'select' && 'multiple' in attrs && hasTruthyBindingValue;
}
/**
 * Checks if a node should have a `:value` binding or not
 *
 * These nodes should not have a value binding
 * For files, because they are not reactive
 * For multi-selects because the value binding will reset the value
 */
function shouldHaveValueBinding(tag, attrs) {
    return isNativeMultiSelectNode(tag, attrs) || isFileInputNode(tag, attrs);
}
function isFormSubmitEvent(evt) {
    return isEvent(evt) && evt.target && 'submit' in evt.target;
}
function isEvent(evt) {
    if (!evt) {
        return false;
    }
    if (typeof Event !== 'undefined' && isCallable(Event) && evt instanceof Event) {
        return true;
    }
    // this is for IE and Cypress #3161
    /* istanbul ignore next */
    if (evt && evt.srcElement) {
        return true;
    }
    return false;
}
function isPropPresent(obj, prop) {
    return prop in obj && obj[prop] !== IS_ABSENT;
}

function cleanupNonNestedPath(path) {
    if (isNotNestedPath(path)) {
        return path.replace(/\[|\]/gi, '');
    }
    return path;
}
/**
 * Gets a nested property value from an object
 */
function getFromPath(object, path, fallback = undefined) {
    if (!object) {
        return fallback;
    }
    if (isNotNestedPath(path)) {
        return object[cleanupNonNestedPath(path)];
    }
    const resolvedValue = path
        .split(/\.|\[(\d+)\]/)
        .filter(Boolean)
        .reduce((acc, propKey) => {
        if (isContainerValue(acc) && propKey in acc) {
            return acc[propKey];
        }
        return fallback;
    }, object);
    return resolvedValue;
}
/**
 * Sets a nested property value in a path, creates the path properties if it doesn't exist
 */
function setInPath(object, path, value) {
    if (isNotNestedPath(path)) {
        object[cleanupNonNestedPath(path)] = value;
        return;
    }
    const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
    let acc = object;
    for (let i = 0; i < keys.length; i++) {
        // Last key, set it
        if (i === keys.length - 1) {
            acc[keys[i]] = value;
            return;
        }
        // Key does not exist, create a container for it
        if (!(keys[i] in acc) || isNullOrUndefined(acc[keys[i]])) {
            // container can be either an object or an array depending on the next key if it exists
            acc[keys[i]] = isIndex(keys[i + 1]) ? [] : {};
        }
        acc = acc[keys[i]];
    }
}
function unset(object, key) {
    if (Array.isArray(object) && isIndex(key)) {
        object.splice(Number(key), 1);
        return;
    }
    if (isObject(object)) {
        delete object[key];
    }
}
/**
 * Removes a nested property from object
 */
function unsetPath(object, path) {
    if (isNotNestedPath(path)) {
        delete object[cleanupNonNestedPath(path)];
        return;
    }
    const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
    let acc = object;
    for (let i = 0; i < keys.length; i++) {
        // Last key, unset it
        if (i === keys.length - 1) {
            unset(acc, keys[i]);
            break;
        }
        // Key does not exist, exit
        if (!(keys[i] in acc) || isNullOrUndefined(acc[keys[i]])) {
            break;
        }
        acc = acc[keys[i]];
    }
    const pathValues = keys.map((_, idx) => {
        return getFromPath(object, keys.slice(0, idx).join('.'));
    });
    for (let i = pathValues.length - 1; i >= 0; i--) {
        if (!isEmptyContainer(pathValues[i])) {
            continue;
        }
        if (i === 0) {
            unset(object, keys[0]);
            continue;
        }
        unset(pathValues[i - 1], keys[i - 1]);
    }
}
/**
 * A typed version of Object.keys
 */
function keysOf(record) {
    return Object.keys(record);
}
// Uses same component provide as its own injections
// Due to changes in https://github.com/vuejs/vue-next/pull/2424
function injectWithSelf(symbol, def = undefined) {
    const vm = vue.getCurrentInstance();
    return (vm === null || vm === void 0 ? void 0 : vm.provides[symbol]) || vue.inject(symbol, def);
}
/**
 * Ensures we deal with a singular field value
 */
function normalizeField(field) {
    if (Array.isArray(field)) {
        return field[0];
    }
    return field;
}
/**
 * Applies a mutation function on a field or field group
 */
function applyFieldMutation(field, mutation, onlyFirst = false) {
    if (!Array.isArray(field)) {
        mutation(field);
        return;
    }
    if (onlyFirst) {
        mutation(field[0]);
        return;
    }
    field.forEach(mutation);
}
function resolveNextCheckboxValue(currentValue, checkedValue, uncheckedValue) {
    if (Array.isArray(currentValue)) {
        const newVal = [...currentValue];
        const idx = newVal.indexOf(checkedValue);
        idx >= 0 ? newVal.splice(idx, 1) : newVal.push(checkedValue);
        return newVal;
    }
    return currentValue === checkedValue ? uncheckedValue : checkedValue;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeChildren = (tag, context, slotProps) => {
    if (!context.slots.default) {
        return context.slots.default;
    }
    if (typeof tag === 'string' || !tag) {
        return context.slots.default(slotProps());
    }
    return {
        default: () => { var _a, _b; return (_b = (_a = context.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a, slotProps()); },
    };
};
/**
 * Vue adds a `_value` prop at the moment on the input elements to store the REAL value on them, real values are different than the `value` attribute
 * as they do not get casted to strings unlike `el.value` which preserves user-code behavior
 */
function getBoundValue(el) {
    if (hasValueBinding(el)) {
        return el._value;
    }
    return undefined;
}
/**
 * Vue adds a `_value` prop at the moment on the input elements to store the REAL value on them, real values are different than the `value` attribute
 * as they do not get casted to strings unlike `el.value` which preserves user-code behavior
 */
function hasValueBinding(el) {
    return '_value' in el;
}

function normalizeEventValue(value) {
    if (!isEvent(value)) {
        return value;
    }
    const input = value.target;
    // Vue sets the current bound value on `_value` prop
    // for checkboxes it it should fetch the value binding type as is (boolean instead of string)
    if (hasCheckedAttr(input.type) && hasValueBinding(input)) {
        return getBoundValue(input);
    }
    if (input.type === 'file' && input.files) {
        return Array.from(input.files);
    }
    if (isNativeMultiSelect(input)) {
        return Array.from(input.options)
            .filter(opt => opt.selected && !opt.disabled)
            .map(getBoundValue);
    }
    return input.value;
}

/**
 * Normalizes the given rules expression.
 */
function normalizeRules(rules) {
    const acc = {};
    Object.defineProperty(acc, '_$$isNormalized', {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false,
    });
    if (!rules) {
        return acc;
    }
    // Object is already normalized, skip.
    if (isObject(rules) && rules._$$isNormalized) {
        return rules;
    }
    if (isObject(rules)) {
        return Object.keys(rules).reduce((prev, curr) => {
            const params = normalizeParams(rules[curr]);
            if (rules[curr] !== false) {
                prev[curr] = buildParams(params);
            }
            return prev;
        }, acc);
    }
    /* istanbul ignore if */
    if (typeof rules !== 'string') {
        return acc;
    }
    return rules.split('|').reduce((prev, rule) => {
        const parsedRule = parseRule(rule);
        if (!parsedRule.name) {
            return prev;
        }
        prev[parsedRule.name] = buildParams(parsedRule.params);
        return prev;
    }, acc);
}
/**
 * Normalizes a rule param.
 */
function normalizeParams(params) {
    if (params === true) {
        return [];
    }
    if (Array.isArray(params)) {
        return params;
    }
    if (isObject(params)) {
        return params;
    }
    return [params];
}
function buildParams(provided) {
    const mapValueToLocator = (value) => {
        // A target param using interpolation
        if (typeof value === 'string' && value[0] === '@') {
            return createLocator(value.slice(1));
        }
        return value;
    };
    if (Array.isArray(provided)) {
        return provided.map(mapValueToLocator);
    }
    // #3073
    if (provided instanceof RegExp) {
        return [provided];
    }
    return Object.keys(provided).reduce((prev, key) => {
        prev[key] = mapValueToLocator(provided[key]);
        return prev;
    }, {});
}
/**
 * Parses a rule string expression.
 */
const parseRule = (rule) => {
    let params = [];
    const name = rule.split(':')[0];
    if (rule.includes(':')) {
        params = rule.split(':').slice(1).join(':').split(',');
    }
    return { name, params };
};
function createLocator(value) {
    const locator = (crossTable) => {
        const val = getFromPath(crossTable, value) || crossTable[value];
        return val;
    };
    locator.__locatorRef = value;
    return locator;
}
function extractLocators(params) {
    if (Array.isArray(params)) {
        return params.filter(isLocator);
    }
    return keysOf(params)
        .filter(key => isLocator(params[key]))
        .map(key => params[key]);
}

const DEFAULT_CONFIG = {
    generateMessage: ({ field }) => `${field} is not valid.`,
    bails: true,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
};
let currentConfig = Object.assign({}, DEFAULT_CONFIG);
const getConfig = () => currentConfig;

/**
 * Validates a value against the rules.
 */
async function validate(value, rules, options = {}) {
    const shouldBail = options === null || options === void 0 ? void 0 : options.bails;
    const field = {
        name: (options === null || options === void 0 ? void 0 : options.name) || '{field}',
        rules,
        bails: shouldBail !== null && shouldBail !== void 0 ? shouldBail : true,
        formData: (options === null || options === void 0 ? void 0 : options.values) || {},
    };
    const result = await _validate(field, value);
    const errors = result.errors;
    return {
        errors,
        valid: !errors.length,
    };
}
/**
 * Starts the validation process.
 */
async function _validate(field, value) {
    if (isYupValidator(field.rules)) {
        return validateFieldWithYup(value, field.rules, { bails: field.bails });
    }
    // if a generic function, use it as the pipeline.
    if (isCallable(field.rules)) {
        const ctx = {
            field: field.name,
            form: field.formData,
            value: value,
        };
        const result = await field.rules(value, ctx);
        const isValid = typeof result !== 'string' && result;
        const message = typeof result === 'string' ? result : _generateFieldError(ctx);
        return {
            errors: !isValid ? [message] : [],
        };
    }
    const normalizedContext = Object.assign(Object.assign({}, field), { rules: normalizeRules(field.rules) });
    const errors = [];
    const rulesKeys = Object.keys(normalizedContext.rules);
    const length = rulesKeys.length;
    for (let i = 0; i < length; i++) {
        const rule = rulesKeys[i];
        const result = await _test(normalizedContext, value, {
            name: rule,
            params: normalizedContext.rules[rule],
        });
        if (result.error) {
            errors.push(result.error);
            if (field.bails) {
                return {
                    errors,
                };
            }
        }
    }
    return {
        errors,
    };
}
/**
 * Handles yup validation
 */
async function validateFieldWithYup(value, validator, opts) {
    var _a;
    const errors = await validator
        .validate(value, {
        abortEarly: (_a = opts.bails) !== null && _a !== void 0 ? _a : true,
    })
        .then(() => [])
        .catch((err) => {
        // Yup errors have a name prop one them.
        // https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
        if (err.name === 'ValidationError') {
            return err.errors;
        }
        // re-throw the error so we don't hide it
        throw err;
    });
    return {
        errors,
    };
}
/**
 * Tests a single input value against a rule.
 */
async function _test(field, value, rule) {
    const validator = resolveRule(rule.name);
    if (!validator) {
        throw new Error(`No such validator '${rule.name}' exists.`);
    }
    const params = fillTargetValues(rule.params, field.formData);
    const ctx = {
        field: field.name,
        value,
        form: field.formData,
        rule: Object.assign(Object.assign({}, rule), { params }),
    };
    const result = await validator(value, params, ctx);
    if (typeof result === 'string') {
        return {
            error: result,
        };
    }
    return {
        error: result ? undefined : _generateFieldError(ctx),
    };
}
/**
 * Generates error messages.
 */
function _generateFieldError(fieldCtx) {
    const message = getConfig().generateMessage;
    if (!message) {
        return 'Field is invalid';
    }
    return message(fieldCtx);
}
function fillTargetValues(params, crossTable) {
    const normalize = (value) => {
        if (isLocator(value)) {
            return value(crossTable);
        }
        return value;
    };
    if (Array.isArray(params)) {
        return params.map(normalize);
    }
    return Object.keys(params).reduce((acc, param) => {
        acc[param] = normalize(params[param]);
        return acc;
    }, {});
}
async function validateYupSchema(schema, values) {
    const errorObjects = await schema
        .validate(values, { abortEarly: false })
        .then(() => [])
        .catch((err) => {
        // Yup errors have a name prop one them.
        // https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
        if (err.name !== 'ValidationError') {
            throw err;
        }
        // list of aggregated errors
        return err.inner || [];
    });
    const results = {};
    const errors = {};
    for (const error of errorObjects) {
        const messages = error.errors;
        results[error.path] = { valid: !messages.length, errors: messages };
        if (messages.length) {
            errors[error.path] = messages[0];
        }
    }
    return {
        valid: !errorObjects.length,
        results,
        errors,
    };
}
async function validateObjectSchema(schema, values, opts) {
    const paths = keysOf(schema);
    const validations = paths.map(async (path) => {
        var _a, _b, _c;
        const fieldResult = await validate(getFromPath(values, path), schema[path], {
            name: ((_a = opts === null || opts === void 0 ? void 0 : opts.names) === null || _a === void 0 ? void 0 : _a[path]) || path,
            values: values,
            bails: (_c = (_b = opts === null || opts === void 0 ? void 0 : opts.bailsMap) === null || _b === void 0 ? void 0 : _b[path]) !== null && _c !== void 0 ? _c : true,
        });
        return Object.assign(Object.assign({}, fieldResult), { path });
    });
    let isAllValid = true;
    const validationResults = await Promise.all(validations);
    const results = {};
    const errors = {};
    for (const result of validationResults) {
        results[result.path] = {
            valid: result.valid,
            errors: result.errors,
        };
        if (!result.valid) {
            isAllValid = false;
            errors[result.path] = result.errors[0];
        }
    }
    return {
        valid: isAllValid,
        results,
        errors,
    };
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (tmp.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	return x;
}

var es6 = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

let ID_COUNTER = 0;
/**
 * Creates a field composite.
 */
function useField(name, rules, opts) {
    const fid = ID_COUNTER >= Number.MAX_SAFE_INTEGER ? 0 : ++ID_COUNTER;
    const { initialValue, validateOnMount, bails, type, checkedValue, label, validateOnValueUpdate, uncheckedValue, standalone, } = normalizeOptions(vue.unref(name), opts);
    const form = !standalone ? injectWithSelf(FormContextKey) : undefined;
    const { meta, errors, errorMessage, handleBlur, handleInput, resetValidationState, setValidationState, setErrors, value, checked, } = useValidationState({
        name,
        initValue: initialValue,
        form,
        type,
        checkedValue,
        standalone,
    });
    const normalizedRules = vue.computed(() => {
        let rulesValue = vue.unref(rules);
        const schema = vue.unref(form === null || form === void 0 ? void 0 : form.schema);
        if (schema && !isYupValidator(schema)) {
            rulesValue = extractRuleFromSchema(schema, vue.unref(name)) || rulesValue;
        }
        if (isYupValidator(rulesValue) || isCallable(rulesValue)) {
            return rulesValue;
        }
        return normalizeRules(rulesValue);
    });
    async function validateCurrentValue(mode) {
        var _a, _b;
        if (form === null || form === void 0 ? void 0 : form.validateSchema) {
            return (_a = (await form.validateSchema(mode)).results[vue.unref(name)]) !== null && _a !== void 0 ? _a : { valid: true, errors: [] };
        }
        return validate(value.value, normalizedRules.value, {
            name: vue.unref(label) || vue.unref(name),
            values: (_b = form === null || form === void 0 ? void 0 : form.values) !== null && _b !== void 0 ? _b : {},
            bails,
        });
    }
    async function validateWithStateMutation() {
        meta.pending = true;
        meta.validated = true;
        const result = await validateCurrentValue('validated-only');
        meta.pending = false;
        return setValidationState(result);
    }
    async function validateValidStateOnly() {
        const result = await validateCurrentValue('silent');
        meta.valid = result.valid;
    }
    // Common input/change event handler
    const handleChange = (e, shouldValidate = true) => {
        var _a, _b;
        if (checked && checked.value === ((_b = (_a = e) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.checked)) {
            return;
        }
        let newValue = normalizeEventValue(e);
        // Single checkbox field without a form to toggle it's value
        if (checked && type === 'checkbox' && !form) {
            newValue = resolveNextCheckboxValue(value.value, vue.unref(checkedValue), vue.unref(uncheckedValue));
        }
        value.value = newValue;
        if (!validateOnValueUpdate && shouldValidate) {
            return validateWithStateMutation();
        }
    };
    // Runs the initial validation
    vue.onMounted(() => {
        if (validateOnMount) {
            return validateWithStateMutation();
        }
        // validate self initially if no form was handling this
        // forms should have their own initial silent validation run to make things more efficient
        if (!form || !form.validateSchema) {
            validateValidStateOnly();
        }
    });
    function setTouched(isTouched) {
        meta.touched = isTouched;
    }
    let unwatchValue;
    function watchValue() {
        unwatchValue = vue.watch(value, validateOnValueUpdate ? validateWithStateMutation : validateValidStateOnly, {
            deep: true,
        });
    }
    watchValue();
    function resetField(state) {
        unwatchValue === null || unwatchValue === void 0 ? void 0 : unwatchValue();
        resetValidationState(state);
        // need to watch at next tick to avoid triggering the value watcher
        vue.nextTick(() => {
            watchValue();
        });
    }
    const field = {
        idx: -1,
        fid,
        name,
        label,
        value,
        meta,
        errors,
        errorMessage,
        type,
        checkedValue,
        uncheckedValue,
        checked,
        bails,
        resetField,
        handleReset: () => resetField(),
        validate: validateWithStateMutation,
        handleChange,
        handleBlur,
        handleInput,
        setValidationState,
        setTouched,
        setErrors,
    };
    vue.provide(FieldContextKey, field);
    if (vue.isRef(rules) && typeof vue.unref(rules) !== 'function') {
        vue.watch(rules, (value, oldValue) => {
            if (es6(value, oldValue)) {
                return;
            }
            return validateWithStateMutation();
        }, {
            deep: true,
        });
    }
    // if no associated form return the field API immediately
    if (!form) {
        return field;
    }
    // associate the field with the given form
    form.register(field);
    vue.onBeforeUnmount(() => {
        form.unregister(field);
    });
    // extract cross-field dependencies in a computed prop
    const dependencies = vue.computed(() => {
        const rulesVal = normalizedRules.value;
        // is falsy, a function schema or a yup schema
        if (!rulesVal || isCallable(rulesVal) || isYupValidator(rulesVal)) {
            return {};
        }
        return Object.keys(rulesVal).reduce((acc, rule) => {
            const deps = extractLocators(rulesVal[rule])
                .map((dep) => dep.__locatorRef)
                .reduce((depAcc, depName) => {
                const depValue = getFromPath(form.values, depName) || form.values[depName];
                if (depValue !== undefined) {
                    depAcc[depName] = depValue;
                }
                return depAcc;
            }, {});
            Object.assign(acc, deps);
            return acc;
        }, {});
    });
    // Adds a watcher that runs the validation whenever field dependencies change
    vue.watch(dependencies, (deps, oldDeps) => {
        // Skip if no dependencies or if the field wasn't manipulated
        if (!Object.keys(deps).length) {
            return;
        }
        const shouldValidate = !es6(deps, oldDeps);
        if (shouldValidate) {
            meta.dirty ? validateWithStateMutation() : validateValidStateOnly();
        }
    });
    return field;
}
/**
 * Normalizes partial field options to include the full options
 */
function normalizeOptions(name, opts) {
    const defaults = () => ({
        initialValue: undefined,
        validateOnMount: false,
        bails: true,
        rules: '',
        label: name,
        validateOnValueUpdate: true,
        standalone: false,
    });
    if (!opts) {
        return defaults();
    }
    // TODO: Deprecate this in next major release
    const checkedValue = 'valueProp' in opts ? opts.valueProp : opts.checkedValue;
    return Object.assign(Object.assign(Object.assign({}, defaults()), (opts || {})), { checkedValue });
}
/**
 * Manages the validation state of a field.
 */
function useValidationState({ name, initValue, form, type, checkedValue, standalone, }) {
    const { errors, errorMessage, setErrors } = useFieldErrors(name, form);
    const formInitialValues = standalone ? undefined : injectWithSelf(FormInitialValuesKey, undefined);
    // clones the ref value to a mutable version
    const initialValueRef = vue.ref(vue.unref(initValue));
    const initialValue = vue.computed(() => {
        return getFromPath(vue.unref(formInitialValues), vue.unref(name), vue.unref(initialValueRef));
    });
    const value = useFieldValue$1(initialValue, name, form);
    const meta = useFieldMeta(initialValue, value, errors);
    const checked = hasCheckedAttr(type)
        ? vue.computed(() => {
            if (Array.isArray(value.value)) {
                return value.value.includes(vue.unref(checkedValue));
            }
            return vue.unref(checkedValue) === value.value;
        })
        : undefined;
    /**
     * Handles common onBlur meta update
     */
    const handleBlur = () => {
        meta.touched = true;
    };
    /**
     * Handles common on blur events
     * @deprecated You should use `handleChange` instead
     */
    const handleInput = (e) => {
        // Checkboxes/Radio will emit a `change` event anyway, custom components will use `update:modelValue`
        // so this is redundant
        if (!hasCheckedAttr(type)) {
            value.value = normalizeEventValue(e);
        }
    };
    // Updates the validation state with the validation result
    function setValidationState(result) {
        setErrors(result.errors);
        return result;
    }
    // Resets the validation state
    function resetValidationState(state) {
        var _a;
        const fieldPath = vue.unref(name);
        const newValue = state && 'value' in state
            ? state.value
            : getFromPath(vue.unref(formInitialValues), fieldPath, vue.unref(initValue));
        if (form) {
            form.setFieldValue(fieldPath, newValue, { force: true });
            form.setFieldInitialValue(fieldPath, newValue);
        }
        else {
            value.value = klona(newValue);
            initialValueRef.value = klona(newValue);
        }
        setErrors((state === null || state === void 0 ? void 0 : state.errors) || []);
        meta.touched = (_a = state === null || state === void 0 ? void 0 : state.touched) !== null && _a !== void 0 ? _a : false;
        meta.pending = false;
        meta.validated = false;
    }
    return {
        meta,
        errors,
        errorMessage,
        setErrors,
        setValidationState,
        resetValidationState,
        handleBlur,
        handleInput,
        value,
        checked,
    };
}
/**
 * Exposes meta flags state and some associated actions with them.
 */
function useFieldMeta(initialValue, currentValue, errors) {
    const meta = vue.reactive({
        touched: false,
        pending: false,
        valid: true,
        validated: !!vue.unref(errors).length,
        initialValue: vue.computed(() => vue.unref(initialValue)),
        dirty: vue.computed(() => {
            return !es6(vue.unref(currentValue), vue.unref(initialValue));
        }),
    });
    vue.watch(errors, value => {
        meta.valid = !value.length;
    }, {
        immediate: true,
        flush: 'sync',
    });
    return meta;
}
/**
 * Extracts the validation rules from a schema
 */
function extractRuleFromSchema(schema, fieldName) {
    // no schema at all
    if (!schema) {
        return undefined;
    }
    // there is a key on the schema object for this field
    return schema[fieldName];
}
/**
 * Manages the field value
 */
function useFieldValue$1(initialValue, path, form) {
    // if no form is associated, use a regular ref.
    if (!form) {
        return vue.ref(vue.unref(initialValue));
    }
    // to set the initial value, first check if there is a current value, if there is then use it.
    // otherwise use the configured initial value if it exists.
    // #3429
    const currentValue = getFromPath(form.values, vue.unref(path), vue.unref(initialValue));
    form.stageInitialValue(vue.unref(path), currentValue === undefined ? vue.unref(initialValue) : currentValue);
    // otherwise use a computed setter that triggers the `setFieldValue`
    const value = vue.computed({
        get() {
            return getFromPath(form.values, vue.unref(path));
        },
        set(newVal) {
            form.setFieldValue(vue.unref(path), newVal);
        },
    });
    return value;
}
function useFieldErrors(path, form) {
    if (!form) {
        const errors = vue.ref([]);
        return {
            errors: vue.computed(() => errors.value),
            errorMessage: vue.computed(() => errors.value[0]),
            setErrors: (messages) => {
                errors.value = Array.isArray(messages) ? messages : [messages];
            },
        };
    }
    const errors = vue.computed(() => form.errorBag.value[vue.unref(path)] || []);
    return {
        errors,
        errorMessage: vue.computed(() => errors.value[0]),
        setErrors: (messages) => {
            form.setFieldErrorBag(vue.unref(path), messages);
        },
    };
}

vue.defineComponent({
    name: 'Field',
    inheritAttrs: false,
    props: {
        as: {
            type: [String, Object],
            default: undefined,
        },
        name: {
            type: String,
            required: true,
        },
        rules: {
            type: [Object, String, Function],
            default: undefined,
        },
        validateOnMount: {
            type: Boolean,
            default: false,
        },
        validateOnBlur: {
            type: Boolean,
            default: undefined,
        },
        validateOnChange: {
            type: Boolean,
            default: undefined,
        },
        validateOnInput: {
            type: Boolean,
            default: undefined,
        },
        validateOnModelUpdate: {
            type: Boolean,
            default: undefined,
        },
        bails: {
            type: Boolean,
            default: () => getConfig().bails,
        },
        label: {
            type: String,
            default: undefined,
        },
        uncheckedValue: {
            type: null,
            default: undefined,
        },
        modelValue: {
            type: null,
            default: IS_ABSENT,
        },
        modelModifiers: {
            type: null,
            default: () => ({}),
        },
        'onUpdate:modelValue': {
            type: null,
            default: undefined,
        },
        standalone: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx) {
        const rules = vue.toRef(props, 'rules');
        const name = vue.toRef(props, 'name');
        const label = vue.toRef(props, 'label');
        const uncheckedValue = vue.toRef(props, 'uncheckedValue');
        const hasModelEvents = isPropPresent(props, 'onUpdate:modelValue');
        const { errors, value, errorMessage, validate: validateField, handleChange, handleBlur, handleInput, setTouched, resetField, handleReset, meta, checked, setErrors, } = useField(name, rules, {
            validateOnMount: props.validateOnMount,
            bails: props.bails,
            standalone: props.standalone,
            type: ctx.attrs.type,
            initialValue: resolveInitialValue(props, ctx),
            // Only for checkboxes and radio buttons
            checkedValue: ctx.attrs.value,
            uncheckedValue,
            label,
            validateOnValueUpdate: false,
        });
        // If there is a v-model applied on the component we need to emit the `update:modelValue` whenever the value binding changes
        const onChangeHandler = hasModelEvents
            ? function handleChangeWithModel(e, shouldValidate = true) {
                handleChange(e, shouldValidate);
                ctx.emit('update:modelValue', value.value);
            }
            : handleChange;
        const onInputHandler = hasModelEvents
            ? function handleChangeWithModel(e) {
                handleInput(e);
                ctx.emit('update:modelValue', value.value);
            }
            : handleInput;
        const fieldProps = vue.computed(() => {
            const { validateOnInput, validateOnChange, validateOnBlur, validateOnModelUpdate } = resolveValidationTriggers(props);
            const baseOnBlur = [handleBlur, ctx.attrs.onBlur, validateOnBlur ? validateField : undefined].filter(Boolean);
            const baseOnInput = [(e) => onChangeHandler(e, validateOnInput), ctx.attrs.onInput].filter(Boolean);
            const baseOnChange = [(e) => onChangeHandler(e, validateOnChange), ctx.attrs.onChange].filter(Boolean);
            const attrs = {
                name: props.name,
                onBlur: baseOnBlur,
                onInput: baseOnInput,
                onChange: baseOnChange,
            };
            if (validateOnModelUpdate) {
                attrs['onUpdate:modelValue'] = [onChangeHandler];
            }
            if (hasCheckedAttr(ctx.attrs.type) && checked) {
                attrs.checked = checked.value;
            }
            else {
                attrs.value = value.value;
            }
            const tag = resolveTag(props, ctx);
            if (shouldHaveValueBinding(tag, ctx.attrs)) {
                delete attrs.value;
            }
            return attrs;
        });
        const modelValue = vue.toRef(props, 'modelValue');
        vue.watch(modelValue, newModelValue => {
            // Don't attempt to sync absent values
            if (newModelValue === IS_ABSENT && value.value === undefined) {
                return;
            }
            if (newModelValue !== applyModifiers(value.value, props.modelModifiers)) {
                value.value = newModelValue;
                validateField();
            }
        });
        function slotProps() {
            return {
                field: fieldProps.value,
                value: value.value,
                meta,
                errors: errors.value,
                errorMessage: errorMessage.value,
                validate: validateField,
                resetField,
                handleChange: onChangeHandler,
                handleInput: onInputHandler,
                handleReset,
                handleBlur,
                setTouched,
                setErrors,
            };
        }
        return () => {
            const tag = vue.resolveDynamicComponent(resolveTag(props, ctx));
            const children = normalizeChildren(tag, ctx, slotProps);
            if (tag) {
                return vue.h(tag, Object.assign(Object.assign({}, ctx.attrs), fieldProps.value), children);
            }
            return children;
        };
    },
});
function resolveTag(props, ctx) {
    let tag = props.as || '';
    if (!props.as && !ctx.slots.default) {
        tag = 'input';
    }
    return tag;
}
function resolveValidationTriggers(props) {
    var _a, _b, _c, _d;
    const { validateOnInput, validateOnChange, validateOnBlur, validateOnModelUpdate } = getConfig();
    return {
        validateOnInput: (_a = props.validateOnInput) !== null && _a !== void 0 ? _a : validateOnInput,
        validateOnChange: (_b = props.validateOnChange) !== null && _b !== void 0 ? _b : validateOnChange,
        validateOnBlur: (_c = props.validateOnBlur) !== null && _c !== void 0 ? _c : validateOnBlur,
        validateOnModelUpdate: (_d = props.validateOnModelUpdate) !== null && _d !== void 0 ? _d : validateOnModelUpdate,
    };
}
function applyModifiers(value, modifiers) {
    if (modifiers.number) {
        return toNumber(value);
    }
    return value;
}
function resolveInitialValue(props, ctx) {
    // Gets the initial value either from `value` prop/attr or `v-model` binding (modelValue)
    // For checkboxes and radio buttons it will always be the model value not the `value` attribute
    if (!hasCheckedAttr(ctx.attrs.type)) {
        return isPropPresent(props, 'modelValue') ? props.modelValue : ctx.attrs.value;
    }
    return isPropPresent(props, 'modelValue') ? props.modelValue : undefined;
}

function useForm(opts) {
    // A flat array containing field references
    const fields = vue.ref([]);
    // If the form is currently submitting
    const isSubmitting = vue.ref(false);
    // a field map object useful for faster access of fields
    const fieldsById = vue.computed(() => {
        return fields.value.reduce((acc, field) => {
            const fieldPath = vue.unref(field.name);
            // if the field was not added before
            if (!acc[fieldPath]) {
                acc[fieldPath] = field;
                field.idx = -1;
                return acc;
            }
            // if the same name is detected
            const existingField = acc[fieldPath];
            if (!Array.isArray(existingField)) {
                existingField.idx = 0;
                acc[fieldPath] = [existingField];
            }
            const fieldGroup = acc[fieldPath];
            field.idx = fieldGroup.length;
            fieldGroup.push(field);
            return acc;
        }, {});
    });
    // The number of times the user tried to submit the form
    const submitCount = vue.ref(0);
    // a private ref for all form values
    const formValues = vue.reactive(klona(vue.unref(opts === null || opts === void 0 ? void 0 : opts.initialValues) || {}));
    // a lookup to keep track of values by their field ids
    // this is important because later we need it if fields swap names
    const valuesByFid = {};
    // the source of errors for the form fields
    const { errorBag, setErrorBag, setFieldErrorBag } = useErrorBag(opts === null || opts === void 0 ? void 0 : opts.initialErrors);
    // Gets the first error of each field
    const errors = vue.computed(() => {
        return keysOf(errorBag.value).reduce((acc, key) => {
            const bag = errorBag.value[key];
            if (bag && bag.length) {
                acc[key] = bag[0];
            }
            return acc;
        }, {});
    });
    /**
     * Holds a computed reference to all fields names and labels
     */
    const fieldNames = vue.computed(() => {
        return keysOf(fieldsById.value).reduce((names, path) => {
            const field = normalizeField(fieldsById.value[path]);
            if (field) {
                names[path] = vue.unref(field.label || field.name) || '';
            }
            return names;
        }, {});
    });
    const fieldBailsMap = vue.computed(() => {
        return keysOf(fieldsById.value).reduce((map, path) => {
            var _a;
            const field = normalizeField(fieldsById.value[path]);
            if (field) {
                map[path] = (_a = field.bails) !== null && _a !== void 0 ? _a : true;
            }
            return map;
        }, {});
    });
    // mutable non-reactive reference to initial errors
    // we need this to process initial errors then unset them
    const initialErrors = Object.assign({}, ((opts === null || opts === void 0 ? void 0 : opts.initialErrors) || {}));
    // initial form values
    const { readonlyInitialValues, initialValues, setInitialValues } = useFormInitialValues(fieldsById, formValues, opts === null || opts === void 0 ? void 0 : opts.initialValues);
    // form meta aggregations
    const meta = useFormMeta(fields, formValues, readonlyInitialValues, errors);
    const schema = opts === null || opts === void 0 ? void 0 : opts.validationSchema;
    const formCtx = {
        fieldsById,
        values: formValues,
        errorBag,
        schema,
        submitCount,
        meta,
        isSubmitting,
        validateSchema: vue.unref(schema) ? validateSchema : undefined,
        validate,
        register: registerField,
        unregister: unregisterField,
        setFieldErrorBag,
        validateField,
        setFieldValue,
        setValues,
        setErrors,
        setFieldError,
        setFieldTouched,
        setTouched,
        resetForm,
        handleSubmit,
        stageInitialValue,
        setFieldInitialValue,
    };
    /**
     * Manually sets an error message on a specific field
     */
    function setFieldError(field, message) {
        setFieldErrorBag(field, message);
    }
    /**
     * Sets errors for the fields specified in the object
     */
    function setErrors(fields) {
        setErrorBag(fields);
    }
    /**
     * Sets a single field value
     */
    function setFieldValue(field, value, { force } = { force: false }) {
        var _a;
        const fieldInstance = fieldsById.value[field];
        const clonedValue = klona(value);
        // field wasn't found, create a virtual field as a placeholder
        if (!fieldInstance) {
            setInPath(formValues, field, clonedValue);
            return;
        }
        // Multiple checkboxes, and only one of them got updated
        if (Array.isArray(fieldInstance) && ((_a = fieldInstance[0]) === null || _a === void 0 ? void 0 : _a.type) === 'checkbox' && !Array.isArray(value)) {
            const newVal = klona(resolveNextCheckboxValue(getFromPath(formValues, field) || [], value, undefined));
            setInPath(formValues, field, newVal);
            fieldInstance.forEach(fieldItem => {
                valuesByFid[fieldItem.fid] = newVal;
            });
            return;
        }
        let newValue = value;
        // Single Checkbox: toggles the field value unless the field is being reset then force it
        if (!Array.isArray(fieldInstance) && (fieldInstance === null || fieldInstance === void 0 ? void 0 : fieldInstance.type) === 'checkbox' && !force) {
            newValue = klona(resolveNextCheckboxValue(getFromPath(formValues, field), value, vue.unref(fieldInstance.uncheckedValue)));
        }
        setInPath(formValues, field, newValue);
        // multiple radio fields
        if (fieldInstance && Array.isArray(fieldInstance)) {
            fieldInstance.forEach(fieldItem => {
                valuesByFid[fieldItem.fid] = newValue;
            });
            return;
        }
        valuesByFid[fieldInstance.fid] = newValue;
    }
    /**
     * Sets multiple fields values
     */
    function setValues(fields) {
        // clean up old values
        keysOf(formValues).forEach(key => {
            delete formValues[key];
        });
        // set up new values
        keysOf(fields).forEach(path => {
            setFieldValue(path, fields[path]);
        });
    }
    /**
     * Sets the touched meta state on a field
     */
    function setFieldTouched(field, isTouched) {
        const fieldInstance = fieldsById.value[field];
        if (!fieldInstance) {
            return;
        }
        applyFieldMutation(fieldInstance, f => f.setTouched(isTouched));
    }
    /**
     * Sets the touched meta state on multiple fields
     */
    function setTouched(fields) {
        keysOf(fields).forEach(field => {
            setFieldTouched(field, !!fields[field]);
        });
    }
    /**
     * Resets all fields
     */
    function resetForm(state) {
        // set initial values if provided
        if (state === null || state === void 0 ? void 0 : state.values) {
            setInitialValues(state.values);
            setValues(state === null || state === void 0 ? void 0 : state.values);
        }
        else {
            // otherwise clean the current values
            setValues(initialValues.value);
        }
        // Reset all fields state
        fields.value.forEach(f => f.resetField());
        if (state === null || state === void 0 ? void 0 : state.touched) {
            setTouched(state.touched);
        }
        setErrors((state === null || state === void 0 ? void 0 : state.errors) || {});
        submitCount.value = (state === null || state === void 0 ? void 0 : state.submitCount) || 0;
    }
    function registerField(field) {
        fields.value.push(field);
        // TODO: Do this automatically on registration
        // eslint-disable-next-line no-unused-expressions
        fieldsById.value; // force computation of the fields ids to properly set their idx
        if (vue.isRef(field.name)) {
            valuesByFid[field.fid] = field.value.value;
            // ensures when a field's name was already taken that it preserves its same value
            // necessary for fields generated by loops
            vue.watch(field.name, (newPath, oldPath) => {
                setFieldValue(newPath, valuesByFid[field.fid]);
                const isSharingName = fields.value.find(f => vue.unref(f.name) === oldPath);
                // clean up the old path if no other field is sharing that name
                // #3325
                if (!isSharingName) {
                    unsetPath(formValues, oldPath);
                    unsetPath(initialValues.value, oldPath);
                }
            }, {
                flush: 'post',
            });
        }
        // if field already had errors (initial errors) that's not user-set, validate it again to ensure state is correct
        // the difference being that `initialErrors` will contain the error message while other errors (pre-validated schema) won't have them as initial errors
        // #3342
        const path = vue.unref(field.name);
        const initialErrorMessage = vue.unref(field.errorMessage);
        if (initialErrorMessage && (initialErrors === null || initialErrors === void 0 ? void 0 : initialErrors[path]) !== initialErrorMessage) {
            validateField(path);
        }
        // marks the initial error as "consumed" so it won't be matched later with same non-initial error
        delete initialErrors[path];
    }
    function unregisterField(field) {
        var _a, _b;
        const idx = fields.value.indexOf(field);
        if (idx === -1) {
            return;
        }
        fields.value.splice(idx, 1);
        const fid = field.fid;
        // cleans up the field value from fid lookup
        vue.nextTick(() => {
            delete valuesByFid[fid];
            // clears a field error on unmounted
            // we wait till next tick to make sure if the field is completely removed and doesn't have any siblings like checkboxes
            // #3384
            if (!fieldsById.value[fieldName]) {
                setFieldError(fieldName, undefined);
            }
        });
        const fieldName = vue.unref(field.name);
        // in this case, this is a single field not a group (checkbox or radio)
        // so remove the field value key immediately
        if (field.idx === -1) {
            // avoid un-setting the value if the field was switched with another that shares the same name
            // they will be unset once the new field takes over the new name, look at `#registerField()`
            // #3166
            const isSharingName = fields.value.find(f => vue.unref(f.name) === fieldName);
            if (isSharingName) {
                return;
            }
            unsetPath(formValues, fieldName);
            unsetPath(initialValues.value, fieldName);
            return;
        }
        // otherwise find the actual value in the current array of values and remove it
        const valueIdx = (_b = (_a = getFromPath(formValues, fieldName)) === null || _a === void 0 ? void 0 : _a.indexOf) === null || _b === void 0 ? void 0 : _b.call(_a, vue.unref(field.checkedValue));
        if (valueIdx === undefined) {
            unsetPath(formValues, fieldName);
            return;
        }
        if (valueIdx === -1) {
            return;
        }
        if (Array.isArray(formValues[fieldName])) {
            unsetPath(formValues, `${fieldName}.${valueIdx}`);
            return;
        }
        unsetPath(formValues, fieldName);
        unsetPath(initialValues.value, fieldName);
    }
    async function validate() {
        if (formCtx.validateSchema) {
            return formCtx.validateSchema('force');
        }
        // No schema, each field is responsible to validate itself
        const validations = await Promise.all(fields.value.map(f => {
            return f.validate().then((result) => {
                return {
                    key: vue.unref(f.name),
                    valid: result.valid,
                    errors: result.errors,
                };
            });
        }));
        const results = {};
        const errors = {};
        for (const validation of validations) {
            results[validation.key] = {
                valid: validation.valid,
                errors: validation.errors,
            };
            if (validation.errors.length) {
                errors[validation.key] = validation.errors[0];
            }
        }
        return {
            valid: validations.every(r => r.valid),
            results,
            errors,
        };
    }
    async function validateField(field) {
        const fieldInstance = fieldsById.value[field];
        if (!fieldInstance) {
            vue.warn(`field with name ${field} was not found`);
            return Promise.resolve({ errors: [], valid: true });
        }
        if (Array.isArray(fieldInstance)) {
            return fieldInstance.map(f => f.validate())[0];
        }
        return fieldInstance.validate();
    }
    function handleSubmit(fn) {
        return function submissionHandler(e) {
            if (e instanceof Event) {
                e.preventDefault();
                e.stopPropagation();
            }
            // Touch all fields
            setTouched(keysOf(fieldsById.value).reduce((acc, field) => {
                acc[field] = true;
                return acc;
            }, {}));
            isSubmitting.value = true;
            submitCount.value++;
            return validate()
                .then(result => {
                if (result.valid && typeof fn === 'function') {
                    return fn(klona(formValues), {
                        evt: e,
                        setErrors,
                        setFieldError,
                        setTouched,
                        setFieldTouched,
                        setValues,
                        setFieldValue,
                        resetForm,
                    });
                }
            })
                .then(() => {
                isSubmitting.value = false;
            }, err => {
                isSubmitting.value = false;
                // re-throw the err so it doesn't go silent
                throw err;
            });
        };
    }
    function setFieldInitialValue(path, value) {
        setInPath(initialValues.value, path, klona(value));
    }
    /**
     * Sneaky function to set initial field values
     */
    function stageInitialValue(path, value) {
        setInPath(formValues, path, value);
        setFieldInitialValue(path, value);
    }
    async function validateSchema(mode) {
        const schemaValue = vue.unref(schema);
        if (!schemaValue) {
            return { valid: true, results: {}, errors: {} };
        }
        const formResult = isYupValidator(schemaValue)
            ? await validateYupSchema(schemaValue, formValues)
            : await validateObjectSchema(schemaValue, formValues, {
                names: fieldNames.value,
                bailsMap: fieldBailsMap.value,
            });
        // fields by id lookup
        const fieldsById = formCtx.fieldsById.value || {};
        // errors fields names, we need it to also check if custom errors are updated
        const currentErrorsPaths = keysOf(formCtx.errorBag.value);
        // collect all the keys from the schema and all fields
        // this ensures we have a complete keymap of all the fields
        const paths = [
            ...new Set([...keysOf(formResult.results), ...keysOf(fieldsById), ...currentErrorsPaths]),
        ];
        // aggregates the paths into a single result object while applying the results on the fields
        return paths.reduce((validation, path) => {
            const field = fieldsById[path];
            const messages = (formResult.results[path] || { errors: [] }).errors;
            const fieldResult = {
                errors: messages,
                valid: !messages.length,
            };
            validation.results[path] = fieldResult;
            if (!fieldResult.valid) {
                validation.errors[path] = fieldResult.errors[0];
            }
            // field not rendered
            if (!field) {
                setFieldError(path, messages);
                return validation;
            }
            // always update the valid flag regardless of the mode
            applyFieldMutation(field, f => (f.meta.valid = fieldResult.valid));
            if (mode === 'silent') {
                return validation;
            }
            const wasValidated = Array.isArray(field) ? field.some(f => f.meta.validated) : field.meta.validated;
            if (mode === 'validated-only' && !wasValidated) {
                return validation;
            }
            applyFieldMutation(field, f => f.setValidationState(fieldResult), true);
            return validation;
        }, { valid: formResult.valid, results: {}, errors: {} });
    }
    const submitForm = handleSubmit((_, { evt }) => {
        if (isFormSubmitEvent(evt)) {
            evt.target.submit();
        }
    });
    // Trigger initial validation
    vue.onMounted(() => {
        if (opts === null || opts === void 0 ? void 0 : opts.initialErrors) {
            setErrors(opts.initialErrors);
        }
        if (opts === null || opts === void 0 ? void 0 : opts.initialTouched) {
            setTouched(opts.initialTouched);
        }
        // if validate on mount was enabled
        if (opts === null || opts === void 0 ? void 0 : opts.validateOnMount) {
            validate();
            return;
        }
        // otherwise run initial silent validation through schema if available
        // the useField should skip their own silent validation if a yup schema is present
        if (formCtx.validateSchema) {
            formCtx.validateSchema('silent');
        }
    });
    if (vue.isRef(schema)) {
        vue.watch(schema, () => {
            var _a;
            (_a = formCtx.validateSchema) === null || _a === void 0 ? void 0 : _a.call(formCtx, 'validated-only');
        });
    }
    // Provide injections
    vue.provide(FormContextKey, formCtx);
    vue.provide(FormErrorsKey, errors);
    return {
        errors,
        meta,
        values: formValues,
        isSubmitting,
        submitCount,
        validate,
        validateField,
        handleReset: () => resetForm(),
        resetForm,
        handleSubmit,
        submitForm,
        setFieldError,
        setErrors,
        setFieldValue,
        setValues,
        setFieldTouched,
        setTouched,
    };
}
/**
 * Manages form meta aggregation
 */
function useFormMeta(fields, currentValues, initialValues, errors) {
    const MERGE_STRATEGIES = {
        touched: 'some',
        pending: 'some',
        valid: 'every',
    };
    const isDirty = vue.computed(() => {
        return !es6(currentValues, vue.unref(initialValues));
    });
    const flags = vue.computed(() => {
        return keysOf(MERGE_STRATEGIES).reduce((acc, flag) => {
            const mergeMethod = MERGE_STRATEGIES[flag];
            acc[flag] = fields.value[mergeMethod](field => field.meta[flag]);
            return acc;
        }, {});
    });
    return vue.computed(() => {
        return Object.assign(Object.assign({ initialValues: vue.unref(initialValues) }, flags.value), { valid: flags.value.valid && !keysOf(errors.value).length, dirty: isDirty.value });
    });
}
/**
 * Manages the initial values prop
 */
function useFormInitialValues(fields, formValues, providedValues) {
    const initialValues = vue.ref(vue.unref(providedValues) || {});
    // acts as a read only proxy of the initial values object
    const computedInitials = vue.computed(() => {
        return initialValues.value;
    });
    function setInitialValues(values, updateFields = false) {
        initialValues.value = klona(values);
        if (!updateFields) {
            return;
        }
        // update the pristine non-touched fields
        // those are excluded because it's unlikely you want to change the form values using initial values
        // we mostly watch them for API population or newly inserted fields
        // if the user API is taking too much time before user interaction they should consider disabling or hiding their inputs until the values are ready
        const hadInteraction = (f) => f.meta.touched;
        keysOf(fields.value).forEach(fieldPath => {
            const field = fields.value[fieldPath];
            const touchedByUser = Array.isArray(field) ? field.some(hadInteraction) : hadInteraction(field);
            if (touchedByUser) {
                return;
            }
            const newValue = getFromPath(initialValues.value, fieldPath);
            setInPath(formValues, fieldPath, newValue);
        });
    }
    if (vue.isRef(providedValues)) {
        vue.watch(providedValues, value => {
            setInitialValues(value, true);
        }, {
            deep: true,
        });
    }
    vue.provide(FormInitialValuesKey, computedInitials);
    return {
        readonlyInitialValues: computedInitials,
        initialValues,
        setInitialValues,
    };
}
function useErrorBag(initialErrors) {
    const errorBag = vue.ref({});
    function normalizeErrorItem(message) {
        return Array.isArray(message) ? message : message ? [message] : [];
    }
    /**
     * Manually sets an error message on a specific field
     */
    function setFieldErrorBag(field, message) {
        if (!message) {
            delete errorBag.value[field];
            return;
        }
        errorBag.value[field] = normalizeErrorItem(message);
    }
    /**
     * Sets errors for the fields specified in the object
     */
    function setErrorBag(fields) {
        errorBag.value = keysOf(fields).reduce((acc, key) => {
            const message = fields[key];
            if (message) {
                acc[key] = normalizeErrorItem(message);
            }
            return acc;
        }, {});
    }
    if (initialErrors) {
        setErrorBag(initialErrors);
    }
    return {
        errorBag,
        setErrorBag,
        setFieldErrorBag,
    };
}

vue.defineComponent({
    name: 'Form',
    inheritAttrs: false,
    props: {
        as: {
            type: String,
            default: 'form',
        },
        validationSchema: {
            type: Object,
            default: undefined,
        },
        initialValues: {
            type: Object,
            default: undefined,
        },
        initialErrors: {
            type: Object,
            default: undefined,
        },
        initialTouched: {
            type: Object,
            default: undefined,
        },
        validateOnMount: {
            type: Boolean,
            default: false,
        },
        onSubmit: {
            type: Function,
            default: undefined,
        },
    },
    setup(props, ctx) {
        const initialValues = vue.toRef(props, 'initialValues');
        const validationSchema = vue.toRef(props, 'validationSchema');
        const { errors, values, meta, isSubmitting, submitCount, validate, validateField, handleReset, resetForm, handleSubmit, submitForm, setErrors, setFieldError, setFieldValue, setValues, setFieldTouched, setTouched, } = useForm({
            validationSchema: validationSchema.value ? validationSchema : undefined,
            initialValues,
            initialErrors: props.initialErrors,
            initialTouched: props.initialTouched,
            validateOnMount: props.validateOnMount,
        });
        const onSubmit = props.onSubmit ? handleSubmit(props.onSubmit) : submitForm;
        function handleFormReset(e) {
            if (isEvent(e)) {
                // Prevent default form reset behavior
                e.preventDefault();
            }
            handleReset();
            if (typeof ctx.attrs.onReset === 'function') {
                ctx.attrs.onReset();
            }
        }
        function handleScopedSlotSubmit(evt, onSubmit) {
            const onSuccess = typeof evt === 'function' && !onSubmit ? evt : onSubmit;
            return handleSubmit(onSuccess)(evt);
        }
        function slotProps() {
            return {
                meta: meta.value,
                errors: errors.value,
                values: values,
                isSubmitting: isSubmitting.value,
                submitCount: submitCount.value,
                validate,
                validateField,
                handleSubmit: handleScopedSlotSubmit,
                handleReset,
                submitForm,
                setErrors,
                setFieldError,
                setFieldValue,
                setValues,
                setFieldTouched,
                setTouched,
                resetForm,
            };
        }
        // expose these functions and methods as part of public API
        ctx.expose({
            setFieldError,
            setErrors,
            setFieldValue,
            setValues,
            setFieldTouched,
            setTouched,
            resetForm,
            validate,
            validateField,
        });
        return function renderForm() {
            // avoid resolving the form component as itself
            const tag = props.as === 'form' ? props.as : vue.resolveDynamicComponent(props.as);
            const children = normalizeChildren(tag, ctx, slotProps);
            if (!props.as) {
                return children;
            }
            // Attributes to add on a native `form` tag
            const formAttrs = props.as === 'form'
                ? {
                    // Disables native validation as vee-validate will handle it.
                    novalidate: true,
                }
                : {};
            return vue.h(tag, Object.assign(Object.assign(Object.assign({}, formAttrs), ctx.attrs), { onSubmit, onReset: handleFormReset }), children);
        };
    },
});

const ErrorMessage = vue.defineComponent({
    name: 'ErrorMessage',
    props: {
        as: {
            type: String,
            default: undefined,
        },
        name: {
            type: String,
            required: true,
        },
    },
    setup(props, ctx) {
        const errors = vue.inject(FormErrorsKey, undefined);
        const message = vue.computed(() => {
            return errors === null || errors === void 0 ? void 0 : errors.value[props.name];
        });
        function slotProps() {
            return {
                message: message.value,
            };
        }
        return () => {
            // Renders nothing if there are no messages
            if (!message.value) {
                return undefined;
            }
            const tag = (props.as ? vue.resolveDynamicComponent(props.as) : props.as);
            const children = normalizeChildren(tag, ctx, slotProps);
            const attrs = Object.assign({ role: 'alert' }, ctx.attrs);
            // If no tag was specified and there are children
            // render the slot as is without wrapping it
            if (!tag && (Array.isArray(children) || !children) && (children === null || children === void 0 ? void 0 : children.length)) {
                return children;
            }
            // If no children in slot
            // render whatever specified and fallback to a <span> with the message in it's contents
            if ((Array.isArray(children) || !children) && !(children === null || children === void 0 ? void 0 : children.length)) {
                return vue.h(tag || 'span', attrs, message.value);
            }
            return vue.h(tag, attrs, children);
        };
    },
});

var InputTypes;
(function (InputTypes) {
    InputTypes["DATE"] = "date";
    InputTypes["DATE_TIME_LOCAL"] = "datetime-local";
    InputTypes["TIME"] = "time";
    InputTypes["TEXT"] = "text";
    InputTypes["TEXT_AREA"] = "textarea";
    InputTypes["TEL"] = "tel";
    InputTypes["CHECK"] = "checkbox";
    InputTypes["NUMBER"] = "number";
})(InputTypes || (InputTypes = {}));

var script$5 = vue.defineComponent({
    name: 'Required',
    props: {
        rules: {
            type: [Object, String, Function],
            default: '',
            required: false
        }
    }
});

const _hoisted_1$4 = {
  key: 0,
  class: "text-red ml-1"
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.rules.includes('required') || _ctx.rules.includes('customRequired'))
    ? (vue.openBlock(), vue.createBlock("label", _hoisted_1$4, "*"))
    : vue.createCommentVNode("v-if", true)
}

script$5.render = render$5;
script$5.__file = "src/components/required/Required.vue";

var script$4 = vue.defineComponent({
    name: 'CustomInput',
    components: {
        ErrorMessage: ErrorMessage,
        Required: script$5
    },
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: InputTypes.TEXT
        },
        value: {
            type: String,
            default: ''
        },
        rules: {
            type: [Object, String, Function],
            default: '',
            required: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        min: {
            type: String,
            required: false,
            default: ''
        },
        maxlength: {
            type: String,
            required: false,
            default: '1000'
        },
        extraInfo: {
            type: String,
            required: false
        },
        hideInput: {
            type: Boolean,
            default: false,
            required: false
        },
        loadingSubmit: {
            type: Boolean,
            default: false,
            required: false
        },
        onInvalid: {
            type: String,
            default: '',
            required: false
        },
        textAreaWidth: {
            type: String,
            required: false,
            default: 'w-96'
        },
        placeholder: {
            type: String,
            required: false
        },
        step: {
            type: String,
            required: false
        },
        isSubmitting: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup: function (props) {
        var inputValue = useField(props.name, props.rules, {
            initialValue: props.value
        }).value;
        var cardNumberSpace = function () {
            if (props.name === 'victim.bankAccount') {
                inputValue.value = inputValue.value
                    .replace(/[^\dA-Z]/g, '')
                    .replace(/(.{4})/g, '$1 ')
                    .trim();
            }
        };
        vue.watch(function () { return inputValue.value; }, function () {
            cardNumberSpace();
        });
        return {
            InputTypes: InputTypes,
            inputValue: inputValue
        };
    }
});

const _hoisted_1$3 = { key: 0 };
const _hoisted_2$3 = {
  key: 1,
  style: {"font-size":"13px"}
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_required = vue.resolveComponent("required");
  const _component_ErrorMessage = vue.resolveComponent("ErrorMessage");

  return (vue.openBlock(), vue.createBlock("div", null, [
    (!_ctx.hideInput && _ctx.label)
      ? (vue.openBlock(), vue.createBlock("strong", _hoisted_1$3, [
          vue.createVNode("p", null, [
            vue.createTextVNode(vue.toDisplayString(_ctx.label) + " ", 1 /* TEXT */),
            vue.createVNode(_component_required, { rules: _ctx.rules }, null, 8 /* PROPS */, ["rules"])
          ])
        ]))
      : vue.createCommentVNode("v-if", true),
    (_ctx.extraInfo)
      ? (vue.openBlock(), vue.createBlock("div", _hoisted_2$3, [
          vue.createVNode("label", null, vue.toDisplayString(_ctx.extraInfo), 1 /* TEXT */)
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.createVNode("div", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    vue.createVNode("div", {
      class: {
        'text-lightGray animate-pulse2 bg-lightGray': _ctx.isSubmitting
      }
    }, [
      (_ctx.type !== _ctx.InputTypes.TEXT_AREA && !_ctx.hideInput && _ctx.type !== _ctx.InputTypes.TIME)
        ? vue.withDirectives((vue.openBlock(), vue.createBlock("input", {
            key: 0,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.inputValue = $event)),
            class: ["bg-lightGray p-2 min-w-0 w-100", { 'opacity-0': _ctx.isSubmitting }],
            min: _ctx.min,
            type: _ctx.type,
            step: "1",
            maxlength: _ctx.maxlength,
            name: _ctx.name,
            disabled: _ctx.disabled || _ctx.isSubmitting,
            placeholder: _ctx.placeholder
          }, null, 10 /* CLASS, PROPS */, ["min", "type", "maxlength", "name", "disabled", "placeholder"])), [
            [vue.vModelDynamic, _ctx.inputValue]
          ])
        : vue.createCommentVNode("v-if", true),
      (_ctx.type === _ctx.InputTypes.TIME)
        ? vue.withDirectives((vue.openBlock(), vue.createBlock("input", {
            key: 1,
            id: _ctx.name,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (_ctx.inputValue = $event)),
            class: ["bg-lightGray p-2 min-w-0 w-100", { 'opacity-0': _ctx.isSubmitting }],
            style: {"max-width":"100px"},
            type: "time",
            name: _ctx.name,
            disabled: _ctx.disabled || _ctx.isSubmitting,
            step: _ctx.step
          }, null, 10 /* CLASS, PROPS */, ["id", "name", "disabled", "step"])), [
            [vue.vModelText, _ctx.inputValue]
          ])
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */),
    (_ctx.type === _ctx.InputTypes.TEXT_AREA && !_ctx.hideInput && _ctx.type !== _ctx.InputTypes.TIME)
      ? vue.withDirectives((vue.openBlock(), vue.createBlock("textarea", {
          key: 2,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (_ctx.inputValue = $event)),
          class: ["bg-lightGray p-2 h-32", 'md:' + _ctx.textAreaWidth + ' ' + 'xs:w-full'],
          type: 'text',
          name: _ctx.name,
          maxlength: "500",
          disabled: _ctx.disabled || _ctx.isSubmitting
        }, null, 10 /* CLASS, PROPS */, ["name", "disabled"])), [
          [vue.vModelText, _ctx.inputValue]
        ])
      : vue.createCommentVNode("v-if", true),
    vue.createVNode("span", { name: _ctx.name }, [
      vue.createVNode(_component_ErrorMessage, {
        name: _ctx.name,
        class: "text-red text-sm block mt-1 w-80"
      }, null, 8 /* PROPS */, ["name"])
    ], 8 /* PROPS */, ["name"])
  ]))
}

script$4.render = render$4;
script$4.__file = "src/components/inputs/CustomInput.vue";

var script$3 = vue.defineComponent({
    name: 'BasePage'
});

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", null, [
    vue.renderSlot(_ctx.$slots, "default")
  ]))
}

script$3.render = render$3;
script$3.__file = "src/components/basePage/BasePage.vue";

var script$2 = vue.defineComponent({
    name: 'PageTitle',
    props: {
        title: {
            required: true,
            type: String
        },
        homeUrl: {
            required: true,
            type: String
        }
    },
    setup: function () {
        var home = function (url) {
            return String(url);
        };
        return {
            home: home
        };
    }
});

const _hoisted_1$2 = {
  class: "header",
  role: "banner"
};
const _hoisted_2$2 = { class: "header__inner" };
const _hoisted_3 = { class: "header__logo" };
const _hoisted_4 = /*#__PURE__*/vue.createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 30.7 46.8"
}, [
  /*#__PURE__*/vue.createVNode("path", { d: "M22 28.6l-.2.2c-.2 0-.3 0-.3-.1v-.2c0-.1.1-.2.1-.2h.2c.1 0 .1 0 .2.1v.1c-.1 0 0 .1 0 .1zm7.1 5.5c.1-.1.1-.2.3-.3v-2h-2.6c.1-.1.2-.1.2-.1.9-.7 1-1.5 1.1-2.6l.3-4.1c.1-1 .1-2-.8-2.8-.7-.6-1.7-.7-2.6-.8.1.2.2.5.2.7 0 .4 0 .8-.1 1.2l.3.2.2.5s-.1-.1-.2 0v.3l.1.1h-.2v.2l-.1-.1h-.1c0 .1.1.1.1.2s0 .1.1.2c.1.3.2.6.2.9v1c0 .3-.2.7-.4 1l-.1.1-.1 1.1c-.1.8-.3 1-1 1h-.3l.1-1.4c-.3.1-.6.1-.8 0-.5-.1-1-.2-1.4-.6-.4-.3-.7-.7-.9-1.1 0 .1-.1.1-.1.1l-.2 2.2c0 .4-.1.7-.5.8l-.1 1.9h.2c.1 0 .1.1.2.1v-.1l.6.1v.4c.2.1.5.3.7.4 1.2.6 2.6 1 3.9 1.2l-.6-1.6H26s.1 0 .2-.1v1.5l.3.3c.5 0 .7.1 1.2.1l-.2.2c-.4 0-.5 0-.9-.1v1.9l1.9-1.8-1 3.8h.1l1-3.8.8 2.5-1.5 1.5 1.5-1.3v-2.8c-.8 0-.7-.1-.3-.2zM18.5 6.7l.1-.3h-.3l-.1.1c-.1 0-.2 0-.3.1-.1 0-.2 0-.3-.1 0 0 0-.1-.1-.2h-1.4v1.1c0 .4.1 1.1-.6 1.1v.2c.3.1.6.1.9.2.3.1.7.2 1 .3l.6.3.6.3.1.1c.1-.1.2-.1.3-.2V7.6h-.3v-.1s.1-.1.2-.1h.1v-.5c-.1.1-.2.1-.4.1.1 0 0-.1-.1-.3zm.7 3.7l-1.6.1.9-.3c-.4-.1-.8-.3-1.2-.3-.6-.1-1.2-.2-1.7-.3 0 .3-.1.5-.1.8v.2h-.2c0-.1.1-.2.1-.4v-.6c-.9 0-1.9.1-2.8.3v.1c.5.5 1.4.7 2.4.8l.1 3.1h.1l.2-.6.3-.5-.3.6v.2l-.4.6v.4c.1 0 .1 0 .2-.1l.3-.3-.3.5v.3l2.1-.1-.1-1.6c0-.4.1-.7.5-.7l.1 2.1c.3-.4.5-.8.7-1.3.4-1 .7-1.9.7-3zM8.6 24.5c-.1 0-.1 0 0 0v-.2c-.1 0-.3.1-.5.1-.3 0-.4.2-.4.4l.3.1c0-.2 0-.3.2-.2h.3c-.7 1.1-1.1 2.3-1.4 3.6h-.2c-.1 0-.2.1-.2.2-.1.1-.2.1-.3.2h-.1v.1c.3-.1.5 0 .6 0v.1l-.1.1-.2.2.3.1c0 .1 0 .3-.1.4v.5c.1.2.2.3.4.4.3.3.7.5 1 .6.2-.8.6-1.6 1.1-2.3.1-.1.2-.3.4-.4v-.1l.3-4.9c0-.3.1-.6.2-.8-.2.1-.3.2-.5.4l-.7.7c-.1.2-.2.5-.4.7zm-.4-.7c-.1 0-.2.1-.3.2-.1.1-.2.1-.3.1l.1.1h.4s.1-.1.2-.1l.1-.1v-.1l-.2-.1zm-.2-.1l.1-.2h-.3s-.1.1-.1.2c0 0 .1 0 .2.1 0-.2.1-.2.1-.1zm-1 2.4s-.1.1-.2.1h-.3v.2H7l.3-.2-.1-.2c-.1 0-.2 0-.2.1zm-.3-1.5c.1 0 .2 0 .3-.2l-.1-.1-.3.2h-.1v.2c.1 0 .1 0 .2-.1zm-.6 7.6l.2.2-.4-.4h-.2c-.1.1-.1.1-.2.1h-.3l-.3-.2c-.1 0-.1 0-.2.1v.1s-.1.1-.1 0c-.1 0-.1 0-.1.1s0 .1.1.2c.1 0 .1.1.2.1l-.2-.3c-.1 0-.1 0-.1.1s0 .1.1.1h-.1c.7.8 1.4 1.4 2.2 1.8.1-.1.2-.1.4-.1.4 0 .5.2.6.5.5.1 1.1.2 1.6.2l-.1.1c-.3 0-.6 0-.9-.1-.2 0-.4-.1-.6-.2 0 .2.1.4.1.6v.2h3.3v-.8H11c-.2.1-.5.1-.7.1s-.5.1-.7.1c0 0 .1 0 .1-.1.5 0 1-.1 1.5-.2v-1.7c-.3-.2-.6-.4-1-.5 0 .1 0 .1.1.1h-.1s-.1.1 0 .1c0 .1 0 .1.1.1H10l-.1.1s0 .1.1.1c-.1-.1-.2-.1-.2-.1h-.2s-.1 0-.1-.1h-.2c0-.1 0-.1-.1-.1s-.1 0-.2-.1v-.1s-.1 0-.1-.1l-.1-.2v-.2c-.2 0-.3-.1-.5-.1h-.2c-.1 0-.1.1.1.2-.1 0-.1 0-.1-.1 0 0 0-.1-.1-.1-.2-.1-.4-.1-.6 0s-.4.1-.6 0l-.1.1c0 .1 0 .1-.1.2l.4.2.3.2-.4-.2h-.1l-.6-.4c-.2.1-.2.2-.1.4zm-2.1.2c0 .1 0 .1 0 0-.1.1-.1.1 0 0-.1.1-.2.1-.2.1-.1.4-.2.9-.1 1.3.1.5.3 1 .6 1.4.5.7 1.1 1.3 1.9 1.6s1.6.4 2.5.4c.2 0 .4-.1.5-.1.2 0 .3-.1.5-.1v.1c.1 0 .2.1.3.1.1.1.2.1.3-.1l-.1-.2c-.1.1-.1.1-.2.1h-.1c0-.1-.1-.1-.1-.1.1 0 .2-.1.3-.1-.7-.4-1.8-.7-2.6-1-.3-.1-.8-.2-1-.4s-.2-.4-.2-.6.1-.4.2-.6c-.4-.2-.9-.5-1.2-.8-.4-.3-.7-.7-1.1-1.1l-.2.1c0-.1 0-.1 0 0 .1 0 .1.1 0 0 .1 0 .1 0 0 0zm-.4 1.4v-1.1c-.5.5-.7 1.1-.7 2.1v.2c0 2.4 1.2 2.9 3.3 3.5 1 .2 1.7.3 1.7 1.5 0 .4-.2.9-.7.9-.3 0-.5-.1-.6-.4-.1-.2-.1-.7-.1-1.4H3.1v3c1.1.9 2.6 1.2 4.1 1.2 3.3 0 4.3-1.6 4.3-3.8v-.1c0-.5-.1-1.1-.3-1.5 0-.1-.1-.2-.2-.3h-.2c-.1 0-.1-.1-.2 0v.1h.2l.1.1-.6.1-.1-.1h-.1v.1h-.4c-1.1 0-2.1-.3-3.1-.7s-1.9-1.1-2.5-2.1c-.2-.4-.4-.8-.5-1.3zm6.1 3.6c.2.1.2.1.3.1s.1 0 .2.1v-.1c-.1-.1-.1-.1-.2-.1h-.1c-.1-.1-.2-.1-.2 0zm.1.2c-.1.1 0 .1 0 0 0 .1 0 .1.1.2 0 0 .1 0 .1-.1 0 0 0-.1-.1-.1-.1.1-.1 0-.1 0zM6.4 26.8v.3c.1 0 .1-.1.2-.1.1-.1.4-.1.5-.1v-.2l-.1-.1c-.2.1-.3.2-.4.2h-.2zm.2 1.1c-.1.1-.2.1-.3.2v.2c.2 0 .3 0 .5-.1 0 0 .1-.1.2-.1.1-.1.1-.1.1-.2v-.1h-.2c-.1.1-.2.1-.3.1zm.5-2.4v.1h.1l.1-.1v-.1l-.2.1c.1 0 .1 0 0 0zm5.2 5.3h.2-.2zm-1.9-1.6c-.4 0-.6-.3-.6-.5l-.4.4c-.5.7-.8 1.4-1 2.1.5.2 1.1.3 1.7.3.9.1 2 0 2.9-.3v-.1c-.1-.1-.1-.1-.2-.1l.1-.1v-.1h-.1l.3-.3v-.1s-.1-.1-.2-.1c.2 0 .3 0 .4-.1 0 0 .1-.1 0-.1V30h.3l.2-.2c.1.1.1.1.3.1l.3-4.4c-1.1.4-2.1.9-3.1 1.6v-.2c.4-.3.8-.6 1.3-.8.5-.3 1-.5 1.4-.6.1 0 .2 0 .2-.1l-3.8-.3.2 2.2h.4l.2-.2s0 .1-.1.2v.5c0 .5 0 1.4-.7 1.4zm1.6 5.7v5c0 .4 0 .8-.4 1.1v2H20v-3.6c-.3-.2-.6-.3-.9-.5h-2.3v.4c0 .9 0 1.3-1 1.3h-.2v-2.3h2.2v-.4c-.6-.5-1.2-1.1-1.7-1.8h-.5v-.7c-.1-.2-.3-.4-.4-.6-.6-1-1-2-1.2-3.1h-2.4v2c.4.4.4.8.4 1.2zm7.8 4.1zm-2.3-1.3v-1.4h-1.4c.5.5.9 1 1.4 1.4zm-3.9-16.5c-1.1.3-2.1.8-3 1.4.1 0 .2-.1.3-.1.8.1.6 1 .6 1.5v.2l3.3.2.2-2.8-.9-.6c-.3.1-.4.1-.5.2zm1.1 8.5l-.1 1.9 2.9.2H14v.2c.3 1.1.7 2.2 1.4 3.1v-1h.2c.9 0 1 .3 1 1.1v.3h3.2v-3.4c-.2-.1-.4-.3-.7-.4h-.4l.1-1.9c-.4-.3-.3-.7-.3-1.1l.3-4.9c0-.4 0-.8.4-1l.1-1.9-3.9-.2-.1 1.9c.4.3.3.7.3 1.1l-.3 4.9c-.2.5-.2.9-.6 1.1zm3.4-11.4h-.3c0 .1-.1.1-.2.2l.1 1.7 3.7-.1-.1-1.7c-.4-.2-.3-.6-.4-.9v-.7c-.3.2-.5.5-.9.7-.5.3-1.2.6-1.9.8zm4.5 3.3c-.4-.2-.9-.4-1.4-.5l-1-.1-.1 1.7s.1 0 .1.1h.1c0 .1 0 .1.1.1s.1 0 .1.1v.1l.1.1.1.2v.3l.7-.1c.1 0 .1-.1 0-.1 0 0 .1 0 .1.1v.1c.2.1.4.1.5 0 .2-.1.4 0 .5.1l.1-.1s0-.1.1-.1l-.3-.2-.3-.2.3.2h.1l.5.4s.1-.1 0-.2c0-.1-.1-.1-.1-.2l.3.4h.1l.1-.1h.3l.2.2h.2v-.1h.2c0-.1 0-.1-.1-.1s-.1-.1-.1-.1l.2.1h.1v-.1c-.6-1.1-1.2-1.6-1.8-2zm.5 3c0-.1 0-.1 0 0 0-.1 0-.1-.1-.2h-.1c0 .1-.1.1-.1.2l-.7.3.1-.1h.1v-.1h.1l.2-.1v-.2h-.2l-.8-.1h-.2l-.2.1h-.4c-.1 0-.2 0-.3.1l-.1.9c.5 0 1 0 1.6-.1s1.1-.3 1.7-.6c.1 0 .2-.1.2-.2v-.1h-.1c-.1 0-.1-.1-.2 0h-.2v-.1h-.1c-.1.2-.1.2-.2.3zm.3 1.5c-.1.1-.1.1 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zm-.5 1.3l-.2.1-.1-.2c0-.1.1-.1.2-.1l.1.1v.1zm-.5-.9l-.1.1h-.2s0-.1-.1-.1l.1-.2h.1c.2 0 .2.1.2.2zm-.5 0l-.1.1-.4.1.3-.4h.2v.2zm1.6 1.9l.2-3.4c-.2.2-.5.3-.8.5s-.8.3-1.3.4h-1.3v.4c.1.4.3.7.6 1s.6.6.9.8l.6.3c.2.1.4.1.7.1.2 0 .3 0 .4-.1zm1.4-7l-3.3-.3c.1 0 .3.1.4.1l.6.3c.4.2.7.5 1 .7.3.3.6.6.8 1h.2s0-.1 0 0h.1c.2-.4.2-.8.2-1.2.2-.2.1-.4 0-.6zm.1 3.2v.8h-.1l-.1 2.3.2-.2c.2-.5.3-1 .3-1.6 0-.5-.1-.9-.3-1.3zm1.4-8l-3 .1v1.2h.1c.1 0 .2 0 .3.1l.2-.6.3-.5-.3.6v.2l-.6 1v.1c.1.1.2.1.4-.1l.3-.3-.5.5c0 .1 0 .2.1.3.1.1.1.2.2.3.5.3 1 .5 1.6.6.6-.7 1.1-1.3 1.4-2-.1-.1-.2-.1-.3-.2-.1-.3-.1-.8-.2-1.3zm-2.9 21.7v-.6l-.4-.1c-.1 0-.2 0-.3-.1l-.1.3.1.1-.1.2h-.1v.1l.6.1-.2 1-2.2-.6.2-.9.6.1v-.1h-.1l.1-.2h.1l.1-.3c-.1 0-.2 0-.3-.1l-.3-.1-.2.6h-.2v2c.9.3 1.8.5 2.7.6v-2zm-.2-.8l.4.1-.1.5v.1l.6.2.5-2-.6-.2-.2.6-.4-.1c0 .1-.2.3-.2.3s.1.3 0 .5zm-1.5-2.2l.6.2-.1.4c.2 0 .4.2.4.2s.2-.1.4 0l.1-.4.6.1.2-.6-2-.5-.2.6zm.8 2.7l-.8-.2-.1.3-.6-.2-.2.7 2 .5.2-.6-.6-.1.1-.4zm-.7-.5c.2-.1.2-.3.2-.3s-.1.1-.2.1v.2zm.7-.3s-.1.2.1.4l.1-.3c-.1 0-.2-.1-.2-.1zm-1.8.3l.2-.6.4.1c0-.2.2-.4.2-.4s-.1-.2 0-.4l-.4-.1.2-.6-.6-.2v2.2zm0-2.2l.8.2-.1.6.3.1c.1-.1.4 0 .4 0s-.1-.2.1-.3l.1-.3-.6-.1.2-.9 2.2.6-.2 1-.6-.1-.1.3c.1.1 0 .3 0 .3s.2 0 .3.1l.3.1.1-.6.9.2-.6 2.2-.7-.2.7 1.7.6 1.6.6 1.4h3.4v-3.9l-.4.4-.8-.8-.1.1.2.1-.2.5-.4-.1.5 1.2-.5-.1-.2-.4v.8l-.7.6-.3-.8.3-.7-.3.2-.6-.1 1-.8-.4-.1.1-.6.3.1v-.2l-1.1.3-.5-1.7 1-1-.8-2.1h-.1c-.9-.1-1.6-.3-2.2-.5s-1.2-.4-1.8-.7c-.2-.1-.5-.3-.7-.4v1.2c.4.3.4.7.4 1.1v.5h.2zm8.2 2.9v.2l-.2-.2-.2.1.1-.2-.1-.2.2.1.1-.2v.3-.6l-1.7 1.4v.1h.1l.3-.3.8.8.5-.6v-.2l.1-.5zm-.8-3.2l-.8 3.3h.1l1.4-1.4-.7-1.9zM26 40.1l.6-.5.1-.2-.7.7zm.9-.1l-.3-.1-.4.9.2.6.5-.4v-1zm-1.2-2.6l-.2.1.1-.2-.2-.2.2.1.1-.2v.3l.2.1h-.2v.3-.3zm-.3 1.3l1.1-.3.1.4h.1v-.1l-.9-2.3-.8.8.4 1.5zm1.4-.4l-.6-1.9v.4l.6 1.5zm1-3.3l-1.5 1.4.6 1.9h.1l.8-3.3zm-.5 5.5h.2l-.4-1-.1.3.3.7zm.1 3.3h-.6v3h.7v-1.5l.9 1.5h.6v-3h-.7v1.5l-.9-1.5zm-1.2 0h-2v3h2v-.6h-1.3v-.5H26v-.6h-1.1v-.5h1.3v-.8zm-5.8-.7h3.5v-2l-.1-.1c-1-.3-2-.6-2.9-1 0 .4 0 .8-.4 1.1l-.1 2zm2.2 1.3c.2 0 .3.1.3.3s-.1.3-.3.3h-.4v-.6h.4zm.1-.6h-1.2v3h.7v-1.1h.2l.5 1.1h.8l-.6-1.2c.2-.1.5-.4.5-.8.1-.6-.3-1-.9-1zm-1.7 0h-2v3h2v-.6h-1.3v-.5h1.1v-.6h-1.1v-.5H21v-.8zm-3.7.6c.2 0 .3.1.3.2.1.1.1.2.1.7s0 .6-.1.7c-.1.1-.2.2-.3.2H17v-1.7h.3v-.1zm.1-.6h-1.1v3h1.1c.3 0 .6-.1.8-.3.3-.3.3-.7.3-1.2s0-.8-.3-1.2c-.2-.3-.5-.3-.8-.3zm-3.4 0h-.6v3h.7v-1.5l.9 1.5h.6v-3h-.7v1.5l-.9-1.5zm-2.5 1.9l.3-.8.2.8h-.5zm0-1.9l-1.1 3h.8l.1-.4h.9l.1.4h.8l-1.1-3h-.5zm-2.7 1.9l.3-.8.2.8h-.5zm-.1-1.9l-1.1 3h.8l.1-.4h.9l.2.3h.8l-1.1-3-.6.1zm-2.4 0h-.7v3h2v-.6H6.4l-.1-2.4zm-2.8 0h-.8l1 3h.5l1-3h-.8l-.5 1.7-.4-1.7zm-.9-17.6v.1c.1 0 .1-.1 0-.1zm-.2.7v.1-.1zm-.1-.2v.1h.1l-.1-.1zM3.4 25c.1 0 .1 0 0 0 .1 0 .1 0 0 0zm.4-6.2c-.6 0-.6-.7-.6-.7l-.1-4.4c0-.1-.1-.7.6-.8.6 0 .6.7.6.7l.2 4.4c-.1.1 0 .8-.7.8zm-.2 5c.1.3.3.6.5.9-.1.1-.3.2-.5.3.2-.1.3-.1.5-.3.1.1.2.3.3.4h-.1c-.1.1-.3.2-.5.2-.3 0-.6-.4-.6-.8 0-.3.1-.6.4-.7zm0 2.4c0 .1.1.1.1.1v.1h-.1v-.2zm.6-3.9c-.1-.2-.3-.5-.3-.7s.1-.3.2-.4l.3.4c.1.1.1.2.1.3-.1.2-.2.4-.3.4zm.4-.4c0-.1-.1-.1-.1-.2-.1-.1-.2-.3-.3-.4l.1-.1c.2 0 .3.2.3.4v.3zm0 1.4c.1-.1.1-.2.2-.3h.1v-.1c.3-.4.5-.8.5-1.2 0-.5-.3-.8-.6-1 .2 0 .8-.1 1-.2.8.8.7 1.7.7 2.2v.2H5.3v.5h.2c.1 0 .2.1.2.3 0 .1 0 .3-.2.4l-.2.2c-.1-.2-.3-.5-.4-.7v-.5c0 .1-.1.3-.1.4l-.2-.2zm1.1 1.3s0-.1 0 0c0-.1 0 0 0 0zm.2-.1c.1 0 .1 0 .1.1s0 .1.1.2c0 .1 0 .1.1.2h-.1c-.1-.1-.1-.1-.1-.2-.1-.2-.1-.2-.1-.3zm.2.1v-.1c-.1 0-.1 0-.1-.1v-.1s0-.1-.1-.1v-.1H6v.1l.1.1v.1l.1.1-.1.1c.1.1.1 0 0 0zm.1.1c.1 0 .1 0 0 0 .1 0 .1.1 0 0zm.1-.3c-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0l-.1-.1v-.1l-.1-.1L6 24v-.1h.1v.2s0 .1.1.1c0 0 0 .1.1.2 0-.1 0-.1 0 0zm0-.6zm0-.3s.1 0 .1-.1l-.1.1zm.1.6s-.1-.1 0 0l-.1-.1h.1v.1c0-.1 0 0 0 0zm.1-.2c0-.1.1-.1 0 0 .1 0 .1 0 0 0l.1.1-.1-.1c0 .1 0 0 0 0zm.1-.5v-.1.1zM4.4 10.8h-.9c-2.1.1-3.6.7-3.5 3.1L.1 18c.1 2.4 1.1 2.9 3.1 2.9-.2.2-.3.5-.3.9s.1.7.2 1.1c-.5.3-1.1.8-1.1 1.7 0 .7.3 1.4 1.1 1.6-.2.2-.3.4-.4.7-.1.1-.1.3-.1.6 0 .2.1.4.1.5.1.2.2.4.3.5.1.2.3.3.5.4s.4.2.7.2c.4 0 .8 0 1.2-.2.3-.2.6-.5.7-.8.1-.2.1-.3.1-.5s-.1-.3-.2-.5l-.3-.3c-.1 0-.2-.1-.4-.1h-.1v.1c.1 0 .2.1.3.1.1 0 .2.1.3.1.2.1.3.3.4.5 0 .2 0 .4-.1.6-.1.3-.4.5-.7.6-.3.2-.7.3-1 .2-.3 0-.6-.1-.8-.3-.2-.2-.4-.4-.5-.6s-.1-.4 0-.6c0-.2.1-.3.2-.5s.2-.3.4-.4c.1-.1.2-.2.3-.2l-.1-.1v-.1H4v.4l.1-.1-.1-.2h.1c0 .1.1.1.1.2.1 0 .1-.1.1-.1.1 0 .1-.1.2-.1v-.1h.1v.1l.1-.1h.1v.1H5v-.1h.2c.3.3.7.4 1 .4s.6-.1.7-.4c0 0 .1-.1.2-.1l.1-.1c0-.1-.1-.1-.2-.1 0-.1.1-.2.1-.4v-.3h-.6v.3c0 .2-.1.3-.3.3-.1 0-.3-.2-.4-.4v-.1l.1.1c0 .1.1.1.1.2h.1v-.2l-.1-.1s0-.1-.1-.1V25s-.1 0-.1-.1v-.1c.1 0 .1.1.1.1v.2l.1.1.1.1.4-.4c.1-.1.2-.2.2-.3l.5-.5h.2l.1-.1-.1-.1.2-.2.2-.2c1.5-1.1 3.2-1.8 5-2.2.2-.1.5-.1.8-.1-.3-.2-.7-.3-1-.4.4-.1.8-.2 1.2-.4-1.3-.1-2.5-.4-3.7-.9-.7-.3-1.4-.6-2-1.1.1.7.3 1.3 1 1.8.1.1.3.1.5.2-.6.1-1.2.2-1.7.6-.6.4-.9 1.1-1 1.7-.1-.3-.1-1.4-.8-2 1-.4 1.6-1.2 1.5-2.8v-.5c-.4-.4-.8-.8-1.1-1.3-.4-.6-.7-1.3-.9-2-.2-.7-.2-1.5 0-2.2l-.5-.2-.7-.9zm6.4 2.6c0-.4-.1-.7.3-1l-.1-1.7H9.6s0 .1-.1.1c0 .1 0 .2-.1.3l.6.2.6.4-.6-.3h-.2l-1-.6c-.1 0-.1.2.1.4l.3.3-.7-.6c-.1 0-.2 0-.3.1s-.2.1-.3.2h-.2l-.3.1-.1-.1.1 1.4c.2.1.3.3.3.5.7.6 1.5 1.1 2.2 1.4l.9.3v-1.4zM6 11.8c0 .1 0 .1 0 0h-.3c-.2.7-.3 1.5 0 2.3.2.8.5 1.5 1 2.1.2.3.5.6.7.8l-.1-3.3c0-.8-.2-1.4-.6-1.9l-.1-.1h-.5c0 .1 0 .1-.1.1.1 0 .1 0 0 0zm-.4-2.5V7.4c0-.2.1-.5.1-.7H4v2.7c.5.4 1.2.7 1.8.9 0-.4-.1-.7-.2-1zm5.8-5.8V1.1C10.3.3 9.1 0 7.7 0c-.9 0-1.9.1-2.6.6-.8.6-1 1.2-1.1 2.2V3c0 1.8.7 2.5 2.1 2.9.1-.1.1-.3.2-.4.4-.6.9-1.1 1.5-1.4l.6-.3h-.1c-.3-.1-.7-.2-.9-.4-.2-.2-.2-.4-.2-.6 0-.4.2-.7.6-.7.6 0 .6.6.6 1.1v.2l3 .1zm-.6 2.6c0 .1-.2.2-.4.2 0 0-.1 0-.1-.1v-.4l.1-.1h.1l.3.4zM9.6 8.4l-.1.1c-.1 0-.1 0-.1-.1.1-.1.1-.1.2 0 0-.1 0-.1 0 0zM7.2 9c0 .1-.1.1-.2.1h-.1L6.8 9v-.1s.1-.1.3-.1c0 0 .1 0 .1.2zm-.4.3l.2.2c0 .2-.4.4-.5.4s-.3 0-.5-.1v-.1c.1 0 .5-.2.6-.3-.1 0 0-.1.2-.1zm4.8-2.1c0-.5-.1-1-.2-1.4-.1-.4-.4-.7-.8-1-.5-.4-1.3-.6-2-.8-.4.1-.8.2-1.1.4-.6.4-1.1.9-1.4 1.6.2.1.5.2.8.2.9.2 1.5.3 1.5 1.4 0 .4-.2.8-.6.8-.2 0-.5-.1-.6-.3s-.1-.7-.1-1.3H5.8c-.2.7-.3 1.5-.1 2.4.1.4.1.8.3 1.2.6.1 1.1.2 1.7.2.4 0 .8 0 1.1-.1.5-.4.9-.7 1.4-.9l.9-.3c.2-.3.3-.7.4-1.2-.2 0-.3-.2-.3-.5l.2-.2h.1c.1-.1.1-.1.1-.2zm.3 3.6c-.1 0-.1 0-.2-.1h-.1l.1 1.7c.4.2.4.6.4.9l.1 1.7c.7.1 1.4.2 2.1.1l-.1.1c-.5 0-1 0-1.5-.1-.2 0-.4-.1-.5-.1l.1 2.6c0 .2 0 .7-.6.7s-.6-.5-.6-.7l-.1-3-.9-.3c-.7-.3-1.5-.7-2-1.2-.1 0-.1-.1-.2-.1v.3l.1 3.9v.5c.5.3.9.6 1.5.8 1.3.4 2.6.6 4 .5.3-.1.6-.1.9-.2.1 0 .3-.1.5-.1.2-.5.2-1 .2-1.6l-.1-1.9h-.4s.1 0 .1-.1c.1 0 .2 0 .3-.1l-.1-1.9c0-.4 0-.8.2-.9v-.7h-.2l-.1.1s0 .1.1.2c-.1-.1-.3-.2-.4-.2h-.2s-.1 0-.2-.1l-.3.1c0-.1 0-.2-.2-.2-.1 0-.2 0-.3-.1v-.1s-.1 0-.1-.1l-.1-.3v-.3h-1.2c-.1.2-.1.3 0 .3zm1.2-3.6l-.5.8-.4-.1-.3-.4v-.1s.1-.1.1-.2l.8-.3h.1c.1.2.1.2.2.3zm.6-1.2c-.5-.5-1.1-1-1.8-1.3v2.2c0 .7 0 1.4.2 2 .2 0 .3-.1.5-.1 1-.1 1.9-.1 2.8 0 0-.1 0-.2-.1-.3s-.2-.3-.2-.5v-.1c-.4-.7-.8-1.4-1.4-1.9zm5.6-1.8V1.4C18.3.7 17 .3 15.8.2s-2.3.2-3 .7-.8 1.3-.9 2.1c.3 0 .5 0 .6.2 0 .1.1.3 0 .4 0 .2-.1.3-.2.4h-.5c.3.1.7.3 1 .5.8.6 1.5 1.2 2 2.1 0-.1.1-.1.1-.2l.1-3.1c0-.4-.1-1.1.6-1.1s.6.7.6 1.1v.6l3.1.3zm3.5 9.7c.4-1.2.6-2.4.5-3.6l-3.9.1v.3c-.1.6-.2 1-.3 1.4s-.2.8-.4 1.2c-.2.5-.5 1-.8 1.5l.1 2.7c0 .2 0 .5-.1.7.1 0 .2 0 .3-.1.8-.2 1.5-.5 2.1-1 .2-.2.4-.3.6-.5l-.1-4.1c.4 0 .5.2.6.7l.1 1.6h1c0-.4.2-.6.3-.9zm1.7-2zm3.5 1.4l2.3-.1-.1-2.3c-.9-.6-1.8-.8-2.8-.9.1.2.2.3.2.5l.3 1.2c.1.4.1.8.1 1.2 0 0 0-.1-.1-.1-.1-.8-.2-1.6-.5-2.4 0-.2-.1-.3-.2-.4h-.7c-.9 0-1.8.2-2.5.7-.3.2-.4.4-.6.6 0 .1.1.3.2.3v.2s-.1.1-.1.2c-.1.2-.1.4-.1.6-.1.2-.1.4-.2.6-.2.5-.4.9-.6 1.3h.9v-.1l-.1-.1h.1v.1c.4.9 1.3 1.2 2.7 1.5.5.1 1 .2 1.3.5.3-.9.4-1.8.4-2.7-.2 0-.4-.1-.5-.1-.3-.1-.7-.2-.9-.4s-.2-.3-.2-.5c0-.4.2-.7.6-.7.6 0 .6.6.6 1v.2l.5.1c-.1-.2-.1-.2-.1-.3l.1.3zm2.7 3.5c0-.5-.1-1-.3-1.4s-.4-.7-.8-.9c-.5-.3-1.1-.5-1.7-.6v.9c-.1.6-.2 1-.3 1.4 0 .1-.1.3-.1.4.1.2.2.4.2.7 0 .4-.2.8-.6.8h-.2c-.3.5-.6 1-.9 1.4-.2.2-.3.4-.5.6.5.1 1.1.1 1.6.1 2.9-.1 3.7-1.6 3.6-3.4z" })
], -1 /* HOISTED */);
const _hoisted_5 = { class: "ml-0 w-full h1" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");

  return (vue.openBlock(), vue.createBlock("div", null, [
    vue.createVNode("header", _hoisted_1$2, [
      vue.createVNode("div", _hoisted_2$2, [
        vue.createVNode("div", _hoisted_3, [
          vue.createVNode(_component_router_link, {
            to: _ctx.home(_ctx.homeUrl),
            class: "cursor-pointer header__logo__inner"
          }, {
            default: vue.withCtx(() => [
              _hoisted_4
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["to"])
        ])
      ])
    ]),
    vue.createVNode("h1", _hoisted_5, vue.toDisplayString(_ctx.title), 1 /* TEXT */)
  ]))
}

script$2.render = render$2;
script$2.__file = "src/components/pageTitle/PageTitle.vue";

var script$1 = vue.defineComponent({
    name: 'BackButton',
    props: {
        isLoading: {
            type: Boolean,
            required: true,
            default: false
        }
    }
});

const _hoisted_1$1 = {
  class: "fill-current text-white animate-spin h-5 w-5 inline-block",
  viewBox: "0 0 24 24"
};
const _hoisted_2$1 = /*#__PURE__*/vue.createVNode("path", { d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, null, -1 /* HOISTED */);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.withDirectives((vue.openBlock(), vue.createBlock("svg", _hoisted_1$1, [
    _hoisted_2$1
  ], 512 /* NEED_PATCH */)), [
    [vue.vShow, _ctx.isLoading]
  ])
}

script$1.render = render$1;
script$1.__file = "src/components/loader/Loader.vue";

var script = vue.defineComponent({
    name: 'CustomButton',
    components: {
        loader: script$1
    },
    props: {
        text: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        type: {
            type: String,
            default: 'submit',
            required: false
        },
        isSubmitting: {
            type: Boolean,
            default: false,
            required: false
        }
    }
});

const _withId = /*#__PURE__*/vue.withScopeId("data-v-56556b4f");

vue.pushScopeId("data-v-56556b4f");
const _hoisted_1 = { class: "btn-simple-dark mt-0 relative" };
const _hoisted_2 = { class: "absolute flex justify-center items-center w-full left-0 top-0 h-full" };
vue.popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_loader = vue.resolveComponent("loader");

  return (vue.openBlock(), vue.createBlock("button", {
    disabled: _ctx.disabled || _ctx.isSubmitting,
    class: ["btn-simple-dark", {
      ' animate-pulse2 loading': _ctx.isSubmitting
    }],
    type: _ctx.type
  }, [
    vue.createVNode("a", _hoisted_1, [
      vue.createVNode("span", {
        class: { 'opacity-0': _ctx.isSubmitting }
      }, vue.toDisplayString(_ctx.text), 3 /* TEXT, CLASS */),
      vue.renderSlot(_ctx.$slots, "icon"),
      vue.withDirectives(vue.createVNode("div", _hoisted_2, [
        vue.createVNode(_component_loader, { "is-loading": _ctx.isSubmitting }, null, 8 /* PROPS */, ["is-loading"])
      ], 512 /* NEED_PATCH */), [
        [vue.vShow, _ctx.isSubmitting]
      ])
    ])
  ], 10 /* CLASS, PROPS */, ["disabled", "type"]))
});

script.render = render;
script.__scopeId = "data-v-56556b4f";
script.__file = "src/components/customButton/CustomButton.vue";

exports.BasePage = script$3;
exports.CustomButton = script;
exports.CustomInput = script$4;
exports.HelloWorld = script$6;
exports.PageTitle = script$2;
//# sourceMappingURL=index.js.map
