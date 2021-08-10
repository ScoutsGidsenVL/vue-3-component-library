import { ErrorMessage, useField, defineRule, configure } from 'vee-validate';
import { defineComponent, openBlock, createBlock, createCommentVNode, watch, resolveComponent, createVNode, createTextVNode, toDisplayString, renderSlot, withDirectives, vModelDynamic, vModelText, withCtx, vShow, pushScopeId, popScopeId, withScopeId, ref, toRefs, Fragment, renderList, vModelRadio } from 'vue';
import { localize, setLocale } from '@vee-validate/i18n';
import { required } from '@vee-validate/rules';

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

var script$6 = defineComponent({
    name: 'Required',
    props: {
        rules: {
            type: [Object, String, Function],
            default: '',
            required: false
        }
    }
});

const _hoisted_1$5 = {
  key: 0,
  class: "text-red ml-1"
};

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.rules.includes('required') || _ctx.rules.includes('customRequired'))
    ? (openBlock(), createBlock("label", _hoisted_1$5, "*"))
    : createCommentVNode("v-if", true)
}

script$6.render = render$6;
script$6.__file = "src/components/required/Required.vue";

var script$5 = defineComponent({
    name: 'CustomInput',
    components: {
        ErrorMessage: ErrorMessage,
        Required: script$6
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
        watch(function () { return inputValue.value; }, function () {
            cardNumberSpace();
        });
        return {
            InputTypes: InputTypes,
            inputValue: inputValue
        };
    }
});

const _hoisted_1$4 = { key: 0 };
const _hoisted_2$4 = {
  key: 1,
  style: {"font-size":"13px"}
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_required = resolveComponent("required");
  const _component_ErrorMessage = resolveComponent("ErrorMessage");

  return (openBlock(), createBlock("div", null, [
    (!_ctx.hideInput && _ctx.label)
      ? (openBlock(), createBlock("strong", _hoisted_1$4, [
          createVNode("p", null, [
            createTextVNode(toDisplayString(_ctx.label) + " ", 1 /* TEXT */),
            createVNode(_component_required, { rules: _ctx.rules }, null, 8 /* PROPS */, ["rules"])
          ])
        ]))
      : createCommentVNode("v-if", true),
    (_ctx.extraInfo)
      ? (openBlock(), createBlock("div", _hoisted_2$4, [
          createVNode("label", null, toDisplayString(_ctx.extraInfo), 1 /* TEXT */)
        ]))
      : createCommentVNode("v-if", true),
    createVNode("div", null, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createVNode("div", {
      class: {
        'text-lightGray animate-pulse2 bg-lightGray': _ctx.isSubmitting
      }
    }, [
      (_ctx.type !== _ctx.InputTypes.TEXT_AREA && !_ctx.hideInput && _ctx.type !== _ctx.InputTypes.TIME)
        ? withDirectives((openBlock(), createBlock("input", {
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
            [vModelDynamic, _ctx.inputValue]
          ])
        : createCommentVNode("v-if", true),
      (_ctx.type === _ctx.InputTypes.TIME)
        ? withDirectives((openBlock(), createBlock("input", {
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
            [vModelText, _ctx.inputValue]
          ])
        : createCommentVNode("v-if", true)
    ], 2 /* CLASS */),
    (_ctx.type === _ctx.InputTypes.TEXT_AREA && !_ctx.hideInput && _ctx.type !== _ctx.InputTypes.TIME)
      ? withDirectives((openBlock(), createBlock("textarea", {
          key: 2,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (_ctx.inputValue = $event)),
          class: ["bg-lightGray p-2 h-32", 'md:' + _ctx.textAreaWidth + ' ' + 'xs:w-full'],
          type: 'text',
          name: _ctx.name,
          maxlength: "500",
          disabled: _ctx.disabled || _ctx.isSubmitting
        }, null, 10 /* CLASS, PROPS */, ["name", "disabled"])), [
          [vModelText, _ctx.inputValue]
        ])
      : createCommentVNode("v-if", true),
    createVNode("span", { name: _ctx.name }, [
      createVNode(_component_ErrorMessage, {
        name: _ctx.name,
        class: "text-red text-sm block mt-1 w-80"
      }, null, 8 /* PROPS */, ["name"])
    ], 8 /* PROPS */, ["name"])
  ]))
}

script$5.render = render$5;
script$5.__file = "src/components/inputs/CustomInput.vue";

var script$4 = defineComponent({
    name: 'BasePage'
});

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]))
}

script$4.render = render$4;
script$4.__file = "src/components/basePage/BasePage.vue";

var script$3 = defineComponent({
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

const _hoisted_1$3 = {
  class: "header",
  role: "banner"
};
const _hoisted_2$3 = { class: "header__inner" };
const _hoisted_3$1 = { class: "header__logo" };
const _hoisted_4$1 = /*#__PURE__*/createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 30.7 46.8"
}, [
  /*#__PURE__*/createVNode("path", { d: "M22 28.6l-.2.2c-.2 0-.3 0-.3-.1v-.2c0-.1.1-.2.1-.2h.2c.1 0 .1 0 .2.1v.1c-.1 0 0 .1 0 .1zm7.1 5.5c.1-.1.1-.2.3-.3v-2h-2.6c.1-.1.2-.1.2-.1.9-.7 1-1.5 1.1-2.6l.3-4.1c.1-1 .1-2-.8-2.8-.7-.6-1.7-.7-2.6-.8.1.2.2.5.2.7 0 .4 0 .8-.1 1.2l.3.2.2.5s-.1-.1-.2 0v.3l.1.1h-.2v.2l-.1-.1h-.1c0 .1.1.1.1.2s0 .1.1.2c.1.3.2.6.2.9v1c0 .3-.2.7-.4 1l-.1.1-.1 1.1c-.1.8-.3 1-1 1h-.3l.1-1.4c-.3.1-.6.1-.8 0-.5-.1-1-.2-1.4-.6-.4-.3-.7-.7-.9-1.1 0 .1-.1.1-.1.1l-.2 2.2c0 .4-.1.7-.5.8l-.1 1.9h.2c.1 0 .1.1.2.1v-.1l.6.1v.4c.2.1.5.3.7.4 1.2.6 2.6 1 3.9 1.2l-.6-1.6H26s.1 0 .2-.1v1.5l.3.3c.5 0 .7.1 1.2.1l-.2.2c-.4 0-.5 0-.9-.1v1.9l1.9-1.8-1 3.8h.1l1-3.8.8 2.5-1.5 1.5 1.5-1.3v-2.8c-.8 0-.7-.1-.3-.2zM18.5 6.7l.1-.3h-.3l-.1.1c-.1 0-.2 0-.3.1-.1 0-.2 0-.3-.1 0 0 0-.1-.1-.2h-1.4v1.1c0 .4.1 1.1-.6 1.1v.2c.3.1.6.1.9.2.3.1.7.2 1 .3l.6.3.6.3.1.1c.1-.1.2-.1.3-.2V7.6h-.3v-.1s.1-.1.2-.1h.1v-.5c-.1.1-.2.1-.4.1.1 0 0-.1-.1-.3zm.7 3.7l-1.6.1.9-.3c-.4-.1-.8-.3-1.2-.3-.6-.1-1.2-.2-1.7-.3 0 .3-.1.5-.1.8v.2h-.2c0-.1.1-.2.1-.4v-.6c-.9 0-1.9.1-2.8.3v.1c.5.5 1.4.7 2.4.8l.1 3.1h.1l.2-.6.3-.5-.3.6v.2l-.4.6v.4c.1 0 .1 0 .2-.1l.3-.3-.3.5v.3l2.1-.1-.1-1.6c0-.4.1-.7.5-.7l.1 2.1c.3-.4.5-.8.7-1.3.4-1 .7-1.9.7-3zM8.6 24.5c-.1 0-.1 0 0 0v-.2c-.1 0-.3.1-.5.1-.3 0-.4.2-.4.4l.3.1c0-.2 0-.3.2-.2h.3c-.7 1.1-1.1 2.3-1.4 3.6h-.2c-.1 0-.2.1-.2.2-.1.1-.2.1-.3.2h-.1v.1c.3-.1.5 0 .6 0v.1l-.1.1-.2.2.3.1c0 .1 0 .3-.1.4v.5c.1.2.2.3.4.4.3.3.7.5 1 .6.2-.8.6-1.6 1.1-2.3.1-.1.2-.3.4-.4v-.1l.3-4.9c0-.3.1-.6.2-.8-.2.1-.3.2-.5.4l-.7.7c-.1.2-.2.5-.4.7zm-.4-.7c-.1 0-.2.1-.3.2-.1.1-.2.1-.3.1l.1.1h.4s.1-.1.2-.1l.1-.1v-.1l-.2-.1zm-.2-.1l.1-.2h-.3s-.1.1-.1.2c0 0 .1 0 .2.1 0-.2.1-.2.1-.1zm-1 2.4s-.1.1-.2.1h-.3v.2H7l.3-.2-.1-.2c-.1 0-.2 0-.2.1zm-.3-1.5c.1 0 .2 0 .3-.2l-.1-.1-.3.2h-.1v.2c.1 0 .1 0 .2-.1zm-.6 7.6l.2.2-.4-.4h-.2c-.1.1-.1.1-.2.1h-.3l-.3-.2c-.1 0-.1 0-.2.1v.1s-.1.1-.1 0c-.1 0-.1 0-.1.1s0 .1.1.2c.1 0 .1.1.2.1l-.2-.3c-.1 0-.1 0-.1.1s0 .1.1.1h-.1c.7.8 1.4 1.4 2.2 1.8.1-.1.2-.1.4-.1.4 0 .5.2.6.5.5.1 1.1.2 1.6.2l-.1.1c-.3 0-.6 0-.9-.1-.2 0-.4-.1-.6-.2 0 .2.1.4.1.6v.2h3.3v-.8H11c-.2.1-.5.1-.7.1s-.5.1-.7.1c0 0 .1 0 .1-.1.5 0 1-.1 1.5-.2v-1.7c-.3-.2-.6-.4-1-.5 0 .1 0 .1.1.1h-.1s-.1.1 0 .1c0 .1 0 .1.1.1H10l-.1.1s0 .1.1.1c-.1-.1-.2-.1-.2-.1h-.2s-.1 0-.1-.1h-.2c0-.1 0-.1-.1-.1s-.1 0-.2-.1v-.1s-.1 0-.1-.1l-.1-.2v-.2c-.2 0-.3-.1-.5-.1h-.2c-.1 0-.1.1.1.2-.1 0-.1 0-.1-.1 0 0 0-.1-.1-.1-.2-.1-.4-.1-.6 0s-.4.1-.6 0l-.1.1c0 .1 0 .1-.1.2l.4.2.3.2-.4-.2h-.1l-.6-.4c-.2.1-.2.2-.1.4zm-2.1.2c0 .1 0 .1 0 0-.1.1-.1.1 0 0-.1.1-.2.1-.2.1-.1.4-.2.9-.1 1.3.1.5.3 1 .6 1.4.5.7 1.1 1.3 1.9 1.6s1.6.4 2.5.4c.2 0 .4-.1.5-.1.2 0 .3-.1.5-.1v.1c.1 0 .2.1.3.1.1.1.2.1.3-.1l-.1-.2c-.1.1-.1.1-.2.1h-.1c0-.1-.1-.1-.1-.1.1 0 .2-.1.3-.1-.7-.4-1.8-.7-2.6-1-.3-.1-.8-.2-1-.4s-.2-.4-.2-.6.1-.4.2-.6c-.4-.2-.9-.5-1.2-.8-.4-.3-.7-.7-1.1-1.1l-.2.1c0-.1 0-.1 0 0 .1 0 .1.1 0 0 .1 0 .1 0 0 0zm-.4 1.4v-1.1c-.5.5-.7 1.1-.7 2.1v.2c0 2.4 1.2 2.9 3.3 3.5 1 .2 1.7.3 1.7 1.5 0 .4-.2.9-.7.9-.3 0-.5-.1-.6-.4-.1-.2-.1-.7-.1-1.4H3.1v3c1.1.9 2.6 1.2 4.1 1.2 3.3 0 4.3-1.6 4.3-3.8v-.1c0-.5-.1-1.1-.3-1.5 0-.1-.1-.2-.2-.3h-.2c-.1 0-.1-.1-.2 0v.1h.2l.1.1-.6.1-.1-.1h-.1v.1h-.4c-1.1 0-2.1-.3-3.1-.7s-1.9-1.1-2.5-2.1c-.2-.4-.4-.8-.5-1.3zm6.1 3.6c.2.1.2.1.3.1s.1 0 .2.1v-.1c-.1-.1-.1-.1-.2-.1h-.1c-.1-.1-.2-.1-.2 0zm.1.2c-.1.1 0 .1 0 0 0 .1 0 .1.1.2 0 0 .1 0 .1-.1 0 0 0-.1-.1-.1-.1.1-.1 0-.1 0zM6.4 26.8v.3c.1 0 .1-.1.2-.1.1-.1.4-.1.5-.1v-.2l-.1-.1c-.2.1-.3.2-.4.2h-.2zm.2 1.1c-.1.1-.2.1-.3.2v.2c.2 0 .3 0 .5-.1 0 0 .1-.1.2-.1.1-.1.1-.1.1-.2v-.1h-.2c-.1.1-.2.1-.3.1zm.5-2.4v.1h.1l.1-.1v-.1l-.2.1c.1 0 .1 0 0 0zm5.2 5.3h.2-.2zm-1.9-1.6c-.4 0-.6-.3-.6-.5l-.4.4c-.5.7-.8 1.4-1 2.1.5.2 1.1.3 1.7.3.9.1 2 0 2.9-.3v-.1c-.1-.1-.1-.1-.2-.1l.1-.1v-.1h-.1l.3-.3v-.1s-.1-.1-.2-.1c.2 0 .3 0 .4-.1 0 0 .1-.1 0-.1V30h.3l.2-.2c.1.1.1.1.3.1l.3-4.4c-1.1.4-2.1.9-3.1 1.6v-.2c.4-.3.8-.6 1.3-.8.5-.3 1-.5 1.4-.6.1 0 .2 0 .2-.1l-3.8-.3.2 2.2h.4l.2-.2s0 .1-.1.2v.5c0 .5 0 1.4-.7 1.4zm1.6 5.7v5c0 .4 0 .8-.4 1.1v2H20v-3.6c-.3-.2-.6-.3-.9-.5h-2.3v.4c0 .9 0 1.3-1 1.3h-.2v-2.3h2.2v-.4c-.6-.5-1.2-1.1-1.7-1.8h-.5v-.7c-.1-.2-.3-.4-.4-.6-.6-1-1-2-1.2-3.1h-2.4v2c.4.4.4.8.4 1.2zm7.8 4.1zm-2.3-1.3v-1.4h-1.4c.5.5.9 1 1.4 1.4zm-3.9-16.5c-1.1.3-2.1.8-3 1.4.1 0 .2-.1.3-.1.8.1.6 1 .6 1.5v.2l3.3.2.2-2.8-.9-.6c-.3.1-.4.1-.5.2zm1.1 8.5l-.1 1.9 2.9.2H14v.2c.3 1.1.7 2.2 1.4 3.1v-1h.2c.9 0 1 .3 1 1.1v.3h3.2v-3.4c-.2-.1-.4-.3-.7-.4h-.4l.1-1.9c-.4-.3-.3-.7-.3-1.1l.3-4.9c0-.4 0-.8.4-1l.1-1.9-3.9-.2-.1 1.9c.4.3.3.7.3 1.1l-.3 4.9c-.2.5-.2.9-.6 1.1zm3.4-11.4h-.3c0 .1-.1.1-.2.2l.1 1.7 3.7-.1-.1-1.7c-.4-.2-.3-.6-.4-.9v-.7c-.3.2-.5.5-.9.7-.5.3-1.2.6-1.9.8zm4.5 3.3c-.4-.2-.9-.4-1.4-.5l-1-.1-.1 1.7s.1 0 .1.1h.1c0 .1 0 .1.1.1s.1 0 .1.1v.1l.1.1.1.2v.3l.7-.1c.1 0 .1-.1 0-.1 0 0 .1 0 .1.1v.1c.2.1.4.1.5 0 .2-.1.4 0 .5.1l.1-.1s0-.1.1-.1l-.3-.2-.3-.2.3.2h.1l.5.4s.1-.1 0-.2c0-.1-.1-.1-.1-.2l.3.4h.1l.1-.1h.3l.2.2h.2v-.1h.2c0-.1 0-.1-.1-.1s-.1-.1-.1-.1l.2.1h.1v-.1c-.6-1.1-1.2-1.6-1.8-2zm.5 3c0-.1 0-.1 0 0 0-.1 0-.1-.1-.2h-.1c0 .1-.1.1-.1.2l-.7.3.1-.1h.1v-.1h.1l.2-.1v-.2h-.2l-.8-.1h-.2l-.2.1h-.4c-.1 0-.2 0-.3.1l-.1.9c.5 0 1 0 1.6-.1s1.1-.3 1.7-.6c.1 0 .2-.1.2-.2v-.1h-.1c-.1 0-.1-.1-.2 0h-.2v-.1h-.1c-.1.2-.1.2-.2.3zm.3 1.5c-.1.1-.1.1 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zm-.5 1.3l-.2.1-.1-.2c0-.1.1-.1.2-.1l.1.1v.1zm-.5-.9l-.1.1h-.2s0-.1-.1-.1l.1-.2h.1c.2 0 .2.1.2.2zm-.5 0l-.1.1-.4.1.3-.4h.2v.2zm1.6 1.9l.2-3.4c-.2.2-.5.3-.8.5s-.8.3-1.3.4h-1.3v.4c.1.4.3.7.6 1s.6.6.9.8l.6.3c.2.1.4.1.7.1.2 0 .3 0 .4-.1zm1.4-7l-3.3-.3c.1 0 .3.1.4.1l.6.3c.4.2.7.5 1 .7.3.3.6.6.8 1h.2s0-.1 0 0h.1c.2-.4.2-.8.2-1.2.2-.2.1-.4 0-.6zm.1 3.2v.8h-.1l-.1 2.3.2-.2c.2-.5.3-1 .3-1.6 0-.5-.1-.9-.3-1.3zm1.4-8l-3 .1v1.2h.1c.1 0 .2 0 .3.1l.2-.6.3-.5-.3.6v.2l-.6 1v.1c.1.1.2.1.4-.1l.3-.3-.5.5c0 .1 0 .2.1.3.1.1.1.2.2.3.5.3 1 .5 1.6.6.6-.7 1.1-1.3 1.4-2-.1-.1-.2-.1-.3-.2-.1-.3-.1-.8-.2-1.3zm-2.9 21.7v-.6l-.4-.1c-.1 0-.2 0-.3-.1l-.1.3.1.1-.1.2h-.1v.1l.6.1-.2 1-2.2-.6.2-.9.6.1v-.1h-.1l.1-.2h.1l.1-.3c-.1 0-.2 0-.3-.1l-.3-.1-.2.6h-.2v2c.9.3 1.8.5 2.7.6v-2zm-.2-.8l.4.1-.1.5v.1l.6.2.5-2-.6-.2-.2.6-.4-.1c0 .1-.2.3-.2.3s.1.3 0 .5zm-1.5-2.2l.6.2-.1.4c.2 0 .4.2.4.2s.2-.1.4 0l.1-.4.6.1.2-.6-2-.5-.2.6zm.8 2.7l-.8-.2-.1.3-.6-.2-.2.7 2 .5.2-.6-.6-.1.1-.4zm-.7-.5c.2-.1.2-.3.2-.3s-.1.1-.2.1v.2zm.7-.3s-.1.2.1.4l.1-.3c-.1 0-.2-.1-.2-.1zm-1.8.3l.2-.6.4.1c0-.2.2-.4.2-.4s-.1-.2 0-.4l-.4-.1.2-.6-.6-.2v2.2zm0-2.2l.8.2-.1.6.3.1c.1-.1.4 0 .4 0s-.1-.2.1-.3l.1-.3-.6-.1.2-.9 2.2.6-.2 1-.6-.1-.1.3c.1.1 0 .3 0 .3s.2 0 .3.1l.3.1.1-.6.9.2-.6 2.2-.7-.2.7 1.7.6 1.6.6 1.4h3.4v-3.9l-.4.4-.8-.8-.1.1.2.1-.2.5-.4-.1.5 1.2-.5-.1-.2-.4v.8l-.7.6-.3-.8.3-.7-.3.2-.6-.1 1-.8-.4-.1.1-.6.3.1v-.2l-1.1.3-.5-1.7 1-1-.8-2.1h-.1c-.9-.1-1.6-.3-2.2-.5s-1.2-.4-1.8-.7c-.2-.1-.5-.3-.7-.4v1.2c.4.3.4.7.4 1.1v.5h.2zm8.2 2.9v.2l-.2-.2-.2.1.1-.2-.1-.2.2.1.1-.2v.3-.6l-1.7 1.4v.1h.1l.3-.3.8.8.5-.6v-.2l.1-.5zm-.8-3.2l-.8 3.3h.1l1.4-1.4-.7-1.9zM26 40.1l.6-.5.1-.2-.7.7zm.9-.1l-.3-.1-.4.9.2.6.5-.4v-1zm-1.2-2.6l-.2.1.1-.2-.2-.2.2.1.1-.2v.3l.2.1h-.2v.3-.3zm-.3 1.3l1.1-.3.1.4h.1v-.1l-.9-2.3-.8.8.4 1.5zm1.4-.4l-.6-1.9v.4l.6 1.5zm1-3.3l-1.5 1.4.6 1.9h.1l.8-3.3zm-.5 5.5h.2l-.4-1-.1.3.3.7zm.1 3.3h-.6v3h.7v-1.5l.9 1.5h.6v-3h-.7v1.5l-.9-1.5zm-1.2 0h-2v3h2v-.6h-1.3v-.5H26v-.6h-1.1v-.5h1.3v-.8zm-5.8-.7h3.5v-2l-.1-.1c-1-.3-2-.6-2.9-1 0 .4 0 .8-.4 1.1l-.1 2zm2.2 1.3c.2 0 .3.1.3.3s-.1.3-.3.3h-.4v-.6h.4zm.1-.6h-1.2v3h.7v-1.1h.2l.5 1.1h.8l-.6-1.2c.2-.1.5-.4.5-.8.1-.6-.3-1-.9-1zm-1.7 0h-2v3h2v-.6h-1.3v-.5h1.1v-.6h-1.1v-.5H21v-.8zm-3.7.6c.2 0 .3.1.3.2.1.1.1.2.1.7s0 .6-.1.7c-.1.1-.2.2-.3.2H17v-1.7h.3v-.1zm.1-.6h-1.1v3h1.1c.3 0 .6-.1.8-.3.3-.3.3-.7.3-1.2s0-.8-.3-1.2c-.2-.3-.5-.3-.8-.3zm-3.4 0h-.6v3h.7v-1.5l.9 1.5h.6v-3h-.7v1.5l-.9-1.5zm-2.5 1.9l.3-.8.2.8h-.5zm0-1.9l-1.1 3h.8l.1-.4h.9l.1.4h.8l-1.1-3h-.5zm-2.7 1.9l.3-.8.2.8h-.5zm-.1-1.9l-1.1 3h.8l.1-.4h.9l.2.3h.8l-1.1-3-.6.1zm-2.4 0h-.7v3h2v-.6H6.4l-.1-2.4zm-2.8 0h-.8l1 3h.5l1-3h-.8l-.5 1.7-.4-1.7zm-.9-17.6v.1c.1 0 .1-.1 0-.1zm-.2.7v.1-.1zm-.1-.2v.1h.1l-.1-.1zM3.4 25c.1 0 .1 0 0 0 .1 0 .1 0 0 0zm.4-6.2c-.6 0-.6-.7-.6-.7l-.1-4.4c0-.1-.1-.7.6-.8.6 0 .6.7.6.7l.2 4.4c-.1.1 0 .8-.7.8zm-.2 5c.1.3.3.6.5.9-.1.1-.3.2-.5.3.2-.1.3-.1.5-.3.1.1.2.3.3.4h-.1c-.1.1-.3.2-.5.2-.3 0-.6-.4-.6-.8 0-.3.1-.6.4-.7zm0 2.4c0 .1.1.1.1.1v.1h-.1v-.2zm.6-3.9c-.1-.2-.3-.5-.3-.7s.1-.3.2-.4l.3.4c.1.1.1.2.1.3-.1.2-.2.4-.3.4zm.4-.4c0-.1-.1-.1-.1-.2-.1-.1-.2-.3-.3-.4l.1-.1c.2 0 .3.2.3.4v.3zm0 1.4c.1-.1.1-.2.2-.3h.1v-.1c.3-.4.5-.8.5-1.2 0-.5-.3-.8-.6-1 .2 0 .8-.1 1-.2.8.8.7 1.7.7 2.2v.2H5.3v.5h.2c.1 0 .2.1.2.3 0 .1 0 .3-.2.4l-.2.2c-.1-.2-.3-.5-.4-.7v-.5c0 .1-.1.3-.1.4l-.2-.2zm1.1 1.3s0-.1 0 0c0-.1 0 0 0 0zm.2-.1c.1 0 .1 0 .1.1s0 .1.1.2c0 .1 0 .1.1.2h-.1c-.1-.1-.1-.1-.1-.2-.1-.2-.1-.2-.1-.3zm.2.1v-.1c-.1 0-.1 0-.1-.1v-.1s0-.1-.1-.1v-.1H6v.1l.1.1v.1l.1.1-.1.1c.1.1.1 0 0 0zm.1.1c.1 0 .1 0 0 0 .1 0 .1.1 0 0zm.1-.3c-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0l-.1-.1v-.1l-.1-.1L6 24v-.1h.1v.2s0 .1.1.1c0 0 0 .1.1.2 0-.1 0-.1 0 0zm0-.6zm0-.3s.1 0 .1-.1l-.1.1zm.1.6s-.1-.1 0 0l-.1-.1h.1v.1c0-.1 0 0 0 0zm.1-.2c0-.1.1-.1 0 0 .1 0 .1 0 0 0l.1.1-.1-.1c0 .1 0 0 0 0zm.1-.5v-.1.1zM4.4 10.8h-.9c-2.1.1-3.6.7-3.5 3.1L.1 18c.1 2.4 1.1 2.9 3.1 2.9-.2.2-.3.5-.3.9s.1.7.2 1.1c-.5.3-1.1.8-1.1 1.7 0 .7.3 1.4 1.1 1.6-.2.2-.3.4-.4.7-.1.1-.1.3-.1.6 0 .2.1.4.1.5.1.2.2.4.3.5.1.2.3.3.5.4s.4.2.7.2c.4 0 .8 0 1.2-.2.3-.2.6-.5.7-.8.1-.2.1-.3.1-.5s-.1-.3-.2-.5l-.3-.3c-.1 0-.2-.1-.4-.1h-.1v.1c.1 0 .2.1.3.1.1 0 .2.1.3.1.2.1.3.3.4.5 0 .2 0 .4-.1.6-.1.3-.4.5-.7.6-.3.2-.7.3-1 .2-.3 0-.6-.1-.8-.3-.2-.2-.4-.4-.5-.6s-.1-.4 0-.6c0-.2.1-.3.2-.5s.2-.3.4-.4c.1-.1.2-.2.3-.2l-.1-.1v-.1H4v.4l.1-.1-.1-.2h.1c0 .1.1.1.1.2.1 0 .1-.1.1-.1.1 0 .1-.1.2-.1v-.1h.1v.1l.1-.1h.1v.1H5v-.1h.2c.3.3.7.4 1 .4s.6-.1.7-.4c0 0 .1-.1.2-.1l.1-.1c0-.1-.1-.1-.2-.1 0-.1.1-.2.1-.4v-.3h-.6v.3c0 .2-.1.3-.3.3-.1 0-.3-.2-.4-.4v-.1l.1.1c0 .1.1.1.1.2h.1v-.2l-.1-.1s0-.1-.1-.1V25s-.1 0-.1-.1v-.1c.1 0 .1.1.1.1v.2l.1.1.1.1.4-.4c.1-.1.2-.2.2-.3l.5-.5h.2l.1-.1-.1-.1.2-.2.2-.2c1.5-1.1 3.2-1.8 5-2.2.2-.1.5-.1.8-.1-.3-.2-.7-.3-1-.4.4-.1.8-.2 1.2-.4-1.3-.1-2.5-.4-3.7-.9-.7-.3-1.4-.6-2-1.1.1.7.3 1.3 1 1.8.1.1.3.1.5.2-.6.1-1.2.2-1.7.6-.6.4-.9 1.1-1 1.7-.1-.3-.1-1.4-.8-2 1-.4 1.6-1.2 1.5-2.8v-.5c-.4-.4-.8-.8-1.1-1.3-.4-.6-.7-1.3-.9-2-.2-.7-.2-1.5 0-2.2l-.5-.2-.7-.9zm6.4 2.6c0-.4-.1-.7.3-1l-.1-1.7H9.6s0 .1-.1.1c0 .1 0 .2-.1.3l.6.2.6.4-.6-.3h-.2l-1-.6c-.1 0-.1.2.1.4l.3.3-.7-.6c-.1 0-.2 0-.3.1s-.2.1-.3.2h-.2l-.3.1-.1-.1.1 1.4c.2.1.3.3.3.5.7.6 1.5 1.1 2.2 1.4l.9.3v-1.4zM6 11.8c0 .1 0 .1 0 0h-.3c-.2.7-.3 1.5 0 2.3.2.8.5 1.5 1 2.1.2.3.5.6.7.8l-.1-3.3c0-.8-.2-1.4-.6-1.9l-.1-.1h-.5c0 .1 0 .1-.1.1.1 0 .1 0 0 0zm-.4-2.5V7.4c0-.2.1-.5.1-.7H4v2.7c.5.4 1.2.7 1.8.9 0-.4-.1-.7-.2-1zm5.8-5.8V1.1C10.3.3 9.1 0 7.7 0c-.9 0-1.9.1-2.6.6-.8.6-1 1.2-1.1 2.2V3c0 1.8.7 2.5 2.1 2.9.1-.1.1-.3.2-.4.4-.6.9-1.1 1.5-1.4l.6-.3h-.1c-.3-.1-.7-.2-.9-.4-.2-.2-.2-.4-.2-.6 0-.4.2-.7.6-.7.6 0 .6.6.6 1.1v.2l3 .1zm-.6 2.6c0 .1-.2.2-.4.2 0 0-.1 0-.1-.1v-.4l.1-.1h.1l.3.4zM9.6 8.4l-.1.1c-.1 0-.1 0-.1-.1.1-.1.1-.1.2 0 0-.1 0-.1 0 0zM7.2 9c0 .1-.1.1-.2.1h-.1L6.8 9v-.1s.1-.1.3-.1c0 0 .1 0 .1.2zm-.4.3l.2.2c0 .2-.4.4-.5.4s-.3 0-.5-.1v-.1c.1 0 .5-.2.6-.3-.1 0 0-.1.2-.1zm4.8-2.1c0-.5-.1-1-.2-1.4-.1-.4-.4-.7-.8-1-.5-.4-1.3-.6-2-.8-.4.1-.8.2-1.1.4-.6.4-1.1.9-1.4 1.6.2.1.5.2.8.2.9.2 1.5.3 1.5 1.4 0 .4-.2.8-.6.8-.2 0-.5-.1-.6-.3s-.1-.7-.1-1.3H5.8c-.2.7-.3 1.5-.1 2.4.1.4.1.8.3 1.2.6.1 1.1.2 1.7.2.4 0 .8 0 1.1-.1.5-.4.9-.7 1.4-.9l.9-.3c.2-.3.3-.7.4-1.2-.2 0-.3-.2-.3-.5l.2-.2h.1c.1-.1.1-.1.1-.2zm.3 3.6c-.1 0-.1 0-.2-.1h-.1l.1 1.7c.4.2.4.6.4.9l.1 1.7c.7.1 1.4.2 2.1.1l-.1.1c-.5 0-1 0-1.5-.1-.2 0-.4-.1-.5-.1l.1 2.6c0 .2 0 .7-.6.7s-.6-.5-.6-.7l-.1-3-.9-.3c-.7-.3-1.5-.7-2-1.2-.1 0-.1-.1-.2-.1v.3l.1 3.9v.5c.5.3.9.6 1.5.8 1.3.4 2.6.6 4 .5.3-.1.6-.1.9-.2.1 0 .3-.1.5-.1.2-.5.2-1 .2-1.6l-.1-1.9h-.4s.1 0 .1-.1c.1 0 .2 0 .3-.1l-.1-1.9c0-.4 0-.8.2-.9v-.7h-.2l-.1.1s0 .1.1.2c-.1-.1-.3-.2-.4-.2h-.2s-.1 0-.2-.1l-.3.1c0-.1 0-.2-.2-.2-.1 0-.2 0-.3-.1v-.1s-.1 0-.1-.1l-.1-.3v-.3h-1.2c-.1.2-.1.3 0 .3zm1.2-3.6l-.5.8-.4-.1-.3-.4v-.1s.1-.1.1-.2l.8-.3h.1c.1.2.1.2.2.3zm.6-1.2c-.5-.5-1.1-1-1.8-1.3v2.2c0 .7 0 1.4.2 2 .2 0 .3-.1.5-.1 1-.1 1.9-.1 2.8 0 0-.1 0-.2-.1-.3s-.2-.3-.2-.5v-.1c-.4-.7-.8-1.4-1.4-1.9zm5.6-1.8V1.4C18.3.7 17 .3 15.8.2s-2.3.2-3 .7-.8 1.3-.9 2.1c.3 0 .5 0 .6.2 0 .1.1.3 0 .4 0 .2-.1.3-.2.4h-.5c.3.1.7.3 1 .5.8.6 1.5 1.2 2 2.1 0-.1.1-.1.1-.2l.1-3.1c0-.4-.1-1.1.6-1.1s.6.7.6 1.1v.6l3.1.3zm3.5 9.7c.4-1.2.6-2.4.5-3.6l-3.9.1v.3c-.1.6-.2 1-.3 1.4s-.2.8-.4 1.2c-.2.5-.5 1-.8 1.5l.1 2.7c0 .2 0 .5-.1.7.1 0 .2 0 .3-.1.8-.2 1.5-.5 2.1-1 .2-.2.4-.3.6-.5l-.1-4.1c.4 0 .5.2.6.7l.1 1.6h1c0-.4.2-.6.3-.9zm1.7-2zm3.5 1.4l2.3-.1-.1-2.3c-.9-.6-1.8-.8-2.8-.9.1.2.2.3.2.5l.3 1.2c.1.4.1.8.1 1.2 0 0 0-.1-.1-.1-.1-.8-.2-1.6-.5-2.4 0-.2-.1-.3-.2-.4h-.7c-.9 0-1.8.2-2.5.7-.3.2-.4.4-.6.6 0 .1.1.3.2.3v.2s-.1.1-.1.2c-.1.2-.1.4-.1.6-.1.2-.1.4-.2.6-.2.5-.4.9-.6 1.3h.9v-.1l-.1-.1h.1v.1c.4.9 1.3 1.2 2.7 1.5.5.1 1 .2 1.3.5.3-.9.4-1.8.4-2.7-.2 0-.4-.1-.5-.1-.3-.1-.7-.2-.9-.4s-.2-.3-.2-.5c0-.4.2-.7.6-.7.6 0 .6.6.6 1v.2l.5.1c-.1-.2-.1-.2-.1-.3l.1.3zm2.7 3.5c0-.5-.1-1-.3-1.4s-.4-.7-.8-.9c-.5-.3-1.1-.5-1.7-.6v.9c-.1.6-.2 1-.3 1.4 0 .1-.1.3-.1.4.1.2.2.4.2.7 0 .4-.2.8-.6.8h-.2c-.3.5-.6 1-.9 1.4-.2.2-.3.4-.5.6.5.1 1.1.1 1.6.1 2.9-.1 3.7-1.6 3.6-3.4z" })
], -1 /* HOISTED */);
const _hoisted_5$1 = { class: "ml-0 w-full h1" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createBlock("div", null, [
    createVNode("header", _hoisted_1$3, [
      createVNode("div", _hoisted_2$3, [
        createVNode("div", _hoisted_3$1, [
          createVNode(_component_router_link, {
            to: _ctx.home(_ctx.homeUrl),
            class: "cursor-pointer header__logo__inner"
          }, {
            default: withCtx(() => [
              _hoisted_4$1
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["to"])
        ])
      ])
    ]),
    createVNode("h1", _hoisted_5$1, toDisplayString(_ctx.title), 1 /* TEXT */)
  ]))
}

script$3.render = render$3;
script$3.__file = "src/components/pageTitle/PageTitle.vue";

var script$2 = defineComponent({
    name: 'BackButton',
    props: {
        isLoading: {
            type: Boolean,
            required: true,
            default: false
        }
    }
});

const _hoisted_1$2 = {
  class: "fill-current text-white animate-spin h-5 w-5 inline-block",
  viewBox: "0 0 24 24"
};
const _hoisted_2$2 = /*#__PURE__*/createVNode("path", { d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, null, -1 /* HOISTED */);

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createBlock("svg", _hoisted_1$2, [
    _hoisted_2$2
  ], 512 /* NEED_PATCH */)), [
    [vShow, _ctx.isLoading]
  ])
}

script$2.render = render$2;
script$2.__file = "src/components/loader/Loader.vue";

var script$1 = defineComponent({
    name: 'CustomButton',
    components: {
        loader: script$2
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

const _withId$1 = /*#__PURE__*/withScopeId("data-v-56556b4f");

pushScopeId("data-v-56556b4f");
const _hoisted_1$1 = { class: "btn-simple-dark mt-0 relative" };
const _hoisted_2$1 = { class: "absolute flex justify-center items-center w-full left-0 top-0 h-full" };
popScopeId();

const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_loader = resolveComponent("loader");

  return (openBlock(), createBlock("button", {
    disabled: _ctx.disabled || _ctx.isSubmitting,
    class: ["btn-simple-dark", {
      ' animate-pulse2 loading': _ctx.isSubmitting
    }],
    type: _ctx.type
  }, [
    createVNode("a", _hoisted_1$1, [
      createVNode("span", {
        class: { 'opacity-0': _ctx.isSubmitting }
      }, toDisplayString(_ctx.text), 3 /* TEXT, CLASS */),
      renderSlot(_ctx.$slots, "icon"),
      withDirectives(createVNode("div", _hoisted_2$1, [
        createVNode(_component_loader, { "is-loading": _ctx.isSubmitting }, null, 8 /* PROPS */, ["is-loading"])
      ], 512 /* NEED_PATCH */), [
        [vShow, _ctx.isSubmitting]
      ])
    ])
  ], 10 /* CLASS, PROPS */, ["disabled", "type"]))
});

script$1.render = render$1;
script$1.__scopeId = "data-v-56556b4f";
script$1.__file = "src/components/customButton/CustomButton.vue";

var script = defineComponent({
    name: 'BaseSideBar',
    props: {
        title: {
            type: String,
            required: true
        },
        isDisplay: Boolean,
        selection: {
            type: String,
            required: false,
            default: ''
        },
        options: {
            type: Array,
            required: false
        },
        width: {
            type: String,
            default: 'w-2/5',
            required: false
        },
        isEdit: Boolean,
        name: String,
        isOverflowHidden: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    setup: function (props, context) {
        var selected = ref(props.selection);
        var _a = toRefs(props), isDisplay = _a.isDisplay, selection = _a.selection;
        var hideSideBar = function () {
            context.emit('update:isDisplay', false);
            context.emit('hideSidebar');
        };
        var emitOption = function () {
            context.emit('options', selected.value);
        };
        watch(selection, function (value) {
            selected.value = value;
        });
        watch(isDisplay, function (value) {
            if (props.isOverflowHidden === true) {
                if (value == true) {
                    document.body.classList.add('overflow-hidden');
                }
                else {
                    document.body.classList.remove('overflow-hidden');
                }
            }
        });
        return {
            hideSideBar: hideSideBar,
            emitOption: emitOption,
            selected: selected
        };
    }
});

const _withId = /*#__PURE__*/withScopeId("data-v-c69e8e72");

pushScopeId("data-v-c69e8e72");
const _hoisted_1 = { class: "px-4 pb-2 pt-3 custom-background" };
const _hoisted_2 = /*#__PURE__*/createVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-x-lg",
  viewBox: "0 0 16 16"
}, [
  /*#__PURE__*/createVNode("path", { d: "M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" })
], -1 /* HOISTED */);
const _hoisted_3 = {
  class: "group-search__title mb-3 mt-0 inline-block relative text-xl",
  style: {"font-size":"2rem","position":"initial","transition":"none !important"}
};
const _hoisted_4 = { class: "animate-none" };
const _hoisted_5 = {
  key: 0,
  action: ""
};
const _hoisted_6 = { class: "flex gap-7" };
popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", null, [
    (_ctx.isDisplay)
      ? (openBlock(), createBlock("div", {
          key: 0,
          class: "h-full w-full fixed top-0 left-0 overflow-x-hidden bg-black bg-opacity-20",
          onClick: _cache[1] || (_cache[1] = $event => (_ctx.hideSideBar()))
        }))
      : createCommentVNode("v-if", true),
    createVNode("div", {
      class: [{ 'd-flex': _ctx.isDisplay, 'd-none': !_ctx.isDisplay }, "bg-white fixed flex-col top-0 right-0 h-full z-20 xs:w-11/12 sm:w-11/12 md:w-100 max-w-md"]
    }, [
      createVNode("div", _hoisted_1, [
        createVNode("div", {
          class: "mb-4 cursor-pointer",
          onClick: _cache[2] || (_cache[2] = $event => (_ctx.hideSideBar()))
        }, [
          _hoisted_2
        ]),
        createVNode("h1", _hoisted_3, [
          createVNode("span", _hoisted_4, toDisplayString(_ctx.title), 1 /* TEXT */)
        ]),
        (_ctx.options && !_ctx.isEdit)
          ? (openBlock(), createBlock("form", _hoisted_5, [
              createVNode("div", _hoisted_6, [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.options, (option) => {
                  return (openBlock(), createBlock("div", { key: option }, [
                    withDirectives(createVNode("input", {
                      id: option.value + _ctx.name,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (_ctx.selected = $event)),
                      class: "cursor-pointer",
                      type: "radio",
                      name: option.value + _ctx.name,
                      value: option.value + _ctx.name,
                      onChange: _cache[4] || (_cache[4] = $event => (_ctx.emitOption()))
                    }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["id", "name", "value"]), [
                      [vModelRadio, _ctx.selected]
                    ]),
                    createVNode("label", {
                      for: option.value + _ctx.name,
                      class: "ml-2"
                    }, toDisplayString(option.text), 9 /* TEXT, PROPS */, ["for"])
                  ]))
                }), 128 /* KEYED_FRAGMENT */))
              ])
            ]))
          : createCommentVNode("v-if", true)
      ]),
      renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */)
  ]))
});

script.render = render;
script.__scopeId = "data-v-c69e8e72";
script.__file = "src/components/baseSideBar/BaseSideBar.vue";

var defineRules = function () {
    defineRule('required', required);
    configure({
        // Generates an English message locale generator
        // https://vee-validate.logaretm.com/v4/guide/i18n#global-message-generator
        generateMessage: localize({
            en: {
                messages: {
                    required: 'This field is required',
                },
            },
            nl: {
                messages: {
                    required: 'Dit veld is verplicht',
                },
            },
        }),
    });
    setLocale('nl');
};

export { script$4 as BasePage, script as BaseSideBar, script$1 as CustomButton, script$5 as CustomInput, InputTypes, script$3 as PageTitle, defineRules };
//# sourceMappingURL=index.esm.js.map
