/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bower_components_polymer_polymer_html__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bower_components_polymer_polymer_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__bower_components_polymer_polymer_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_js__ = __webpack_require__(4);
/**
 * include polymer in this build
 */


// import the rest of the component


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


__webpack_require__(2);

(function () {
  Polymer.nar = [];
  var disableUpgradeEnabled = Polymer.Settings.disableUpgradeEnabled;
  Polymer.Annotations = {
    parseAnnotations: function (template, stripWhiteSpace) {
      var list = [];
      var content = template._content || template.content;
      this._parseNodeAnnotations(content, list, stripWhiteSpace || template.hasAttribute('strip-whitespace'));
      return list;
    },
    _parseNodeAnnotations: function (node, list, stripWhiteSpace) {
      return node.nodeType === Node.TEXT_NODE ? this._parseTextNodeAnnotation(node, list) : this._parseElementAnnotations(node, list, stripWhiteSpace);
    },
    _bindingRegex: function () {
      var IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
      var NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
      var SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
      var DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
      var STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
      var ARGUMENT = '(?:' + IDENT + '|' + NUMBER + '|' + STRING + '\\s*' + ')';
      var ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
      var ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
      var BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')';
      var OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
      var CLOSE_BRACKET = '(?:]]|}})';
      var NEGATE = '(?:(!)\\s*)?';
      var EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
      return new RegExp(EXPRESSION, 'g');
    }(),
    _parseBindings: function (text) {
      var re = this._bindingRegex;
      var parts = [];
      var lastIndex = 0;
      var m;
      while ((m = re.exec(text)) !== null) {
        if (m.index > lastIndex) {
          parts.push({ literal: text.slice(lastIndex, m.index) });
        }
        var mode = m[1][0];
        var negate = Boolean(m[2]);
        var value = m[3].trim();
        var customEvent, notifyEvent, colon;
        if (mode == '{' && (colon = value.indexOf('::')) > 0) {
          notifyEvent = value.substring(colon + 2);
          value = value.substring(0, colon);
          customEvent = true;
        }
        parts.push({
          compoundIndex: parts.length,
          value: value,
          mode: mode,
          negate: negate,
          event: notifyEvent,
          customEvent: customEvent
        });
        lastIndex = re.lastIndex;
      }
      if (lastIndex && lastIndex < text.length) {
        var literal = text.substring(lastIndex);
        if (literal) {
          parts.push({ literal: literal });
        }
      }
      if (parts.length) {
        return parts;
      }
    },
    _literalFromParts: function (parts) {
      var s = '';
      for (var i = 0; i < parts.length; i++) {
        var literal = parts[i].literal;
        s += literal || '';
      }
      return s;
    },
    _parseTextNodeAnnotation: function (node, list) {
      var parts = this._parseBindings(node.textContent);
      if (parts) {
        node.textContent = this._literalFromParts(parts) || ' ';
        var annote = {
          bindings: [{
            kind: 'text',
            name: 'textContent',
            parts: parts,
            isCompound: parts.length !== 1
          }]
        };
        list.push(annote);
        return annote;
      }
    },
    _parseElementAnnotations: function (element, list, stripWhiteSpace) {
      var annote = {
        bindings: [],
        events: []
      };
      if (element.localName === 'content') {
        list._hasContent = true;
      }
      this._parseChildNodesAnnotations(element, annote, list, stripWhiteSpace);
      if (element.attributes) {
        this._parseNodeAttributeAnnotations(element, annote, list);
        if (this.prepElement) {
          this.prepElement(element);
        }
      }
      if (annote.bindings.length || annote.events.length || annote.id) {
        list.push(annote);
      }
      return annote;
    },
    _parseChildNodesAnnotations: function (root, annote, list, stripWhiteSpace) {
      if (root.firstChild) {
        var node = root.firstChild;
        var i = 0;
        while (node) {
          var next = node.nextSibling;
          if (node.localName === 'template' && !node.hasAttribute('preserve-content')) {
            this._parseTemplate(node, i, list, annote, stripWhiteSpace);
          }
          if (node.localName == 'slot') {
            node = this._replaceSlotWithContent(node);
          }
          if (node.nodeType === Node.TEXT_NODE) {
            var n = next;
            while (n && n.nodeType === Node.TEXT_NODE) {
              node.textContent += n.textContent;
              next = n.nextSibling;
              root.removeChild(n);
              n = next;
            }
            if (stripWhiteSpace && !node.textContent.trim()) {
              root.removeChild(node);
              i--;
            }
          }
          if (node.parentNode) {
            var childAnnotation = this._parseNodeAnnotations(node, list, stripWhiteSpace);
            if (childAnnotation) {
              childAnnotation.parent = annote;
              childAnnotation.index = i;
            }
          }
          node = next;
          i++;
        }
      }
    },
    _replaceSlotWithContent: function (slot) {
      var content = slot.ownerDocument.createElement('content');
      while (slot.firstChild) {
        content.appendChild(slot.firstChild);
      }
      var attrs = slot.attributes;
      for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        content.setAttribute(attr.name, attr.value);
      }
      var name = slot.getAttribute('name');
      if (name) {
        content.setAttribute('select', '[slot=\'' + name + '\']');
      }
      slot.parentNode.replaceChild(content, slot);
      return content;
    },
    _parseTemplate: function (node, index, list, parent, stripWhiteSpace) {
      var content = document.createDocumentFragment();
      content._notes = this.parseAnnotations(node, stripWhiteSpace);
      content.appendChild(node.content);
      list.push({
        bindings: Polymer.nar,
        events: Polymer.nar,
        templateContent: content,
        parent: parent,
        index: index
      });
    },
    _parseNodeAttributeAnnotations: function (node, annotation) {
      var attrs = Array.prototype.slice.call(node.attributes);
      for (var i = attrs.length - 1, a; a = attrs[i]; i--) {
        var n = a.name;
        var v = a.value;
        var b;
        if (n.slice(0, 3) === 'on-') {
          node.removeAttribute(n);
          annotation.events.push({
            name: n.slice(3),
            value: v
          });
        } else if (b = this._parseNodeAttributeAnnotation(node, n, v)) {
          annotation.bindings.push(b);
        } else if (n === 'id') {
          annotation.id = v;
        }
      }
    },
    _parseNodeAttributeAnnotation: function (node, name, value) {
      var parts = this._parseBindings(value);
      if (parts) {
        var origName = name;
        var kind = 'property';
        if (name[name.length - 1] == '$') {
          name = name.slice(0, -1);
          kind = 'attribute';
        }
        var literal = this._literalFromParts(parts);
        if (literal && kind == 'attribute') {
          node.setAttribute(name, literal);
        }
        if (node.localName === 'input' && origName === 'value') {
          node.setAttribute(origName, '');
        }
        if (disableUpgradeEnabled && origName === 'disable-upgrade$') {
          node.setAttribute(name, '');
        }
        node.removeAttribute(origName);
        var propertyName = Polymer.CaseMap.dashToCamelCase(name);
        if (kind === 'property') {
          name = propertyName;
        }
        return {
          kind: kind,
          name: name,
          propertyName: propertyName,
          parts: parts,
          literal: literal,
          isCompound: parts.length !== 1
        };
      }
    },
    findAnnotatedNode: function (root, annote) {
      var parent = annote.parent && Polymer.Annotations.findAnnotatedNode(root, annote.parent);
      if (parent) {
        for (var n = parent.firstChild, i = 0; n; n = n.nextSibling) {
          if (annote.index === i++) {
            return n;
          }
        }
      } else {
        return root;
      }
    }
  };
})();Polymer.Path = {
  root: function (path) {
    var dotIndex = path.indexOf('.');
    if (dotIndex === -1) {
      return path;
    }
    return path.slice(0, dotIndex);
  },
  isDeep: function (path) {
    return path.indexOf('.') !== -1;
  },
  isAncestor: function (base, path) {
    return base.indexOf(path + '.') === 0;
  },
  isDescendant: function (base, path) {
    return path.indexOf(base + '.') === 0;
  },
  translate: function (base, newBase, path) {
    return newBase + path.slice(base.length);
  },
  matches: function (base, wildcard, path) {
    return base === path || this.isAncestor(base, path) || Boolean(wildcard) && this.isDescendant(base, path);
  }
};Polymer.Base._addFeature({
  _prepAnnotations: function () {
    if (!this._template) {
      this._notes = [];
    } else {
      var self = this;
      Polymer.Annotations.prepElement = function (element) {
        self._prepElement(element);
      };
      if (this._template._content && this._template._content._notes) {
        this._notes = this._template._content._notes;
      } else {
        this._notes = Polymer.Annotations.parseAnnotations(this._template);
        this._processAnnotations(this._notes);
      }
      Polymer.Annotations.prepElement = null;
    }
  },
  _processAnnotations: function (notes) {
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      for (var j = 0; j < note.bindings.length; j++) {
        var b = note.bindings[j];
        for (var k = 0; k < b.parts.length; k++) {
          var p = b.parts[k];
          if (!p.literal) {
            var signature = this._parseMethod(p.value);
            if (signature) {
              p.signature = signature;
            } else {
              p.model = Polymer.Path.root(p.value);
            }
          }
        }
      }
      if (note.templateContent) {
        this._processAnnotations(note.templateContent._notes);
        var pp = note.templateContent._parentProps = this._discoverTemplateParentProps(note.templateContent._notes);
        var bindings = [];
        for (var prop in pp) {
          var name = '_parent_' + prop;
          bindings.push({
            index: note.index,
            kind: 'property',
            name: name,
            propertyName: name,
            parts: [{
              mode: '{',
              model: prop,
              value: prop
            }]
          });
        }
        note.bindings = note.bindings.concat(bindings);
      }
    }
  },
  _discoverTemplateParentProps: function (notes) {
    var pp = {};
    for (var i = 0, n; i < notes.length && (n = notes[i]); i++) {
      for (var j = 0, b$ = n.bindings, b; j < b$.length && (b = b$[j]); j++) {
        for (var k = 0, p$ = b.parts, p; k < p$.length && (p = p$[k]); k++) {
          if (p.signature) {
            var args = p.signature.args;
            for (var kk = 0; kk < args.length; kk++) {
              var model = args[kk].model;
              if (model) {
                pp[model] = true;
              }
            }
            if (p.signature.dynamicFn) {
              pp[p.signature.method] = true;
            }
          } else {
            if (p.model) {
              pp[p.model] = true;
            }
          }
        }
      }
      if (n.templateContent) {
        var tpp = n.templateContent._parentProps;
        Polymer.Base.mixin(pp, tpp);
      }
    }
    return pp;
  },
  _prepElement: function (element) {
    Polymer.ResolveUrl.resolveAttrs(element, this._template.ownerDocument);
  },
  _findAnnotatedNode: Polymer.Annotations.findAnnotatedNode,
  _marshalAnnotationReferences: function () {
    if (this._template) {
      this._marshalIdNodes();
      this._marshalAnnotatedNodes();
      this._marshalAnnotatedListeners();
    }
  },
  _configureAnnotationReferences: function () {
    var notes = this._notes;
    var nodes = this._nodes;
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      var node = nodes[i];
      this._configureTemplateContent(note, node);
      this._configureCompoundBindings(note, node);
    }
  },
  _configureTemplateContent: function (note, node) {
    if (note.templateContent) {
      node._content = note.templateContent;
    }
  },
  _configureCompoundBindings: function (note, node) {
    var bindings = note.bindings;
    for (var i = 0; i < bindings.length; i++) {
      var binding = bindings[i];
      if (binding.isCompound) {
        var storage = node.__compoundStorage__ || (node.__compoundStorage__ = {});
        var parts = binding.parts;
        var literals = new Array(parts.length);
        for (var j = 0; j < parts.length; j++) {
          literals[j] = parts[j].literal;
        }
        var name = binding.name;
        storage[name] = literals;
        if (binding.literal && binding.kind == 'property') {
          if (node._configValue) {
            node._configValue(name, binding.literal);
          } else {
            node[name] = binding.literal;
          }
        }
      }
    }
  },
  _marshalIdNodes: function () {
    this.$ = {};
    for (var i = 0, l = this._notes.length, a; i < l && (a = this._notes[i]); i++) {
      if (a.id) {
        this.$[a.id] = this._findAnnotatedNode(this.root, a);
      }
    }
  },
  _marshalAnnotatedNodes: function () {
    if (this._notes && this._notes.length) {
      var r = new Array(this._notes.length);
      for (var i = 0; i < this._notes.length; i++) {
        r[i] = this._findAnnotatedNode(this.root, this._notes[i]);
      }
      this._nodes = r;
    }
  },
  _marshalAnnotatedListeners: function () {
    for (var i = 0, l = this._notes.length, a; i < l && (a = this._notes[i]); i++) {
      if (a.events && a.events.length) {
        var node = this._findAnnotatedNode(this.root, a);
        for (var j = 0, e$ = a.events, e; j < e$.length && (e = e$[j]); j++) {
          this.listen(node, e.name, e.value);
        }
      }
    }
  }
});Polymer.Base._addFeature({
  listeners: {},
  _listenListeners: function (listeners) {
    var node, name, eventName;
    for (eventName in listeners) {
      if (eventName.indexOf('.') < 0) {
        node = this;
        name = eventName;
      } else {
        name = eventName.split('.');
        node = this.$[name[0]];
        name = name[1];
      }
      this.listen(node, name, listeners[eventName]);
    }
  },
  listen: function (node, eventName, methodName) {
    var handler = this._recallEventHandler(this, eventName, node, methodName);
    if (!handler) {
      handler = this._createEventHandler(node, eventName, methodName);
    }
    if (handler._listening) {
      return;
    }
    this._listen(node, eventName, handler);
    handler._listening = true;
  },
  _boundListenerKey: function (eventName, methodName) {
    return eventName + ':' + methodName;
  },
  _recordEventHandler: function (host, eventName, target, methodName, handler) {
    var hbl = host.__boundListeners;
    if (!hbl) {
      hbl = host.__boundListeners = new WeakMap();
    }
    var bl = hbl.get(target);
    if (!bl) {
      bl = {};
      if (!Polymer.Settings.isIE || target != window) {
        hbl.set(target, bl);
      }
    }
    var key = this._boundListenerKey(eventName, methodName);
    bl[key] = handler;
  },
  _recallEventHandler: function (host, eventName, target, methodName) {
    var hbl = host.__boundListeners;
    if (!hbl) {
      return;
    }
    var bl = hbl.get(target);
    if (!bl) {
      return;
    }
    var key = this._boundListenerKey(eventName, methodName);
    return bl[key];
  },
  _createEventHandler: function (node, eventName, methodName) {
    var host = this;
    var handler = function (e) {
      if (host[methodName]) {
        host[methodName](e, e.detail);
      } else {
        host._warn(host._logf('_createEventHandler', 'listener method `' + methodName + '` not defined'));
      }
    };
    handler._listening = false;
    this._recordEventHandler(host, eventName, node, methodName, handler);
    return handler;
  },
  unlisten: function (node, eventName, methodName) {
    var handler = this._recallEventHandler(this, eventName, node, methodName);
    if (handler) {
      this._unlisten(node, eventName, handler);
      handler._listening = false;
    }
  },
  _listen: function (node, eventName, handler) {
    node.addEventListener(eventName, handler);
  },
  _unlisten: function (node, eventName, handler) {
    node.removeEventListener(eventName, handler);
  }
});(function () {
  'use strict';

  var wrap = Polymer.DomApi.wrap;
  var HAS_NATIVE_TA = typeof document.head.style.touchAction === 'string';
  var GESTURE_KEY = '__polymerGestures';
  var HANDLED_OBJ = '__polymerGesturesHandled';
  var TOUCH_ACTION = '__polymerGesturesTouchAction';
  var TAP_DISTANCE = 25;
  var TRACK_DISTANCE = 5;
  var TRACK_LENGTH = 2;
  var MOUSE_TIMEOUT = 2500;
  var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'click'];
  var MOUSE_WHICH_TO_BUTTONS = [0, 1, 4, 2];
  var MOUSE_HAS_BUTTONS = function () {
    try {
      return new MouseEvent('test', { buttons: 1 }).buttons === 1;
    } catch (e) {
      return false;
    }
  }();
  function isMouseEvent(name) {
    return MOUSE_EVENTS.indexOf(name) > -1;
  }
  var SUPPORTS_PASSIVE = false;
  (function () {
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () {
          SUPPORTS_PASSIVE = true;
        }
      });
      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
    } catch (e) {}
  })();
  function PASSIVE_TOUCH() {
    if (HAS_NATIVE_TA && SUPPORTS_PASSIVE && Polymer.Settings.passiveTouchGestures) {
      return { passive: true };
    }
  }
  var IS_TOUCH_ONLY = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
  var mouseCanceller = function (mouseEvent) {
    var sc = mouseEvent.sourceCapabilities;
    if (sc && !sc.firesTouchEvents) {
      return;
    }
    mouseEvent[HANDLED_OBJ] = { skip: true };
    if (mouseEvent.type === 'click') {
      var path = Polymer.dom(mouseEvent).path;
      for (var i = 0; i < path.length; i++) {
        if (path[i] === POINTERSTATE.mouse.target) {
          return;
        }
      }
      mouseEvent.preventDefault();
      mouseEvent.stopPropagation();
    }
  };
  function setupTeardownMouseCanceller(setup) {
    var events = IS_TOUCH_ONLY ? ['click'] : MOUSE_EVENTS;
    for (var i = 0, en; i < events.length; i++) {
      en = events[i];
      if (setup) {
        document.addEventListener(en, mouseCanceller, true);
      } else {
        document.removeEventListener(en, mouseCanceller, true);
      }
    }
  }
  function ignoreMouse(ev) {
    if (!POINTERSTATE.mouse.mouseIgnoreJob) {
      setupTeardownMouseCanceller(true);
    }
    var unset = function () {
      setupTeardownMouseCanceller();
      POINTERSTATE.mouse.target = null;
      POINTERSTATE.mouse.mouseIgnoreJob = null;
    };
    POINTERSTATE.mouse.target = Polymer.dom(ev).rootTarget;
    POINTERSTATE.mouse.mouseIgnoreJob = Polymer.Debounce(POINTERSTATE.mouse.mouseIgnoreJob, unset, MOUSE_TIMEOUT);
  }
  function hasLeftMouseButton(ev) {
    var type = ev.type;
    if (!isMouseEvent(type)) {
      return false;
    }
    if (type === 'mousemove') {
      var buttons = ev.buttons === undefined ? 1 : ev.buttons;
      if (ev instanceof window.MouseEvent && !MOUSE_HAS_BUTTONS) {
        buttons = MOUSE_WHICH_TO_BUTTONS[ev.which] || 0;
      }
      return Boolean(buttons & 1);
    } else {
      var button = ev.button === undefined ? 0 : ev.button;
      return button === 0;
    }
  }
  function isSyntheticClick(ev) {
    if (ev.type === 'click') {
      if (ev.detail === 0) {
        return true;
      }
      var t = Gestures.findOriginalTarget(ev);
      var bcr = t.getBoundingClientRect();
      var x = ev.pageX,
          y = ev.pageY;
      return !(x >= bcr.left && x <= bcr.right && y >= bcr.top && y <= bcr.bottom);
    }
    return false;
  }
  var POINTERSTATE = {
    mouse: {
      target: null,
      mouseIgnoreJob: null
    },
    touch: {
      x: 0,
      y: 0,
      id: -1,
      scrollDecided: false
    }
  };
  function firstTouchAction(ev) {
    var path = Polymer.dom(ev).path;
    var ta = 'auto';
    for (var i = 0, n; i < path.length; i++) {
      n = path[i];
      if (n[TOUCH_ACTION]) {
        ta = n[TOUCH_ACTION];
        break;
      }
    }
    return ta;
  }
  function trackDocument(stateObj, movefn, upfn) {
    stateObj.movefn = movefn;
    stateObj.upfn = upfn;
    document.addEventListener('mousemove', movefn);
    document.addEventListener('mouseup', upfn);
  }
  function untrackDocument(stateObj) {
    document.removeEventListener('mousemove', stateObj.movefn);
    document.removeEventListener('mouseup', stateObj.upfn);
    stateObj.movefn = null;
    stateObj.upfn = null;
  }
  document.addEventListener('touchend', ignoreMouse, SUPPORTS_PASSIVE ? { passive: true } : false);
  var Gestures = {
    gestures: {},
    recognizers: [],
    deepTargetFind: function (x, y) {
      var node = document.elementFromPoint(x, y);
      var next = node;
      while (next && next.shadowRoot) {
        next = next.shadowRoot.elementFromPoint(x, y);
        if (next) {
          node = next;
        }
      }
      return node;
    },
    findOriginalTarget: function (ev) {
      if (ev.path) {
        return ev.path[0];
      }
      return ev.target;
    },
    handleNative: function (ev) {
      var handled;
      var type = ev.type;
      var node = wrap(ev.currentTarget);
      var gobj = node[GESTURE_KEY];
      if (!gobj) {
        return;
      }
      var gs = gobj[type];
      if (!gs) {
        return;
      }
      if (!ev[HANDLED_OBJ]) {
        ev[HANDLED_OBJ] = {};
        if (type.slice(0, 5) === 'touch') {
          var t = ev.changedTouches[0];
          if (type === 'touchstart') {
            if (ev.touches.length === 1) {
              POINTERSTATE.touch.id = t.identifier;
            }
          }
          if (POINTERSTATE.touch.id !== t.identifier) {
            return;
          }
          if (!HAS_NATIVE_TA) {
            if (type === 'touchstart' || type === 'touchmove') {
              Gestures.handleTouchAction(ev);
            }
          }
        }
      }
      handled = ev[HANDLED_OBJ];
      if (handled.skip) {
        return;
      }
      var recognizers = Gestures.recognizers;
      for (var i = 0, r; i < recognizers.length; i++) {
        r = recognizers[i];
        if (gs[r.name] && !handled[r.name]) {
          if (r.flow && r.flow.start.indexOf(ev.type) > -1 && r.reset) {
            r.reset();
          }
        }
      }
      for (i = 0, r; i < recognizers.length; i++) {
        r = recognizers[i];
        if (gs[r.name] && !handled[r.name]) {
          handled[r.name] = true;
          r[type](ev);
        }
      }
    },
    handleTouchAction: function (ev) {
      var t = ev.changedTouches[0];
      var type = ev.type;
      if (type === 'touchstart') {
        POINTERSTATE.touch.x = t.clientX;
        POINTERSTATE.touch.y = t.clientY;
        POINTERSTATE.touch.scrollDecided = false;
      } else if (type === 'touchmove') {
        if (POINTERSTATE.touch.scrollDecided) {
          return;
        }
        POINTERSTATE.touch.scrollDecided = true;
        var ta = firstTouchAction(ev);
        var prevent = false;
        var dx = Math.abs(POINTERSTATE.touch.x - t.clientX);
        var dy = Math.abs(POINTERSTATE.touch.y - t.clientY);
        if (!ev.cancelable) {} else if (ta === 'none') {
          prevent = true;
        } else if (ta === 'pan-x') {
          prevent = dy > dx;
        } else if (ta === 'pan-y') {
          prevent = dx > dy;
        }
        if (prevent) {
          ev.preventDefault();
        } else {
          Gestures.prevent('track');
        }
      }
    },
    add: function (node, evType, handler) {
      node = wrap(node);
      var recognizer = this.gestures[evType];
      var deps = recognizer.deps;
      var name = recognizer.name;
      var gobj = node[GESTURE_KEY];
      if (!gobj) {
        node[GESTURE_KEY] = gobj = {};
      }
      for (var i = 0, dep, gd; i < deps.length; i++) {
        dep = deps[i];
        if (IS_TOUCH_ONLY && isMouseEvent(dep) && dep !== 'click') {
          continue;
        }
        gd = gobj[dep];
        if (!gd) {
          gobj[dep] = gd = { _count: 0 };
        }
        if (gd._count === 0) {
          var options = !isMouseEvent(dep) && PASSIVE_TOUCH();
          node.addEventListener(dep, this.handleNative, options);
        }
        gd[name] = (gd[name] || 0) + 1;
        gd._count = (gd._count || 0) + 1;
      }
      node.addEventListener(evType, handler);
      if (recognizer.touchAction) {
        this.setTouchAction(node, recognizer.touchAction);
      }
    },
    remove: function (node, evType, handler) {
      node = wrap(node);
      var recognizer = this.gestures[evType];
      var deps = recognizer.deps;
      var name = recognizer.name;
      var gobj = node[GESTURE_KEY];
      if (gobj) {
        for (var i = 0, dep, gd; i < deps.length; i++) {
          dep = deps[i];
          gd = gobj[dep];
          if (gd && gd[name]) {
            gd[name] = (gd[name] || 1) - 1;
            gd._count = (gd._count || 1) - 1;
            if (gd._count === 0) {
              var options = !isMouseEvent(dep) && PASSIVE_TOUCH();
              node.removeEventListener(dep, this.handleNative, options);
            }
          }
        }
      }
      node.removeEventListener(evType, handler);
    },
    register: function (recog) {
      this.recognizers.push(recog);
      for (var i = 0; i < recog.emits.length; i++) {
        this.gestures[recog.emits[i]] = recog;
      }
    },
    findRecognizerByEvent: function (evName) {
      for (var i = 0, r; i < this.recognizers.length; i++) {
        r = this.recognizers[i];
        for (var j = 0, n; j < r.emits.length; j++) {
          n = r.emits[j];
          if (n === evName) {
            return r;
          }
        }
      }
      return null;
    },
    setTouchAction: function (node, value) {
      if (HAS_NATIVE_TA) {
        node.style.touchAction = value;
      }
      node[TOUCH_ACTION] = value;
    },
    fire: function (target, type, detail) {
      var ev = Polymer.Base.fire(type, detail, {
        node: target,
        bubbles: true,
        cancelable: true
      });
      if (ev.defaultPrevented) {
        var preventer = detail.preventer || detail.sourceEvent;
        if (preventer && preventer.preventDefault) {
          preventer.preventDefault();
        }
      }
    },
    prevent: function (evName) {
      var recognizer = this.findRecognizerByEvent(evName);
      if (recognizer.info) {
        recognizer.info.prevent = true;
      }
    },
    resetMouseCanceller: function () {
      if (POINTERSTATE.mouse.mouseIgnoreJob) {
        POINTERSTATE.mouse.mouseIgnoreJob.complete();
      }
    }
  };
  Gestures.register({
    name: 'downup',
    deps: ['mousedown', 'touchstart', 'touchend'],
    flow: {
      start: ['mousedown', 'touchstart'],
      end: ['mouseup', 'touchend']
    },
    emits: ['down', 'up'],
    info: {
      movefn: null,
      upfn: null
    },
    reset: function () {
      untrackDocument(this.info);
    },
    mousedown: function (e) {
      if (!hasLeftMouseButton(e)) {
        return;
      }
      var t = Gestures.findOriginalTarget(e);
      var self = this;
      var movefn = function movefn(e) {
        if (!hasLeftMouseButton(e)) {
          self.fire('up', t, e);
          untrackDocument(self.info);
        }
      };
      var upfn = function upfn(e) {
        if (hasLeftMouseButton(e)) {
          self.fire('up', t, e);
        }
        untrackDocument(self.info);
      };
      trackDocument(this.info, movefn, upfn);
      this.fire('down', t, e);
    },
    touchstart: function (e) {
      this.fire('down', Gestures.findOriginalTarget(e), e.changedTouches[0], e);
    },
    touchend: function (e) {
      this.fire('up', Gestures.findOriginalTarget(e), e.changedTouches[0], e);
    },
    fire: function (type, target, event, preventer) {
      Gestures.fire(target, type, {
        x: event.clientX,
        y: event.clientY,
        sourceEvent: event,
        preventer: preventer,
        prevent: function (e) {
          return Gestures.prevent(e);
        }
      });
    }
  });
  Gestures.register({
    name: 'track',
    touchAction: 'none',
    deps: ['mousedown', 'touchstart', 'touchmove', 'touchend'],
    flow: {
      start: ['mousedown', 'touchstart'],
      end: ['mouseup', 'touchend']
    },
    emits: ['track'],
    info: {
      x: 0,
      y: 0,
      state: 'start',
      started: false,
      moves: [],
      addMove: function (move) {
        if (this.moves.length > TRACK_LENGTH) {
          this.moves.shift();
        }
        this.moves.push(move);
      },
      movefn: null,
      upfn: null,
      prevent: false
    },
    reset: function () {
      this.info.state = 'start';
      this.info.started = false;
      this.info.moves = [];
      this.info.x = 0;
      this.info.y = 0;
      this.info.prevent = false;
      untrackDocument(this.info);
    },
    hasMovedEnough: function (x, y) {
      if (this.info.prevent) {
        return false;
      }
      if (this.info.started) {
        return true;
      }
      var dx = Math.abs(this.info.x - x);
      var dy = Math.abs(this.info.y - y);
      return dx >= TRACK_DISTANCE || dy >= TRACK_DISTANCE;
    },
    mousedown: function (e) {
      if (!hasLeftMouseButton(e)) {
        return;
      }
      var t = Gestures.findOriginalTarget(e);
      var self = this;
      var movefn = function movefn(e) {
        var x = e.clientX,
            y = e.clientY;
        if (self.hasMovedEnough(x, y)) {
          self.info.state = self.info.started ? e.type === 'mouseup' ? 'end' : 'track' : 'start';
          if (self.info.state === 'start') {
            Gestures.prevent('tap');
          }
          self.info.addMove({
            x: x,
            y: y
          });
          if (!hasLeftMouseButton(e)) {
            self.info.state = 'end';
            untrackDocument(self.info);
          }
          self.fire(t, e);
          self.info.started = true;
        }
      };
      var upfn = function upfn(e) {
        if (self.info.started) {
          movefn(e);
        }
        untrackDocument(self.info);
      };
      trackDocument(this.info, movefn, upfn);
      this.info.x = e.clientX;
      this.info.y = e.clientY;
    },
    touchstart: function (e) {
      var ct = e.changedTouches[0];
      this.info.x = ct.clientX;
      this.info.y = ct.clientY;
    },
    touchmove: function (e) {
      var t = Gestures.findOriginalTarget(e);
      var ct = e.changedTouches[0];
      var x = ct.clientX,
          y = ct.clientY;
      if (this.hasMovedEnough(x, y)) {
        if (this.info.state === 'start') {
          Gestures.prevent('tap');
        }
        this.info.addMove({
          x: x,
          y: y
        });
        this.fire(t, ct);
        this.info.state = 'track';
        this.info.started = true;
      }
    },
    touchend: function (e) {
      var t = Gestures.findOriginalTarget(e);
      var ct = e.changedTouches[0];
      if (this.info.started) {
        this.info.state = 'end';
        this.info.addMove({
          x: ct.clientX,
          y: ct.clientY
        });
        this.fire(t, ct, e);
      }
    },
    fire: function (target, touch, preventer) {
      var secondlast = this.info.moves[this.info.moves.length - 2];
      var lastmove = this.info.moves[this.info.moves.length - 1];
      var dx = lastmove.x - this.info.x;
      var dy = lastmove.y - this.info.y;
      var ddx,
          ddy = 0;
      if (secondlast) {
        ddx = lastmove.x - secondlast.x;
        ddy = lastmove.y - secondlast.y;
      }
      return Gestures.fire(target, 'track', {
        state: this.info.state,
        x: touch.clientX,
        y: touch.clientY,
        dx: dx,
        dy: dy,
        ddx: ddx,
        ddy: ddy,
        sourceEvent: touch,
        preventer: preventer,
        hover: function () {
          return Gestures.deepTargetFind(touch.clientX, touch.clientY);
        }
      });
    }
  });
  Gestures.register({
    name: 'tap',
    deps: ['mousedown', 'click', 'touchstart', 'touchend'],
    flow: {
      start: ['mousedown', 'touchstart'],
      end: ['click', 'touchend']
    },
    emits: ['tap'],
    info: {
      x: NaN,
      y: NaN,
      prevent: false
    },
    reset: function () {
      this.info.x = NaN;
      this.info.y = NaN;
      this.info.prevent = false;
    },
    save: function (e) {
      this.info.x = e.clientX;
      this.info.y = e.clientY;
    },
    mousedown: function (e) {
      if (hasLeftMouseButton(e)) {
        this.save(e);
      }
    },
    click: function (e) {
      if (hasLeftMouseButton(e)) {
        this.forward(e);
      }
    },
    touchstart: function (e) {
      this.save(e.changedTouches[0], e);
    },
    touchend: function (e) {
      this.forward(e.changedTouches[0], e);
    },
    forward: function (e, preventer) {
      var dx = Math.abs(e.clientX - this.info.x);
      var dy = Math.abs(e.clientY - this.info.y);
      var t = Gestures.findOriginalTarget(e);
      if (isNaN(dx) || isNaN(dy) || dx <= TAP_DISTANCE && dy <= TAP_DISTANCE || isSyntheticClick(e)) {
        if (!this.info.prevent) {
          Gestures.fire(t, 'tap', {
            x: e.clientX,
            y: e.clientY,
            sourceEvent: e,
            preventer: preventer
          });
        }
      }
    }
  });
  var DIRECTION_MAP = {
    x: 'pan-x',
    y: 'pan-y',
    none: 'none',
    all: 'auto'
  };
  Polymer.Base._addFeature({
    _setupGestures: function () {
      this.__polymerGestures = null;
    },
    _listen: function (node, eventName, handler) {
      if (Gestures.gestures[eventName]) {
        Gestures.add(node, eventName, handler);
      } else {
        node.addEventListener(eventName, handler);
      }
    },
    _unlisten: function (node, eventName, handler) {
      if (Gestures.gestures[eventName]) {
        Gestures.remove(node, eventName, handler);
      } else {
        node.removeEventListener(eventName, handler);
      }
    },
    setScrollDirection: function (direction, node) {
      node = node || this;
      Gestures.setTouchAction(node, DIRECTION_MAP[direction] || 'auto');
    }
  });
  Polymer.Gestures = Gestures;
})();(function () {
  'use strict';

  Polymer.Base._addFeature({
    $$: function (slctr) {
      return Polymer.dom(this.root).querySelector(slctr);
    },
    toggleClass: function (name, bool, node) {
      node = node || this;
      if (arguments.length == 1) {
        bool = !node.classList.contains(name);
      }
      if (bool) {
        Polymer.dom(node).classList.add(name);
      } else {
        Polymer.dom(node).classList.remove(name);
      }
    },
    toggleAttribute: function (name, bool, node) {
      node = node || this;
      if (arguments.length == 1) {
        bool = !node.hasAttribute(name);
      }
      if (bool) {
        Polymer.dom(node).setAttribute(name, '');
      } else {
        Polymer.dom(node).removeAttribute(name);
      }
    },
    classFollows: function (name, toElement, fromElement) {
      if (fromElement) {
        Polymer.dom(fromElement).classList.remove(name);
      }
      if (toElement) {
        Polymer.dom(toElement).classList.add(name);
      }
    },
    attributeFollows: function (name, toElement, fromElement) {
      if (fromElement) {
        Polymer.dom(fromElement).removeAttribute(name);
      }
      if (toElement) {
        Polymer.dom(toElement).setAttribute(name, '');
      }
    },
    getEffectiveChildNodes: function () {
      return Polymer.dom(this).getEffectiveChildNodes();
    },
    getEffectiveChildren: function () {
      var list = Polymer.dom(this).getEffectiveChildNodes();
      return list.filter(function (n) {
        return n.nodeType === Node.ELEMENT_NODE;
      });
    },
    getEffectiveTextContent: function () {
      var cn = this.getEffectiveChildNodes();
      var tc = [];
      for (var i = 0, c; c = cn[i]; i++) {
        if (c.nodeType !== Node.COMMENT_NODE) {
          tc.push(Polymer.dom(c).textContent);
        }
      }
      return tc.join('');
    },
    queryEffectiveChildren: function (slctr) {
      var e$ = Polymer.dom(this).queryDistributedElements(slctr);
      return e$ && e$[0];
    },
    queryAllEffectiveChildren: function (slctr) {
      return Polymer.dom(this).queryDistributedElements(slctr);
    },
    getContentChildNodes: function (slctr) {
      var content = Polymer.dom(this.root).querySelector(slctr || 'content');
      return content ? Polymer.dom(content).getDistributedNodes() : [];
    },
    getContentChildren: function (slctr) {
      return this.getContentChildNodes(slctr).filter(function (n) {
        return n.nodeType === Node.ELEMENT_NODE;
      });
    },
    fire: function (type, detail, options) {
      options = options || Polymer.nob;
      var node = options.node || this;
      detail = detail === null || detail === undefined ? {} : detail;
      var bubbles = options.bubbles === undefined ? true : options.bubbles;
      var cancelable = Boolean(options.cancelable);
      var useCache = options._useCache;
      var event = this._getEvent(type, bubbles, cancelable, useCache);
      event.detail = detail;
      if (useCache) {
        this.__eventCache[type] = null;
      }
      node.dispatchEvent(event);
      if (useCache) {
        this.__eventCache[type] = event;
      }
      return event;
    },
    __eventCache: {},
    _getEvent: function (type, bubbles, cancelable, useCache) {
      var event = useCache && this.__eventCache[type];
      if (!event || event.bubbles != bubbles || event.cancelable != cancelable) {
        event = new Event(type, {
          bubbles: Boolean(bubbles),
          cancelable: cancelable
        });
      }
      return event;
    },
    async: function (callback, waitTime) {
      var self = this;
      return Polymer.Async.run(function () {
        callback.call(self);
      }, waitTime);
    },
    cancelAsync: function (handle) {
      Polymer.Async.cancel(handle);
    },
    arrayDelete: function (path, item) {
      var index;
      if (Array.isArray(path)) {
        index = path.indexOf(item);
        if (index >= 0) {
          return path.splice(index, 1);
        }
      } else {
        var arr = this._get(path);
        index = arr.indexOf(item);
        if (index >= 0) {
          return this.splice(path, index, 1);
        }
      }
    },
    transform: function (transform, node) {
      node = node || this;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    },
    translate3d: function (x, y, z, node) {
      node = node || this;
      this.transform('translate3d(' + x + ',' + y + ',' + z + ')', node);
    },
    importHref: function (href, onload, onerror, optAsync) {
      var link = document.createElement('link');
      link.rel = 'import';
      link.href = href;
      var list = Polymer.Base.importHref.imported = Polymer.Base.importHref.imported || {};
      var cached = list[link.href];
      var imprt = cached || link;
      var self = this;
      var loadListener = function (e) {
        e.target.__firedLoad = true;
        e.target.removeEventListener('load', loadListener);
        e.target.removeEventListener('error', errorListener);
        return onload.call(self, e);
      };
      var errorListener = function (e) {
        e.target.__firedError = true;
        e.target.removeEventListener('load', loadListener);
        e.target.removeEventListener('error', errorListener);
        return onerror.call(self, e);
      };
      if (onload) {
        imprt.addEventListener('load', loadListener);
      }
      if (onerror) {
        imprt.addEventListener('error', errorListener);
      }
      if (cached) {
        if (cached.__firedLoad) {
          cached.dispatchEvent(new Event('load'));
        }
        if (cached.__firedError) {
          cached.dispatchEvent(new Event('error'));
        }
      } else {
        list[link.href] = link;
        optAsync = Boolean(optAsync);
        if (optAsync) {
          link.setAttribute('async', '');
        }
        document.head.appendChild(link);
      }
      return imprt;
    },
    create: function (tag, props) {
      var elt = document.createElement(tag);
      if (props) {
        for (var n in props) {
          elt[n] = props[n];
        }
      }
      return elt;
    },
    isLightDescendant: function (node) {
      return this !== node && this.contains(node) && Polymer.dom(this).getOwnerRoot() === Polymer.dom(node).getOwnerRoot();
    },
    isLocalDescendant: function (node) {
      return this.root === Polymer.dom(node).getOwnerRoot();
    }
  });
  if (!Polymer.Settings.useNativeCustomElements) {
    var importHref = Polymer.Base.importHref;
    Polymer.Base.importHref = function (href, onload, onerror, optAsync) {
      CustomElements.ready = false;
      var loadFn = function (e) {
        CustomElements.upgradeDocumentTree(document);
        CustomElements.ready = true;
        if (onload) {
          return onload.call(this, e);
        }
      };
      return importHref.call(this, href, loadFn, onerror, optAsync);
    };
  }
})();Polymer.Bind = {
  prepareModel: function (model) {
    Polymer.Base.mixin(model, this._modelApi);
  },
  _modelApi: {
    _notifyChange: function (source, event, value) {
      value = value === undefined ? this[source] : value;
      event = event || Polymer.CaseMap.camelToDashCase(source) + '-changed';
      this.fire(event, { value: value }, {
        bubbles: false,
        cancelable: false,
        _useCache: Polymer.Settings.eventDataCache || !Polymer.Settings.isIE
      });
    },
    _propertySetter: function (property, value, effects, fromAbove) {
      var old = this.__data__[property];
      if (old !== value && (old === old || value === value)) {
        this.__data__[property] = value;
        if (typeof value == 'object') {
          this._clearPath(property);
        }
        if (this._propertyChanged) {
          this._propertyChanged(property, value, old);
        }
        if (effects) {
          this._effectEffects(property, value, effects, old, fromAbove);
        }
      }
      return old;
    },
    __setProperty: function (property, value, quiet, node) {
      node = node || this;
      var effects = node._propertyEffects && node._propertyEffects[property];
      if (effects) {
        node._propertySetter(property, value, effects, quiet);
      } else if (node[property] !== value) {
        node[property] = value;
      }
    },
    _effectEffects: function (property, value, effects, old, fromAbove) {
      for (var i = 0, l = effects.length, fx; i < l && (fx = effects[i]); i++) {
        fx.fn.call(this, property, this[property], fx.effect, old, fromAbove);
      }
    },
    _clearPath: function (path) {
      for (var prop in this.__data__) {
        if (Polymer.Path.isDescendant(path, prop)) {
          this.__data__[prop] = undefined;
        }
      }
    }
  },
  ensurePropertyEffects: function (model, property) {
    if (!model._propertyEffects) {
      model._propertyEffects = {};
    }
    var fx = model._propertyEffects[property];
    if (!fx) {
      fx = model._propertyEffects[property] = [];
    }
    return fx;
  },
  addPropertyEffect: function (model, property, kind, effect) {
    var fx = this.ensurePropertyEffects(model, property);
    var propEffect = {
      kind: kind,
      effect: effect,
      fn: Polymer.Bind['_' + kind + 'Effect']
    };
    fx.push(propEffect);
    return propEffect;
  },
  createBindings: function (model) {
    var fx$ = model._propertyEffects;
    if (fx$) {
      for (var n in fx$) {
        var fx = fx$[n];
        fx.sort(this._sortPropertyEffects);
        this._createAccessors(model, n, fx);
      }
    }
  },
  _sortPropertyEffects: function () {
    var EFFECT_ORDER = {
      'compute': 0,
      'annotation': 1,
      'annotatedComputation': 2,
      'reflect': 3,
      'notify': 4,
      'observer': 5,
      'complexObserver': 6,
      'function': 7
    };
    return function (a, b) {
      return EFFECT_ORDER[a.kind] - EFFECT_ORDER[b.kind];
    };
  }(),
  _createAccessors: function (model, property, effects) {
    var defun = {
      get: function () {
        return this.__data__[property];
      }
    };
    var setter = function (value) {
      this._propertySetter(property, value, effects);
    };
    var info = model.getPropertyInfo && model.getPropertyInfo(property);
    if (info && info.readOnly) {
      if (!info.computed) {
        model['_set' + this.upper(property)] = setter;
      }
    } else {
      defun.set = setter;
    }
    Object.defineProperty(model, property, defun);
  },
  upper: function (name) {
    return name[0].toUpperCase() + name.substring(1);
  },
  _addAnnotatedListener: function (model, index, property, path, event, negated) {
    if (!model._bindListeners) {
      model._bindListeners = [];
    }
    var fn = this._notedListenerFactory(property, path, Polymer.Path.isDeep(path), negated);
    var eventName = event || Polymer.CaseMap.camelToDashCase(property) + '-changed';
    model._bindListeners.push({
      index: index,
      property: property,
      path: path,
      changedFn: fn,
      event: eventName
    });
  },
  _isEventBogus: function (e, target) {
    return e.path && e.path[0] !== target;
  },
  _notedListenerFactory: function (property, path, isStructured, negated) {
    return function (target, value, targetPath) {
      if (targetPath) {
        var newPath = Polymer.Path.translate(property, path, targetPath);
        this._notifyPath(newPath, value);
      } else {
        value = target[property];
        if (negated) {
          value = !value;
        }
        if (!isStructured) {
          this[path] = value;
        } else {
          if (this.__data__[path] != value) {
            this.set(path, value);
          }
        }
      }
    };
  },
  prepareInstance: function (inst) {
    inst.__data__ = Object.create(null);
  },
  setupBindListeners: function (inst) {
    var b$ = inst._bindListeners;
    for (var i = 0, l = b$.length, info; i < l && (info = b$[i]); i++) {
      var node = inst._nodes[info.index];
      this._addNotifyListener(node, inst, info.event, info.changedFn);
    }
  },
  _addNotifyListener: function (element, context, event, changedFn) {
    element.addEventListener(event, function (e) {
      return context._notifyListener(changedFn, e);
    });
  }
};Polymer.Base.mixin(Polymer.Bind, {
  _shouldAddListener: function (effect) {
    return effect.name && effect.kind != 'attribute' && effect.kind != 'text' && !effect.isCompound && effect.parts[0].mode === '{';
  },
  _annotationEffect: function (source, value, effect) {
    if (source != effect.value) {
      value = this._get(effect.value);
      this.__data__[effect.value] = value;
    }
    this._applyEffectValue(effect, value);
  },
  _reflectEffect: function (source, value, effect) {
    this.reflectPropertyToAttribute(source, effect.attribute, value);
  },
  _notifyEffect: function (source, value, effect, old, fromAbove) {
    if (!fromAbove) {
      this._notifyChange(source, effect.event, value);
    }
  },
  _functionEffect: function (source, value, fn, old, fromAbove) {
    fn.call(this, source, value, old, fromAbove);
  },
  _observerEffect: function (source, value, effect, old) {
    var fn = this[effect.method];
    if (fn) {
      fn.call(this, value, old);
    } else {
      this._warn(this._logf('_observerEffect', 'observer method `' + effect.method + '` not defined'));
    }
  },
  _complexObserverEffect: function (source, value, effect) {
    var fn = this[effect.method];
    if (fn) {
      var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
      if (args) {
        fn.apply(this, args);
      }
    } else if (effect.dynamicFn) {} else {
      this._warn(this._logf('_complexObserverEffect', 'observer method `' + effect.method + '` not defined'));
    }
  },
  _computeEffect: function (source, value, effect) {
    var fn = this[effect.method];
    if (fn) {
      var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
      if (args) {
        var computedvalue = fn.apply(this, args);
        this.__setProperty(effect.name, computedvalue);
      }
    } else if (effect.dynamicFn) {} else {
      this._warn(this._logf('_computeEffect', 'compute method `' + effect.method + '` not defined'));
    }
  },
  _annotatedComputationEffect: function (source, value, effect) {
    var computedHost = this._rootDataHost || this;
    var fn = computedHost[effect.method];
    if (fn) {
      var args = Polymer.Bind._marshalArgs(this.__data__, effect, source, value);
      if (args) {
        var computedvalue = fn.apply(computedHost, args);
        this._applyEffectValue(effect, computedvalue);
      }
    } else if (effect.dynamicFn) {} else {
      computedHost._warn(computedHost._logf('_annotatedComputationEffect', 'compute method `' + effect.method + '` not defined'));
    }
  },
  _marshalArgs: function (model, effect, path, value) {
    var values = [];
    var args = effect.args;
    var bailoutEarly = args.length > 1 || effect.dynamicFn;
    for (var i = 0, l = args.length; i < l; i++) {
      var arg = args[i];
      var name = arg.name;
      var v;
      if (arg.literal) {
        v = arg.value;
      } else if (path === name) {
        v = value;
      } else {
        v = model[name];
        if (v === undefined && arg.structured) {
          v = Polymer.Base._get(name, model);
        }
      }
      if (bailoutEarly && v === undefined) {
        return;
      }
      if (arg.wildcard) {
        var matches = Polymer.Path.isAncestor(path, name);
        values[i] = {
          path: matches ? path : name,
          value: matches ? value : v,
          base: v
        };
      } else {
        values[i] = v;
      }
    }
    return values;
  }
});Polymer.Base._addFeature({
  _addPropertyEffect: function (property, kind, effect) {
    var prop = Polymer.Bind.addPropertyEffect(this, property, kind, effect);
    prop.pathFn = this['_' + prop.kind + 'PathEffect'];
  },
  _prepEffects: function () {
    Polymer.Bind.prepareModel(this);
    this._addAnnotationEffects(this._notes);
  },
  _prepBindings: function () {
    Polymer.Bind.createBindings(this);
  },
  _addPropertyEffects: function (properties) {
    if (properties) {
      for (var p in properties) {
        var prop = properties[p];
        if (prop.observer) {
          this._addObserverEffect(p, prop.observer);
        }
        if (prop.computed) {
          prop.readOnly = true;
          this._addComputedEffect(p, prop.computed);
        }
        if (prop.notify) {
          this._addPropertyEffect(p, 'notify', { event: Polymer.CaseMap.camelToDashCase(p) + '-changed' });
        }
        if (prop.reflectToAttribute) {
          var attr = Polymer.CaseMap.camelToDashCase(p);
          if (attr[0] === '-') {
            this._warn(this._logf('_addPropertyEffects', 'Property ' + p + ' cannot be reflected to attribute ' + attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'));
          } else {
            this._addPropertyEffect(p, 'reflect', { attribute: attr });
          }
        }
        if (prop.readOnly) {
          Polymer.Bind.ensurePropertyEffects(this, p);
        }
      }
    }
  },
  _addComputedEffect: function (name, expression) {
    var sig = this._parseMethod(expression);
    var dynamicFn = sig.dynamicFn;
    for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
      this._addPropertyEffect(arg.model, 'compute', {
        method: sig.method,
        args: sig.args,
        trigger: arg,
        name: name,
        dynamicFn: dynamicFn
      });
    }
    if (dynamicFn) {
      this._addPropertyEffect(sig.method, 'compute', {
        method: sig.method,
        args: sig.args,
        trigger: null,
        name: name,
        dynamicFn: dynamicFn
      });
    }
  },
  _addObserverEffect: function (property, observer) {
    this._addPropertyEffect(property, 'observer', {
      method: observer,
      property: property
    });
  },
  _addComplexObserverEffects: function (observers) {
    if (observers) {
      for (var i = 0, o; i < observers.length && (o = observers[i]); i++) {
        this._addComplexObserverEffect(o);
      }
    }
  },
  _addComplexObserverEffect: function (observer) {
    var sig = this._parseMethod(observer);
    if (!sig) {
      throw new Error('Malformed observer expression \'' + observer + '\'');
    }
    var dynamicFn = sig.dynamicFn;
    for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
      this._addPropertyEffect(arg.model, 'complexObserver', {
        method: sig.method,
        args: sig.args,
        trigger: arg,
        dynamicFn: dynamicFn
      });
    }
    if (dynamicFn) {
      this._addPropertyEffect(sig.method, 'complexObserver', {
        method: sig.method,
        args: sig.args,
        trigger: null,
        dynamicFn: dynamicFn
      });
    }
  },
  _addAnnotationEffects: function (notes) {
    for (var i = 0, note; i < notes.length && (note = notes[i]); i++) {
      var b$ = note.bindings;
      for (var j = 0, binding; j < b$.length && (binding = b$[j]); j++) {
        this._addAnnotationEffect(binding, i);
      }
    }
  },
  _addAnnotationEffect: function (note, index) {
    if (Polymer.Bind._shouldAddListener(note)) {
      Polymer.Bind._addAnnotatedListener(this, index, note.name, note.parts[0].value, note.parts[0].event, note.parts[0].negate);
    }
    for (var i = 0; i < note.parts.length; i++) {
      var part = note.parts[i];
      if (part.signature) {
        this._addAnnotatedComputationEffect(note, part, index);
      } else if (!part.literal) {
        if (note.kind === 'attribute' && note.name[0] === '-') {
          this._warn(this._logf('_addAnnotationEffect', 'Cannot set attribute ' + note.name + ' because "-" is not a valid attribute starting character'));
        } else {
          this._addPropertyEffect(part.model, 'annotation', {
            kind: note.kind,
            index: index,
            name: note.name,
            propertyName: note.propertyName,
            value: part.value,
            isCompound: note.isCompound,
            compoundIndex: part.compoundIndex,
            event: part.event,
            customEvent: part.customEvent,
            negate: part.negate
          });
        }
      }
    }
  },
  _addAnnotatedComputationEffect: function (note, part, index) {
    var sig = part.signature;
    if (sig.static) {
      this.__addAnnotatedComputationEffect('__static__', index, note, part, null);
    } else {
      for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
        if (!arg.literal) {
          this.__addAnnotatedComputationEffect(arg.model, index, note, part, arg);
        }
      }
      if (sig.dynamicFn) {
        this.__addAnnotatedComputationEffect(sig.method, index, note, part, null);
      }
    }
  },
  __addAnnotatedComputationEffect: function (property, index, note, part, trigger) {
    this._addPropertyEffect(property, 'annotatedComputation', {
      index: index,
      isCompound: note.isCompound,
      compoundIndex: part.compoundIndex,
      kind: note.kind,
      name: note.name,
      negate: part.negate,
      method: part.signature.method,
      args: part.signature.args,
      trigger: trigger,
      dynamicFn: part.signature.dynamicFn
    });
  },
  _parseMethod: function (expression) {
    var m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (m) {
      var sig = {
        method: m[1],
        static: true
      };
      if (this.getPropertyInfo(sig.method) !== Polymer.nob) {
        sig.static = false;
        sig.dynamicFn = true;
      }
      if (m[2].trim()) {
        var args = m[2].replace(/\\,/g, '&comma;').split(',');
        return this._parseArgs(args, sig);
      } else {
        sig.args = Polymer.nar;
        return sig;
      }
    }
  },
  _parseArgs: function (argList, sig) {
    sig.args = argList.map(function (rawArg) {
      var arg = this._parseArg(rawArg);
      if (!arg.literal) {
        sig.static = false;
      }
      return arg;
    }, this);
    return sig;
  },
  _parseArg: function (rawArg) {
    var arg = rawArg.trim().replace(/&comma;/g, ',').replace(/\\(.)/g, '$1');
    var a = { name: arg };
    var fc = arg[0];
    if (fc === '-') {
      fc = arg[1];
    }
    if (fc >= '0' && fc <= '9') {
      fc = '#';
    }
    switch (fc) {
      case '\'':
      case '"':
        a.value = arg.slice(1, -1);
        a.literal = true;
        break;
      case '#':
        a.value = Number(arg);
        a.literal = true;
        break;
    }
    if (!a.literal) {
      a.model = Polymer.Path.root(arg);
      a.structured = Polymer.Path.isDeep(arg);
      if (a.structured) {
        a.wildcard = arg.slice(-2) == '.*';
        if (a.wildcard) {
          a.name = arg.slice(0, -2);
        }
      }
    }
    return a;
  },
  _marshalInstanceEffects: function () {
    Polymer.Bind.prepareInstance(this);
    if (this._bindListeners) {
      Polymer.Bind.setupBindListeners(this);
    }
  },
  _applyEffectValue: function (info, value) {
    var node = this._nodes[info.index];
    var property = info.name;
    value = this._computeFinalAnnotationValue(node, property, value, info);
    if (info.kind == 'attribute') {
      this.serializeValueToAttribute(value, property, node);
    } else {
      var pinfo = node._propertyInfo && node._propertyInfo[property];
      if (pinfo && pinfo.readOnly) {
        return;
      }
      this.__setProperty(property, value, Polymer.Settings.suppressBindingNotifications, node);
    }
  },
  _computeFinalAnnotationValue: function (node, property, value, info) {
    if (info.negate) {
      value = !value;
    }
    if (info.isCompound) {
      var storage = node.__compoundStorage__[property];
      storage[info.compoundIndex] = value;
      value = storage.join('');
    }
    if (info.kind !== 'attribute') {
      if (property === 'className') {
        value = this._scopeElementClass(node, value);
      }
      if (property === 'textContent' || node.localName == 'input' && property == 'value') {
        value = value == undefined ? '' : value;
      }
    }
    return value;
  },
  _executeStaticEffects: function () {
    if (this._propertyEffects && this._propertyEffects.__static__) {
      this._effectEffects('__static__', null, this._propertyEffects.__static__);
    }
  }
});(function () {
  var usePolyfillProto = Polymer.Settings.usePolyfillProto;
  var avoidInstanceProperties = Boolean(Object.getOwnPropertyDescriptor(document.documentElement, 'properties'));
  Polymer.Base._addFeature({
    _setupConfigure: function (initialConfig) {
      this._config = {};
      this._handlers = [];
      this._aboveConfig = null;
      if (initialConfig) {
        for (var i in initialConfig) {
          if (initialConfig[i] !== undefined) {
            this._config[i] = initialConfig[i];
          }
        }
      }
    },
    _marshalAttributes: function () {
      this._takeAttributesToModel(this._config);
    },
    _attributeChangedImpl: function (name) {
      var model = this._clientsReadied ? this : this._config;
      this._setAttributeToProperty(model, name);
    },
    _configValue: function (name, value) {
      var info = this._propertyInfo[name];
      if (!info || !info.readOnly) {
        this._config[name] = value;
      }
    },
    _beforeClientsReady: function () {
      this._configure();
    },
    _configure: function () {
      this._configureAnnotationReferences();
      this._configureInstanceProperties();
      this._aboveConfig = this.mixin({}, this._config);
      var config = {};
      for (var i = 0; i < this.behaviors.length; i++) {
        this._configureProperties(this.behaviors[i].properties, config);
      }
      this._configureProperties(avoidInstanceProperties ? this.__proto__.properties : this.properties, config);
      this.mixin(config, this._aboveConfig);
      this._config = config;
      if (this._clients && this._clients.length) {
        this._distributeConfig(this._config);
      }
    },
    _configureInstanceProperties: function () {
      for (var i in this._propertyEffects) {
        if (!usePolyfillProto && this.hasOwnProperty(i)) {
          this._configValue(i, this[i]);
          delete this[i];
        }
      }
    },
    _configureProperties: function (properties, config) {
      for (var i in properties) {
        var c = properties[i];
        if (c.value !== undefined) {
          var value = c.value;
          if (typeof value == 'function') {
            value = value.call(this, this._config);
          }
          config[i] = value;
        }
      }
    },
    _distributeConfig: function (config) {
      var fx$ = this._propertyEffects;
      if (fx$) {
        for (var p in config) {
          var fx = fx$[p];
          if (fx) {
            for (var i = 0, l = fx.length, x; i < l && (x = fx[i]); i++) {
              if (x.kind === 'annotation') {
                var node = this._nodes[x.effect.index];
                var name = x.effect.propertyName;
                var isAttr = x.effect.kind == 'attribute';
                var hasEffect = node._propertyEffects && node._propertyEffects[name];
                if (node._configValue && (hasEffect || !isAttr)) {
                  var value = p === x.effect.value ? config[p] : this._get(x.effect.value, config);
                  value = this._computeFinalAnnotationValue(node, name, value, x.effect);
                  if (isAttr) {
                    value = node.deserialize(this.serialize(value), node._propertyInfo[name].type);
                  }
                  node._configValue(name, value);
                }
              }
            }
          }
        }
      }
    },
    _afterClientsReady: function () {
      this.importPath = this._importPath;
      this.rootPath = Polymer.rootPath;
      this._executeStaticEffects();
      this._applyConfig(this._config, this._aboveConfig);
      this._flushHandlers();
    },
    _applyConfig: function (config, aboveConfig) {
      for (var n in config) {
        if (this[n] === undefined) {
          this.__setProperty(n, config[n], n in aboveConfig);
        }
      }
    },
    _notifyListener: function (fn, e) {
      if (!Polymer.Bind._isEventBogus(e, e.target)) {
        var value, path;
        if (e.detail) {
          value = e.detail.value;
          path = e.detail.path;
        }
        if (!this._clientsReadied) {
          this._queueHandler([fn, e.target, value, path]);
        } else {
          return fn.call(this, e.target, value, path);
        }
      }
    },
    _queueHandler: function (args) {
      this._handlers.push(args);
    },
    _flushHandlers: function () {
      var h$ = this._handlers;
      for (var i = 0, l = h$.length, h; i < l && (h = h$[i]); i++) {
        h[0].call(this, h[1], h[2], h[3]);
      }
      this._handlers = [];
    }
  });
})();(function () {
  'use strict';

  var Path = Polymer.Path;
  Polymer.Base._addFeature({
    notifyPath: function (path, value, fromAbove) {
      var info = {};
      var v = this._get(path, this, info);
      if (arguments.length === 1) {
        value = v;
      }
      if (info.path) {
        this._notifyPath(info.path, value, fromAbove);
      }
    },
    _notifyPath: function (path, value, fromAbove) {
      var old = this._propertySetter(path, value);
      if (old !== value && (old === old || value === value)) {
        this._pathEffector(path, value);
        if (!fromAbove) {
          this._notifyPathUp(path, value);
        }
        return true;
      }
    },
    _getPathParts: function (path) {
      if (Array.isArray(path)) {
        var parts = [];
        for (var i = 0; i < path.length; i++) {
          var args = path[i].toString().split('.');
          for (var j = 0; j < args.length; j++) {
            parts.push(args[j]);
          }
        }
        return parts;
      } else {
        return path.toString().split('.');
      }
    },
    set: function (path, value, root) {
      var prop = root || this;
      var parts = this._getPathParts(path);
      var array;
      var last = parts[parts.length - 1];
      if (parts.length > 1) {
        for (var i = 0; i < parts.length - 1; i++) {
          var part = parts[i];
          if (array && part[0] == '#') {
            prop = Polymer.Collection.get(array).getItem(part);
          } else {
            prop = prop[part];
            if (array && parseInt(part, 10) == part) {
              parts[i] = Polymer.Collection.get(array).getKey(prop);
            }
          }
          if (!prop) {
            return;
          }
          array = Array.isArray(prop) ? prop : null;
        }
        if (array) {
          var coll = Polymer.Collection.get(array);
          var old, key;
          if (last[0] == '#') {
            key = last;
            old = coll.getItem(key);
            last = array.indexOf(old);
            coll.setItem(key, value);
          } else if (parseInt(last, 10) == last) {
            old = prop[last];
            key = coll.getKey(old);
            parts[i] = key;
            coll.setItem(key, value);
          }
        }
        prop[last] = value;
        if (!root) {
          this._notifyPath(parts.join('.'), value);
        }
      } else {
        prop[path] = value;
      }
    },
    get: function (path, root) {
      return this._get(path, root);
    },
    _get: function (path, root, info) {
      var prop = root || this;
      var parts = this._getPathParts(path);
      var array;
      for (var i = 0; i < parts.length; i++) {
        if (!prop) {
          return;
        }
        var part = parts[i];
        if (array && part[0] == '#') {
          prop = Polymer.Collection.get(array).getItem(part);
        } else {
          prop = prop[part];
          if (info && array && parseInt(part, 10) == part) {
            parts[i] = Polymer.Collection.get(array).getKey(prop);
          }
        }
        array = Array.isArray(prop) ? prop : null;
      }
      if (info) {
        info.path = parts.join('.');
      }
      return prop;
    },
    _pathEffector: function (path, value) {
      var model = Path.root(path);
      var fx$ = this._propertyEffects && this._propertyEffects[model];
      if (fx$) {
        for (var i = 0, fx; i < fx$.length && (fx = fx$[i]); i++) {
          var fxFn = fx.pathFn;
          if (fxFn) {
            fxFn.call(this, path, value, fx.effect);
          }
        }
      }
      if (this._boundPaths) {
        this._notifyBoundPaths(path, value);
      }
    },
    _annotationPathEffect: function (path, value, effect) {
      if (Path.matches(effect.value, false, path)) {
        Polymer.Bind._annotationEffect.call(this, path, value, effect);
      } else if (!effect.negate && Path.isDescendant(effect.value, path)) {
        var node = this._nodes[effect.index];
        if (node && node._notifyPath) {
          var newPath = Path.translate(effect.value, effect.name, path);
          node._notifyPath(newPath, value, true);
        }
      }
    },
    _complexObserverPathEffect: function (path, value, effect) {
      if (Path.matches(effect.trigger.name, effect.trigger.wildcard, path)) {
        Polymer.Bind._complexObserverEffect.call(this, path, value, effect);
      }
    },
    _computePathEffect: function (path, value, effect) {
      if (Path.matches(effect.trigger.name, effect.trigger.wildcard, path)) {
        Polymer.Bind._computeEffect.call(this, path, value, effect);
      }
    },
    _annotatedComputationPathEffect: function (path, value, effect) {
      if (Path.matches(effect.trigger.name, effect.trigger.wildcard, path)) {
        Polymer.Bind._annotatedComputationEffect.call(this, path, value, effect);
      }
    },
    linkPaths: function (to, from) {
      this._boundPaths = this._boundPaths || {};
      if (from) {
        this._boundPaths[to] = from;
      } else {
        this.unlinkPaths(to);
      }
    },
    unlinkPaths: function (path) {
      if (this._boundPaths) {
        delete this._boundPaths[path];
      }
    },
    _notifyBoundPaths: function (path, value) {
      for (var a in this._boundPaths) {
        var b = this._boundPaths[a];
        if (Path.isDescendant(a, path)) {
          this._notifyPath(Path.translate(a, b, path), value);
        } else if (Path.isDescendant(b, path)) {
          this._notifyPath(Path.translate(b, a, path), value);
        }
      }
    },
    _notifyPathUp: function (path, value) {
      var rootName = Path.root(path);
      var dashCaseName = Polymer.CaseMap.camelToDashCase(rootName);
      var eventName = dashCaseName + this._EVENT_CHANGED;
      this.fire(eventName, {
        path: path,
        value: value
      }, {
        bubbles: false,
        _useCache: Polymer.Settings.eventDataCache || !Polymer.Settings.isIE
      });
    },
    _EVENT_CHANGED: '-changed',
    notifySplices: function (path, splices) {
      var info = {};
      var array = this._get(path, this, info);
      this._notifySplices(array, info.path, splices);
    },
    _notifySplices: function (array, path, splices) {
      var change = {
        keySplices: Polymer.Collection.applySplices(array, splices),
        indexSplices: splices
      };
      var splicesPath = path + '.splices';
      this._notifyPath(splicesPath, change);
      this._notifyPath(path + '.length', array.length);
      this.__data__[splicesPath] = {
        keySplices: null,
        indexSplices: null
      };
    },
    _notifySplice: function (array, path, index, added, removed) {
      this._notifySplices(array, path, [{
        index: index,
        addedCount: added,
        removed: removed,
        object: array,
        type: 'splice'
      }]);
    },
    push: function (path) {
      var info = {};
      var array = this._get(path, this, info);
      var args = Array.prototype.slice.call(arguments, 1);
      var len = array.length;
      var ret = array.push.apply(array, args);
      if (args.length) {
        this._notifySplice(array, info.path, len, args.length, []);
      }
      return ret;
    },
    pop: function (path) {
      var info = {};
      var array = this._get(path, this, info);
      var hadLength = Boolean(array.length);
      var args = Array.prototype.slice.call(arguments, 1);
      var ret = array.pop.apply(array, args);
      if (hadLength) {
        this._notifySplice(array, info.path, array.length, 0, [ret]);
      }
      return ret;
    },
    splice: function (path, start) {
      var info = {};
      var array = this._get(path, this, info);
      if (start < 0) {
        start = array.length - Math.floor(-start);
      } else {
        start = Math.floor(start);
      }
      if (!start) {
        start = 0;
      }
      var args = Array.prototype.slice.call(arguments, 1);
      var ret = array.splice.apply(array, args);
      var addedCount = Math.max(args.length - 2, 0);
      if (addedCount || ret.length) {
        this._notifySplice(array, info.path, start, addedCount, ret);
      }
      return ret;
    },
    shift: function (path) {
      var info = {};
      var array = this._get(path, this, info);
      var hadLength = Boolean(array.length);
      var args = Array.prototype.slice.call(arguments, 1);
      var ret = array.shift.apply(array, args);
      if (hadLength) {
        this._notifySplice(array, info.path, 0, 0, [ret]);
      }
      return ret;
    },
    unshift: function (path) {
      var info = {};
      var array = this._get(path, this, info);
      var args = Array.prototype.slice.call(arguments, 1);
      var ret = array.unshift.apply(array, args);
      if (args.length) {
        this._notifySplice(array, info.path, 0, args.length, []);
      }
      return ret;
    },
    prepareModelNotifyPath: function (model) {
      this.mixin(model, {
        fire: Polymer.Base.fire,
        _getEvent: Polymer.Base._getEvent,
        __eventCache: Polymer.Base.__eventCache,
        notifyPath: Polymer.Base.notifyPath,
        _get: Polymer.Base._get,
        _EVENT_CHANGED: Polymer.Base._EVENT_CHANGED,
        _notifyPath: Polymer.Base._notifyPath,
        _notifyPathUp: Polymer.Base._notifyPathUp,
        _pathEffector: Polymer.Base._pathEffector,
        _annotationPathEffect: Polymer.Base._annotationPathEffect,
        _complexObserverPathEffect: Polymer.Base._complexObserverPathEffect,
        _annotatedComputationPathEffect: Polymer.Base._annotatedComputationPathEffect,
        _computePathEffect: Polymer.Base._computePathEffect,
        _notifyBoundPaths: Polymer.Base._notifyBoundPaths,
        _getPathParts: Polymer.Base._getPathParts
      });
    }
  });
})();Polymer.Base._addFeature({
  resolveUrl: function (url) {
    return Polymer.ResolveUrl.resolveUrl(url, this._importPath);
  }
});Polymer.CssParse = function () {
  return {
    parse: function (text) {
      text = this._clean(text);
      return this._parseCss(this._lex(text), text);
    },
    _clean: function (cssText) {
      return cssText.replace(this._rx.comments, '').replace(this._rx.port, '');
    },
    _lex: function (text) {
      var root = {
        start: 0,
        end: text.length
      };
      var n = root;
      for (var i = 0, l = text.length; i < l; i++) {
        switch (text[i]) {
          case this.OPEN_BRACE:
            if (!n.rules) {
              n.rules = [];
            }
            var p = n;
            var previous = p.rules[p.rules.length - 1];
            n = {
              start: i + 1,
              parent: p,
              previous: previous
            };
            p.rules.push(n);
            break;
          case this.CLOSE_BRACE:
            n.end = i + 1;
            n = n.parent || root;
            break;
        }
      }
      return root;
    },
    _parseCss: function (node, text) {
      var t = text.substring(node.start, node.end - 1);
      node.parsedCssText = node.cssText = t.trim();
      if (node.parent) {
        var ss = node.previous ? node.previous.end : node.parent.start;
        t = text.substring(ss, node.start - 1);
        t = this._expandUnicodeEscapes(t);
        t = t.replace(this._rx.multipleSpaces, ' ');
        t = t.substring(t.lastIndexOf(';') + 1);
        var s = node.parsedSelector = node.selector = t.trim();
        node.atRule = s.indexOf(this.AT_START) === 0;
        if (node.atRule) {
          if (s.indexOf(this.MEDIA_START) === 0) {
            node.type = this.types.MEDIA_RULE;
          } else if (s.match(this._rx.keyframesRule)) {
            node.type = this.types.KEYFRAMES_RULE;
            node.keyframesName = node.selector.split(this._rx.multipleSpaces).pop();
          }
        } else {
          if (s.indexOf(this.VAR_START) === 0) {
            node.type = this.types.MIXIN_RULE;
          } else {
            node.type = this.types.STYLE_RULE;
          }
        }
      }
      var r$ = node.rules;
      if (r$) {
        for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
          this._parseCss(r, text);
        }
      }
      return node;
    },
    _expandUnicodeEscapes: function (s) {
      return s.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
        var code = arguments[1],
            repeat = 6 - code.length;
        while (repeat--) {
          code = '0' + code;
        }
        return '\\' + code;
      });
    },
    stringify: function (node, preserveProperties, text) {
      text = text || '';
      var cssText = '';
      if (node.cssText || node.rules) {
        var r$ = node.rules;
        if (r$ && !this._hasMixinRules(r$)) {
          for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
            cssText = this.stringify(r, preserveProperties, cssText);
          }
        } else {
          cssText = preserveProperties ? node.cssText : this.removeCustomProps(node.cssText);
          cssText = cssText.trim();
          if (cssText) {
            cssText = '  ' + cssText + '\n';
          }
        }
      }
      if (cssText) {
        if (node.selector) {
          text += node.selector + ' ' + this.OPEN_BRACE + '\n';
        }
        text += cssText;
        if (node.selector) {
          text += this.CLOSE_BRACE + '\n\n';
        }
      }
      return text;
    },
    _hasMixinRules: function (rules) {
      return rules[0].selector.indexOf(this.VAR_START) === 0;
    },
    removeCustomProps: function (cssText) {
      cssText = this.removeCustomPropAssignment(cssText);
      return this.removeCustomPropApply(cssText);
    },
    removeCustomPropAssignment: function (cssText) {
      return cssText.replace(this._rx.customProp, '').replace(this._rx.mixinProp, '');
    },
    removeCustomPropApply: function (cssText) {
      return cssText.replace(this._rx.mixinApply, '').replace(this._rx.varApply, '');
    },
    types: {
      STYLE_RULE: 1,
      KEYFRAMES_RULE: 7,
      MEDIA_RULE: 4,
      MIXIN_RULE: 1000
    },
    OPEN_BRACE: '{',
    CLOSE_BRACE: '}',
    _rx: {
      comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
      port: /@import[^;]*;/gim,
      customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      keyframesRule: /^@[^\s]*keyframes/,
      multipleSpaces: /\s+/g
    },
    VAR_START: '--',
    MEDIA_START: '@media',
    AT_START: '@'
  };
}();Polymer.StyleUtil = function () {
  var settings = Polymer.Settings;
  return {
    NATIVE_VARIABLES: Polymer.Settings.useNativeCSSProperties,
    MODULE_STYLES_SELECTOR: 'style, link[rel=import][type~=css], template',
    INCLUDE_ATTR: 'include',
    toCssText: function (rules, callback) {
      if (typeof rules === 'string') {
        rules = this.parser.parse(rules);
      }
      if (callback) {
        this.forEachRule(rules, callback);
      }
      return this.parser.stringify(rules, this.NATIVE_VARIABLES);
    },
    forRulesInStyles: function (styles, styleRuleCallback, keyframesRuleCallback) {
      if (styles) {
        for (var i = 0, l = styles.length, s; i < l && (s = styles[i]); i++) {
          this.forEachRuleInStyle(s, styleRuleCallback, keyframesRuleCallback);
        }
      }
    },
    forActiveRulesInStyles: function (styles, styleRuleCallback, keyframesRuleCallback) {
      if (styles) {
        for (var i = 0, l = styles.length, s; i < l && (s = styles[i]); i++) {
          this.forEachRuleInStyle(s, styleRuleCallback, keyframesRuleCallback, true);
        }
      }
    },
    rulesForStyle: function (style) {
      if (!style.__cssRules && style.textContent) {
        style.__cssRules = this.parser.parse(style.textContent);
      }
      return style.__cssRules;
    },
    isKeyframesSelector: function (rule) {
      return rule.parent && rule.parent.type === this.ruleTypes.KEYFRAMES_RULE;
    },
    forEachRuleInStyle: function (style, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
      var rules = this.rulesForStyle(style);
      var styleCallback, keyframeCallback;
      if (styleRuleCallback) {
        styleCallback = function (rule) {
          styleRuleCallback(rule, style);
        };
      }
      if (keyframesRuleCallback) {
        keyframeCallback = function (rule) {
          keyframesRuleCallback(rule, style);
        };
      }
      this.forEachRule(rules, styleCallback, keyframeCallback, onlyActiveRules);
    },
    forEachRule: function (node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
      if (!node) {
        return;
      }
      var skipRules = false;
      if (onlyActiveRules) {
        if (node.type === this.ruleTypes.MEDIA_RULE) {
          var matchMedia = node.selector.match(this.rx.MEDIA_MATCH);
          if (matchMedia) {
            if (!window.matchMedia(matchMedia[1]).matches) {
              skipRules = true;
            }
          }
        }
      }
      if (node.type === this.ruleTypes.STYLE_RULE) {
        styleRuleCallback(node);
      } else if (keyframesRuleCallback && node.type === this.ruleTypes.KEYFRAMES_RULE) {
        keyframesRuleCallback(node);
      } else if (node.type === this.ruleTypes.MIXIN_RULE) {
        skipRules = true;
      }
      var r$ = node.rules;
      if (r$ && !skipRules) {
        for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
          this.forEachRule(r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
        }
      }
    },
    applyCss: function (cssText, moniker, target, contextNode) {
      var style = this.createScopeStyle(cssText, moniker);
      return this.applyStyle(style, target, contextNode);
    },
    applyStyle: function (style, target, contextNode) {
      target = target || document.head;
      var after = contextNode && contextNode.nextSibling || target.firstChild;
      this.__lastHeadApplyNode = style;
      return target.insertBefore(style, after);
    },
    createScopeStyle: function (cssText, moniker) {
      var style = document.createElement('style');
      if (moniker) {
        style.setAttribute('scope', moniker);
      }
      style.textContent = cssText;
      return style;
    },
    __lastHeadApplyNode: null,
    applyStylePlaceHolder: function (moniker) {
      var placeHolder = document.createComment(' Shady DOM styles for ' + moniker + ' ');
      var after = this.__lastHeadApplyNode ? this.__lastHeadApplyNode.nextSibling : null;
      var scope = document.head;
      scope.insertBefore(placeHolder, after || scope.firstChild);
      this.__lastHeadApplyNode = placeHolder;
      return placeHolder;
    },
    cssFromModules: function (moduleIds, warnIfNotFound) {
      var modules = moduleIds.trim().split(' ');
      var cssText = '';
      for (var i = 0; i < modules.length; i++) {
        cssText += this.cssFromModule(modules[i], warnIfNotFound);
      }
      return cssText;
    },
    cssFromModule: function (moduleId, warnIfNotFound) {
      var m = Polymer.DomModule.import(moduleId);
      if (m && !m._cssText) {
        m._cssText = this.cssFromElement(m);
      }
      if (!m && warnIfNotFound) {
        console.warn('Could not find style data in module named', moduleId);
      }
      return m && m._cssText || '';
    },
    cssFromElement: function (element) {
      var cssText = '';
      var content = element.content || element;
      var e$ = Polymer.TreeApi.arrayCopy(content.querySelectorAll(this.MODULE_STYLES_SELECTOR));
      for (var i = 0, e; i < e$.length; i++) {
        e = e$[i];
        if (e.localName === 'template') {
          if (!e.hasAttribute('preserve-content')) {
            cssText += this.cssFromElement(e);
          }
        } else {
          if (e.localName === 'style') {
            var include = e.getAttribute(this.INCLUDE_ATTR);
            if (include) {
              cssText += this.cssFromModules(include, true);
            }
            e = e.__appliedElement || e;
            e.parentNode.removeChild(e);
            cssText += this.resolveCss(e.textContent, element.ownerDocument);
          } else if (e.import && e.import.body) {
            cssText += this.resolveCss(e.import.body.textContent, e.import);
          }
        }
      }
      return cssText;
    },
    styleIncludesToTemplate: function (targetTemplate) {
      var styles = targetTemplate.content.querySelectorAll('style[include]');
      for (var i = 0, s; i < styles.length; i++) {
        s = styles[i];
        s.parentNode.insertBefore(this._includesToFragment(s.getAttribute('include')), s);
      }
    },
    _includesToFragment: function (styleIncludes) {
      var includeArray = styleIncludes.trim().split(' ');
      var frag = document.createDocumentFragment();
      for (var i = 0; i < includeArray.length; i++) {
        var t = Polymer.DomModule.import(includeArray[i], 'template');
        if (t) {
          this._addStylesToFragment(frag, t.content);
        }
      }
      return frag;
    },
    _addStylesToFragment: function (frag, source) {
      var s$ = source.querySelectorAll('style');
      for (var i = 0, s; i < s$.length; i++) {
        s = s$[i];
        var include = s.getAttribute('include');
        if (include) {
          frag.appendChild(this._includesToFragment(include));
        }
        if (s.textContent) {
          frag.appendChild(s.cloneNode(true));
        }
      }
    },
    isTargetedBuild: function (buildType) {
      return settings.useNativeShadow ? buildType === 'shadow' : buildType === 'shady';
    },
    cssBuildTypeForModule: function (module) {
      var dm = Polymer.DomModule.import(module);
      if (dm) {
        return this.getCssBuildType(dm);
      }
    },
    getCssBuildType: function (element) {
      return element.getAttribute('css-build');
    },
    _findMatchingParen: function (text, start) {
      var level = 0;
      for (var i = start, l = text.length; i < l; i++) {
        switch (text[i]) {
          case '(':
            level++;
            break;
          case ')':
            if (--level === 0) {
              return i;
            }
            break;
        }
      }
      return -1;
    },
    processVariableAndFallback: function (str, callback) {
      var start = str.indexOf('var(');
      if (start === -1) {
        return callback(str, '', '', '');
      }
      var end = this._findMatchingParen(str, start + 3);
      var inner = str.substring(start + 4, end);
      var prefix = str.substring(0, start);
      var suffix = this.processVariableAndFallback(str.substring(end + 1), callback);
      var comma = inner.indexOf(',');
      if (comma === -1) {
        return callback(prefix, inner.trim(), '', suffix);
      }
      var value = inner.substring(0, comma).trim();
      var fallback = inner.substring(comma + 1).trim();
      return callback(prefix, value, fallback, suffix);
    },
    rx: {
      VAR_ASSIGN: /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:([^;{]*)|{([^}]*)})(?:(?=[;\s}])|$)/gi,
      MIXIN_MATCH: /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
      VAR_CONSUMED: /(--[\w-]+)\s*([:,;)]|$)/gi,
      ANIMATION_MATCH: /(animation\s*:)|(animation-name\s*:)/,
      MEDIA_MATCH: /@media[^(]*(\([^)]*\))/,
      IS_VAR: /^--/,
      BRACKETED: /\{[^}]*\}/g,
      HOST_PREFIX: '(?:^|[^.#[:])',
      HOST_SUFFIX: '($|[.:[\\s>+~])'
    },
    resolveCss: Polymer.ResolveUrl.resolveCss,
    parser: Polymer.CssParse,
    ruleTypes: Polymer.CssParse.types
  };
}();Polymer.StyleTransformer = function () {
  var styleUtil = Polymer.StyleUtil;
  var settings = Polymer.Settings;
  var api = {
    dom: function (node, scope, useAttr, shouldRemoveScope) {
      this._transformDom(node, scope || '', useAttr, shouldRemoveScope);
    },
    _transformDom: function (node, selector, useAttr, shouldRemoveScope) {
      if (node.setAttribute) {
        this.element(node, selector, useAttr, shouldRemoveScope);
      }
      var c$ = Polymer.dom(node).childNodes;
      for (var i = 0; i < c$.length; i++) {
        this._transformDom(c$[i], selector, useAttr, shouldRemoveScope);
      }
    },
    element: function (element, scope, useAttr, shouldRemoveScope) {
      if (useAttr) {
        if (shouldRemoveScope) {
          element.removeAttribute(SCOPE_NAME);
        } else {
          element.setAttribute(SCOPE_NAME, scope);
        }
      } else {
        if (scope) {
          if (element.classList) {
            if (shouldRemoveScope) {
              element.classList.remove(SCOPE_NAME);
              element.classList.remove(scope);
            } else {
              element.classList.add(SCOPE_NAME);
              element.classList.add(scope);
            }
          } else if (element.getAttribute) {
            var c = element.getAttribute(CLASS);
            if (shouldRemoveScope) {
              if (c) {
                element.setAttribute(CLASS, c.replace(SCOPE_NAME, '').replace(scope, ''));
              }
            } else {
              element.setAttribute(CLASS, (c ? c + ' ' : '') + SCOPE_NAME + ' ' + scope);
            }
          }
        }
      }
    },
    elementStyles: function (element, callback) {
      var styles = element._styles;
      var cssText = '';
      var cssBuildType = element.__cssBuild;
      var passthrough = settings.useNativeShadow || cssBuildType === 'shady';
      var cb;
      if (passthrough) {
        var self = this;
        cb = function (rule) {
          rule.selector = self._slottedToContent(rule.selector);
          rule.selector = rule.selector.replace(ROOT, ':host > *');
          if (callback) {
            callback(rule);
          }
        };
      }
      for (var i = 0, l = styles.length, s; i < l && (s = styles[i]); i++) {
        var rules = styleUtil.rulesForStyle(s);
        cssText += passthrough ? styleUtil.toCssText(rules, cb) : this.css(rules, element.is, element.extends, callback, element._scopeCssViaAttr) + '\n\n';
      }
      return cssText.trim();
    },
    css: function (rules, scope, ext, callback, useAttr) {
      var hostScope = this._calcHostScope(scope, ext);
      scope = this._calcElementScope(scope, useAttr);
      var self = this;
      return styleUtil.toCssText(rules, function (rule) {
        if (!rule.isScoped) {
          self.rule(rule, scope, hostScope);
          rule.isScoped = true;
        }
        if (callback) {
          callback(rule, scope, hostScope);
        }
      });
    },
    _calcElementScope: function (scope, useAttr) {
      if (scope) {
        return useAttr ? CSS_ATTR_PREFIX + scope + CSS_ATTR_SUFFIX : CSS_CLASS_PREFIX + scope;
      } else {
        return '';
      }
    },
    _calcHostScope: function (scope, ext) {
      return ext ? '[is=' + scope + ']' : scope;
    },
    rule: function (rule, scope, hostScope) {
      this._transformRule(rule, this._transformComplexSelector, scope, hostScope);
    },
    _transformRule: function (rule, transformer, scope, hostScope) {
      rule.selector = rule.transformedSelector = this._transformRuleCss(rule, transformer, scope, hostScope);
    },
    _transformRuleCss: function (rule, transformer, scope, hostScope) {
      var p$ = rule.selector.split(COMPLEX_SELECTOR_SEP);
      if (!styleUtil.isKeyframesSelector(rule)) {
        for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
          p$[i] = transformer.call(this, p, scope, hostScope);
        }
      }
      return p$.join(COMPLEX_SELECTOR_SEP);
    },
    _transformComplexSelector: function (selector, scope, hostScope) {
      var stop = false;
      var hostContext = false;
      var self = this;
      selector = selector.trim();
      selector = this._slottedToContent(selector);
      selector = selector.replace(ROOT, ':host > *');
      selector = selector.replace(CONTENT_START, HOST + ' $1');
      selector = selector.replace(SIMPLE_SELECTOR_SEP, function (m, c, s) {
        if (!stop) {
          var info = self._transformCompoundSelector(s, c, scope, hostScope);
          stop = stop || info.stop;
          hostContext = hostContext || info.hostContext;
          c = info.combinator;
          s = info.value;
        } else {
          s = s.replace(SCOPE_JUMP, ' ');
        }
        return c + s;
      });
      if (hostContext) {
        selector = selector.replace(HOST_CONTEXT_PAREN, function (m, pre, paren, post) {
          return pre + paren + ' ' + hostScope + post + COMPLEX_SELECTOR_SEP + ' ' + pre + hostScope + paren + post;
        });
      }
      return selector;
    },
    _transformCompoundSelector: function (selector, combinator, scope, hostScope) {
      var jumpIndex = selector.search(SCOPE_JUMP);
      var hostContext = false;
      if (selector.indexOf(HOST_CONTEXT) >= 0) {
        hostContext = true;
      } else if (selector.indexOf(HOST) >= 0) {
        selector = this._transformHostSelector(selector, hostScope);
      } else if (jumpIndex !== 0) {
        selector = scope ? this._transformSimpleSelector(selector, scope) : selector;
      }
      if (selector.indexOf(CONTENT) >= 0) {
        combinator = '';
      }
      var stop;
      if (jumpIndex >= 0) {
        selector = selector.replace(SCOPE_JUMP, ' ');
        stop = true;
      }
      return {
        value: selector,
        combinator: combinator,
        stop: stop,
        hostContext: hostContext
      };
    },
    _transformSimpleSelector: function (selector, scope) {
      var p$ = selector.split(PSEUDO_PREFIX);
      p$[0] += scope;
      return p$.join(PSEUDO_PREFIX);
    },
    _transformHostSelector: function (selector, hostScope) {
      var m = selector.match(HOST_PAREN);
      var paren = m && m[2].trim() || '';
      if (paren) {
        if (!paren[0].match(SIMPLE_SELECTOR_PREFIX)) {
          var typeSelector = paren.split(SIMPLE_SELECTOR_PREFIX)[0];
          if (typeSelector === hostScope) {
            return paren;
          } else {
            return SELECTOR_NO_MATCH;
          }
        } else {
          return selector.replace(HOST_PAREN, function (m, host, paren) {
            return hostScope + paren;
          });
        }
      } else {
        return selector.replace(HOST, hostScope);
      }
    },
    documentRule: function (rule) {
      rule.selector = rule.parsedSelector;
      this.normalizeRootSelector(rule);
      if (!settings.useNativeShadow) {
        this._transformRule(rule, this._transformDocumentSelector);
      }
    },
    normalizeRootSelector: function (rule) {
      rule.selector = rule.selector.replace(ROOT, 'html');
      var parts = rule.selector.split(COMPLEX_SELECTOR_SEP);
      parts = parts.filter(function (part) {
        return !part.match(HOST_OR_HOST_GT_STAR);
      });
      rule.selector = parts.join(COMPLEX_SELECTOR_SEP);
    },
    _transformDocumentSelector: function (selector) {
      return selector.match(SCOPE_JUMP) ? this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR) : this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
    },
    _slottedToContent: function (cssText) {
      return cssText.replace(SLOTTED_PAREN, CONTENT + '> $1');
    },
    SCOPE_NAME: 'style-scope'
  };
  var SCOPE_NAME = api.SCOPE_NAME;
  var SCOPE_DOC_SELECTOR = ':not([' + SCOPE_NAME + '])' + ':not(.' + SCOPE_NAME + ')';
  var COMPLEX_SELECTOR_SEP = ',';
  var SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g;
  var SIMPLE_SELECTOR_PREFIX = /[[.:#*]/;
  var HOST = ':host';
  var ROOT = ':root';
  var HOST_PAREN = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
  var HOST_CONTEXT = ':host-context';
  var HOST_CONTEXT_PAREN = /(.*)(?::host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))(.*)/;
  var CONTENT = '::content';
  var SCOPE_JUMP = /::content|::shadow|\/deep\//;
  var CSS_CLASS_PREFIX = '.';
  var CSS_ATTR_PREFIX = '[' + SCOPE_NAME + '~=';
  var CSS_ATTR_SUFFIX = ']';
  var PSEUDO_PREFIX = ':';
  var CLASS = 'class';
  var CONTENT_START = new RegExp('^(' + CONTENT + ')');
  var SELECTOR_NO_MATCH = 'should_not_match';
  var SLOTTED_PAREN = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/g;
  var HOST_OR_HOST_GT_STAR = /:host(?:\s*>\s*\*)?/;
  return api;
}();Polymer.StyleExtends = function () {
  var styleUtil = Polymer.StyleUtil;
  return {
    hasExtends: function (cssText) {
      return Boolean(cssText.match(this.rx.EXTEND));
    },
    transform: function (style) {
      var rules = styleUtil.rulesForStyle(style);
      var self = this;
      styleUtil.forEachRule(rules, function (rule) {
        self._mapRuleOntoParent(rule);
        if (rule.parent) {
          var m;
          while (m = self.rx.EXTEND.exec(rule.cssText)) {
            var extend = m[1];
            var extendor = self._findExtendor(extend, rule);
            if (extendor) {
              self._extendRule(rule, extendor);
            }
          }
        }
        rule.cssText = rule.cssText.replace(self.rx.EXTEND, '');
      });
      return styleUtil.toCssText(rules, function (rule) {
        if (rule.selector.match(self.rx.STRIP)) {
          rule.cssText = '';
        }
      }, true);
    },
    _mapRuleOntoParent: function (rule) {
      if (rule.parent) {
        var map = rule.parent.map || (rule.parent.map = {});
        var parts = rule.selector.split(',');
        for (var i = 0, p; i < parts.length; i++) {
          p = parts[i];
          map[p.trim()] = rule;
        }
        return map;
      }
    },
    _findExtendor: function (extend, rule) {
      return rule.parent && rule.parent.map && rule.parent.map[extend] || this._findExtendor(extend, rule.parent);
    },
    _extendRule: function (target, source) {
      if (target.parent !== source.parent) {
        this._cloneAndAddRuleToParent(source, target.parent);
      }
      target.extends = target.extends || [];
      target.extends.push(source);
      source.selector = source.selector.replace(this.rx.STRIP, '');
      source.selector = (source.selector && source.selector + ',\n') + target.selector;
      if (source.extends) {
        source.extends.forEach(function (e) {
          this._extendRule(target, e);
        }, this);
      }
    },
    _cloneAndAddRuleToParent: function (rule, parent) {
      rule = Object.create(rule);
      rule.parent = parent;
      if (rule.extends) {
        rule.extends = rule.extends.slice();
      }
      parent.rules.push(rule);
    },
    rx: {
      EXTEND: /@extends\(([^)]*)\)\s*?;/gim,
      STRIP: /%[^,]*$/
    }
  };
}();Polymer.ApplyShim = function () {
  'use strict';

  var styleUtil = Polymer.StyleUtil;
  var MIXIN_MATCH = styleUtil.rx.MIXIN_MATCH;
  var VAR_ASSIGN = styleUtil.rx.VAR_ASSIGN;
  var BAD_VAR = /var\(\s*(--[^,]*),\s*(--[^)]*)\)/g;
  var APPLY_NAME_CLEAN = /;\s*/m;
  var INITIAL_INHERIT = /^\s*(initial)|(inherit)\s*$/;
  var MIXIN_VAR_SEP = '_-_';
  var mixinMap = {};
  function mapSet(name, props) {
    name = name.trim();
    mixinMap[name] = {
      properties: props,
      dependants: {}
    };
  }
  function mapGet(name) {
    name = name.trim();
    return mixinMap[name];
  }
  function replaceInitialOrInherit(property, value) {
    var match = INITIAL_INHERIT.exec(value);
    if (match) {
      if (match[1]) {
        value = ApplyShim._getInitialValueForProperty(property);
      } else {
        value = 'apply-shim-inherit';
      }
    }
    return value;
  }
  function cssTextToMap(text) {
    var props = text.split(';');
    var property, value;
    var out = {};
    for (var i = 0, p, sp; i < props.length; i++) {
      p = props[i];
      if (p) {
        sp = p.split(':');
        if (sp.length > 1) {
          property = sp[0].trim();
          value = replaceInitialOrInherit(property, sp.slice(1).join(':'));
          out[property] = value;
        }
      }
    }
    return out;
  }
  function invalidateMixinEntry(mixinEntry) {
    var currentProto = ApplyShim.__currentElementProto;
    var currentElementName = currentProto && currentProto.is;
    for (var elementName in mixinEntry.dependants) {
      if (elementName !== currentElementName) {
        mixinEntry.dependants[elementName].__applyShimInvalid = true;
      }
    }
  }
  function produceCssProperties(matchText, propertyName, valueProperty, valueMixin) {
    if (valueProperty) {
      styleUtil.processVariableAndFallback(valueProperty, function (prefix, value) {
        if (value && mapGet(value)) {
          valueMixin = '@apply ' + value + ';';
        }
      });
    }
    if (!valueMixin) {
      return matchText;
    }
    var mixinAsProperties = consumeCssProperties(valueMixin);
    var prefix = matchText.slice(0, matchText.indexOf('--'));
    var mixinValues = cssTextToMap(mixinAsProperties);
    var combinedProps = mixinValues;
    var mixinEntry = mapGet(propertyName);
    var oldProps = mixinEntry && mixinEntry.properties;
    if (oldProps) {
      combinedProps = Object.create(oldProps);
      combinedProps = Polymer.Base.mixin(combinedProps, mixinValues);
    } else {
      mapSet(propertyName, combinedProps);
    }
    var out = [];
    var p, v;
    var needToInvalidate = false;
    for (p in combinedProps) {
      v = mixinValues[p];
      if (v === undefined) {
        v = 'initial';
      }
      if (oldProps && !(p in oldProps)) {
        needToInvalidate = true;
      }
      out.push(propertyName + MIXIN_VAR_SEP + p + ': ' + v);
    }
    if (needToInvalidate) {
      invalidateMixinEntry(mixinEntry);
    }
    if (mixinEntry) {
      mixinEntry.properties = combinedProps;
    }
    if (valueProperty) {
      prefix = matchText + ';' + prefix;
    }
    return prefix + out.join('; ') + ';';
  }
  function fixVars(matchText, varA, varB) {
    return 'var(' + varA + ',' + 'var(' + varB + '))';
  }
  function atApplyToCssProperties(mixinName, fallbacks) {
    mixinName = mixinName.replace(APPLY_NAME_CLEAN, '');
    var vars = [];
    var mixinEntry = mapGet(mixinName);
    if (!mixinEntry) {
      mapSet(mixinName, {});
      mixinEntry = mapGet(mixinName);
    }
    if (mixinEntry) {
      var currentProto = ApplyShim.__currentElementProto;
      if (currentProto) {
        mixinEntry.dependants[currentProto.is] = currentProto;
      }
      var p, parts, f;
      for (p in mixinEntry.properties) {
        f = fallbacks && fallbacks[p];
        parts = [p, ': var(', mixinName, MIXIN_VAR_SEP, p];
        if (f) {
          parts.push(',', f);
        }
        parts.push(')');
        vars.push(parts.join(''));
      }
    }
    return vars.join('; ');
  }
  function consumeCssProperties(text) {
    var m;
    while (m = MIXIN_MATCH.exec(text)) {
      var matchText = m[0];
      var mixinName = m[1];
      var idx = m.index;
      var applyPos = idx + matchText.indexOf('@apply');
      var afterApplyPos = idx + matchText.length;
      var textBeforeApply = text.slice(0, applyPos);
      var textAfterApply = text.slice(afterApplyPos);
      var defaults = cssTextToMap(textBeforeApply);
      var replacement = atApplyToCssProperties(mixinName, defaults);
      text = [textBeforeApply, replacement, textAfterApply].join('');
      MIXIN_MATCH.lastIndex = idx + replacement.length;
    }
    return text;
  }
  var ApplyShim = {
    _measureElement: null,
    _map: mixinMap,
    _separator: MIXIN_VAR_SEP,
    transform: function (styles, elementProto) {
      this.__currentElementProto = elementProto;
      styleUtil.forRulesInStyles(styles, this._boundFindDefinitions);
      styleUtil.forRulesInStyles(styles, this._boundFindApplications);
      if (elementProto) {
        elementProto.__applyShimInvalid = false;
      }
      this.__currentElementProto = null;
    },
    _findDefinitions: function (rule) {
      var cssText = rule.parsedCssText;
      cssText = cssText.replace(BAD_VAR, fixVars);
      cssText = cssText.replace(VAR_ASSIGN, produceCssProperties);
      rule.cssText = cssText;
      if (rule.selector === ':root') {
        rule.selector = ':host > *';
      }
    },
    _findApplications: function (rule) {
      rule.cssText = consumeCssProperties(rule.cssText);
    },
    transformRule: function (rule) {
      this._findDefinitions(rule);
      this._findApplications(rule);
    },
    _getInitialValueForProperty: function (property) {
      if (!this._measureElement) {
        this._measureElement = document.createElement('meta');
        this._measureElement.style.all = 'initial';
        document.head.appendChild(this._measureElement);
      }
      return window.getComputedStyle(this._measureElement).getPropertyValue(property);
    }
  };
  ApplyShim._boundTransformRule = ApplyShim.transformRule.bind(ApplyShim);
  ApplyShim._boundFindDefinitions = ApplyShim._findDefinitions.bind(ApplyShim);
  ApplyShim._boundFindApplications = ApplyShim._findApplications.bind(ApplyShim);
  return ApplyShim;
}();(function () {
  var prepElement = Polymer.Base._prepElement;
  var nativeShadow = Polymer.Settings.useNativeShadow;
  var styleUtil = Polymer.StyleUtil;
  var styleTransformer = Polymer.StyleTransformer;
  var styleExtends = Polymer.StyleExtends;
  var applyShim = Polymer.ApplyShim;
  var settings = Polymer.Settings;
  Polymer.Base._addFeature({
    _prepElement: function (element) {
      if (this._encapsulateStyle && this.__cssBuild !== 'shady') {
        styleTransformer.element(element, this.is, this._scopeCssViaAttr);
      }
      prepElement.call(this, element);
    },
    _prepStyles: function () {
      if (this._encapsulateStyle === undefined) {
        this._encapsulateStyle = !nativeShadow;
      }
      if (!nativeShadow) {
        this._scopeStyle = styleUtil.applyStylePlaceHolder(this.is);
      }
      this.__cssBuild = styleUtil.cssBuildTypeForModule(this.is);
    },
    _prepShimStyles: function () {
      if (this._template) {
        var hasTargetedCssBuild = styleUtil.isTargetedBuild(this.__cssBuild);
        if (settings.useNativeCSSProperties && this.__cssBuild === 'shadow' && hasTargetedCssBuild) {
          if (settings.preserveStyleIncludes) {
            styleUtil.styleIncludesToTemplate(this._template);
          }
          return;
        }
        this._styles = this._styles || this._collectStyles();
        if (settings.useNativeCSSProperties && !this.__cssBuild) {
          applyShim.transform(this._styles, this);
        }
        var cssText = settings.useNativeCSSProperties && hasTargetedCssBuild ? this._styles.length && this._styles[0].textContent.trim() : styleTransformer.elementStyles(this);
        this._prepStyleProperties();
        if (!this._needsStyleProperties() && cssText) {
          styleUtil.applyCss(cssText, this.is, nativeShadow ? this._template.content : null, this._scopeStyle);
        }
      } else {
        this._styles = [];
      }
    },
    _collectStyles: function () {
      var styles = [];
      var cssText = '',
          m$ = this.styleModules;
      if (m$) {
        for (var i = 0, l = m$.length, m; i < l && (m = m$[i]); i++) {
          cssText += styleUtil.cssFromModule(m);
        }
      }
      cssText += styleUtil.cssFromModule(this.is);
      var p = this._template && this._template.parentNode;
      if (this._template && (!p || p.id.toLowerCase() !== this.is)) {
        cssText += styleUtil.cssFromElement(this._template);
      }
      if (cssText) {
        var style = document.createElement('style');
        style.textContent = cssText;
        if (styleExtends.hasExtends(style.textContent)) {
          cssText = styleExtends.transform(style);
        }
        styles.push(style);
      }
      return styles;
    },
    _elementAdd: function (node) {
      if (this._encapsulateStyle) {
        if (node.__styleScoped) {
          node.__styleScoped = false;
        } else {
          styleTransformer.dom(node, this.is, this._scopeCssViaAttr);
        }
      }
    },
    _elementRemove: function (node) {
      if (this._encapsulateStyle) {
        styleTransformer.dom(node, this.is, this._scopeCssViaAttr, true);
      }
    },
    scopeSubtree: function (container, shouldObserve) {
      if (nativeShadow) {
        return;
      }
      var self = this;
      var scopify = function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          var className = node.getAttribute('class');
          node.setAttribute('class', self._scopeElementClass(node, className));
          var n$ = node.querySelectorAll('*');
          for (var i = 0, n; i < n$.length && (n = n$[i]); i++) {
            className = n.getAttribute('class');
            n.setAttribute('class', self._scopeElementClass(n, className));
          }
        }
      };
      scopify(container);
      if (shouldObserve) {
        var mo = new MutationObserver(function (mxns) {
          for (var i = 0, m; i < mxns.length && (m = mxns[i]); i++) {
            if (m.addedNodes) {
              for (var j = 0; j < m.addedNodes.length; j++) {
                scopify(m.addedNodes[j]);
              }
            }
          }
        });
        mo.observe(container, {
          childList: true,
          subtree: true
        });
        return mo;
      }
    }
  });
})();Polymer.StyleProperties = function () {
  'use strict';

  var matchesSelector = Polymer.DomApi.matchesSelector;
  var styleUtil = Polymer.StyleUtil;
  var styleTransformer = Polymer.StyleTransformer;
  var IS_IE = navigator.userAgent.match('Trident');
  var settings = Polymer.Settings;
  return {
    decorateStyles: function (styles, scope) {
      var self = this,
          props = {},
          keyframes = [],
          ruleIndex = 0;
      var scopeSelector = styleTransformer._calcHostScope(scope.is, scope.extends);
      styleUtil.forRulesInStyles(styles, function (rule, style) {
        self.decorateRule(rule);
        rule.index = ruleIndex++;
        self.whenHostOrRootRule(scope, rule, style, function (info) {
          if (rule.parent.type === styleUtil.ruleTypes.MEDIA_RULE) {
            scope.__notStyleScopeCacheable = true;
          }
          if (info.isHost) {
            var hostContextOrFunction = info.selector.split(' ').some(function (s) {
              return s.indexOf(scopeSelector) === 0 && s.length !== scopeSelector.length;
            });
            scope.__notStyleScopeCacheable = scope.__notStyleScopeCacheable || hostContextOrFunction;
          }
        });
        self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
      }, function onKeyframesRule(rule) {
        keyframes.push(rule);
      });
      styles._keyframes = keyframes;
      var names = [];
      for (var i in props) {
        names.push(i);
      }
      return names;
    },
    decorateRule: function (rule) {
      if (rule.propertyInfo) {
        return rule.propertyInfo;
      }
      var info = {},
          properties = {};
      var hasProperties = this.collectProperties(rule, properties);
      if (hasProperties) {
        info.properties = properties;
        rule.rules = null;
      }
      info.cssText = this.collectCssText(rule);
      rule.propertyInfo = info;
      return info;
    },
    collectProperties: function (rule, properties) {
      var info = rule.propertyInfo;
      if (info) {
        if (info.properties) {
          Polymer.Base.mixin(properties, info.properties);
          return true;
        }
      } else {
        var m,
            rx = this.rx.VAR_ASSIGN;
        var cssText = rule.parsedCssText;
        var value;
        var any;
        while (m = rx.exec(cssText)) {
          value = (m[2] || m[3]).trim();
          if (value !== 'inherit') {
            properties[m[1].trim()] = value;
          }
          any = true;
        }
        return any;
      }
    },
    collectCssText: function (rule) {
      return this.collectConsumingCssText(rule.parsedCssText);
    },
    collectConsumingCssText: function (cssText) {
      return cssText.replace(this.rx.BRACKETED, '').replace(this.rx.VAR_ASSIGN, '');
    },
    collectPropertiesInCssText: function (cssText, props) {
      var m;
      while (m = this.rx.VAR_CONSUMED.exec(cssText)) {
        var name = m[1];
        if (m[2] !== ':') {
          props[name] = true;
        }
      }
    },
    reify: function (props) {
      var names = Object.getOwnPropertyNames(props);
      for (var i = 0, n; i < names.length; i++) {
        n = names[i];
        props[n] = this.valueForProperty(props[n], props);
      }
    },
    valueForProperty: function (property, props) {
      if (property) {
        if (property.indexOf(';') >= 0) {
          property = this.valueForProperties(property, props);
        } else {
          var self = this;
          var fn = function (prefix, value, fallback, suffix) {
            var propertyValue = self.valueForProperty(props[value], props);
            if (!propertyValue || propertyValue === 'initial') {
              propertyValue = self.valueForProperty(props[fallback] || fallback, props) || fallback;
            } else if (propertyValue === 'apply-shim-inherit') {
              propertyValue = 'inherit';
            }
            return prefix + (propertyValue || '') + suffix;
          };
          property = styleUtil.processVariableAndFallback(property, fn);
        }
      }
      return property && property.trim() || '';
    },
    valueForProperties: function (property, props) {
      var parts = property.split(';');
      for (var i = 0, p, m; i < parts.length; i++) {
        if (p = parts[i]) {
          this.rx.MIXIN_MATCH.lastIndex = 0;
          m = this.rx.MIXIN_MATCH.exec(p);
          if (m) {
            p = this.valueForProperty(props[m[1]], props);
          } else {
            var colon = p.indexOf(':');
            if (colon !== -1) {
              var pp = p.substring(colon);
              pp = pp.trim();
              pp = this.valueForProperty(pp, props) || pp;
              p = p.substring(0, colon) + pp;
            }
          }
          parts[i] = p && p.lastIndexOf(';') === p.length - 1 ? p.slice(0, -1) : p || '';
        }
      }
      return parts.join(';');
    },
    applyProperties: function (rule, props) {
      var output = '';
      if (!rule.propertyInfo) {
        this.decorateRule(rule);
      }
      if (rule.propertyInfo.cssText) {
        output = this.valueForProperties(rule.propertyInfo.cssText, props);
      }
      rule.cssText = output;
    },
    applyKeyframeTransforms: function (rule, keyframeTransforms) {
      var input = rule.cssText;
      var output = rule.cssText;
      if (rule.hasAnimations == null) {
        rule.hasAnimations = this.rx.ANIMATION_MATCH.test(input);
      }
      if (rule.hasAnimations) {
        var transform;
        if (rule.keyframeNamesToTransform == null) {
          rule.keyframeNamesToTransform = [];
          for (var keyframe in keyframeTransforms) {
            transform = keyframeTransforms[keyframe];
            output = transform(input);
            if (input !== output) {
              input = output;
              rule.keyframeNamesToTransform.push(keyframe);
            }
          }
        } else {
          for (var i = 0; i < rule.keyframeNamesToTransform.length; ++i) {
            transform = keyframeTransforms[rule.keyframeNamesToTransform[i]];
            input = transform(input);
          }
          output = input;
        }
      }
      rule.cssText = output;
    },
    propertyDataFromStyles: function (styles, element) {
      var props = {},
          self = this;
      var o = [];
      styleUtil.forActiveRulesInStyles(styles, function (rule) {
        if (!rule.propertyInfo) {
          self.decorateRule(rule);
        }
        var selectorToMatch = rule.transformedSelector || rule.parsedSelector;
        if (element && rule.propertyInfo.properties && selectorToMatch) {
          if (matchesSelector.call(element, selectorToMatch)) {
            self.collectProperties(rule, props);
            addToBitMask(rule.index, o);
          }
        }
      });
      return {
        properties: props,
        key: o
      };
    },
    _rootSelector: /:root|:host\s*>\s*\*/,
    _checkRoot: function (hostScope, selector) {
      return Boolean(selector.match(this._rootSelector)) || hostScope === 'html' && selector.indexOf('html') > -1;
    },
    whenHostOrRootRule: function (scope, rule, style, callback) {
      if (!rule.propertyInfo) {
        self.decorateRule(rule);
      }
      if (!rule.propertyInfo.properties) {
        return;
      }
      var hostScope = scope.is ? styleTransformer._calcHostScope(scope.is, scope.extends) : 'html';
      var parsedSelector = rule.parsedSelector;
      var isRoot = this._checkRoot(hostScope, parsedSelector);
      var isHost = !isRoot && parsedSelector.indexOf(':host') === 0;
      var cssBuild = scope.__cssBuild || style.__cssBuild;
      if (cssBuild === 'shady') {
        isRoot = parsedSelector === hostScope + ' > *.' + hostScope || parsedSelector.indexOf('html') > -1;
        isHost = !isRoot && parsedSelector.indexOf(hostScope) === 0;
      }
      if (!isRoot && !isHost) {
        return;
      }
      var selectorToMatch = hostScope;
      if (isHost) {
        if (settings.useNativeShadow && !rule.transformedSelector) {
          rule.transformedSelector = styleTransformer._transformRuleCss(rule, styleTransformer._transformComplexSelector, scope.is, hostScope);
        }
        selectorToMatch = rule.transformedSelector || rule.parsedSelector;
      }
      if (isRoot && hostScope === 'html') {
        selectorToMatch = rule.transformedSelector || rule.parsedSelector;
      }
      callback({
        selector: selectorToMatch,
        isHost: isHost,
        isRoot: isRoot
      });
    },
    hostAndRootPropertiesForScope: function (scope) {
      var hostProps = {},
          rootProps = {},
          self = this;
      styleUtil.forActiveRulesInStyles(scope._styles, function (rule, style) {
        self.whenHostOrRootRule(scope, rule, style, function (info) {
          var element = scope._element || scope;
          if (matchesSelector.call(element, info.selector)) {
            if (info.isHost) {
              self.collectProperties(rule, hostProps);
            } else {
              self.collectProperties(rule, rootProps);
            }
          }
        });
      });
      return {
        rootProps: rootProps,
        hostProps: hostProps
      };
    },
    transformStyles: function (element, properties, scopeSelector) {
      var self = this;
      var hostSelector = styleTransformer._calcHostScope(element.is, element.extends);
      var rxHostSelector = element.extends ? '\\' + hostSelector.slice(0, -1) + '\\]' : hostSelector;
      var hostRx = new RegExp(this.rx.HOST_PREFIX + rxHostSelector + this.rx.HOST_SUFFIX);
      var keyframeTransforms = this._elementKeyframeTransforms(element, scopeSelector);
      return styleTransformer.elementStyles(element, function (rule) {
        self.applyProperties(rule, properties);
        if (!settings.useNativeShadow && !Polymer.StyleUtil.isKeyframesSelector(rule) && rule.cssText) {
          self.applyKeyframeTransforms(rule, keyframeTransforms);
          self._scopeSelector(rule, hostRx, hostSelector, element._scopeCssViaAttr, scopeSelector);
        }
      });
    },
    _elementKeyframeTransforms: function (element, scopeSelector) {
      var keyframesRules = element._styles._keyframes;
      var keyframeTransforms = {};
      if (!settings.useNativeShadow && keyframesRules) {
        for (var i = 0, keyframesRule = keyframesRules[i]; i < keyframesRules.length; keyframesRule = keyframesRules[++i]) {
          this._scopeKeyframes(keyframesRule, scopeSelector);
          keyframeTransforms[keyframesRule.keyframesName] = this._keyframesRuleTransformer(keyframesRule);
        }
      }
      return keyframeTransforms;
    },
    _keyframesRuleTransformer: function (keyframesRule) {
      return function (cssText) {
        return cssText.replace(keyframesRule.keyframesNameRx, keyframesRule.transformedKeyframesName);
      };
    },
    _scopeKeyframes: function (rule, scopeId) {
      rule.keyframesNameRx = new RegExp(rule.keyframesName, 'g');
      rule.transformedKeyframesName = rule.keyframesName + '-' + scopeId;
      rule.transformedSelector = rule.transformedSelector || rule.selector;
      rule.selector = rule.transformedSelector.replace(rule.keyframesName, rule.transformedKeyframesName);
    },
    _scopeSelector: function (rule, hostRx, hostSelector, viaAttr, scopeId) {
      rule.transformedSelector = rule.transformedSelector || rule.selector;
      var selector = rule.transformedSelector;
      var scope = viaAttr ? '[' + styleTransformer.SCOPE_NAME + '~=' + scopeId + ']' : '.' + scopeId;
      var parts = selector.split(',');
      for (var i = 0, l = parts.length, p; i < l && (p = parts[i]); i++) {
        parts[i] = p.match(hostRx) ? p.replace(hostSelector, scope) : scope + ' ' + p;
      }
      rule.selector = parts.join(',');
    },
    applyElementScopeSelector: function (element, selector, old, viaAttr) {
      var c = viaAttr ? element.getAttribute(styleTransformer.SCOPE_NAME) : element.getAttribute('class') || '';
      var v = old ? c.replace(old, selector) : (c ? c + ' ' : '') + this.XSCOPE_NAME + ' ' + selector;
      if (c !== v) {
        if (viaAttr) {
          element.setAttribute(styleTransformer.SCOPE_NAME, v);
        } else {
          element.setAttribute('class', v);
        }
      }
    },
    applyElementStyle: function (element, properties, selector, style) {
      var cssText = style ? style.textContent || '' : this.transformStyles(element, properties, selector);
      var s = element._customStyle;
      if (s && !settings.useNativeShadow && s !== style) {
        s._useCount--;
        if (s._useCount <= 0 && s.parentNode) {
          s.parentNode.removeChild(s);
        }
      }
      if (settings.useNativeShadow) {
        if (element._customStyle) {
          element._customStyle.textContent = cssText;
          style = element._customStyle;
        } else if (cssText) {
          style = styleUtil.applyCss(cssText, selector, element.root, element._scopeStyle);
        }
      } else {
        if (!style) {
          if (cssText) {
            style = styleUtil.applyCss(cssText, selector, null, element._scopeStyle);
          }
        } else if (!style.parentNode) {
          if (IS_IE && cssText.indexOf('@media') > -1) {
            style.textContent = cssText;
          }
          styleUtil.applyStyle(style, null, element._scopeStyle);
        }
      }
      if (style) {
        style._useCount = style._useCount || 0;
        if (element._customStyle != style) {
          style._useCount++;
        }
        element._customStyle = style;
      }
      return style;
    },
    mixinCustomStyle: function (props, customStyle) {
      var v;
      for (var i in customStyle) {
        v = customStyle[i];
        if (v || v === 0) {
          props[i] = v;
        }
      }
    },
    updateNativeStyleProperties: function (element, properties) {
      var oldPropertyNames = element.__customStyleProperties;
      if (oldPropertyNames) {
        for (var i = 0; i < oldPropertyNames.length; i++) {
          element.style.removeProperty(oldPropertyNames[i]);
        }
      }
      var propertyNames = [];
      for (var p in properties) {
        if (properties[p] !== null) {
          element.style.setProperty(p, properties[p]);
          propertyNames.push(p);
        }
      }
      element.__customStyleProperties = propertyNames;
    },
    rx: styleUtil.rx,
    XSCOPE_NAME: 'x-scope'
  };
  function addToBitMask(n, bits) {
    var o = parseInt(n / 32);
    var v = 1 << n % 32;
    bits[o] = (bits[o] || 0) | v;
  }
}();(function () {
  Polymer.StyleCache = function () {
    this.cache = {};
  };
  Polymer.StyleCache.prototype = {
    MAX: 100,
    store: function (is, data, keyValues, keyStyles) {
      data.keyValues = keyValues;
      data.styles = keyStyles;
      var s$ = this.cache[is] = this.cache[is] || [];
      s$.push(data);
      if (s$.length > this.MAX) {
        s$.shift();
      }
    },
    retrieve: function (is, keyValues, keyStyles) {
      var cache = this.cache[is];
      if (cache) {
        for (var i = cache.length - 1, data; i >= 0; i--) {
          data = cache[i];
          if (keyStyles === data.styles && this._objectsEqual(keyValues, data.keyValues)) {
            return data;
          }
        }
      }
    },
    clear: function () {
      this.cache = {};
    },
    _objectsEqual: function (target, source) {
      var t, s;
      for (var i in target) {
        t = target[i], s = source[i];
        if (!(typeof t === 'object' && t ? this._objectsStrictlyEqual(t, s) : t === s)) {
          return false;
        }
      }
      if (Array.isArray(target)) {
        return target.length === source.length;
      }
      return true;
    },
    _objectsStrictlyEqual: function (target, source) {
      return this._objectsEqual(target, source) && this._objectsEqual(source, target);
    }
  };
})();Polymer.StyleDefaults = function () {
  var styleProperties = Polymer.StyleProperties;
  var StyleCache = Polymer.StyleCache;
  var nativeVariables = Polymer.Settings.useNativeCSSProperties;
  var api = {
    _styles: [],
    _properties: null,
    customStyle: {},
    _styleCache: new StyleCache(),
    _element: Polymer.DomApi.wrap(document.documentElement),
    addStyle: function (style) {
      this._styles.push(style);
      this._properties = null;
    },
    get _styleProperties() {
      if (!this._properties) {
        styleProperties.decorateStyles(this._styles, this);
        this._styles._scopeStyleProperties = null;
        this._properties = styleProperties.hostAndRootPropertiesForScope(this).rootProps;
        styleProperties.mixinCustomStyle(this._properties, this.customStyle);
        styleProperties.reify(this._properties);
      }
      return this._properties;
    },
    hasStyleProperties: function () {
      return Boolean(this._properties);
    },
    _needsStyleProperties: function () {},
    _computeStyleProperties: function () {
      return this._styleProperties;
    },
    updateStyles: function (properties) {
      this._properties = null;
      if (properties) {
        Polymer.Base.mixin(this.customStyle, properties);
      }
      this._styleCache.clear();
      for (var i = 0, s; i < this._styles.length; i++) {
        s = this._styles[i];
        s = s.__importElement || s;
        s._apply();
      }
      if (nativeVariables) {
        styleProperties.updateNativeStyleProperties(document.documentElement, this.customStyle);
      }
    }
  };
  return api;
}();(function () {
  'use strict';

  var serializeValueToAttribute = Polymer.Base.serializeValueToAttribute;
  var propertyUtils = Polymer.StyleProperties;
  var styleTransformer = Polymer.StyleTransformer;
  var styleDefaults = Polymer.StyleDefaults;
  var nativeShadow = Polymer.Settings.useNativeShadow;
  var nativeVariables = Polymer.Settings.useNativeCSSProperties;
  Polymer.Base._addFeature({
    _prepStyleProperties: function () {
      if (!nativeVariables) {
        this._ownStylePropertyNames = this._styles && this._styles.length ? propertyUtils.decorateStyles(this._styles, this) : null;
      }
    },
    customStyle: null,
    getComputedStyleValue: function (property) {
      if (!nativeVariables && !this._styleProperties) {
        this._computeStyleProperties();
      }
      return !nativeVariables && this._styleProperties && this._styleProperties[property] || getComputedStyle(this).getPropertyValue(property);
    },
    _setupStyleProperties: function () {
      this.customStyle = {};
      this._styleCache = null;
      this._styleProperties = null;
      this._scopeSelector = null;
      this._ownStyleProperties = null;
      this._customStyle = null;
    },
    _needsStyleProperties: function () {
      return Boolean(!nativeVariables && this._ownStylePropertyNames && this._ownStylePropertyNames.length);
    },
    _validateApplyShim: function () {
      if (this.__applyShimInvalid) {
        Polymer.ApplyShim.transform(this._styles, this.__proto__);
        var cssText = styleTransformer.elementStyles(this);
        if (nativeShadow) {
          var templateStyle = this._template.content.querySelector('style');
          if (templateStyle) {
            templateStyle.textContent = cssText;
          }
        } else {
          var shadyStyle = this._scopeStyle && this._scopeStyle.nextSibling;
          if (shadyStyle) {
            shadyStyle.textContent = cssText;
          }
        }
      }
    },
    _beforeAttached: function () {
      if ((!this._scopeSelector || this.__stylePropertiesInvalid) && this._needsStyleProperties()) {
        this.__stylePropertiesInvalid = false;
        this._updateStyleProperties();
      }
    },
    _findStyleHost: function () {
      var e = this,
          root;
      while (root = Polymer.dom(e).getOwnerRoot()) {
        if (Polymer.isInstance(root.host)) {
          return root.host;
        }
        e = root.host;
      }
      return styleDefaults;
    },
    _updateStyleProperties: function () {
      var info,
          scope = this._findStyleHost();
      if (!scope._styleProperties) {
        scope._computeStyleProperties();
      }
      if (!scope._styleCache) {
        scope._styleCache = new Polymer.StyleCache();
      }
      var scopeData = propertyUtils.propertyDataFromStyles(scope._styles, this);
      var scopeCacheable = !this.__notStyleScopeCacheable;
      if (scopeCacheable) {
        scopeData.key.customStyle = this.customStyle;
        info = scope._styleCache.retrieve(this.is, scopeData.key, this._styles);
      }
      var scopeCached = Boolean(info);
      if (scopeCached) {
        this._styleProperties = info._styleProperties;
      } else {
        this._computeStyleProperties(scopeData.properties);
      }
      this._computeOwnStyleProperties();
      if (!scopeCached) {
        info = styleCache.retrieve(this.is, this._ownStyleProperties, this._styles);
      }
      var globalCached = Boolean(info) && !scopeCached;
      var style = this._applyStyleProperties(info);
      if (!scopeCached) {
        style = style && nativeShadow ? style.cloneNode(true) : style;
        info = {
          style: style,
          _scopeSelector: this._scopeSelector,
          _styleProperties: this._styleProperties
        };
        if (scopeCacheable) {
          scopeData.key.customStyle = {};
          this.mixin(scopeData.key.customStyle, this.customStyle);
          scope._styleCache.store(this.is, info, scopeData.key, this._styles);
        }
        if (!globalCached) {
          styleCache.store(this.is, Object.create(info), this._ownStyleProperties, this._styles);
        }
      }
    },
    _computeStyleProperties: function (scopeProps) {
      var scope = this._findStyleHost();
      if (!scope._styleProperties) {
        scope._computeStyleProperties();
      }
      var props = Object.create(scope._styleProperties);
      var hostAndRootProps = propertyUtils.hostAndRootPropertiesForScope(this);
      this.mixin(props, hostAndRootProps.hostProps);
      scopeProps = scopeProps || propertyUtils.propertyDataFromStyles(scope._styles, this).properties;
      this.mixin(props, scopeProps);
      this.mixin(props, hostAndRootProps.rootProps);
      propertyUtils.mixinCustomStyle(props, this.customStyle);
      propertyUtils.reify(props);
      this._styleProperties = props;
    },
    _computeOwnStyleProperties: function () {
      var props = {};
      for (var i = 0, n; i < this._ownStylePropertyNames.length; i++) {
        n = this._ownStylePropertyNames[i];
        props[n] = this._styleProperties[n];
      }
      this._ownStyleProperties = props;
    },
    _scopeCount: 0,
    _applyStyleProperties: function (info) {
      var oldScopeSelector = this._scopeSelector;
      this._scopeSelector = info ? info._scopeSelector : this.is + '-' + this.__proto__._scopeCount++;
      var style = propertyUtils.applyElementStyle(this, this._styleProperties, this._scopeSelector, info && info.style);
      if (!nativeShadow) {
        propertyUtils.applyElementScopeSelector(this, this._scopeSelector, oldScopeSelector, this._scopeCssViaAttr);
      }
      return style;
    },
    serializeValueToAttribute: function (value, attribute, node) {
      node = node || this;
      if (attribute === 'class' && !nativeShadow) {
        var host = node === this ? this.domHost || this.dataHost : this;
        if (host) {
          value = host._scopeElementClass(node, value);
        }
      }
      node = this.shadyRoot && this.shadyRoot._hasDistributed ? Polymer.dom(node) : node;
      serializeValueToAttribute.call(this, value, attribute, node);
    },
    _scopeElementClass: function (element, selector) {
      if (!nativeShadow && !this._scopeCssViaAttr) {
        selector = (selector ? selector + ' ' : '') + SCOPE_NAME + ' ' + this.is + (element._scopeSelector ? ' ' + XSCOPE_NAME + ' ' + element._scopeSelector : '');
      }
      return selector;
    },
    updateStyles: function (properties) {
      if (properties) {
        this.mixin(this.customStyle, properties);
      }
      if (nativeVariables) {
        propertyUtils.updateNativeStyleProperties(this, this.customStyle);
      } else {
        if (this.isAttached) {
          if (this._needsStyleProperties()) {
            this._updateStyleProperties();
          } else {
            this._styleProperties = null;
          }
        } else {
          this.__stylePropertiesInvalid = true;
        }
        if (this._styleCache) {
          this._styleCache.clear();
        }
        this._updateRootStyles();
      }
    },
    _updateRootStyles: function (root) {
      root = root || this.root;
      var c$ = Polymer.dom(root)._query(function (e) {
        return e.shadyRoot || e.shadowRoot;
      });
      for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
        if (c.updateStyles) {
          c.updateStyles();
        }
      }
    }
  });
  Polymer.updateStyles = function (properties) {
    styleDefaults.updateStyles(properties);
    Polymer.Base._updateRootStyles(document);
  };
  var styleCache = new Polymer.StyleCache();
  Polymer.customStyleCache = styleCache;
  var SCOPE_NAME = styleTransformer.SCOPE_NAME;
  var XSCOPE_NAME = propertyUtils.XSCOPE_NAME;
})();Polymer.Base._addFeature({
  _registerFeatures: function () {
    this._prepIs();
    if (this.factoryImpl) {
      this._prepConstructor();
    }
    this._prepStyles();
  },
  _finishRegisterFeatures: function () {
    this._prepTemplate();
    this._prepShimStyles();
    this._prepAnnotations();
    this._prepEffects();
    this._prepBehaviors();
    this._prepPropertyInfo();
    this._prepBindings();
    this._prepShady();
  },
  _prepBehavior: function (b) {
    this._addPropertyEffects(b.properties);
    this._addComplexObserverEffects(b.observers);
    this._addHostAttributes(b.hostAttributes);
  },
  _initFeatures: function () {
    this._setupGestures();
    this._setupConfigure(this.__data__);
    this._setupStyleProperties();
    this._setupDebouncers();
    this._setupShady();
    this._registerHost();
    if (this._template) {
      this._validateApplyShim();
      this._poolContent();
      this._beginHosting();
      this._stampTemplate();
      this._endHosting();
      this._marshalAnnotationReferences();
    }
    this._marshalInstanceEffects();
    this._marshalBehaviors();
    this._marshalHostAttributes();
    this._marshalAttributes();
    this._tryReady();
  },
  _marshalBehavior: function (b) {
    if (b.listeners) {
      this._listenListeners(b.listeners);
    }
  }
});(function () {
  var propertyUtils = Polymer.StyleProperties;
  var styleUtil = Polymer.StyleUtil;
  var cssParse = Polymer.CssParse;
  var styleDefaults = Polymer.StyleDefaults;
  var styleTransformer = Polymer.StyleTransformer;
  var applyShim = Polymer.ApplyShim;
  var debounce = Polymer.Debounce;
  var settings = Polymer.Settings;
  var updateDebouncer;
  Polymer({
    is: 'custom-style',
    extends: 'style',
    _template: null,
    properties: { include: String },
    ready: function () {
      this.__appliedElement = this.__appliedElement || this;
      this.__cssBuild = styleUtil.getCssBuildType(this);
      if (this.__appliedElement !== this) {
        this.__appliedElement.__cssBuild = this.__cssBuild;
      }
      if (this.ownerDocument !== window.document && this.__appliedElement === this) {
        document.head.appendChild(this);
      }
      this._tryApply();
    },
    attached: function () {
      this._tryApply();
    },
    _tryApply: function () {
      if (!this._appliesToDocument) {
        if (this.parentNode && this.parentNode.localName !== 'dom-module') {
          this._appliesToDocument = true;
          var e = this.__appliedElement;
          if (!settings.useNativeCSSProperties) {
            this.__needsUpdateStyles = styleDefaults.hasStyleProperties();
            styleDefaults.addStyle(e);
          }
          if (e.textContent || this.include) {
            this._apply(true);
          } else {
            var self = this;
            var observer = new MutationObserver(function () {
              observer.disconnect();
              self._apply(true);
            });
            observer.observe(e, { childList: true });
          }
        }
      }
    },
    _updateStyles: function () {
      Polymer.updateStyles();
    },
    _apply: function (initialApply) {
      var e = this.__appliedElement;
      if (this.include) {
        e.textContent = styleUtil.cssFromModules(this.include, true) + e.textContent;
      }
      if (!e.textContent) {
        return;
      }
      var buildType = this.__cssBuild;
      var targetedBuild = styleUtil.isTargetedBuild(buildType);
      if (settings.useNativeCSSProperties && targetedBuild) {
        return;
      }
      var styleRules = styleUtil.rulesForStyle(e);
      if (!targetedBuild) {
        styleUtil.forEachRule(styleRules, function (rule) {
          styleTransformer.documentRule(rule);
        });
        if (settings.useNativeCSSProperties && !buildType) {
          applyShim.transform([e]);
        }
      }
      if (settings.useNativeCSSProperties) {
        e.textContent = styleUtil.toCssText(styleRules);
      } else {
        var self = this;
        var fn = function fn() {
          self._flushCustomProperties();
        };
        if (initialApply) {
          Polymer.RenderStatus.whenReady(fn);
        } else {
          fn();
        }
      }
    },
    _flushCustomProperties: function () {
      if (this.__needsUpdateStyles) {
        this.__needsUpdateStyles = false;
        updateDebouncer = debounce(updateDebouncer, this._updateStyles);
      } else {
        this._applyCustomProperties();
      }
    },
    _applyCustomProperties: function () {
      var element = this.__appliedElement;
      this._computeStyleProperties();
      var props = this._styleProperties;
      var rules = styleUtil.rulesForStyle(element);
      if (!rules) {
        return;
      }
      element.textContent = styleUtil.toCssText(rules, function (rule) {
        var css = rule.cssText = rule.parsedCssText;
        if (rule.propertyInfo && rule.propertyInfo.cssText) {
          css = cssParse.removeCustomPropAssignment(css);
          rule.cssText = propertyUtils.valueForProperties(css, props);
        }
      });
    }
  });
})();Polymer.Templatizer = {
  properties: { __hideTemplateChildren__: { observer: '_showHideChildren' } },
  _instanceProps: Polymer.nob,
  _parentPropPrefix: '_parent_',
  templatize: function (template) {
    this._templatized = template;
    if (!template._content) {
      template._content = template.content;
    }
    if (template._content._ctor) {
      this.ctor = template._content._ctor;
      this._prepParentProperties(this.ctor.prototype, template);
      return;
    }
    var archetype = Object.create(Polymer.Base);
    this._customPrepAnnotations(archetype, template);
    this._prepParentProperties(archetype, template);
    archetype._prepEffects();
    this._customPrepEffects(archetype);
    archetype._prepBehaviors();
    archetype._prepPropertyInfo();
    archetype._prepBindings();
    archetype._notifyPathUp = this._notifyPathUpImpl;
    archetype._scopeElementClass = this._scopeElementClassImpl;
    archetype.listen = this._listenImpl;
    archetype._showHideChildren = this._showHideChildrenImpl;
    archetype.__setPropertyOrig = this.__setProperty;
    archetype.__setProperty = this.__setPropertyImpl;
    var _constructor = this._constructorImpl;
    var ctor = function TemplateInstance(model, host) {
      _constructor.call(this, model, host);
    };
    ctor.prototype = archetype;
    archetype.constructor = ctor;
    template._content._ctor = ctor;
    this.ctor = ctor;
  },
  _getRootDataHost: function () {
    return this.dataHost && this.dataHost._rootDataHost || this.dataHost;
  },
  _showHideChildrenImpl: function (hide) {
    var c = this._children;
    for (var i = 0; i < c.length; i++) {
      var n = c[i];
      if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
        if (n.nodeType === Node.TEXT_NODE) {
          if (hide) {
            n.__polymerTextContent__ = n.textContent;
            n.textContent = '';
          } else {
            n.textContent = n.__polymerTextContent__;
          }
        } else if (n.style) {
          if (hide) {
            n.__polymerDisplay__ = n.style.display;
            n.style.display = 'none';
          } else {
            n.style.display = n.__polymerDisplay__;
          }
        }
      }
      n.__hideTemplateChildren__ = hide;
    }
  },
  __setPropertyImpl: function (property, value, fromAbove, node) {
    if (node && node.__hideTemplateChildren__ && property == 'textContent') {
      property = '__polymerTextContent__';
    }
    this.__setPropertyOrig(property, value, fromAbove, node);
  },
  _debounceTemplate: function (fn) {
    Polymer.dom.addDebouncer(this.debounce('_debounceTemplate', fn));
  },
  _flushTemplates: function () {
    Polymer.dom.flush();
  },
  _customPrepEffects: function (archetype) {
    var parentProps = archetype._parentProps;
    for (var prop in parentProps) {
      archetype._addPropertyEffect(prop, 'function', this._createHostPropEffector(prop));
    }
    for (prop in this._instanceProps) {
      archetype._addPropertyEffect(prop, 'function', this._createInstancePropEffector(prop));
    }
  },
  _customPrepAnnotations: function (archetype, template) {
    archetype._template = template;
    var c = template._content;
    if (!c._notes) {
      var rootDataHost = archetype._rootDataHost;
      if (rootDataHost) {
        Polymer.Annotations.prepElement = function () {
          rootDataHost._prepElement();
        };
      }
      c._notes = Polymer.Annotations.parseAnnotations(template);
      Polymer.Annotations.prepElement = null;
      this._processAnnotations(c._notes);
    }
    archetype._notes = c._notes;
    archetype._parentProps = c._parentProps;
  },
  _prepParentProperties: function (archetype, template) {
    var parentProps = this._parentProps = archetype._parentProps;
    if (this._forwardParentProp && parentProps) {
      var proto = archetype._parentPropProto;
      var prop;
      if (!proto) {
        for (prop in this._instanceProps) {
          delete parentProps[prop];
        }
        proto = archetype._parentPropProto = Object.create(null);
        if (template != this) {
          Polymer.Bind.prepareModel(proto);
          Polymer.Base.prepareModelNotifyPath(proto);
        }
        for (prop in parentProps) {
          var parentProp = this._parentPropPrefix + prop;
          var effects = [{
            kind: 'function',
            effect: this._createForwardPropEffector(prop),
            fn: Polymer.Bind._functionEffect
          }, {
            kind: 'notify',
            fn: Polymer.Bind._notifyEffect,
            effect: { event: Polymer.CaseMap.camelToDashCase(parentProp) + '-changed' }
          }];
          proto._propertyEffects = proto._propertyEffects || {};
          proto._propertyEffects[parentProp] = effects;
          Polymer.Bind._createAccessors(proto, parentProp, effects);
        }
      }
      var self = this;
      if (template != this) {
        Polymer.Bind.prepareInstance(template);
        template._forwardParentProp = function (source, value) {
          self._forwardParentProp(source, value);
        };
      }
      this._extendTemplate(template, proto);
      template._pathEffector = function (path, value, fromAbove) {
        return self._pathEffectorImpl(path, value, fromAbove);
      };
    }
  },
  _createForwardPropEffector: function (prop) {
    return function (source, value) {
      this._forwardParentProp(prop, value);
    };
  },
  _createHostPropEffector: function (prop) {
    var prefix = this._parentPropPrefix;
    return function (source, value) {
      this.dataHost._templatized[prefix + prop] = value;
    };
  },
  _createInstancePropEffector: function (prop) {
    return function (source, value, old, fromAbove) {
      if (!fromAbove) {
        this.dataHost._forwardInstanceProp(this, prop, value);
      }
    };
  },
  _extendTemplate: function (template, proto) {
    var n$ = Object.getOwnPropertyNames(proto);
    if (proto._propertySetter) {
      template._propertySetter = proto._propertySetter;
    }
    for (var i = 0, n; i < n$.length && (n = n$[i]); i++) {
      var val = template[n];
      if (val && n == '_propertyEffects') {
        var pe = Polymer.Base.mixin({}, val);
        template._propertyEffects = Polymer.Base.mixin(pe, proto._propertyEffects);
      } else {
        var pd = Object.getOwnPropertyDescriptor(proto, n);
        Object.defineProperty(template, n, pd);
        if (val !== undefined) {
          template._propertySetter(n, val);
        }
      }
    }
  },
  _showHideChildren: function (hidden) {},
  _forwardInstancePath: function (inst, path, value) {},
  _forwardInstanceProp: function (inst, prop, value) {},
  _notifyPathUpImpl: function (path, value) {
    var dataHost = this.dataHost;
    var root = Polymer.Path.root(path);
    dataHost._forwardInstancePath.call(dataHost, this, path, value);
    if (root in dataHost._parentProps) {
      dataHost._templatized._notifyPath(dataHost._parentPropPrefix + path, value);
    }
  },
  _pathEffectorImpl: function (path, value, fromAbove) {
    if (this._forwardParentPath) {
      if (path.indexOf(this._parentPropPrefix) === 0) {
        var subPath = path.substring(this._parentPropPrefix.length);
        var model = Polymer.Path.root(subPath);
        if (model in this._parentProps) {
          this._forwardParentPath(subPath, value);
        }
      }
    }
    Polymer.Base._pathEffector.call(this._templatized, path, value, fromAbove);
  },
  _constructorImpl: function (model, host) {
    this._rootDataHost = host._getRootDataHost();
    this._setupConfigure(model);
    this._registerHost(host);
    this._beginHosting();
    this.root = this.instanceTemplate(this._template);
    this.root.__noContent = !this._notes._hasContent;
    this.root.__styleScoped = true;
    this._endHosting();
    this._marshalAnnotatedNodes();
    this._marshalInstanceEffects();
    this._marshalAnnotatedListeners();
    var children = [];
    for (var n = this.root.firstChild; n; n = n.nextSibling) {
      children.push(n);
      n._templateInstance = this;
    }
    this._children = children;
    if (host.__hideTemplateChildren__) {
      this._showHideChildren(true);
    }
    this._tryReady();
  },
  _listenImpl: function (node, eventName, methodName) {
    var model = this;
    var host = this._rootDataHost;
    var handler = host._createEventHandler(node, eventName, methodName);
    var decorated = function (e) {
      e.model = model;
      handler(e);
    };
    host._listen(node, eventName, decorated);
  },
  _scopeElementClassImpl: function (node, value) {
    var host = this._rootDataHost;
    if (host) {
      return host._scopeElementClass(node, value);
    }
    return value;
  },
  stamp: function (model) {
    model = model || {};
    if (this._parentProps) {
      var templatized = this._templatized;
      for (var prop in this._parentProps) {
        if (model[prop] === undefined) {
          model[prop] = templatized[this._parentPropPrefix + prop];
        }
      }
    }
    return new this.ctor(model, this);
  },
  modelForElement: function (el) {
    var model;
    while (el) {
      if (model = el._templateInstance) {
        if (model.dataHost != this) {
          el = model.dataHost;
        } else {
          return model;
        }
      } else {
        el = el.parentNode;
      }
    }
  }
};Polymer({
  is: 'dom-template',
  extends: 'template',
  _template: null,
  behaviors: [Polymer.Templatizer],
  ready: function () {
    this.templatize(this);
  }
});Polymer._collections = new WeakMap();
Polymer.Collection = function (userArray) {
  Polymer._collections.set(userArray, this);
  this.userArray = userArray;
  this.store = userArray.slice();
  this.initMap();
};
Polymer.Collection.prototype = {
  constructor: Polymer.Collection,
  initMap: function () {
    var omap = this.omap = new WeakMap();
    var pmap = this.pmap = {};
    var s = this.store;
    for (var i = 0; i < s.length; i++) {
      var item = s[i];
      if (item && typeof item == 'object') {
        omap.set(item, i);
      } else {
        pmap[item] = i;
      }
    }
  },
  add: function (item) {
    var key = this.store.push(item) - 1;
    if (item && typeof item == 'object') {
      this.omap.set(item, key);
    } else {
      this.pmap[item] = key;
    }
    return '#' + key;
  },
  removeKey: function (key) {
    if (key = this._parseKey(key)) {
      this._removeFromMap(this.store[key]);
      delete this.store[key];
    }
  },
  _removeFromMap: function (item) {
    if (item && typeof item == 'object') {
      this.omap.delete(item);
    } else {
      delete this.pmap[item];
    }
  },
  remove: function (item) {
    var key = this.getKey(item);
    this.removeKey(key);
    return key;
  },
  getKey: function (item) {
    var key;
    if (item && typeof item == 'object') {
      key = this.omap.get(item);
    } else {
      key = this.pmap[item];
    }
    if (key != undefined) {
      return '#' + key;
    }
  },
  getKeys: function () {
    return Object.keys(this.store).map(function (key) {
      return '#' + key;
    });
  },
  _parseKey: function (key) {
    if (key && key[0] == '#') {
      return key.slice(1);
    }
  },
  setItem: function (key, item) {
    if (key = this._parseKey(key)) {
      var old = this.store[key];
      if (old) {
        this._removeFromMap(old);
      }
      if (item && typeof item == 'object') {
        this.omap.set(item, key);
      } else {
        this.pmap[item] = key;
      }
      this.store[key] = item;
    }
  },
  getItem: function (key) {
    if (key = this._parseKey(key)) {
      return this.store[key];
    }
  },
  getItems: function () {
    var items = [],
        store = this.store;
    for (var key in store) {
      items.push(store[key]);
    }
    return items;
  },
  _applySplices: function (splices) {
    var keyMap = {},
        key;
    for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
      s.addedKeys = [];
      for (var j = 0; j < s.removed.length; j++) {
        key = this.getKey(s.removed[j]);
        keyMap[key] = keyMap[key] ? null : -1;
      }
      for (j = 0; j < s.addedCount; j++) {
        var item = this.userArray[s.index + j];
        key = this.getKey(item);
        key = key === undefined ? this.add(item) : key;
        keyMap[key] = keyMap[key] ? null : 1;
        s.addedKeys.push(key);
      }
    }
    var removed = [];
    var added = [];
    for (key in keyMap) {
      if (keyMap[key] < 0) {
        this.removeKey(key);
        removed.push(key);
      }
      if (keyMap[key] > 0) {
        added.push(key);
      }
    }
    return [{
      removed: removed,
      added: added
    }];
  }
};
Polymer.Collection.get = function (userArray) {
  return Polymer._collections.get(userArray) || new Polymer.Collection(userArray);
};
Polymer.Collection.applySplices = function (userArray, splices) {
  var coll = Polymer._collections.get(userArray);
  return coll ? coll._applySplices(splices) : null;
};Polymer({
  is: 'dom-repeat',
  extends: 'template',
  _template: null,
  properties: {
    items: { type: Array },
    as: {
      type: String,
      value: 'item'
    },
    indexAs: {
      type: String,
      value: 'index'
    },
    sort: {
      type: Function,
      observer: '_sortChanged'
    },
    filter: {
      type: Function,
      observer: '_filterChanged'
    },
    observe: {
      type: String,
      observer: '_observeChanged'
    },
    delay: Number,
    renderedItemCount: {
      type: Number,
      notify: !Polymer.Settings.suppressTemplateNotifications,
      readOnly: true
    },
    initialCount: {
      type: Number,
      observer: '_initializeChunking'
    },
    targetFramerate: {
      type: Number,
      value: 20
    },
    notifyDomChange: { type: Boolean },
    _targetFrameTime: {
      type: Number,
      computed: '_computeFrameTime(targetFramerate)'
    }
  },
  behaviors: [Polymer.Templatizer],
  observers: ['_itemsChanged(items.*)'],
  created: function () {
    this._instances = [];
    this._pool = [];
    this._limit = Infinity;
    var self = this;
    this._boundRenderChunk = function () {
      self._renderChunk();
    };
  },
  detached: function () {
    this.__isDetached = true;
    for (var i = 0; i < this._instances.length; i++) {
      this._detachInstance(i);
    }
  },
  attached: function () {
    if (this.__isDetached) {
      this.__isDetached = false;
      var refNode;
      var parentNode = Polymer.dom(this).parentNode;
      if (parentNode.localName == this.is) {
        refNode = parentNode;
        parentNode = Polymer.dom(parentNode).parentNode;
      } else {
        refNode = this;
      }
      var parent = Polymer.dom(parentNode);
      for (var i = 0; i < this._instances.length; i++) {
        this._attachInstance(i, parent, refNode);
      }
    }
  },
  ready: function () {
    this._instanceProps = { __key__: true };
    this._instanceProps[this.as] = true;
    this._instanceProps[this.indexAs] = true;
    if (!this.ctor) {
      this.templatize(this);
    }
  },
  _sortChanged: function (sort) {
    var dataHost = this._getRootDataHost();
    this._sortFn = sort && (typeof sort == 'function' ? sort : function () {
      return dataHost[sort].apply(dataHost, arguments);
    });
    this._needFullRefresh = true;
    if (this.items) {
      this._debounceTemplate(this._render);
    }
  },
  _filterChanged: function (filter) {
    var dataHost = this._getRootDataHost();
    this._filterFn = filter && (typeof filter == 'function' ? filter : function () {
      return dataHost[filter].apply(dataHost, arguments);
    });
    this._needFullRefresh = true;
    if (this.items) {
      this._debounceTemplate(this._render);
    }
  },
  _computeFrameTime: function (rate) {
    return Math.ceil(1000 / rate);
  },
  _initializeChunking: function () {
    if (this.initialCount) {
      this._limit = this.initialCount;
      this._chunkCount = this.initialCount;
      this._lastChunkTime = performance.now();
    }
  },
  _tryRenderChunk: function () {
    if (this.items && this._limit < this.items.length) {
      this.debounce('renderChunk', this._requestRenderChunk);
    }
  },
  _requestRenderChunk: function () {
    requestAnimationFrame(this._boundRenderChunk);
  },
  _renderChunk: function () {
    var currChunkTime = performance.now();
    var ratio = this._targetFrameTime / (currChunkTime - this._lastChunkTime);
    this._chunkCount = Math.round(this._chunkCount * ratio) || 1;
    this._limit += this._chunkCount;
    this._lastChunkTime = currChunkTime;
    this._debounceTemplate(this._render);
  },
  _observeChanged: function () {
    this._observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
  },
  _itemsChanged: function (change) {
    if (change.path == 'items') {
      if (Array.isArray(this.items)) {
        this.collection = Polymer.Collection.get(this.items);
      } else if (!this.items) {
        this.collection = null;
      } else {
        this._error(this._logf('dom-repeat', 'expected array for `items`,' + ' found', this.items));
      }
      this._keySplices = [];
      this._indexSplices = [];
      this._needFullRefresh = true;
      this._initializeChunking();
      this._debounceTemplate(this._render);
    } else if (change.path == 'items.splices') {
      this._keySplices = this._keySplices.concat(change.value.keySplices);
      this._indexSplices = this._indexSplices.concat(change.value.indexSplices);
      this._debounceTemplate(this._render);
    } else {
      var subpath = change.path.slice(6);
      this._forwardItemPath(subpath, change.value);
      this._checkObservedPaths(subpath);
    }
  },
  _checkObservedPaths: function (path) {
    if (this._observePaths) {
      path = path.substring(path.indexOf('.') + 1);
      var paths = this._observePaths;
      for (var i = 0; i < paths.length; i++) {
        if (path.indexOf(paths[i]) === 0) {
          this._needFullRefresh = true;
          if (this.delay) {
            this.debounce('render', this._render, this.delay);
          } else {
            this._debounceTemplate(this._render);
          }
          return;
        }
      }
    }
  },
  render: function () {
    this._needFullRefresh = true;
    this._debounceTemplate(this._render);
    this._flushTemplates();
  },
  _render: function () {
    if (this._needFullRefresh) {
      this._applyFullRefresh();
      this._needFullRefresh = false;
    } else if (this._keySplices.length) {
      if (this._sortFn) {
        this._applySplicesUserSort(this._keySplices);
      } else {
        if (this._filterFn) {
          this._applyFullRefresh();
        } else {
          this._applySplicesArrayOrder(this._indexSplices);
        }
      }
    } else {}
    this._keySplices = [];
    this._indexSplices = [];
    var keyToIdx = this._keyToInstIdx = {};
    for (var i = this._instances.length - 1; i >= 0; i--) {
      var inst = this._instances[i];
      if (inst.isPlaceholder && i < this._limit) {
        inst = this._insertInstance(i, inst.__key__);
      } else if (!inst.isPlaceholder && i >= this._limit) {
        inst = this._downgradeInstance(i, inst.__key__);
      }
      keyToIdx[inst.__key__] = i;
      if (!inst.isPlaceholder) {
        inst.__setProperty(this.indexAs, i, true);
      }
    }
    this._pool.length = 0;
    this._setRenderedItemCount(this._instances.length);
    if (!Polymer.Settings.suppressTemplateNotifications || this.notifyDomChange) {
      this.fire('dom-change');
    }
    this._tryRenderChunk();
  },
  _applyFullRefresh: function () {
    var c = this.collection;
    var keys;
    if (this._sortFn) {
      keys = c ? c.getKeys() : [];
    } else {
      keys = [];
      var items = this.items;
      if (items) {
        for (var i = 0; i < items.length; i++) {
          keys.push(c.getKey(items[i]));
        }
      }
    }
    var self = this;
    if (this._filterFn) {
      keys = keys.filter(function (a) {
        return self._filterFn(c.getItem(a));
      });
    }
    if (this._sortFn) {
      keys.sort(function (a, b) {
        return self._sortFn(c.getItem(a), c.getItem(b));
      });
    }
    for (i = 0; i < keys.length; i++) {
      var key = keys[i];
      var inst = this._instances[i];
      if (inst) {
        inst.__key__ = key;
        if (!inst.isPlaceholder && i < this._limit) {
          inst.__setProperty(this.as, c.getItem(key), true);
        }
      } else if (i < this._limit) {
        this._insertInstance(i, key);
      } else {
        this._insertPlaceholder(i, key);
      }
    }
    for (var j = this._instances.length - 1; j >= i; j--) {
      this._detachAndRemoveInstance(j);
    }
  },
  _numericSort: function (a, b) {
    return a - b;
  },
  _applySplicesUserSort: function (splices) {
    var c = this.collection;
    var keyMap = {};
    var key;
    for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
      for (var j = 0; j < s.removed.length; j++) {
        key = s.removed[j];
        keyMap[key] = keyMap[key] ? null : -1;
      }
      for (j = 0; j < s.added.length; j++) {
        key = s.added[j];
        keyMap[key] = keyMap[key] ? null : 1;
      }
    }
    var removedIdxs = [];
    var addedKeys = [];
    for (key in keyMap) {
      if (keyMap[key] === -1) {
        removedIdxs.push(this._keyToInstIdx[key]);
      }
      if (keyMap[key] === 1) {
        addedKeys.push(key);
      }
    }
    if (removedIdxs.length) {
      removedIdxs.sort(this._numericSort);
      for (i = removedIdxs.length - 1; i >= 0; i--) {
        var idx = removedIdxs[i];
        if (idx !== undefined) {
          this._detachAndRemoveInstance(idx);
        }
      }
    }
    var self = this;
    if (addedKeys.length) {
      if (this._filterFn) {
        addedKeys = addedKeys.filter(function (a) {
          return self._filterFn(c.getItem(a));
        });
      }
      addedKeys.sort(function (a, b) {
        return self._sortFn(c.getItem(a), c.getItem(b));
      });
      var start = 0;
      for (i = 0; i < addedKeys.length; i++) {
        start = this._insertRowUserSort(start, addedKeys[i]);
      }
    }
  },
  _insertRowUserSort: function (start, key) {
    var c = this.collection;
    var item = c.getItem(key);
    var end = this._instances.length - 1;
    var idx = -1;
    while (start <= end) {
      var mid = start + end >> 1;
      var midKey = this._instances[mid].__key__;
      var cmp = this._sortFn(c.getItem(midKey), item);
      if (cmp < 0) {
        start = mid + 1;
      } else if (cmp > 0) {
        end = mid - 1;
      } else {
        idx = mid;
        break;
      }
    }
    if (idx < 0) {
      idx = end + 1;
    }
    this._insertPlaceholder(idx, key);
    return idx;
  },
  _applySplicesArrayOrder: function (splices) {
    for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
      for (var j = 0; j < s.removed.length; j++) {
        this._detachAndRemoveInstance(s.index);
      }
      for (j = 0; j < s.addedKeys.length; j++) {
        this._insertPlaceholder(s.index + j, s.addedKeys[j]);
      }
    }
  },
  _detachInstance: function (idx) {
    var inst = this._instances[idx];
    if (!inst.isPlaceholder) {
      for (var i = 0; i < inst._children.length; i++) {
        var el = inst._children[i];
        Polymer.dom(inst.root).appendChild(el);
      }
      return inst;
    }
  },
  _attachInstance: function (idx, parent, refNode) {
    var inst = this._instances[idx];
    if (!inst.isPlaceholder) {
      parent.insertBefore(inst.root, refNode);
    }
  },
  _detachAndRemoveInstance: function (idx) {
    var inst = this._detachInstance(idx);
    if (inst) {
      this._pool.push(inst);
    }
    this._instances.splice(idx, 1);
  },
  _insertPlaceholder: function (idx, key) {
    this._instances.splice(idx, 0, {
      isPlaceholder: true,
      __key__: key
    });
  },
  _stampInstance: function (idx, key) {
    var model = { __key__: key };
    model[this.as] = this.collection.getItem(key);
    model[this.indexAs] = idx;
    return this.stamp(model);
  },
  _insertInstance: function (idx, key) {
    var inst = this._pool.pop();
    if (inst) {
      inst.__setProperty(this.as, this.collection.getItem(key), true);
      inst.__setProperty('__key__', key, true);
    } else {
      inst = this._stampInstance(idx, key);
    }
    var beforeRow = this._instances[idx + 1];
    var beforeNode = beforeRow && !beforeRow.isPlaceholder ? beforeRow._children[0] : this;
    var parentNode = Polymer.dom(this).parentNode;
    if (parentNode.localName == this.is) {
      if (beforeNode == this) {
        beforeNode = parentNode;
      }
      parentNode = Polymer.dom(parentNode).parentNode;
    }
    Polymer.dom(parentNode).insertBefore(inst.root, beforeNode);
    this._instances[idx] = inst;
    return inst;
  },
  _downgradeInstance: function (idx, key) {
    var inst = this._detachInstance(idx);
    if (inst) {
      this._pool.push(inst);
    }
    inst = {
      isPlaceholder: true,
      __key__: key
    };
    this._instances[idx] = inst;
    return inst;
  },
  _showHideChildren: function (hidden) {
    for (var i = 0; i < this._instances.length; i++) {
      if (!this._instances[i].isPlaceholder) this._instances[i]._showHideChildren(hidden);
    }
  },
  _forwardInstanceProp: function (inst, prop, value) {
    if (prop == this.as) {
      var idx;
      if (this._sortFn || this._filterFn) {
        idx = this.items.indexOf(this.collection.getItem(inst.__key__));
      } else {
        idx = inst[this.indexAs];
      }
      this.set('items.' + idx, value);
    }
  },
  _forwardInstancePath: function (inst, path, value) {
    if (path.indexOf(this.as + '.') === 0) {
      this._notifyPath('items.' + inst.__key__ + '.' + path.slice(this.as.length + 1), value);
    }
  },
  _forwardParentProp: function (prop, value) {
    var i$ = this._instances;
    for (var i = 0, inst; i < i$.length && (inst = i$[i]); i++) {
      if (!inst.isPlaceholder) {
        inst.__setProperty(prop, value, true);
      }
    }
  },
  _forwardParentPath: function (path, value) {
    var i$ = this._instances;
    for (var i = 0, inst; i < i$.length && (inst = i$[i]); i++) {
      if (!inst.isPlaceholder) {
        inst._notifyPath(path, value, true);
      }
    }
  },
  _forwardItemPath: function (path, value) {
    if (this._keyToInstIdx) {
      var dot = path.indexOf('.');
      var key = path.substring(0, dot < 0 ? path.length : dot);
      var idx = this._keyToInstIdx[key];
      var inst = this._instances[idx];
      if (inst && !inst.isPlaceholder) {
        if (dot >= 0) {
          path = this.as + '.' + path.substring(dot + 1);
          inst._notifyPath(path, value, true);
        } else {
          inst.__setProperty(this.as, value, true);
        }
      }
    }
  },
  itemForElement: function (el) {
    var instance = this.modelForElement(el);
    return instance && instance[this.as];
  },
  keyForElement: function (el) {
    var instance = this.modelForElement(el);
    return instance && instance.__key__;
  },
  indexForElement: function (el) {
    var instance = this.modelForElement(el);
    return instance && instance[this.indexAs];
  }
});Polymer({
  is: 'array-selector',
  _template: null,
  properties: {
    items: {
      type: Array,
      observer: 'clearSelection'
    },
    multi: {
      type: Boolean,
      value: false,
      observer: 'clearSelection'
    },
    selected: {
      type: Object,
      notify: true
    },
    selectedItem: {
      type: Object,
      notify: true
    },
    toggle: {
      type: Boolean,
      value: false
    }
  },
  clearSelection: function () {
    if (Array.isArray(this.selected)) {
      for (var i = 0; i < this.selected.length; i++) {
        this.unlinkPaths('selected.' + i);
      }
    } else {
      this.unlinkPaths('selected');
      this.unlinkPaths('selectedItem');
    }
    if (this.multi) {
      if (!this.selected || this.selected.length) {
        this.selected = [];
        this._selectedColl = Polymer.Collection.get(this.selected);
      }
    } else {
      this.selected = null;
      this._selectedColl = null;
    }
    this.selectedItem = null;
  },
  isSelected: function (item) {
    if (this.multi) {
      return this._selectedColl.getKey(item) !== undefined;
    } else {
      return this.selected == item;
    }
  },
  deselect: function (item) {
    if (this.multi) {
      if (this.isSelected(item)) {
        var skey = this._selectedColl.getKey(item);
        this.arrayDelete('selected', item);
        this.unlinkPaths('selected.' + skey);
      }
    } else {
      this.selected = null;
      this.selectedItem = null;
      this.unlinkPaths('selected');
      this.unlinkPaths('selectedItem');
    }
  },
  select: function (item) {
    var icol = Polymer.Collection.get(this.items);
    var key = icol.getKey(item);
    if (this.multi) {
      if (this.isSelected(item)) {
        if (this.toggle) {
          this.deselect(item);
        }
      } else {
        this.push('selected', item);
        var skey = this._selectedColl.getKey(item);
        this.linkPaths('selected.' + skey, 'items.' + key);
      }
    } else {
      if (this.toggle && item == this.selected) {
        this.deselect();
      } else {
        this.selected = item;
        this.selectedItem = item;
        this.linkPaths('selected', 'items.' + key);
        this.linkPaths('selectedItem', 'items.' + key);
      }
    }
  }
});Polymer({
  is: 'dom-if',
  extends: 'template',
  _template: null,
  properties: {
    'if': {
      type: Boolean,
      value: false,
      observer: '_queueRender'
    },
    restamp: {
      type: Boolean,
      value: false,
      observer: '_queueRender'
    },
    notifyDomChange: { type: Boolean }
  },
  behaviors: [Polymer.Templatizer],
  _queueRender: function () {
    this._debounceTemplate(this._render);
  },
  detached: function () {
    var parentNode = this.parentNode;
    if (parentNode && parentNode.localName == this.is) {
      parentNode = Polymer.dom(parentNode).parentNode;
    }
    if (!parentNode || parentNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE && (!Polymer.Settings.hasShadow || !(parentNode instanceof ShadowRoot))) {
      this._teardownInstance();
    }
  },
  attached: function () {
    if (this.if && this.ctor) {
      this.async(this._ensureInstance);
    }
  },
  render: function () {
    this._flushTemplates();
  },
  _render: function () {
    if (this.if) {
      if (!this.ctor) {
        this.templatize(this);
      }
      this._ensureInstance();
      this._showHideChildren();
    } else if (this.restamp) {
      this._teardownInstance();
    }
    if (!this.restamp && this._instance) {
      this._showHideChildren();
    }
    if (this.if != this._lastIf) {
      if (!Polymer.Settings.suppressTemplateNotifications || this.notifyDomChange) {
        this.fire('dom-change');
      }
      this._lastIf = this.if;
    }
  },
  _ensureInstance: function () {
    var refNode;
    var parentNode = Polymer.dom(this).parentNode;
    if (parentNode && parentNode.localName == this.is) {
      refNode = parentNode;
      parentNode = Polymer.dom(parentNode).parentNode;
    } else {
      refNode = this;
    }
    if (parentNode) {
      if (!this._instance) {
        this._instance = this.stamp();
        var root = this._instance.root;
        Polymer.dom(parentNode).insertBefore(root, refNode);
      } else {
        var c$ = this._instance._children;
        if (c$ && c$.length) {
          var lastChild = Polymer.dom(refNode).previousSibling;
          if (lastChild !== c$[c$.length - 1]) {
            for (var i = 0, n; i < c$.length && (n = c$[i]); i++) {
              Polymer.dom(parentNode).insertBefore(n, refNode);
            }
          }
        }
      }
    }
  },
  _teardownInstance: function () {
    if (this._instance) {
      var c$ = this._instance._children;
      if (c$ && c$.length) {
        var parent = Polymer.dom(Polymer.dom(c$[0]).parentNode);
        for (var i = 0, n; i < c$.length && (n = c$[i]); i++) {
          parent.removeChild(n);
        }
      }
      this._instance = null;
    }
  },
  _showHideChildren: function () {
    var hidden = this.__hideTemplateChildren__ || !this.if;
    if (this._instance) {
      this._instance._showHideChildren(hidden);
    }
  },
  _forwardParentProp: function (prop, value) {
    if (this._instance) {
      this._instance.__setProperty(prop, value, true);
    }
  },
  _forwardParentPath: function (path, value) {
    if (this._instance) {
      this._instance._notifyPath(path, value, true);
    }
  }
});Polymer({
  is: 'dom-bind',
  properties: { notifyDomChange: { type: Boolean } },
  extends: 'template',
  _template: null,
  created: function () {
    var self = this;
    Polymer.RenderStatus.whenReady(function () {
      if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          self._markImportsReady();
        });
      } else {
        self._markImportsReady();
      }
    });
  },
  _ensureReady: function () {
    if (!this._readied) {
      this._readySelf();
    }
  },
  _markImportsReady: function () {
    this._importsReady = true;
    this._ensureReady();
  },
  _registerFeatures: function () {
    this._prepConstructor();
  },
  _insertChildren: function () {
    var refNode;
    var parentNode = Polymer.dom(this).parentNode;
    if (parentNode.localName == this.is) {
      refNode = parentNode;
      parentNode = Polymer.dom(parentNode).parentNode;
    } else {
      refNode = this;
    }
    Polymer.dom(parentNode).insertBefore(this.root, refNode);
  },
  _removeChildren: function () {
    if (this._children) {
      for (var i = 0; i < this._children.length; i++) {
        this.root.appendChild(this._children[i]);
      }
    }
  },
  _initFeatures: function () {},
  _scopeElementClass: function (element, selector) {
    if (this.dataHost) {
      return this.dataHost._scopeElementClass(element, selector);
    } else {
      return selector;
    }
  },
  _configureInstanceProperties: function () {},
  _prepConfigure: function () {
    var config = {};
    for (var prop in this._propertyEffects) {
      config[prop] = this[prop];
    }
    var setupConfigure = this._setupConfigure;
    this._setupConfigure = function () {
      setupConfigure.call(this, config);
    };
  },
  attached: function () {
    if (this._importsReady) {
      this.render();
    }
  },
  detached: function () {
    this._removeChildren();
  },
  render: function () {
    this._ensureReady();
    if (!this._children) {
      this._template = this;
      this._prepAnnotations();
      this._prepEffects();
      this._prepBehaviors();
      this._prepConfigure();
      this._prepBindings();
      this._prepPropertyInfo();
      Polymer.Base._initFeatures.call(this);
      this._children = Polymer.TreeApi.arrayCopyChildNodes(this.root);
    }
    this._insertChildren();
    if (!Polymer.Settings.suppressTemplateNotifications || this.notifyDomChange) {
      this.fire('dom-change');
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


__webpack_require__(3);

(function () {
  function resolveCss(cssText, ownerDocument) {
    return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
      return pre + '\'' + resolve(url.replace(/["']/g, ''), ownerDocument) + '\'' + post;
    });
  }
  function resolveAttrs(element, ownerDocument) {
    for (var name in URL_ATTRS) {
      var a$ = URL_ATTRS[name];
      for (var i = 0, l = a$.length, a, at, v; i < l && (a = a$[i]); i++) {
        if (name === '*' || element.localName === name) {
          at = element.attributes[a];
          v = at && at.value;
          if (v && v.search(BINDING_RX) < 0) {
            at.value = a === 'style' ? resolveCss(v, ownerDocument) : resolve(v, ownerDocument);
          }
        }
      }
    }
  }
  function resolve(url, ownerDocument) {
    if (url && ABS_URL.test(url)) {
      return url;
    }
    var resolver = getUrlResolver(ownerDocument);
    resolver.href = url;
    return resolver.href || url;
  }
  var tempDoc;
  var tempDocBase;
  function resolveUrl(url, baseUri) {
    if (!tempDoc) {
      tempDoc = document.implementation.createHTMLDocument('temp');
      tempDocBase = tempDoc.createElement('base');
      tempDoc.head.appendChild(tempDocBase);
    }
    tempDocBase.href = baseUri;
    return resolve(url, tempDoc);
  }
  function getUrlResolver(ownerDocument) {
    return ownerDocument.body.__urlResolver || (ownerDocument.body.__urlResolver = ownerDocument.createElement('a'));
  }
  function pathFromUrl(url) {
    return url.substring(0, url.lastIndexOf('/') + 1);
  }
  var CSS_URL_RX = /(url\()([^)]*)(\))/g;
  var URL_ATTRS = {
    '*': ['href', 'src', 'style', 'url'],
    form: ['action']
  };
  var ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
  var BINDING_RX = /\{\{|\[\[/;
  Polymer.ResolveUrl = {
    resolveCss: resolveCss,
    resolveAttrs: resolveAttrs,
    resolveUrl: resolveUrl,
    pathFromUrl: pathFromUrl
  };
  Polymer.rootPath = Polymer.Settings.rootPath || pathFromUrl(document.baseURI || window.location.href);
})();Polymer.Base._addFeature({
  _prepTemplate: function () {
    var module;
    if (this._template === undefined) {
      module = Polymer.DomModule.import(this.is);
      this._template = module && module.querySelector('template');
    }
    if (module) {
      var assetPath = module.getAttribute('assetpath') || '';
      var importURL = Polymer.ResolveUrl.resolveUrl(assetPath, module.ownerDocument.baseURI);
      this._importPath = Polymer.ResolveUrl.pathFromUrl(importURL);
    } else {
      this._importPath = '';
    }
    if (this._template && this._template.hasAttribute('is')) {
      this._warn(this._logf('_prepTemplate', 'top-level Polymer template ' + 'must not be a type-extension, found', this._template, 'Move inside simple <template>.'));
    }
    if (this._template && !this._template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
      HTMLTemplateElement.decorate(this._template);
    }
  },
  _stampTemplate: function () {
    if (this._template) {
      this.root = this.instanceTemplate(this._template);
    }
  },
  instanceTemplate: function (template) {
    var dom = document.importNode(template._content || template.content, true);
    return dom;
  }
});(function () {
  var baseAttachedCallback = Polymer.Base.attachedCallback;
  var baseDetachedCallback = Polymer.Base.detachedCallback;
  Polymer.Base._addFeature({
    _hostStack: [],
    ready: function () {},
    _registerHost: function (host) {
      this.dataHost = host = host || Polymer.Base._hostStack[Polymer.Base._hostStack.length - 1];
      if (host && host._clients) {
        host._clients.push(this);
      }
      this._clients = null;
      this._clientsReadied = false;
    },
    _beginHosting: function () {
      Polymer.Base._hostStack.push(this);
      if (!this._clients) {
        this._clients = [];
      }
    },
    _endHosting: function () {
      Polymer.Base._hostStack.pop();
    },
    _tryReady: function () {
      this._readied = false;
      if (this._canReady()) {
        this._ready();
      }
    },
    _canReady: function () {
      return !this.dataHost || this.dataHost._clientsReadied;
    },
    _ready: function () {
      this._beforeClientsReady();
      if (this._template) {
        this._setupRoot();
        this._readyClients();
      }
      this._clientsReadied = true;
      this._clients = null;
      this._afterClientsReady();
      this._readySelf();
    },
    _readyClients: function () {
      this._beginDistribute();
      var c$ = this._clients;
      if (c$) {
        for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
          c._ready();
        }
      }
      this._finishDistribute();
    },
    _readySelf: function () {
      for (var i = 0, b; i < this.behaviors.length; i++) {
        b = this.behaviors[i];
        if (b.ready) {
          b.ready.call(this);
        }
      }
      if (this.ready) {
        this.ready();
      }
      this._readied = true;
      if (this._attachedPending) {
        this._attachedPending = false;
        this.attachedCallback();
      }
    },
    _beforeClientsReady: function () {},
    _afterClientsReady: function () {},
    _beforeAttached: function () {},
    attachedCallback: function () {
      if (this._readied) {
        this._beforeAttached();
        baseAttachedCallback.call(this);
      } else {
        this._attachedPending = true;
      }
    },
    detachedCallback: function () {
      if (this._readied) {
        baseDetachedCallback.call(this);
      } else {
        this._attachedPending = false;
      }
    }
  });
})();Polymer.ArraySplice = function () {
  function newSplice(index, removed, addedCount) {
    return {
      index: index,
      removed: removed,
      addedCount: addedCount
    };
  }
  var EDIT_LEAVE = 0;
  var EDIT_UPDATE = 1;
  var EDIT_ADD = 2;
  var EDIT_DELETE = 3;
  function ArraySplice() {}
  ArraySplice.prototype = {
    calcEditDistances: function (current, currentStart, currentEnd, old, oldStart, oldEnd) {
      var rowCount = oldEnd - oldStart + 1;
      var columnCount = currentEnd - currentStart + 1;
      var distances = new Array(rowCount);
      for (var i = 0; i < rowCount; i++) {
        distances[i] = new Array(columnCount);
        distances[i][0] = i;
      }
      for (var j = 0; j < columnCount; j++) distances[0][j] = j;
      for (i = 1; i < rowCount; i++) {
        for (j = 1; j < columnCount; j++) {
          if (this.equals(current[currentStart + j - 1], old[oldStart + i - 1])) distances[i][j] = distances[i - 1][j - 1];else {
            var north = distances[i - 1][j] + 1;
            var west = distances[i][j - 1] + 1;
            distances[i][j] = north < west ? north : west;
          }
        }
      }
      return distances;
    },
    spliceOperationsFromEditDistances: function (distances) {
      var i = distances.length - 1;
      var j = distances[0].length - 1;
      var current = distances[i][j];
      var edits = [];
      while (i > 0 || j > 0) {
        if (i == 0) {
          edits.push(EDIT_ADD);
          j--;
          continue;
        }
        if (j == 0) {
          edits.push(EDIT_DELETE);
          i--;
          continue;
        }
        var northWest = distances[i - 1][j - 1];
        var west = distances[i - 1][j];
        var north = distances[i][j - 1];
        var min;
        if (west < north) min = west < northWest ? west : northWest;else min = north < northWest ? north : northWest;
        if (min == northWest) {
          if (northWest == current) {
            edits.push(EDIT_LEAVE);
          } else {
            edits.push(EDIT_UPDATE);
            current = northWest;
          }
          i--;
          j--;
        } else if (min == west) {
          edits.push(EDIT_DELETE);
          i--;
          current = west;
        } else {
          edits.push(EDIT_ADD);
          j--;
          current = north;
        }
      }
      edits.reverse();
      return edits;
    },
    calcSplices: function (current, currentStart, currentEnd, old, oldStart, oldEnd) {
      var prefixCount = 0;
      var suffixCount = 0;
      var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
      if (currentStart == 0 && oldStart == 0) prefixCount = this.sharedPrefix(current, old, minLength);
      if (currentEnd == current.length && oldEnd == old.length) suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
      currentStart += prefixCount;
      oldStart += prefixCount;
      currentEnd -= suffixCount;
      oldEnd -= suffixCount;
      if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0) return [];
      if (currentStart == currentEnd) {
        var splice = newSplice(currentStart, [], 0);
        while (oldStart < oldEnd) splice.removed.push(old[oldStart++]);
        return [splice];
      } else if (oldStart == oldEnd) return [newSplice(currentStart, [], currentEnd - currentStart)];
      var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
      splice = undefined;
      var splices = [];
      var index = currentStart;
      var oldIndex = oldStart;
      for (var i = 0; i < ops.length; i++) {
        switch (ops[i]) {
          case EDIT_LEAVE:
            if (splice) {
              splices.push(splice);
              splice = undefined;
            }
            index++;
            oldIndex++;
            break;
          case EDIT_UPDATE:
            if (!splice) splice = newSplice(index, [], 0);
            splice.addedCount++;
            index++;
            splice.removed.push(old[oldIndex]);
            oldIndex++;
            break;
          case EDIT_ADD:
            if (!splice) splice = newSplice(index, [], 0);
            splice.addedCount++;
            index++;
            break;
          case EDIT_DELETE:
            if (!splice) splice = newSplice(index, [], 0);
            splice.removed.push(old[oldIndex]);
            oldIndex++;
            break;
        }
      }
      if (splice) {
        splices.push(splice);
      }
      return splices;
    },
    sharedPrefix: function (current, old, searchLength) {
      for (var i = 0; i < searchLength; i++) if (!this.equals(current[i], old[i])) return i;
      return searchLength;
    },
    sharedSuffix: function (current, old, searchLength) {
      var index1 = current.length;
      var index2 = old.length;
      var count = 0;
      while (count < searchLength && this.equals(current[--index1], old[--index2])) count++;
      return count;
    },
    calculateSplices: function (current, previous) {
      return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
    },
    equals: function (currentValue, previousValue) {
      return currentValue === previousValue;
    }
  };
  return new ArraySplice();
}();Polymer.domInnerHTML = function () {
  var escapeAttrRegExp = /[&\u00A0"]/g;
  var escapeDataRegExp = /[&\u00A0<>]/g;
  function escapeReplace(c) {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '\xA0':
        return '&nbsp;';
    }
  }
  function escapeAttr(s) {
    return s.replace(escapeAttrRegExp, escapeReplace);
  }
  function escapeData(s) {
    return s.replace(escapeDataRegExp, escapeReplace);
  }
  function makeSet(arr) {
    var set = {};
    for (var i = 0; i < arr.length; i++) {
      set[arr[i]] = true;
    }
    return set;
  }
  var voidElements = makeSet(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  var plaintextParents = makeSet(['style', 'script', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext', 'noscript']);
  function getOuterHTML(node, parentNode, composed) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        var tagName = node.localName;
        var s = '<' + tagName;
        var attrs = node.attributes;
        for (var i = 0, attr; attr = attrs[i]; i++) {
          s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
        }
        s += '>';
        if (voidElements[tagName]) {
          return s;
        }
        return s + getInnerHTML(node, composed) + '</' + tagName + '>';
      case Node.TEXT_NODE:
        var data = node.data;
        if (parentNode && plaintextParents[parentNode.localName]) {
          return data;
        }
        return escapeData(data);
      case Node.COMMENT_NODE:
        return '<!--' + node.data + '-->';
      default:
        console.error(node);
        throw new Error('not implemented');
    }
  }
  function getInnerHTML(node, composed) {
    if (node instanceof HTMLTemplateElement) node = node.content;
    var s = '';
    var c$ = Polymer.dom(node).childNodes;
    for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
      s += getOuterHTML(child, node, composed);
    }
    return s;
  }
  return { getInnerHTML: getInnerHTML };
}();(function () {
  'use strict';

  var nativeInsertBefore = Element.prototype.insertBefore;
  var nativeAppendChild = Element.prototype.appendChild;
  var nativeRemoveChild = Element.prototype.removeChild;
  Polymer.TreeApi = {
    arrayCopyChildNodes: function (parent) {
      var copy = [],
          i = 0;
      for (var n = parent.firstChild; n; n = n.nextSibling) {
        copy[i++] = n;
      }
      return copy;
    },
    arrayCopyChildren: function (parent) {
      var copy = [],
          i = 0;
      for (var n = parent.firstElementChild; n; n = n.nextElementSibling) {
        copy[i++] = n;
      }
      return copy;
    },
    arrayCopy: function (a$) {
      var l = a$.length;
      var copy = new Array(l);
      for (var i = 0; i < l; i++) {
        copy[i] = a$[i];
      }
      return copy;
    }
  };
  Polymer.TreeApi.Logical = {
    hasParentNode: function (node) {
      return Boolean(node.__dom && node.__dom.parentNode);
    },
    hasChildNodes: function (node) {
      return Boolean(node.__dom && node.__dom.childNodes !== undefined);
    },
    getChildNodes: function (node) {
      return this.hasChildNodes(node) ? this._getChildNodes(node) : node.childNodes;
    },
    _getChildNodes: function (node) {
      if (!node.__dom.childNodes) {
        node.__dom.childNodes = [];
        for (var n = node.__dom.firstChild; n; n = n.__dom.nextSibling) {
          node.__dom.childNodes.push(n);
        }
      }
      return node.__dom.childNodes;
    },
    getParentNode: function (node) {
      return node.__dom && node.__dom.parentNode !== undefined ? node.__dom.parentNode : node.parentNode;
    },
    getFirstChild: function (node) {
      return node.__dom && node.__dom.firstChild !== undefined ? node.__dom.firstChild : node.firstChild;
    },
    getLastChild: function (node) {
      return node.__dom && node.__dom.lastChild !== undefined ? node.__dom.lastChild : node.lastChild;
    },
    getNextSibling: function (node) {
      return node.__dom && node.__dom.nextSibling !== undefined ? node.__dom.nextSibling : node.nextSibling;
    },
    getPreviousSibling: function (node) {
      return node.__dom && node.__dom.previousSibling !== undefined ? node.__dom.previousSibling : node.previousSibling;
    },
    getFirstElementChild: function (node) {
      return node.__dom && node.__dom.firstChild !== undefined ? this._getFirstElementChild(node) : node.firstElementChild;
    },
    _getFirstElementChild: function (node) {
      var n = node.__dom.firstChild;
      while (n && n.nodeType !== Node.ELEMENT_NODE) {
        n = n.__dom.nextSibling;
      }
      return n;
    },
    getLastElementChild: function (node) {
      return node.__dom && node.__dom.lastChild !== undefined ? this._getLastElementChild(node) : node.lastElementChild;
    },
    _getLastElementChild: function (node) {
      var n = node.__dom.lastChild;
      while (n && n.nodeType !== Node.ELEMENT_NODE) {
        n = n.__dom.previousSibling;
      }
      return n;
    },
    getNextElementSibling: function (node) {
      return node.__dom && node.__dom.nextSibling !== undefined ? this._getNextElementSibling(node) : node.nextElementSibling;
    },
    _getNextElementSibling: function (node) {
      var n = node.__dom.nextSibling;
      while (n && n.nodeType !== Node.ELEMENT_NODE) {
        n = n.__dom.nextSibling;
      }
      return n;
    },
    getPreviousElementSibling: function (node) {
      return node.__dom && node.__dom.previousSibling !== undefined ? this._getPreviousElementSibling(node) : node.previousElementSibling;
    },
    _getPreviousElementSibling: function (node) {
      var n = node.__dom.previousSibling;
      while (n && n.nodeType !== Node.ELEMENT_NODE) {
        n = n.__dom.previousSibling;
      }
      return n;
    },
    saveChildNodes: function (node) {
      if (!this.hasChildNodes(node)) {
        node.__dom = node.__dom || {};
        node.__dom.firstChild = node.firstChild;
        node.__dom.lastChild = node.lastChild;
        node.__dom.childNodes = [];
        for (var n = node.firstChild; n; n = n.nextSibling) {
          n.__dom = n.__dom || {};
          n.__dom.parentNode = node;
          node.__dom.childNodes.push(n);
          n.__dom.nextSibling = n.nextSibling;
          n.__dom.previousSibling = n.previousSibling;
        }
      }
    },
    recordInsertBefore: function (node, container, ref_node) {
      container.__dom.childNodes = null;
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        for (var n = node.firstChild; n; n = n.nextSibling) {
          this._linkNode(n, container, ref_node);
        }
      } else {
        this._linkNode(node, container, ref_node);
      }
    },
    _linkNode: function (node, container, ref_node) {
      node.__dom = node.__dom || {};
      container.__dom = container.__dom || {};
      if (ref_node) {
        ref_node.__dom = ref_node.__dom || {};
      }
      node.__dom.previousSibling = ref_node ? ref_node.__dom.previousSibling : container.__dom.lastChild;
      if (node.__dom.previousSibling) {
        node.__dom.previousSibling.__dom.nextSibling = node;
      }
      node.__dom.nextSibling = ref_node || null;
      if (node.__dom.nextSibling) {
        node.__dom.nextSibling.__dom.previousSibling = node;
      }
      node.__dom.parentNode = container;
      if (ref_node) {
        if (ref_node === container.__dom.firstChild) {
          container.__dom.firstChild = node;
        }
      } else {
        container.__dom.lastChild = node;
        if (!container.__dom.firstChild) {
          container.__dom.firstChild = node;
        }
      }
      container.__dom.childNodes = null;
    },
    recordRemoveChild: function (node, container) {
      node.__dom = node.__dom || {};
      container.__dom = container.__dom || {};
      if (node === container.__dom.firstChild) {
        container.__dom.firstChild = node.__dom.nextSibling;
      }
      if (node === container.__dom.lastChild) {
        container.__dom.lastChild = node.__dom.previousSibling;
      }
      var p = node.__dom.previousSibling;
      var n = node.__dom.nextSibling;
      if (p) {
        p.__dom.nextSibling = n;
      }
      if (n) {
        n.__dom.previousSibling = p;
      }
      node.__dom.parentNode = node.__dom.previousSibling = node.__dom.nextSibling = undefined;
      container.__dom.childNodes = null;
    }
  };
  Polymer.TreeApi.Composed = {
    getChildNodes: function (node) {
      return Polymer.TreeApi.arrayCopyChildNodes(node);
    },
    getParentNode: function (node) {
      return node.parentNode;
    },
    clearChildNodes: function (node) {
      node.textContent = '';
    },
    insertBefore: function (parentNode, newChild, refChild) {
      return nativeInsertBefore.call(parentNode, newChild, refChild || null);
    },
    appendChild: function (parentNode, newChild) {
      return nativeAppendChild.call(parentNode, newChild);
    },
    removeChild: function (parentNode, node) {
      return nativeRemoveChild.call(parentNode, node);
    }
  };
})();Polymer.DomApi = function () {
  'use strict';

  var Settings = Polymer.Settings;
  var TreeApi = Polymer.TreeApi;
  var DomApi = function (node) {
    this.node = needsToWrap ? DomApi.wrap(node) : node;
  };
  var needsToWrap = Settings.hasShadow && !Settings.nativeShadow;
  DomApi.wrap = window.wrap ? window.wrap : function (node) {
    return node;
  };
  DomApi.prototype = {
    flush: function () {
      Polymer.dom.flush();
    },
    deepContains: function (node) {
      if (this.node.contains(node)) {
        return true;
      }
      var n = node;
      var doc = node.ownerDocument;
      while (n && n !== doc && n !== this.node) {
        n = Polymer.dom(n).parentNode || n.host;
      }
      return n === this.node;
    },
    queryDistributedElements: function (selector) {
      var c$ = this.getEffectiveChildNodes();
      var list = [];
      for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
        if (c.nodeType === Node.ELEMENT_NODE && DomApi.matchesSelector.call(c, selector)) {
          list.push(c);
        }
      }
      return list;
    },
    getEffectiveChildNodes: function () {
      var list = [];
      var c$ = this.childNodes;
      for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
        if (c.localName === CONTENT) {
          var d$ = dom(c).getDistributedNodes();
          for (var j = 0; j < d$.length; j++) {
            list.push(d$[j]);
          }
        } else {
          list.push(c);
        }
      }
      return list;
    },
    observeNodes: function (callback) {
      if (callback) {
        if (!this.observer) {
          this.observer = this.node.localName === CONTENT ? new DomApi.DistributedNodesObserver(this) : new DomApi.EffectiveNodesObserver(this);
        }
        return this.observer.addListener(callback);
      }
    },
    unobserveNodes: function (handle) {
      if (this.observer) {
        this.observer.removeListener(handle);
      }
    },
    notifyObserver: function () {
      if (this.observer) {
        this.observer.notify();
      }
    },
    _query: function (matcher, node, halter) {
      node = node || this.node;
      var list = [];
      this._queryElements(TreeApi.Logical.getChildNodes(node), matcher, halter, list);
      return list;
    },
    _queryElements: function (elements, matcher, halter, list) {
      for (var i = 0, l = elements.length, c; i < l && (c = elements[i]); i++) {
        if (c.nodeType === Node.ELEMENT_NODE) {
          if (this._queryElement(c, matcher, halter, list)) {
            return true;
          }
        }
      }
    },
    _queryElement: function (node, matcher, halter, list) {
      var result = matcher(node);
      if (result) {
        list.push(node);
      }
      if (halter && halter(result)) {
        return result;
      }
      this._queryElements(TreeApi.Logical.getChildNodes(node), matcher, halter, list);
    }
  };
  var CONTENT = DomApi.CONTENT = 'content';
  var dom = DomApi.factory = function (node) {
    node = node || document;
    if (!node.__domApi) {
      node.__domApi = new DomApi.ctor(node);
    }
    return node.__domApi;
  };
  DomApi.hasApi = function (node) {
    return Boolean(node.__domApi);
  };
  DomApi.ctor = DomApi;
  Polymer.dom = function (obj, patch) {
    if (obj instanceof Event) {
      return Polymer.EventApi.factory(obj);
    } else {
      return DomApi.factory(obj, patch);
    }
  };
  var p = Element.prototype;
  DomApi.matchesSelector = p.matches || p.matchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector || p.webkitMatchesSelector;
  return DomApi;
}();(function () {
  'use strict';

  var Settings = Polymer.Settings;
  var DomApi = Polymer.DomApi;
  var dom = DomApi.factory;
  var TreeApi = Polymer.TreeApi;
  var getInnerHTML = Polymer.domInnerHTML.getInnerHTML;
  var CONTENT = DomApi.CONTENT;
  if (Settings.useShadow) {
    return;
  }
  var nativeCloneNode = Element.prototype.cloneNode;
  var nativeImportNode = Document.prototype.importNode;
  Polymer.Base.mixin(DomApi.prototype, {
    _lazyDistribute: function (host) {
      if (host.shadyRoot && host.shadyRoot._distributionClean) {
        host.shadyRoot._distributionClean = false;
        Polymer.dom.addDebouncer(host.debounce('_distribute', host._distributeContent));
      }
    },
    appendChild: function (node) {
      return this.insertBefore(node);
    },
    insertBefore: function (node, ref_node) {
      if (ref_node && TreeApi.Logical.getParentNode(ref_node) !== this.node) {
        throw Error('The ref_node to be inserted before is not a child ' + 'of this node');
      }
      if (node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
        var parent = TreeApi.Logical.getParentNode(node);
        if (parent) {
          if (DomApi.hasApi(parent)) {
            dom(parent).notifyObserver();
          }
          this._removeNode(node);
        } else {
          this._removeOwnerShadyRoot(node);
        }
      }
      if (!this._addNode(node, ref_node)) {
        if (ref_node) {
          ref_node = ref_node.localName === CONTENT ? this._firstComposedNode(ref_node) : ref_node;
        }
        var container = this.node._isShadyRoot ? this.node.host : this.node;
        if (ref_node) {
          TreeApi.Composed.insertBefore(container, node, ref_node);
        } else {
          TreeApi.Composed.appendChild(container, node);
        }
      }
      this.notifyObserver();
      return node;
    },
    _addNode: function (node, ref_node) {
      var root = this.getOwnerRoot();
      if (root) {
        var ipAdded = this._maybeAddInsertionPoint(node, this.node);
        if (!root._invalidInsertionPoints) {
          root._invalidInsertionPoints = ipAdded;
        }
        this._addNodeToHost(root.host, node);
      }
      if (TreeApi.Logical.hasChildNodes(this.node)) {
        TreeApi.Logical.recordInsertBefore(node, this.node, ref_node);
      }
      var handled = this._maybeDistribute(node) || this.node.shadyRoot;
      if (handled) {
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          while (node.firstChild) {
            TreeApi.Composed.removeChild(node, node.firstChild);
          }
        } else {
          var parent = TreeApi.Composed.getParentNode(node);
          if (parent) {
            TreeApi.Composed.removeChild(parent, node);
          }
        }
      }
      return handled;
    },
    removeChild: function (node) {
      if (TreeApi.Logical.getParentNode(node) !== this.node) {
        throw Error('The node to be removed is not a child of this node: ' + node);
      }
      if (!this._removeNode(node)) {
        var container = this.node._isShadyRoot ? this.node.host : this.node;
        var parent = TreeApi.Composed.getParentNode(node);
        if (container === parent) {
          TreeApi.Composed.removeChild(container, node);
        }
      }
      this.notifyObserver();
      return node;
    },
    _removeNode: function (node) {
      var logicalParent = TreeApi.Logical.hasParentNode(node) && TreeApi.Logical.getParentNode(node);
      var distributed;
      var root = this._ownerShadyRootForNode(node);
      if (logicalParent) {
        distributed = dom(node)._maybeDistributeParent();
        TreeApi.Logical.recordRemoveChild(node, logicalParent);
        if (root && this._removeDistributedChildren(root, node)) {
          root._invalidInsertionPoints = true;
          this._lazyDistribute(root.host);
        }
      }
      this._removeOwnerShadyRoot(node);
      if (root) {
        this._removeNodeFromHost(root.host, node);
      }
      return distributed;
    },
    replaceChild: function (node, ref_node) {
      this.insertBefore(node, ref_node);
      this.removeChild(ref_node);
      return node;
    },
    _hasCachedOwnerRoot: function (node) {
      return Boolean(node._ownerShadyRoot !== undefined);
    },
    getOwnerRoot: function () {
      return this._ownerShadyRootForNode(this.node);
    },
    _ownerShadyRootForNode: function (node) {
      if (!node) {
        return;
      }
      var root = node._ownerShadyRoot;
      if (root === undefined) {
        if (node._isShadyRoot) {
          root = node;
        } else {
          var parent = TreeApi.Logical.getParentNode(node);
          if (parent) {
            root = parent._isShadyRoot ? parent : this._ownerShadyRootForNode(parent);
          } else {
            root = null;
          }
        }
        if (root || document.documentElement.contains(node)) {
          node._ownerShadyRoot = root;
        }
      }
      return root;
    },
    _maybeDistribute: function (node) {
      var fragContent = node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !node.__noContent && dom(node).querySelector(CONTENT);
      var wrappedContent = fragContent && TreeApi.Logical.getParentNode(fragContent).nodeType !== Node.DOCUMENT_FRAGMENT_NODE;
      var hasContent = fragContent || node.localName === CONTENT;
      if (hasContent) {
        var root = this.getOwnerRoot();
        if (root) {
          this._lazyDistribute(root.host);
        }
      }
      var needsDist = this._nodeNeedsDistribution(this.node);
      if (needsDist) {
        this._lazyDistribute(this.node);
      }
      return needsDist || hasContent && !wrappedContent;
    },
    _maybeAddInsertionPoint: function (node, parent) {
      var added;
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !node.__noContent) {
        var c$ = dom(node).querySelectorAll(CONTENT);
        for (var i = 0, n, np, na; i < c$.length && (n = c$[i]); i++) {
          np = TreeApi.Logical.getParentNode(n);
          if (np === node) {
            np = parent;
          }
          na = this._maybeAddInsertionPoint(n, np);
          added = added || na;
        }
      } else if (node.localName === CONTENT) {
        TreeApi.Logical.saveChildNodes(parent);
        TreeApi.Logical.saveChildNodes(node);
        added = true;
      }
      return added;
    },
    _updateInsertionPoints: function (host) {
      var i$ = host.shadyRoot._insertionPoints = dom(host.shadyRoot).querySelectorAll(CONTENT);
      for (var i = 0, c; i < i$.length; i++) {
        c = i$[i];
        TreeApi.Logical.saveChildNodes(c);
        TreeApi.Logical.saveChildNodes(TreeApi.Logical.getParentNode(c));
      }
    },
    _nodeNeedsDistribution: function (node) {
      return node && node.shadyRoot && DomApi.hasInsertionPoint(node.shadyRoot);
    },
    _addNodeToHost: function (host, node) {
      if (host._elementAdd) {
        host._elementAdd(node);
      }
    },
    _removeNodeFromHost: function (host, node) {
      if (host._elementRemove) {
        host._elementRemove(node);
      }
    },
    _removeDistributedChildren: function (root, container) {
      var hostNeedsDist;
      var ip$ = root._insertionPoints;
      for (var i = 0; i < ip$.length; i++) {
        var content = ip$[i];
        if (this._contains(container, content)) {
          var dc$ = dom(content).getDistributedNodes();
          for (var j = 0; j < dc$.length; j++) {
            hostNeedsDist = true;
            var node = dc$[j];
            var parent = TreeApi.Composed.getParentNode(node);
            if (parent) {
              TreeApi.Composed.removeChild(parent, node);
            }
          }
        }
      }
      return hostNeedsDist;
    },
    _contains: function (container, node) {
      while (node) {
        if (node == container) {
          return true;
        }
        node = TreeApi.Logical.getParentNode(node);
      }
    },
    _removeOwnerShadyRoot: function (node) {
      if (this._hasCachedOwnerRoot(node)) {
        var c$ = TreeApi.Logical.getChildNodes(node);
        for (var i = 0, l = c$.length, n; i < l && (n = c$[i]); i++) {
          this._removeOwnerShadyRoot(n);
        }
      }
      node._ownerShadyRoot = undefined;
    },
    _firstComposedNode: function (content) {
      var n$ = dom(content).getDistributedNodes();
      for (var i = 0, l = n$.length, n, p$; i < l && (n = n$[i]); i++) {
        p$ = dom(n).getDestinationInsertionPoints();
        if (p$[p$.length - 1] === content) {
          return n;
        }
      }
    },
    querySelector: function (selector) {
      var result = this._query(function (n) {
        return DomApi.matchesSelector.call(n, selector);
      }, this.node, function (n) {
        return Boolean(n);
      })[0];
      return result || null;
    },
    querySelectorAll: function (selector) {
      return this._query(function (n) {
        return DomApi.matchesSelector.call(n, selector);
      }, this.node);
    },
    getDestinationInsertionPoints: function () {
      return this.node._destinationInsertionPoints || [];
    },
    getDistributedNodes: function () {
      return this.node._distributedNodes || [];
    },
    _clear: function () {
      while (this.childNodes.length) {
        this.removeChild(this.childNodes[0]);
      }
    },
    setAttribute: function (name, value) {
      this.node.setAttribute(name, value);
      this._maybeDistributeParent();
    },
    removeAttribute: function (name) {
      this.node.removeAttribute(name);
      this._maybeDistributeParent();
    },
    _maybeDistributeParent: function () {
      if (this._nodeNeedsDistribution(this.parentNode)) {
        this._lazyDistribute(this.parentNode);
        return true;
      }
    },
    cloneNode: function (deep) {
      var n = nativeCloneNode.call(this.node, false);
      if (deep) {
        var c$ = this.childNodes;
        var d = dom(n);
        for (var i = 0, nc; i < c$.length; i++) {
          nc = dom(c$[i]).cloneNode(true);
          d.appendChild(nc);
        }
      }
      return n;
    },
    importNode: function (externalNode, deep) {
      var doc = this.node instanceof Document ? this.node : this.node.ownerDocument;
      var n = nativeImportNode.call(doc, externalNode, false);
      if (deep) {
        var c$ = TreeApi.Logical.getChildNodes(externalNode);
        var d = dom(n);
        for (var i = 0, nc; i < c$.length; i++) {
          nc = dom(doc).importNode(c$[i], true);
          d.appendChild(nc);
        }
      }
      return n;
    },
    _getComposedInnerHTML: function () {
      return getInnerHTML(this.node, true);
    }
  });
  Object.defineProperties(DomApi.prototype, {
    activeElement: {
      get: function () {
        var active = document.activeElement;
        if (!active) {
          return null;
        }
        var isShadyRoot = !!this.node._isShadyRoot;
        if (this.node !== document) {
          if (!isShadyRoot) {
            return null;
          }
          if (this.node.host === active || !this.node.host.contains(active)) {
            return null;
          }
        }
        var activeRoot = dom(active).getOwnerRoot();
        while (activeRoot && activeRoot !== this.node) {
          active = activeRoot.host;
          activeRoot = dom(active).getOwnerRoot();
        }
        if (this.node === document) {
          return activeRoot ? null : active;
        } else {
          return activeRoot === this.node ? active : null;
        }
      },
      configurable: true
    },
    childNodes: {
      get: function () {
        var c$ = TreeApi.Logical.getChildNodes(this.node);
        return Array.isArray(c$) ? c$ : TreeApi.arrayCopyChildNodes(this.node);
      },
      configurable: true
    },
    children: {
      get: function () {
        if (TreeApi.Logical.hasChildNodes(this.node)) {
          return Array.prototype.filter.call(this.childNodes, function (n) {
            return n.nodeType === Node.ELEMENT_NODE;
          });
        } else {
          return TreeApi.arrayCopyChildren(this.node);
        }
      },
      configurable: true
    },
    parentNode: {
      get: function () {
        return TreeApi.Logical.getParentNode(this.node);
      },
      configurable: true
    },
    firstChild: {
      get: function () {
        return TreeApi.Logical.getFirstChild(this.node);
      },
      configurable: true
    },
    lastChild: {
      get: function () {
        return TreeApi.Logical.getLastChild(this.node);
      },
      configurable: true
    },
    nextSibling: {
      get: function () {
        return TreeApi.Logical.getNextSibling(this.node);
      },
      configurable: true
    },
    previousSibling: {
      get: function () {
        return TreeApi.Logical.getPreviousSibling(this.node);
      },
      configurable: true
    },
    firstElementChild: {
      get: function () {
        return TreeApi.Logical.getFirstElementChild(this.node);
      },
      configurable: true
    },
    lastElementChild: {
      get: function () {
        return TreeApi.Logical.getLastElementChild(this.node);
      },
      configurable: true
    },
    nextElementSibling: {
      get: function () {
        return TreeApi.Logical.getNextElementSibling(this.node);
      },
      configurable: true
    },
    previousElementSibling: {
      get: function () {
        return TreeApi.Logical.getPreviousElementSibling(this.node);
      },
      configurable: true
    },
    textContent: {
      get: function () {
        var nt = this.node.nodeType;
        if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
          return this.node.textContent;
        } else {
          var tc = [];
          for (var i = 0, cn = this.childNodes, c; c = cn[i]; i++) {
            if (c.nodeType !== Node.COMMENT_NODE) {
              tc.push(c.textContent);
            }
          }
          return tc.join('');
        }
      },
      set: function (text) {
        var nt = this.node.nodeType;
        if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
          this.node.textContent = text;
        } else {
          this._clear();
          if (text) {
            this.appendChild(document.createTextNode(text));
          }
        }
      },
      configurable: true
    },
    innerHTML: {
      get: function () {
        var nt = this.node.nodeType;
        if (nt === Node.TEXT_NODE || nt === Node.COMMENT_NODE) {
          return null;
        } else {
          return getInnerHTML(this.node);
        }
      },
      set: function (text) {
        var nt = this.node.nodeType;
        if (nt !== Node.TEXT_NODE || nt !== Node.COMMENT_NODE) {
          this._clear();
          var d = document.createElement('div');
          d.innerHTML = text;
          var c$ = TreeApi.arrayCopyChildNodes(d);
          for (var i = 0; i < c$.length; i++) {
            this.appendChild(c$[i]);
          }
        }
      },
      configurable: true
    }
  });
  DomApi.hasInsertionPoint = function (root) {
    return Boolean(root && root._insertionPoints.length);
  };
})();(function () {
  'use strict';

  var Settings = Polymer.Settings;
  var TreeApi = Polymer.TreeApi;
  var DomApi = Polymer.DomApi;
  if (!Settings.useShadow) {
    return;
  }
  Polymer.Base.mixin(DomApi.prototype, {
    querySelectorAll: function (selector) {
      return TreeApi.arrayCopy(this.node.querySelectorAll(selector));
    },
    getOwnerRoot: function () {
      var n = this.node;
      while (n) {
        if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE && n.host) {
          return n;
        }
        n = n.parentNode;
      }
    },
    importNode: function (externalNode, deep) {
      var doc = this.node instanceof Document ? this.node : this.node.ownerDocument;
      return doc.importNode(externalNode, deep);
    },
    getDestinationInsertionPoints: function () {
      var n$ = this.node.getDestinationInsertionPoints && this.node.getDestinationInsertionPoints();
      return n$ ? TreeApi.arrayCopy(n$) : [];
    },
    getDistributedNodes: function () {
      var n$ = this.node.getDistributedNodes && this.node.getDistributedNodes();
      return n$ ? TreeApi.arrayCopy(n$) : [];
    }
  });
  Object.defineProperties(DomApi.prototype, {
    activeElement: {
      get: function () {
        var node = DomApi.wrap(this.node);
        var activeElement = node.activeElement;
        return node.contains(activeElement) ? activeElement : null;
      },
      configurable: true
    },
    childNodes: {
      get: function () {
        return TreeApi.arrayCopyChildNodes(this.node);
      },
      configurable: true
    },
    children: {
      get: function () {
        return TreeApi.arrayCopyChildren(this.node);
      },
      configurable: true
    },
    textContent: {
      get: function () {
        return this.node.textContent;
      },
      set: function (value) {
        return this.node.textContent = value;
      },
      configurable: true
    },
    innerHTML: {
      get: function () {
        return this.node.innerHTML;
      },
      set: function (value) {
        return this.node.innerHTML = value;
      },
      configurable: true
    }
  });
  var forwardMethods = function (m$) {
    for (var i = 0; i < m$.length; i++) {
      forwardMethod(m$[i]);
    }
  };
  var forwardMethod = function (method) {
    DomApi.prototype[method] = function () {
      return this.node[method].apply(this.node, arguments);
    };
  };
  forwardMethods(['cloneNode', 'appendChild', 'insertBefore', 'removeChild', 'replaceChild', 'setAttribute', 'removeAttribute', 'querySelector']);
  var forwardProperties = function (f$) {
    for (var i = 0; i < f$.length; i++) {
      forwardProperty(f$[i]);
    }
  };
  var forwardProperty = function (name) {
    Object.defineProperty(DomApi.prototype, name, {
      get: function () {
        return this.node[name];
      },
      configurable: true
    });
  };
  forwardProperties(['parentNode', 'firstChild', 'lastChild', 'nextSibling', 'previousSibling', 'firstElementChild', 'lastElementChild', 'nextElementSibling', 'previousElementSibling']);
})();Polymer.Base.mixin(Polymer.dom, {
  _flushGuard: 0,
  _FLUSH_MAX: 100,
  _needsTakeRecords: !Polymer.Settings.useNativeCustomElements,
  _debouncers: [],
  _staticFlushList: [],
  _finishDebouncer: null,
  flush: function () {
    this._flushGuard = 0;
    this._prepareFlush();
    while (this._debouncers.length && this._flushGuard < this._FLUSH_MAX) {
      while (this._debouncers.length) {
        this._debouncers.shift().complete();
      }
      if (this._finishDebouncer) {
        this._finishDebouncer.complete();
      }
      this._prepareFlush();
      this._flushGuard++;
    }
    if (this._flushGuard >= this._FLUSH_MAX) {
      console.warn('Polymer.dom.flush aborted. Flush may not be complete.');
    }
  },
  _prepareFlush: function () {
    if (this._needsTakeRecords) {
      CustomElements.takeRecords();
    }
    for (var i = 0; i < this._staticFlushList.length; i++) {
      this._staticFlushList[i]();
    }
  },
  addStaticFlush: function (fn) {
    this._staticFlushList.push(fn);
  },
  removeStaticFlush: function (fn) {
    var i = this._staticFlushList.indexOf(fn);
    if (i >= 0) {
      this._staticFlushList.splice(i, 1);
    }
  },
  addDebouncer: function (debouncer) {
    this._debouncers.push(debouncer);
    this._finishDebouncer = Polymer.Debounce(this._finishDebouncer, this._finishFlush);
  },
  _finishFlush: function () {
    Polymer.dom._debouncers = [];
  }
});Polymer.EventApi = function () {
  'use strict';

  var DomApi = Polymer.DomApi.ctor;
  var Settings = Polymer.Settings;
  DomApi.Event = function (event) {
    this.event = event;
  };
  if (Settings.useShadow) {
    DomApi.Event.prototype = {
      get rootTarget() {
        return this.event.path[0];
      },
      get localTarget() {
        return this.event.target;
      },
      get path() {
        var path = this.event.path;
        if (!Array.isArray(path)) {
          path = Array.prototype.slice.call(path);
        }
        return path;
      }
    };
  } else {
    DomApi.Event.prototype = {
      get rootTarget() {
        return this.event.target;
      },
      get localTarget() {
        var current = this.event.currentTarget;
        var currentRoot = current && Polymer.dom(current).getOwnerRoot();
        var p$ = this.path;
        for (var i = 0; i < p$.length; i++) {
          if (Polymer.dom(p$[i]).getOwnerRoot() === currentRoot) {
            return p$[i];
          }
        }
      },
      get path() {
        if (!this.event._path) {
          var path = [];
          var current = this.rootTarget;
          while (current) {
            path.push(current);
            var insertionPoints = Polymer.dom(current).getDestinationInsertionPoints();
            if (insertionPoints.length) {
              for (var i = 0; i < insertionPoints.length - 1; i++) {
                path.push(insertionPoints[i]);
              }
              current = insertionPoints[insertionPoints.length - 1];
            } else {
              current = Polymer.dom(current).parentNode || current.host;
            }
          }
          path.push(window);
          this.event._path = path;
        }
        return this.event._path;
      }
    };
  }
  var factory = function (event) {
    if (!event.__eventApi) {
      event.__eventApi = new DomApi.Event(event);
    }
    return event.__eventApi;
  };
  return { factory: factory };
}();(function () {
  'use strict';

  var DomApi = Polymer.DomApi.ctor;
  var useShadow = Polymer.Settings.useShadow;
  Object.defineProperty(DomApi.prototype, 'classList', {
    get: function () {
      if (!this._classList) {
        this._classList = new DomApi.ClassList(this);
      }
      return this._classList;
    },
    configurable: true
  });
  DomApi.ClassList = function (host) {
    this.domApi = host;
    this.node = host.node;
  };
  DomApi.ClassList.prototype = {
    add: function () {
      this.node.classList.add.apply(this.node.classList, arguments);
      this._distributeParent();
    },
    remove: function () {
      this.node.classList.remove.apply(this.node.classList, arguments);
      this._distributeParent();
    },
    toggle: function () {
      this.node.classList.toggle.apply(this.node.classList, arguments);
      this._distributeParent();
    },
    _distributeParent: function () {
      if (!useShadow) {
        this.domApi._maybeDistributeParent();
      }
    },
    contains: function () {
      return this.node.classList.contains.apply(this.node.classList, arguments);
    }
  };
})();(function () {
  'use strict';

  var DomApi = Polymer.DomApi.ctor;
  var Settings = Polymer.Settings;
  DomApi.EffectiveNodesObserver = function (domApi) {
    this.domApi = domApi;
    this.node = this.domApi.node;
    this._listeners = [];
  };
  DomApi.EffectiveNodesObserver.prototype = {
    addListener: function (callback) {
      if (!this._isSetup) {
        this._setup();
        this._isSetup = true;
      }
      var listener = {
        fn: callback,
        _nodes: []
      };
      this._listeners.push(listener);
      this._scheduleNotify();
      return listener;
    },
    removeListener: function (handle) {
      var i = this._listeners.indexOf(handle);
      if (i >= 0) {
        this._listeners.splice(i, 1);
        handle._nodes = [];
      }
      if (!this._hasListeners()) {
        this._cleanup();
        this._isSetup = false;
      }
    },
    _setup: function () {
      this._observeContentElements(this.domApi.childNodes);
    },
    _cleanup: function () {
      this._unobserveContentElements(this.domApi.childNodes);
    },
    _hasListeners: function () {
      return Boolean(this._listeners.length);
    },
    _scheduleNotify: function () {
      if (this._debouncer) {
        this._debouncer.stop();
      }
      this._debouncer = Polymer.Debounce(this._debouncer, this._notify);
      this._debouncer.context = this;
      Polymer.dom.addDebouncer(this._debouncer);
    },
    notify: function () {
      if (this._hasListeners()) {
        this._scheduleNotify();
      }
    },
    _notify: function () {
      this._beforeCallListeners();
      this._callListeners();
    },
    _beforeCallListeners: function () {
      this._updateContentElements();
    },
    _updateContentElements: function () {
      this._observeContentElements(this.domApi.childNodes);
    },
    _observeContentElements: function (elements) {
      for (var i = 0, n; i < elements.length && (n = elements[i]); i++) {
        if (this._isContent(n)) {
          n.__observeNodesMap = n.__observeNodesMap || new WeakMap();
          if (!n.__observeNodesMap.has(this)) {
            n.__observeNodesMap.set(this, this._observeContent(n));
          }
        }
      }
    },
    _observeContent: function (content) {
      var self = this;
      var h = Polymer.dom(content).observeNodes(function () {
        self._scheduleNotify();
      });
      h._avoidChangeCalculation = true;
      return h;
    },
    _unobserveContentElements: function (elements) {
      for (var i = 0, n, h; i < elements.length && (n = elements[i]); i++) {
        if (this._isContent(n)) {
          h = n.__observeNodesMap.get(this);
          if (h) {
            Polymer.dom(n).unobserveNodes(h);
            n.__observeNodesMap.delete(this);
          }
        }
      }
    },
    _isContent: function (node) {
      return node.localName === 'content';
    },
    _callListeners: function () {
      var o$ = this._listeners;
      var nodes = this._getEffectiveNodes();
      for (var i = 0, o; i < o$.length && (o = o$[i]); i++) {
        var info = this._generateListenerInfo(o, nodes);
        if (info || o._alwaysNotify) {
          this._callListener(o, info);
        }
      }
    },
    _getEffectiveNodes: function () {
      return this.domApi.getEffectiveChildNodes();
    },
    _generateListenerInfo: function (listener, newNodes) {
      if (listener._avoidChangeCalculation) {
        return true;
      }
      var oldNodes = listener._nodes;
      var info = {
        target: this.node,
        addedNodes: [],
        removedNodes: []
      };
      var splices = Polymer.ArraySplice.calculateSplices(newNodes, oldNodes);
      for (var i = 0, s; i < splices.length && (s = splices[i]); i++) {
        for (var j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
          info.removedNodes.push(n);
        }
      }
      for (i = 0, s; i < splices.length && (s = splices[i]); i++) {
        for (j = s.index; j < s.index + s.addedCount; j++) {
          info.addedNodes.push(newNodes[j]);
        }
      }
      listener._nodes = newNodes;
      if (info.addedNodes.length || info.removedNodes.length) {
        return info;
      }
    },
    _callListener: function (listener, info) {
      return listener.fn.call(this.node, info);
    },
    enableShadowAttributeTracking: function () {}
  };
  if (Settings.useShadow) {
    var baseSetup = DomApi.EffectiveNodesObserver.prototype._setup;
    var baseCleanup = DomApi.EffectiveNodesObserver.prototype._cleanup;
    Polymer.Base.mixin(DomApi.EffectiveNodesObserver.prototype, {
      _setup: function () {
        if (!this._observer) {
          var self = this;
          this._mutationHandler = function (mxns) {
            if (mxns && mxns.length) {
              self._scheduleNotify();
            }
          };
          this._observer = new MutationObserver(this._mutationHandler);
          this._boundFlush = function () {
            self._flush();
          };
          Polymer.dom.addStaticFlush(this._boundFlush);
          this._observer.observe(this.node, { childList: true });
        }
        baseSetup.call(this);
      },
      _cleanup: function () {
        this._observer.disconnect();
        this._observer = null;
        this._mutationHandler = null;
        Polymer.dom.removeStaticFlush(this._boundFlush);
        baseCleanup.call(this);
      },
      _flush: function () {
        if (this._observer) {
          this._mutationHandler(this._observer.takeRecords());
        }
      },
      enableShadowAttributeTracking: function () {
        if (this._observer) {
          this._makeContentListenersAlwaysNotify();
          this._observer.disconnect();
          this._observer.observe(this.node, {
            childList: true,
            attributes: true,
            subtree: true
          });
          var root = this.domApi.getOwnerRoot();
          var host = root && root.host;
          if (host && Polymer.dom(host).observer) {
            Polymer.dom(host).observer.enableShadowAttributeTracking();
          }
        }
      },
      _makeContentListenersAlwaysNotify: function () {
        for (var i = 0, h; i < this._listeners.length; i++) {
          h = this._listeners[i];
          h._alwaysNotify = h._isContentListener;
        }
      }
    });
  }
})();(function () {
  'use strict';

  var DomApi = Polymer.DomApi.ctor;
  var Settings = Polymer.Settings;
  DomApi.DistributedNodesObserver = function (domApi) {
    DomApi.EffectiveNodesObserver.call(this, domApi);
  };
  DomApi.DistributedNodesObserver.prototype = Object.create(DomApi.EffectiveNodesObserver.prototype);
  Polymer.Base.mixin(DomApi.DistributedNodesObserver.prototype, {
    _setup: function () {},
    _cleanup: function () {},
    _beforeCallListeners: function () {},
    _getEffectiveNodes: function () {
      return this.domApi.getDistributedNodes();
    }
  });
  if (Settings.useShadow) {
    Polymer.Base.mixin(DomApi.DistributedNodesObserver.prototype, {
      _setup: function () {
        if (!this._observer) {
          var root = this.domApi.getOwnerRoot();
          var host = root && root.host;
          if (host) {
            var self = this;
            this._observer = Polymer.dom(host).observeNodes(function () {
              self._scheduleNotify();
            });
            this._observer._isContentListener = true;
            if (this._hasAttrSelect()) {
              Polymer.dom(host).observer.enableShadowAttributeTracking();
            }
          }
        }
      },
      _hasAttrSelect: function () {
        var select = this.node.getAttribute('select');
        return select && select.match(/[[.]+/);
      },
      _cleanup: function () {
        var root = this.domApi.getOwnerRoot();
        var host = root && root.host;
        if (host) {
          Polymer.dom(host).unobserveNodes(this._observer);
        }
        this._observer = null;
      }
    });
  }
})();(function () {
  var DomApi = Polymer.DomApi;
  var TreeApi = Polymer.TreeApi;
  Polymer.Base._addFeature({
    _prepShady: function () {
      this._useContent = this._useContent || Boolean(this._template);
    },
    _setupShady: function () {
      this.shadyRoot = null;
      if (!this.__domApi) {
        this.__domApi = null;
      }
      if (!this.__dom) {
        this.__dom = null;
      }
      if (!this._ownerShadyRoot) {
        this._ownerShadyRoot = undefined;
      }
    },
    _poolContent: function () {
      if (this._useContent) {
        TreeApi.Logical.saveChildNodes(this);
      }
    },
    _setupRoot: function () {
      if (this._useContent) {
        this._createLocalRoot();
        if (!this.dataHost) {
          upgradeLogicalChildren(TreeApi.Logical.getChildNodes(this));
        }
      }
    },
    _createLocalRoot: function () {
      this.shadyRoot = this.root;
      this.shadyRoot._distributionClean = false;
      this.shadyRoot._hasDistributed = false;
      this.shadyRoot._isShadyRoot = true;
      this.shadyRoot._dirtyRoots = [];
      var i$ = this.shadyRoot._insertionPoints = !this._notes || this._notes._hasContent ? this.shadyRoot.querySelectorAll('content') : [];
      TreeApi.Logical.saveChildNodes(this.shadyRoot);
      for (var i = 0, c; i < i$.length; i++) {
        c = i$[i];
        TreeApi.Logical.saveChildNodes(c);
        TreeApi.Logical.saveChildNodes(c.parentNode);
      }
      this.shadyRoot.host = this;
    },
    distributeContent: function (updateInsertionPoints) {
      if (this.shadyRoot) {
        this.shadyRoot._invalidInsertionPoints = this.shadyRoot._invalidInsertionPoints || updateInsertionPoints;
        var host = getTopDistributingHost(this);
        Polymer.dom(this)._lazyDistribute(host);
      }
    },
    _distributeContent: function () {
      if (this._useContent && !this.shadyRoot._distributionClean) {
        if (this.shadyRoot._invalidInsertionPoints) {
          Polymer.dom(this)._updateInsertionPoints(this);
          this.shadyRoot._invalidInsertionPoints = false;
        }
        this._beginDistribute();
        this._distributeDirtyRoots();
        this._finishDistribute();
      }
    },
    _beginDistribute: function () {
      if (this._useContent && DomApi.hasInsertionPoint(this.shadyRoot)) {
        this._resetDistribution();
        this._distributePool(this.shadyRoot, this._collectPool());
      }
    },
    _distributeDirtyRoots: function () {
      var c$ = this.shadyRoot._dirtyRoots;
      for (var i = 0, l = c$.length, c; i < l && (c = c$[i]); i++) {
        c._distributeContent();
      }
      this.shadyRoot._dirtyRoots = [];
    },
    _finishDistribute: function () {
      if (this._useContent) {
        this.shadyRoot._distributionClean = true;
        if (DomApi.hasInsertionPoint(this.shadyRoot)) {
          this._composeTree();
          notifyContentObservers(this.shadyRoot);
        } else {
          if (!this.shadyRoot._hasDistributed) {
            TreeApi.Composed.clearChildNodes(this);
            this.appendChild(this.shadyRoot);
          } else {
            var children = this._composeNode(this);
            this._updateChildNodes(this, children);
          }
        }
        if (!this.shadyRoot._hasDistributed) {
          notifyInitialDistribution(this);
        }
        this.shadyRoot._hasDistributed = true;
      }
    },
    elementMatches: function (selector, node) {
      node = node || this;
      return DomApi.matchesSelector.call(node, selector);
    },
    _resetDistribution: function () {
      var children = TreeApi.Logical.getChildNodes(this);
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child._destinationInsertionPoints) {
          child._destinationInsertionPoints = undefined;
        }
        if (isInsertionPoint(child)) {
          clearDistributedDestinationInsertionPoints(child);
        }
      }
      var root = this.shadyRoot;
      var p$ = root._insertionPoints;
      for (var j = 0; j < p$.length; j++) {
        p$[j]._distributedNodes = [];
      }
    },
    _collectPool: function () {
      var pool = [];
      var children = TreeApi.Logical.getChildNodes(this);
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (isInsertionPoint(child)) {
          pool.push.apply(pool, child._distributedNodes);
        } else {
          pool.push(child);
        }
      }
      return pool;
    },
    _distributePool: function (node, pool) {
      var p$ = node._insertionPoints;
      for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
        this._distributeInsertionPoint(p, pool);
        maybeRedistributeParent(p, this);
      }
    },
    _distributeInsertionPoint: function (content, pool) {
      var anyDistributed = false;
      for (var i = 0, l = pool.length, node; i < l; i++) {
        node = pool[i];
        if (!node) {
          continue;
        }
        if (this._matchesContentSelect(node, content)) {
          distributeNodeInto(node, content);
          pool[i] = undefined;
          anyDistributed = true;
        }
      }
      if (!anyDistributed) {
        var children = TreeApi.Logical.getChildNodes(content);
        for (var j = 0; j < children.length; j++) {
          distributeNodeInto(children[j], content);
        }
      }
    },
    _composeTree: function () {
      this._updateChildNodes(this, this._composeNode(this));
      var p$ = this.shadyRoot._insertionPoints;
      for (var i = 0, l = p$.length, p, parent; i < l && (p = p$[i]); i++) {
        parent = TreeApi.Logical.getParentNode(p);
        if (!parent._useContent && parent !== this && parent !== this.shadyRoot) {
          this._updateChildNodes(parent, this._composeNode(parent));
        }
      }
    },
    _composeNode: function (node) {
      var children = [];
      var c$ = TreeApi.Logical.getChildNodes(node.shadyRoot || node);
      for (var i = 0; i < c$.length; i++) {
        var child = c$[i];
        if (isInsertionPoint(child)) {
          var distributedNodes = child._distributedNodes;
          for (var j = 0; j < distributedNodes.length; j++) {
            var distributedNode = distributedNodes[j];
            if (isFinalDestination(child, distributedNode)) {
              children.push(distributedNode);
            }
          }
        } else {
          children.push(child);
        }
      }
      return children;
    },
    _updateChildNodes: function (container, children) {
      var composed = TreeApi.Composed.getChildNodes(container);
      var splices = Polymer.ArraySplice.calculateSplices(children, composed);
      for (var i = 0, d = 0, s; i < splices.length && (s = splices[i]); i++) {
        for (var j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
          if (TreeApi.Composed.getParentNode(n) === container) {
            TreeApi.Composed.removeChild(container, n);
          }
          composed.splice(s.index + d, 1);
        }
        d -= s.addedCount;
      }
      for (var i = 0, s, next; i < splices.length && (s = splices[i]); i++) {
        next = composed[s.index];
        for (j = s.index, n; j < s.index + s.addedCount; j++) {
          n = children[j];
          TreeApi.Composed.insertBefore(container, n, next);
          composed.splice(j, 0, n);
        }
      }
    },
    _matchesContentSelect: function (node, contentElement) {
      var select = contentElement.getAttribute('select');
      if (!select) {
        return true;
      }
      select = select.trim();
      if (!select) {
        return true;
      }
      if (!(node instanceof Element)) {
        return false;
      }
      var validSelectors = /^(:not\()?[*.#[a-zA-Z_|]/;
      if (!validSelectors.test(select)) {
        return false;
      }
      return this.elementMatches(select, node);
    },
    _elementAdd: function () {},
    _elementRemove: function () {}
  });
  var domHostDesc = {
    get: function () {
      var root = Polymer.dom(this).getOwnerRoot();
      return root && root.host;
    },
    configurable: true
  };
  Object.defineProperty(Polymer.Base, 'domHost', domHostDesc);
  Polymer.BaseDescriptors.domHost = domHostDesc;
  function distributeNodeInto(child, insertionPoint) {
    insertionPoint._distributedNodes.push(child);
    var points = child._destinationInsertionPoints;
    if (!points) {
      child._destinationInsertionPoints = [insertionPoint];
    } else {
      points.push(insertionPoint);
    }
  }
  function clearDistributedDestinationInsertionPoints(content) {
    var e$ = content._distributedNodes;
    if (e$) {
      for (var i = 0; i < e$.length; i++) {
        var d = e$[i]._destinationInsertionPoints;
        if (d) {
          d.splice(d.indexOf(content) + 1, d.length);
        }
      }
    }
  }
  function maybeRedistributeParent(content, host) {
    var parent = TreeApi.Logical.getParentNode(content);
    if (parent && parent.shadyRoot && DomApi.hasInsertionPoint(parent.shadyRoot) && parent.shadyRoot._distributionClean) {
      parent.shadyRoot._distributionClean = false;
      host.shadyRoot._dirtyRoots.push(parent);
    }
  }
  function isFinalDestination(insertionPoint, node) {
    var points = node._destinationInsertionPoints;
    return points && points[points.length - 1] === insertionPoint;
  }
  function isInsertionPoint(node) {
    return node.localName == 'content';
  }
  function getTopDistributingHost(host) {
    while (host && hostNeedsRedistribution(host)) {
      host = host.domHost;
    }
    return host;
  }
  function hostNeedsRedistribution(host) {
    var c$ = TreeApi.Logical.getChildNodes(host);
    for (var i = 0, c; i < c$.length; i++) {
      c = c$[i];
      if (c.localName && c.localName === 'content') {
        return host.domHost;
      }
    }
  }
  function notifyContentObservers(root) {
    for (var i = 0, c; i < root._insertionPoints.length; i++) {
      c = root._insertionPoints[i];
      if (DomApi.hasApi(c)) {
        Polymer.dom(c).notifyObserver();
      }
    }
  }
  function notifyInitialDistribution(host) {
    if (DomApi.hasApi(host)) {
      Polymer.dom(host).notifyObserver();
    }
  }
  var needsUpgrade = window.CustomElements && !CustomElements.useNative;
  function upgradeLogicalChildren(children) {
    if (needsUpgrade && children) {
      for (var i = 0; i < children.length; i++) {
        CustomElements.upgrade(children[i]);
      }
    }
  }
})();if (Polymer.Settings.useShadow) {
  Polymer.Base._addFeature({
    _poolContent: function () {},
    _beginDistribute: function () {},
    distributeContent: function () {},
    _distributeContent: function () {},
    _finishDistribute: function () {},
    _createLocalRoot: function () {
      this.createShadowRoot();
      this.shadowRoot.appendChild(this.root);
      this.root = this.shadowRoot;
    }
  });
}Polymer.Async = {
  _currVal: 0,
  _lastVal: 0,
  _callbacks: [],
  _twiddleContent: 0,
  _twiddle: document.createTextNode(''),
  run: function (callback, waitTime) {
    if (waitTime > 0) {
      return ~setTimeout(callback, waitTime);
    } else {
      this._twiddle.textContent = this._twiddleContent++;
      this._callbacks.push(callback);
      return this._currVal++;
    }
  },
  cancel: function (handle) {
    if (handle < 0) {
      clearTimeout(~handle);
    } else {
      var idx = handle - this._lastVal;
      if (idx >= 0) {
        if (!this._callbacks[idx]) {
          throw 'invalid async handle: ' + handle;
        }
        this._callbacks[idx] = null;
      }
    }
  },
  _atEndOfMicrotask: function () {
    var len = this._callbacks.length;
    for (var i = 0; i < len; i++) {
      var cb = this._callbacks[i];
      if (cb) {
        try {
          cb();
        } catch (e) {
          i++;
          this._callbacks.splice(0, i);
          this._lastVal += i;
          this._twiddle.textContent = this._twiddleContent++;
          throw e;
        }
      }
    }
    this._callbacks.splice(0, len);
    this._lastVal += len;
  }
};
new window.MutationObserver(function () {
  Polymer.Async._atEndOfMicrotask();
}).observe(Polymer.Async._twiddle, { characterData: true });Polymer.Debounce = function () {
  var Async = Polymer.Async;
  var Debouncer = function (context) {
    this.context = context;
    var self = this;
    this.boundComplete = function () {
      self.complete();
    };
  };
  Debouncer.prototype = {
    go: function (callback, wait) {
      var h;
      this.finish = function () {
        Async.cancel(h);
      };
      h = Async.run(this.boundComplete, wait);
      this.callback = callback;
    },
    stop: function () {
      if (this.finish) {
        this.finish();
        this.finish = null;
        this.callback = null;
      }
    },
    complete: function () {
      if (this.finish) {
        var callback = this.callback;
        this.stop();
        callback.call(this.context);
      }
    }
  };
  function debounce(debouncer, callback, wait) {
    if (debouncer) {
      debouncer.stop();
    } else {
      debouncer = new Debouncer(this);
    }
    debouncer.go(callback, wait);
    return debouncer;
  }
  return debounce;
}();Polymer.Base._addFeature({
  _setupDebouncers: function () {
    this._debouncers = {};
  },
  debounce: function (jobName, callback, wait) {
    return this._debouncers[jobName] = Polymer.Debounce.call(this, this._debouncers[jobName], callback, wait);
  },
  isDebouncerActive: function (jobName) {
    var debouncer = this._debouncers[jobName];
    return !!(debouncer && debouncer.finish);
  },
  flushDebouncer: function (jobName) {
    var debouncer = this._debouncers[jobName];
    if (debouncer) {
      debouncer.complete();
    }
  },
  cancelDebouncer: function (jobName) {
    var debouncer = this._debouncers[jobName];
    if (debouncer) {
      debouncer.stop();
    }
  }
});Polymer.DomModule = document.createElement('dom-module');
Polymer.Base._addFeature({
  _registerFeatures: function () {
    this._prepIs();
    this._prepBehaviors();
    this._prepConstructor();
    this._prepTemplate();
    this._prepShady();
    this._prepPropertyInfo();
  },
  _prepBehavior: function (b) {
    this._addHostAttributes(b.hostAttributes);
  },
  _initFeatures: function () {
    this._registerHost();
    if (this._template) {
      this._poolContent();
      this._beginHosting();
      this._stampTemplate();
      this._endHosting();
    }
    this._marshalHostAttributes();
    this._setupDebouncers();
    this._marshalBehaviors();
    this._tryReady();
  },
  _marshalBehavior: function (b) {}
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {


(function () {
  function resolve() {
    document.body.removeAttribute('unresolved');
  }
  if (window.WebComponents) {
    addEventListener('WebComponentsReady', resolve);
  } else {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      resolve();
    } else {
      addEventListener('DOMContentLoaded', resolve);
    }
  }
})();window.Polymer = {
  Settings: function () {
    var settings = window.Polymer || {};
    if (!settings.noUrlSettings) {
      var parts = location.search.slice(1).split('&');
      for (var i = 0, o; i < parts.length && (o = parts[i]); i++) {
        o = o.split('=');
        o[0] && (settings[o[0]] = o[1] || true);
      }
    }
    settings.wantShadow = settings.dom === 'shadow';
    settings.hasShadow = Boolean(Element.prototype.createShadowRoot);
    settings.nativeShadow = settings.hasShadow && !window.ShadowDOMPolyfill;
    settings.useShadow = settings.wantShadow && settings.hasShadow;
    settings.hasNativeImports = Boolean('import' in document.createElement('link'));
    settings.useNativeImports = settings.hasNativeImports;
    settings.useNativeCustomElements = !window.CustomElements || window.CustomElements.useNative;
    settings.useNativeShadow = settings.useShadow && settings.nativeShadow;
    settings.usePolyfillProto = !settings.useNativeCustomElements && !Object.__proto__;
    settings.hasNativeCSSProperties = !navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) && window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)');
    settings.useNativeCSSProperties = settings.hasNativeCSSProperties && settings.lazyRegister && settings.useNativeCSSProperties;
    settings.isIE = navigator.userAgent.match('Trident');
    settings.passiveTouchGestures = settings.passiveTouchGestures || false;
    return settings;
  }()
};(function () {
  var userPolymer = window.Polymer;
  window.Polymer = function (prototype) {
    if (typeof prototype === 'function') {
      prototype = prototype.prototype;
    }
    if (!prototype) {
      prototype = {};
    }
    prototype = desugar(prototype);
    var customCtor = prototype === prototype.constructor.prototype ? prototype.constructor : null;
    var options = { prototype: prototype };
    if (prototype.extends) {
      options.extends = prototype.extends;
    }
    Polymer.telemetry._registrate(prototype);
    var ctor = document.registerElement(prototype.is, options);
    return customCtor || ctor;
  };
  var desugar = function (prototype) {
    var base = Polymer.Base;
    if (prototype.extends) {
      base = Polymer.Base._getExtendedPrototype(prototype.extends);
    }
    prototype = Polymer.Base.chainObject(prototype, base);
    prototype.registerCallback();
    return prototype;
  };
  if (userPolymer) {
    for (var i in userPolymer) {
      Polymer[i] = userPolymer[i];
    }
  }
  Polymer.Class = function (prototype) {
    if (!prototype.factoryImpl) {
      prototype.factoryImpl = function () {};
    }
    return desugar(prototype).constructor;
  };
})();
Polymer.telemetry = {
  registrations: [],
  _regLog: function (prototype) {
    console.log('[' + prototype.is + ']: registered');
  },
  _registrate: function (prototype) {
    this.registrations.push(prototype);
    Polymer.log && this._regLog(prototype);
  },
  dumpRegistrations: function () {
    this.registrations.forEach(this._regLog);
  }
};Object.defineProperty(window, 'currentImport', {
  enumerable: true,
  configurable: true,
  get: function () {
    return (document._currentScript || document.currentScript || {}).ownerDocument;
  }
});Polymer.RenderStatus = {
  _ready: false,
  _callbacks: [],
  whenReady: function (cb) {
    if (this._ready) {
      cb();
    } else {
      this._callbacks.push(cb);
    }
  },
  _makeReady: function () {
    this._ready = true;
    for (var i = 0; i < this._callbacks.length; i++) {
      this._callbacks[i]();
    }
    this._callbacks = [];
  },
  _catchFirstRender: function () {
    requestAnimationFrame(function () {
      Polymer.RenderStatus._makeReady();
    });
  },
  _afterNextRenderQueue: [],
  _waitingNextRender: false,
  afterNextRender: function (element, fn, args) {
    this._watchNextRender();
    this._afterNextRenderQueue.push([element, fn, args]);
  },
  hasRendered: function () {
    return this._ready;
  },
  _watchNextRender: function () {
    if (!this._waitingNextRender) {
      this._waitingNextRender = true;
      var fn = function () {
        Polymer.RenderStatus._flushNextRender();
      };
      if (!this._ready) {
        this.whenReady(fn);
      } else {
        requestAnimationFrame(fn);
      }
    }
  },
  _flushNextRender: function () {
    var self = this;
    setTimeout(function () {
      self._flushRenderCallbacks(self._afterNextRenderQueue);
      self._afterNextRenderQueue = [];
      self._waitingNextRender = false;
    });
  },
  _flushRenderCallbacks: function (callbacks) {
    for (var i = 0, h; i < callbacks.length; i++) {
      h = callbacks[i];
      h[1].apply(h[0], h[2] || Polymer.nar);
    }
  }
};
if (window.HTMLImports) {
  HTMLImports.whenReady(function () {
    Polymer.RenderStatus._catchFirstRender();
  });
} else {
  Polymer.RenderStatus._catchFirstRender();
}
Polymer.ImportStatus = Polymer.RenderStatus;
Polymer.ImportStatus.whenLoaded = Polymer.ImportStatus.whenReady;(function () {
  'use strict';

  var settings = Polymer.Settings;
  Polymer.Base = {
    __isPolymerInstance__: true,
    _addFeature: function (feature) {
      this.mixin(this, feature);
    },
    registerCallback: function () {
      if (settings.lazyRegister === 'max') {
        if (this.beforeRegister) {
          this.beforeRegister();
        }
      } else {
        this._desugarBehaviors();
        for (var i = 0, b; i < this.behaviors.length; i++) {
          b = this.behaviors[i];
          if (b.beforeRegister) {
            b.beforeRegister.call(this);
          }
        }
        if (this.beforeRegister) {
          this.beforeRegister();
        }
      }
      this._registerFeatures();
      if (!settings.lazyRegister) {
        this.ensureRegisterFinished();
      }
    },
    createdCallback: function () {
      if (settings.disableUpgradeEnabled) {
        if (this.hasAttribute('disable-upgrade')) {
          this._propertySetter = disableUpgradePropertySetter;
          this._configValue = null;
          this.__data__ = {};
          return;
        } else {
          this.__hasInitialized = true;
        }
      }
      this.__initialize();
    },
    __initialize: function () {
      if (!this.__hasRegisterFinished) {
        this._ensureRegisterFinished(this.__proto__);
      }
      Polymer.telemetry.instanceCount++;
      this.root = this;
      for (var i = 0, b; i < this.behaviors.length; i++) {
        b = this.behaviors[i];
        if (b.created) {
          b.created.call(this);
        }
      }
      if (this.created) {
        this.created();
      }
      this._initFeatures();
    },
    ensureRegisterFinished: function () {
      this._ensureRegisterFinished(this);
    },
    _ensureRegisterFinished: function (proto) {
      if (proto.__hasRegisterFinished !== proto.is || !proto.is) {
        if (settings.lazyRegister === 'max') {
          proto._desugarBehaviors();
          for (var i = 0, b; i < proto.behaviors.length; i++) {
            b = proto.behaviors[i];
            if (b.beforeRegister) {
              b.beforeRegister.call(proto);
            }
          }
        }
        proto.__hasRegisterFinished = proto.is;
        if (proto._finishRegisterFeatures) {
          proto._finishRegisterFeatures();
        }
        for (var j = 0, pb; j < proto.behaviors.length; j++) {
          pb = proto.behaviors[j];
          if (pb.registered) {
            pb.registered.call(proto);
          }
        }
        if (proto.registered) {
          proto.registered();
        }
        if (settings.usePolyfillProto && proto !== this) {
          proto.extend(this, proto);
        }
      }
    },
    attachedCallback: function () {
      var self = this;
      Polymer.RenderStatus.whenReady(function () {
        self.isAttached = true;
        for (var i = 0, b; i < self.behaviors.length; i++) {
          b = self.behaviors[i];
          if (b.attached) {
            b.attached.call(self);
          }
        }
        if (self.attached) {
          self.attached();
        }
      });
    },
    detachedCallback: function () {
      var self = this;
      Polymer.RenderStatus.whenReady(function () {
        self.isAttached = false;
        for (var i = 0, b; i < self.behaviors.length; i++) {
          b = self.behaviors[i];
          if (b.detached) {
            b.detached.call(self);
          }
        }
        if (self.detached) {
          self.detached();
        }
      });
    },
    attributeChangedCallback: function (name, oldValue, newValue) {
      this._attributeChangedImpl(name);
      for (var i = 0, b; i < this.behaviors.length; i++) {
        b = this.behaviors[i];
        if (b.attributeChanged) {
          b.attributeChanged.call(this, name, oldValue, newValue);
        }
      }
      if (this.attributeChanged) {
        this.attributeChanged(name, oldValue, newValue);
      }
    },
    _attributeChangedImpl: function (name) {
      this._setAttributeToProperty(this, name);
    },
    extend: function (target, source) {
      if (target && source) {
        var n$ = Object.getOwnPropertyNames(source);
        for (var i = 0, n; i < n$.length && (n = n$[i]); i++) {
          this.copyOwnProperty(n, source, target);
        }
      }
      return target || source;
    },
    mixin: function (target, source) {
      for (var i in source) {
        target[i] = source[i];
      }
      return target;
    },
    copyOwnProperty: function (name, source, target) {
      var pd = Object.getOwnPropertyDescriptor(source, name);
      if (pd) {
        Object.defineProperty(target, name, pd);
      }
    },
    _logger: function (level, args) {
      if (args.length === 1 && Array.isArray(args[0])) {
        args = args[0];
      }
      switch (level) {
        case 'log':
        case 'warn':
        case 'error':
          console[level].apply(console, args);
          break;
      }
    },
    _log: function () {
      var args = Array.prototype.slice.call(arguments, 0);
      this._logger('log', args);
    },
    _warn: function () {
      var args = Array.prototype.slice.call(arguments, 0);
      this._logger('warn', args);
    },
    _error: function () {
      var args = Array.prototype.slice.call(arguments, 0);
      this._logger('error', args);
    },
    _logf: function () {
      return this._logPrefix.concat(this.is).concat(Array.prototype.slice.call(arguments, 0));
    }
  };
  Polymer.Base._logPrefix = function () {
    var color = window.chrome && !/edge/i.test(navigator.userAgent) || /firefox/i.test(navigator.userAgent);
    return color ? ['%c[%s::%s]:', 'font-weight: bold; background-color:#EEEE00;'] : ['[%s::%s]:'];
  }();
  Polymer.Base.chainObject = function (object, inherited) {
    if (object && inherited && object !== inherited) {
      if (!Object.__proto__) {
        object = Polymer.Base.extend(Object.create(inherited), object);
      }
      object.__proto__ = inherited;
    }
    return object;
  };
  Polymer.Base = Polymer.Base.chainObject(Polymer.Base, HTMLElement.prototype);
  Polymer.BaseDescriptors = {};
  var disableUpgradePropertySetter;
  if (settings.disableUpgradeEnabled) {
    disableUpgradePropertySetter = function (property, value) {
      this.__data__[property] = value;
    };
    var origAttributeChangedCallback = Polymer.Base.attributeChangedCallback;
    Polymer.Base.attributeChangedCallback = function (name, oldValue, newValue) {
      if (!this.__hasInitialized && name === 'disable-upgrade') {
        this.__hasInitialized = true;
        this._propertySetter = Polymer.Bind._modelApi._propertySetter;
        this._configValue = Polymer.Base._configValue;
        this.__initialize();
      }
      origAttributeChangedCallback.call(this, name, oldValue, newValue);
    };
  }
  if (window.CustomElements) {
    Polymer.instanceof = CustomElements.instanceof;
  } else {
    Polymer.instanceof = function (obj, ctor) {
      return obj instanceof ctor;
    };
  }
  Polymer.isInstance = function (obj) {
    return Boolean(obj && obj.__isPolymerInstance__);
  };
  Polymer.telemetry.instanceCount = 0;
})();(function () {
  var modules = {};
  var lcModules = {};
  var findModule = function (id) {
    return modules[id] || lcModules[id.toLowerCase()];
  };
  var DomModule = function () {
    return document.createElement('dom-module');
  };
  DomModule.prototype = Object.create(HTMLElement.prototype);
  Polymer.Base.mixin(DomModule.prototype, {
    createdCallback: function () {
      this.register();
    },
    register: function (id) {
      id = id || this.id || this.getAttribute('name') || this.getAttribute('is');
      if (id) {
        this.id = id;
        modules[id] = this;
        lcModules[id.toLowerCase()] = this;
      }
    },
    import: function (id, selector) {
      if (id) {
        var m = findModule(id);
        if (!m) {
          forceDomModulesUpgrade();
          m = findModule(id);
        }
        if (m && selector) {
          m = m.querySelector(selector);
        }
        return m;
      }
    }
  });
  Object.defineProperty(DomModule.prototype, 'constructor', {
    value: DomModule,
    configurable: true,
    writable: true
  });
  var cePolyfill = window.CustomElements && !CustomElements.useNative;
  document.registerElement('dom-module', DomModule);
  function forceDomModulesUpgrade() {
    if (cePolyfill) {
      var script = document._currentScript || document.currentScript;
      var doc = script && script.ownerDocument || document;
      var modules = doc.querySelectorAll('dom-module');
      for (var i = modules.length - 1, m; i >= 0 && (m = modules[i]); i--) {
        if (m.__upgraded__) {
          return;
        } else {
          CustomElements.upgrade(m);
        }
      }
    }
  }
})();Polymer.Base._addFeature({
  _prepIs: function () {
    if (!this.is) {
      var module = (document._currentScript || document.currentScript).parentNode;
      if (module.localName === 'dom-module') {
        var id = module.id || module.getAttribute('name') || module.getAttribute('is');
        this.is = id;
      }
    }
    if (this.is) {
      this.is = this.is.toLowerCase();
    }
  }
});Polymer.Base._addFeature({
  behaviors: [],
  _desugarBehaviors: function () {
    if (this.behaviors.length) {
      this.behaviors = this._desugarSomeBehaviors(this.behaviors);
    }
  },
  _desugarSomeBehaviors: function (behaviors) {
    var behaviorSet = [];
    behaviors = this._flattenBehaviorsList(behaviors);
    for (var i = behaviors.length - 1; i >= 0; i--) {
      var b = behaviors[i];
      if (behaviorSet.indexOf(b) === -1) {
        this._mixinBehavior(b);
        behaviorSet.unshift(b);
      }
    }
    return behaviorSet;
  },
  _flattenBehaviorsList: function (behaviors) {
    var flat = [];
    for (var i = 0; i < behaviors.length; i++) {
      var b = behaviors[i];
      if (b instanceof Array) {
        flat = flat.concat(this._flattenBehaviorsList(b));
      } else if (b) {
        flat.push(b);
      } else {
        this._warn(this._logf('_flattenBehaviorsList', 'behavior is null, check for missing or 404 import'));
      }
    }
    return flat;
  },
  _mixinBehavior: function (b) {
    var n$ = Object.getOwnPropertyNames(b);
    var useAssignment = b._noAccessors;
    for (var i = 0, n; i < n$.length && (n = n$[i]); i++) {
      if (!Polymer.Base._behaviorProperties[n] && !this.hasOwnProperty(n)) {
        if (useAssignment) {
          this[n] = b[n];
        } else {
          this.copyOwnProperty(n, b, this);
        }
      }
    }
  },
  _prepBehaviors: function () {
    this._prepFlattenedBehaviors(this.behaviors);
  },
  _prepFlattenedBehaviors: function (behaviors) {
    for (var i = 0, l = behaviors.length; i < l; i++) {
      this._prepBehavior(behaviors[i]);
    }
    this._prepBehavior(this);
  },
  _marshalBehaviors: function () {
    for (var i = 0; i < this.behaviors.length; i++) {
      this._marshalBehavior(this.behaviors[i]);
    }
    this._marshalBehavior(this);
  }
});
Polymer.Base._behaviorProperties = {
  hostAttributes: true,
  beforeRegister: true,
  registered: true,
  properties: true,
  observers: true,
  listeners: true,
  created: true,
  attached: true,
  detached: true,
  attributeChanged: true,
  ready: true,
  _noAccessors: true
};Polymer.Base._addFeature({
  _getExtendedPrototype: function (tag) {
    return this._getExtendedNativePrototype(tag);
  },
  _nativePrototypes: {},
  _getExtendedNativePrototype: function (tag) {
    var p = this._nativePrototypes[tag];
    if (!p) {
      p = Object.create(this.getNativePrototype(tag));
      var p$ = Object.getOwnPropertyNames(Polymer.Base);
      for (var i = 0, n; i < p$.length && (n = p$[i]); i++) {
        if (!Polymer.BaseDescriptors[n]) {
          p[n] = Polymer.Base[n];
        }
      }
      Object.defineProperties(p, Polymer.BaseDescriptors);
      this._nativePrototypes[tag] = p;
    }
    return p;
  },
  getNativePrototype: function (tag) {
    return Object.getPrototypeOf(document.createElement(tag));
  }
});Polymer.Base._addFeature({
  _prepConstructor: function () {
    this._factoryArgs = this.extends ? [this.extends, this.is] : [this.is];
    var ctor = function () {
      return this._factory(arguments);
    };
    if (this.hasOwnProperty('extends')) {
      ctor.extends = this.extends;
    }
    Object.defineProperty(this, 'constructor', {
      value: ctor,
      writable: true,
      configurable: true
    });
    ctor.prototype = this;
  },
  _factory: function (args) {
    var elt = document.createElement.apply(document, this._factoryArgs);
    if (this.factoryImpl) {
      this.factoryImpl.apply(elt, args);
    }
    return elt;
  }
});Polymer.nob = Object.create(null);
Polymer.Base._addFeature({
  getPropertyInfo: function (property) {
    var info = this._getPropertyInfo(property, this.properties);
    if (!info) {
      for (var i = 0; i < this.behaviors.length; i++) {
        info = this._getPropertyInfo(property, this.behaviors[i].properties);
        if (info) {
          return info;
        }
      }
    }
    return info || Polymer.nob;
  },
  _getPropertyInfo: function (property, properties) {
    var p = properties && properties[property];
    if (typeof p === 'function') {
      p = properties[property] = { type: p };
    }
    if (p) {
      p.defined = true;
    }
    return p;
  },
  _prepPropertyInfo: function () {
    this._propertyInfo = {};
    for (var i = 0; i < this.behaviors.length; i++) {
      this._addPropertyInfo(this._propertyInfo, this.behaviors[i].properties);
    }
    this._addPropertyInfo(this._propertyInfo, this.properties);
    this._addPropertyInfo(this._propertyInfo, this._propertyEffects);
  },
  _addPropertyInfo: function (target, source) {
    if (source) {
      var t, s;
      for (var i in source) {
        t = target[i];
        s = source[i];
        if (i[0] === '_' && !s.readOnly) {
          continue;
        }
        if (!target[i]) {
          target[i] = {
            type: typeof s === 'function' ? s : s.type,
            readOnly: s.readOnly,
            attribute: Polymer.CaseMap.camelToDashCase(i)
          };
        } else {
          if (!t.type) {
            t.type = s.type;
          }
          if (!t.readOnly) {
            t.readOnly = s.readOnly;
          }
        }
      }
    }
  }
});
(function () {
  var propertiesDesc = {
    configurable: true,
    writable: true,
    enumerable: true,
    value: {}
  };
  Polymer.BaseDescriptors.properties = propertiesDesc;
  Object.defineProperty(Polymer.Base, 'properties', propertiesDesc);
})();Polymer.CaseMap = {
  _caseMap: {},
  _rx: {
    dashToCamel: /-[a-z]/g,
    camelToDash: /([A-Z])/g
  },
  dashToCamelCase: function (dash) {
    return this._caseMap[dash] || (this._caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(this._rx.dashToCamel, function (m) {
      return m[1].toUpperCase();
    }));
  },
  camelToDashCase: function (camel) {
    return this._caseMap[camel] || (this._caseMap[camel] = camel.replace(this._rx.camelToDash, '-$1').toLowerCase());
  }
};Polymer.Base._addFeature({
  _addHostAttributes: function (attributes) {
    if (!this._aggregatedAttributes) {
      this._aggregatedAttributes = {};
    }
    if (attributes) {
      this.mixin(this._aggregatedAttributes, attributes);
    }
  },
  _marshalHostAttributes: function () {
    if (this._aggregatedAttributes) {
      this._applyAttributes(this, this._aggregatedAttributes);
    }
  },
  _applyAttributes: function (node, attr$) {
    for (var n in attr$) {
      if (!this.hasAttribute(n) && n !== 'class') {
        var v = attr$[n];
        this.serializeValueToAttribute(v, n, this);
      }
    }
  },
  _marshalAttributes: function () {
    this._takeAttributesToModel(this);
  },
  _takeAttributesToModel: function (model) {
    if (this.hasAttributes()) {
      for (var i in this._propertyInfo) {
        var info = this._propertyInfo[i];
        if (this.hasAttribute(info.attribute)) {
          this._setAttributeToProperty(model, info.attribute, i, info);
        }
      }
    }
  },
  _setAttributeToProperty: function (model, attribute, property, info) {
    if (!this._serializing) {
      property = property || Polymer.CaseMap.dashToCamelCase(attribute);
      info = info || this._propertyInfo && this._propertyInfo[property];
      if (info && !info.readOnly) {
        var v = this.getAttribute(attribute);
        model[property] = this.deserialize(v, info.type);
      }
    }
  },
  _serializing: false,
  reflectPropertyToAttribute: function (property, attribute, value) {
    this._serializing = true;
    value = value === undefined ? this[property] : value;
    this.serializeValueToAttribute(value, attribute || Polymer.CaseMap.camelToDashCase(property));
    this._serializing = false;
  },
  serializeValueToAttribute: function (value, attribute, node) {
    var str = this.serialize(value);
    node = node || this;
    if (str === undefined) {
      node.removeAttribute(attribute);
    } else {
      node.setAttribute(attribute, str);
    }
  },
  deserialize: function (value, type) {
    switch (type) {
      case Number:
        value = Number(value);
        break;
      case Boolean:
        value = value != null;
        break;
      case Object:
        try {
          value = JSON.parse(value);
        } catch (x) {}
        break;
      case Array:
        try {
          value = JSON.parse(value);
        } catch (x) {
          value = null;
          console.warn('Polymer::Attributes: couldn`t decode Array as JSON');
        }
        break;
      case Date:
        value = new Date(value);
        break;
      case String:
      default:
        break;
    }
    return value;
  },
  serialize: function (value) {
    switch (typeof value) {
      case 'boolean':
        return value ? '' : undefined;
      case 'object':
        if (value instanceof Date) {
          return value.toString();
        } else if (value) {
          try {
            return JSON.stringify(value);
          } catch (x) {
            return '';
          }
        }
      default:
        return value != null ? value : undefined;
    }
  }
});Polymer.version = "1.10.1";Polymer.Base._addFeature({
  _registerFeatures: function () {
    this._prepIs();
    this._prepBehaviors();
    this._prepConstructor();
    this._prepPropertyInfo();
  },
  _prepBehavior: function (b) {
    this._addHostAttributes(b.hostAttributes);
  },
  _marshalBehavior: function (b) {},
  _initFeatures: function () {
    this._marshalHostAttributes();
    this._marshalBehaviors();
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_src_util_menu_width_ts__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_less_styles_header_less__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_less_styles_header_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_less_styles_header_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alpha_global_header_html__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alpha_global_header_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__alpha_global_header_html__);
/**
 * This is the bootstrap file used by webpack to create a bundle file that can be included as a <script>
 */

// import our menu measurement util


// import the styles


// assign menu func to the window for the component to use
window.registerMenu = __WEBPACK_IMPORTED_MODULE_0__angular_src_util_menu_width_ts__["a" /* registerMenu */];

// create style element for the style text
var styleEl = document.createElement('style');
styleEl.innerHTML = __WEBPACK_IMPORTED_MODULE_1__assets_less_styles_header_less__;
document.head.appendChild(styleEl);

// import the rest of the component


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getMinMenuWidth */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return registerMenu; });
function merge(obj, defaultProps) {
    for (var prop_1 in defaultProps) {
        if (!obj.hasOwnProperty(prop_1)) {
            obj[prop_1] = defaultProps[prop_1];
        }
    }
    return obj;
}
/**
 * Get property from src
 *
 * @param src
 * @param attr
 * @param defaultValue
 * @returns {*}
*/
function prop(src, attr, defaultValue) {
    return (src && typeof src[attr] !== 'undefined' && src[attr]) || defaultValue;
}
/**
 * We only support rem/em/pt conversion
 * @param val
 * @param options
 * @return {*}
 */
function pxValue(val, options) {
    if (options === void 0) { options = {}; }
    var baseFontSize = parseInt(prop(options, 'base-font-size', 16), 10);
    var value = parseFloat(val);
    var unit = val.replace(value, '');
    // eslint-disable-next-line default-case
    switch (unit) {
        case 'rem':
        case 'em':
            return value * baseFontSize;
        case 'pt':
            return value / (96 / 72);
        case 'px':
            return value;
    }
    throw new Error("The unit " + unit + " is not supported");
}
/**
 * Get canvas element to measure text with
 *
 * @param {*} font
 */
function getContext2d(font) {
    try {
        var ctx = document.createElement('canvas').getContext('2d');
        var dpr = window.devicePixelRatio || 1;
        var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        ctx.font = font;
        ctx.setTransform(dpr / bsr, 0, 0, dpr / bsr, 0, 0);
        return ctx;
    }
    catch (err) {
        throw new Error('Canvas support required');
    }
}
/**
 * Add custom letter and word spacing
 * @param {*} ws
 * @param {*} ls
 */
function addWordAndLetterSpacing(ws, ls) {
    var blacklist = ['inherit', 'initial', 'unset', 'normal'];
    var wordAddon = 0;
    if (ws && blacklist.indexOf(ws) === -1) {
        wordAddon = pxValue(ws);
    }
    var letterAddon = 0;
    if (ls && blacklist.indexOf(ls) === -1) {
        letterAddon = pxValue(ls);
    }
    return function (text) {
        var words = text.trim().replace(/\s+/gi, ' ').split(' ').length - 1;
        var chars = text.length;
        return (words * wordAddon) + (chars * letterAddon);
    };
}
/**
 * Measure the width of text given a font def and custom properties
 *
 * @param {*} text
 * @param {*} font
 * @param {*} overwrites
 */
function measureWidth(text, font, overwrites) {
    if (overwrites === void 0) { overwrites = {}; }
    var letterSpacing = overwrites.letterSpacing || 0;
    var wordSpacing = overwrites.wordSpacing || 0;
    var addSpacing = addWordAndLetterSpacing(wordSpacing, letterSpacing);
    var ctx = getContext2d(font);
    return ctx.measureText(text).width + addSpacing(text);
}
/**
 * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
 */
function getMinMenuWidth(menuContainer, options) {
    var minWidth = 0, options = options || {}, font = options.font || "10px Arial", letterSpacing = options.letterSpacing || 0, itemPadding = options.itemPadding || 0, minItemWidth = options.minItemWidth || 0, wordSpacing = options.wordSpacing || 0, i = 0;
    for (i; i < menuContainer.children.length; i++) {
        var liEl = menuContainer.children[i];
        if (liEl.nodeName !== 'LI') {
            continue;
        }
        var link = liEl.firstElementChild || liEl, text = link.textContent, needed;
        if (text) {
            needed = measureWidth(text, font, { letterSpacing: letterSpacing, wordSpacing: wordSpacing });
        }
        else {
            needed = link.clientWidth;
        }
        // add item padding
        needed += itemPadding;
        //console.info(link.textContent, needed);
        // ensure min item width
        minWidth += needed < minItemWidth ? minItemWidth : needed;
    }
    ;
    return minWidth;
}
function getValueOrVariable(value, el) {
    if (value.indexOf('@') >= 0) {
        var style = getComputedStyle(el), varValue = style.getPropertyValue('--' + value.replace('@', ''));
        if (varValue) {
            value = varValue;
        }
        else {
            return null;
        }
    }
    return value;
}
function getValueOrVariableInt(value, el) {
    var computedValue = getValueOrVariable(value, el);
    return computedValue ? parseInt(computedValue.replace('px', '')) : null;
}
/**
 * Register a nav menu to check it's required size on window resize
 * @param {*} menu
 * @param {*} options
 */
function registerMenu(menu, options) {
    var defaults = {
        minItemSize: 10,
        fontSize: "10px",
        reservedWidth: 50,
        itemPadding: 10 // * x 2
    };
    options = merge(options || {}, defaults);
    // the resize function
    var resizeFunction = function () {
        // extract the supported values
        var reservedWidth = getValueOrVariableInt(options.reservedWidth, menu) || defaults.reservedWidth, minItemSize = getValueOrVariableInt(options.minItemSize, menu) || defaults.minItemSize, itemPadding = getValueOrVariableInt(options.itemPadding, menu) || defaults.itemPadding, fontSize = getValueOrVariable(options.fontSize, menu) || defaults.fontSize;
        // available width the menu has to expand to
        var availWidth = window.innerWidth - reservedWidth;
        // width needed by the menu
        var minWidthNeeded = getMinMenuWidth(menu, {
            font: "600 " + fontSize + " Century Gothic",
            letterSpacing: "0.02em",
            itemPadding: itemPadding * 2,
            minItemWidth: minItemSize
        });
        // small adjustment
        minWidthNeeded += 16;
        //console.info('need at least: ' + minWidthNeeded + ' have available ' + availWidth)
        if (availWidth < minWidthNeeded) {
            if (options.onCollapse) {
                options.onCollapse();
            }
        }
        else {
            if (options.onExpand) {
                options.onExpand();
            }
        }
    };
    function start() {
        stop();
        window.addEventListener('resize', resizeFunction);
    }
    function stop() {
        window.removeEventListener('resize', resizeFunction);
    }
    start();
    return {
        start: start,
        stop: stop,
        check: resizeFunction
    };
}



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "@font-face{\n\tfont-family:\"ITCAvantGardeStd\";\n\tfont-style:normal;\n\tfont-weight:600;\n\tsrc:url(data:application/font-woff;charset=utf-8;base64,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);\n}\n@font-face{\n\tfont-family:\"ITCAvantGardeStd\";\n\tfont-style:normal;\n\tfont-weight:200;\n\tsrc:url(data:application/font-woff;charset=utf-8;base64,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);\n}\n@font-face{\n\tfont-family:\"AlphaIcons\";\n\tfont-weight:normal;\n\tfont-style:normal;\n\tsrc:url(data:application/font-woff;charset=utf-8;base64,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);\n}\n[data-icon]::before,\n[class^=\"icon-\"]::before,\n[class*=\" icon-\"]::before {\n\tfont-family: \"AlphaIcons\" !important;\n\tdisplay: inline-block;\n\tfont-style: normal;\n\tfont-weight: normal;\n\tfont-variant: normal;\n\ttext-transform: none !important;\n\tspeak: none;\n\tline-height: 1;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n[data-icon]::before {\n\tcontent: attr(data-icon);\n}\n.icon-logo::before { content:\"\\64\"; }\n.icon-search::before { content:\"\\67\"; }\n.icon-check::before { content:\"\\76\"; }\n.icon-globe::before { content:\"\\77\"; }\n.icon-close-thin::before { content:\"\\78\"; }\n\n/**\n * These values help control the size of the menu and are used to calculate the available widths\n*/\nhtml.nav-open {\n  overflow: hidden;\n}\n/**\n*\t<alpha-global-header> styles\n*/\nalpha-global-header {\n  --item-size: 84px;\n  --item-padding: 15px;\n  --item-font-size: 18px;\n  --menu-reserved-width: 84px;\n  display: block;\n  position: fixed;\n  z-index: 250000;\n  top: 0;\n  left: 0px;\n  width: 100%;\n  height: 84px;\n  line-height: 1;\n  font-family: \"ITCAvantGardeStd\", \"Century Gothic\", sans-serif;\n  /** Slide out search component */\n  /**\n\t Mobile Nav\n\t**/\n}\nalpha-global-header a {\n  text-decoration: none;\n  display: block;\n  cursor: pointer;\n}\nalpha-global-header ul,\nalpha-global-header li {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  position: relative;\n}\nalpha-global-header #closeButton {\n  display: none;\n}\nalpha-global-header .question-mark {\n  cursor: pointer;\n  color: #e42312;\n  font-size: 35px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 100%;\n  width: var(--item-size);\n  max-width: var(--item-size);\n  min-width: var(--item-size);\n}\nalpha-global-header .menu-wrapper {\n  height: 100%;\n}\nalpha-global-header li a {\n  color: #000000;\n  -webkit-transition:all 0.3s ease-out;\n  -o-transition:all 0.3s ease-out;\n  transition: all 0.3s ease-out;\n}\nalpha-global-header .main-menu {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row nowrap;\n          flex-flow: row nowrap;\n  margin: 0;\n  /** Top level list elements **/\n}\nalpha-global-header .main-menu > li {\n  /** link inside top level element **/\n}\nalpha-global-header .main-menu > li > a {\n  position: relative;\n  z-index: 35;\n  padding-left: var(--item-padding);\n  padding-right: var(--item-padding);\n  height: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: var(--item-font-size);\n  font-weight: 600;\n  letter-spacing: .36px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n}\nalpha-global-header .main-menu > li.search-element {\n  max-width: var(--item-size);\n}\nalpha-global-header .main-menu > li.search-element .menu-search-label {\n  font-size: 24px;\n}\n@media (min-width: 1024px) {\n  alpha-global-header .main-menu > li.search-element .menu-search-label {\n    font-size: 27px;\n  }\n}\nalpha-global-header .main-menu > li.language-menu {\n  max-width: var(--item-size);\n}\nalpha-global-header .main-menu > li.language-menu .language-menu-link {\n  font-size: 0;\n  padding: 0;\n}\nalpha-global-header .sub-menu a {\n  font-weight: 100;\n}\nalpha-global-header .menu-search-area {\n  position: absolute;\n  z-index: 300;\n  left: 100%;\n  height: 100%;\n  width: 100%;\n  background: #fff;\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n  -webkit-transition:-webkit-transform 0.3s ease-out;\n  transition:-webkit-transform 0.3s ease-out;\n  -o-transition:transform 0.3s ease-out;\n  transition:transform 0.3s ease-out;\n  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n}\nalpha-global-header .menu-search-area form {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\nalpha-global-header .menu-search-area.open {\n  -webkit-transform: translateX(-100%);\n      -ms-transform: translateX(-100%);\n          transform: translateX(-100%);\n}\nalpha-global-header .menu-search-area .search-form-close {\n  cursor: pointer;\n  background-color: #e42312;\n  color: #fff;\n  font-size: 30px;\n  -ms-flex-preferred-size: var(--item-size);\n      flex-basis: var(--item-size);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\nalpha-global-header .menu-search-area .menu-search-input-wrapper {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\nalpha-global-header .menu-search-area .menu-search-input {\n  font-size: 20px;\n  border: none;\n  border-bottom: 1px solid #dfdfdf;\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 20px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\nalpha-global-header:not(.collapsed) .menu-toggle {\n  display: none;\n}\nalpha-global-header:not(.collapsed) #mobileLogo {\n  display: none;\n}\nalpha-global-header:not(.collapsed) .before-menu {\n  border-bottom: 1px solid #dfdfdf;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  min-width: var(--menu-reserved-width);\n  background: #fff;\n}\nalpha-global-header:not(.collapsed) .menu-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  height: 100%;\n}\nalpha-global-header:not(.collapsed) .question-mark {\n  font-size: 45px;\n}\nalpha-global-header:not(.collapsed) .sub-menu {\n  overflow: hidden;\n  position: absolute;\n  z-index: 30;\n  left: 0;\n  top: var(--item-size);\n  min-width: -webkit-max-content;\n  min-width: -moz-max-content;\n  min-width: max-content;\n  width: 100%;\n  height: 0;\n  padding: 0;\n  background: #fff;\n  -webkit-transform: translateY(-100%);\n      -ms-transform: translateY(-100%);\n          transform: translateY(-100%);\n  -webkit-transition:-webkit-transform 0.2s ease-out;\n  transition:-webkit-transform 0.2s ease-out;\n  -o-transition:transform 0.2s ease-out;\n  transition:transform 0.2s ease-out;\n  transition: transform 0.2s ease-out, -webkit-transform 0.2s ease-out;\n}\nalpha-global-header:not(.collapsed) .sub-menu a {\n  padding: 12px 20px;\n}\nalpha-global-header:not(.collapsed) .sub-menu a:hover {\n  background: #fafafa;\n}\nalpha-global-header:not(.collapsed) li:hover > a {\n  color: #e42312;\n}\nalpha-global-header:not(.collapsed) li:hover > .sub-menu {\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n  height: auto;\n  border: 1px solid #dfdfdf;\n  border-top: none;\n}\nalpha-global-header:not(.collapsed) li.menu-btn {\n  background-color: #e42312;\n  -webkit-transition:background-color 150ms ease-in-out;\n  -o-transition:background-color 150ms ease-in-out;\n  transition: background-color 150ms ease-in-out;\n}\nalpha-global-header:not(.collapsed) li.menu-btn:after {\n  content: none !important;\n}\nalpha-global-header:not(.collapsed) li.menu-btn:hover {\n  background-color: #b51c0e;\n}\nalpha-global-header:not(.collapsed) li.menu-btn a {\n  color: white;\n  line-height: 1.8;\n}\nalpha-global-header:not(.collapsed) .main-menu {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 1116px;\n          flex: 0 1 1116px;\n  /** Top level menu items **/\n}\nalpha-global-header:not(.collapsed) .main-menu > li {\n  border-bottom: 1px solid #dfdfdf;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 auto;\n          flex: 1 0 auto;\n  min-width: var(--item-size);\n}\nalpha-global-header:not(.collapsed) .main-menu > li::after {\n  content: \"\";\n  background: #fff;\n  position: absolute;\n  z-index: 32;\n  display: block;\n  width: 100%;\n  height: 100%;\n  border-left: 1px solid #dfdfdf;\n  border-right: 1px solid #dfdfdf;\n}\nalpha-global-header:not(.collapsed) .main-menu > li.bg-darker::after {\n  background-color: #fafafa;\n}\nalpha-global-header:not(.collapsed) .main-menu > li.menu-item-has-children:hover {\n  border-bottom: 1px solid #fff;\n}\nalpha-global-header.collapsed {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 58px;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  background: #fff;\n  border-bottom: 1px solid #dfdfdf;\n}\nalpha-global-header.collapsed.open .menu-wrapper {\n  background: #000000;\n  height: 100%;\n  visibility: visible;\n}\nalpha-global-header.collapsed .menu-toggle {\n  cursor: pointer;\n  padding-left: 11px;\n  padding-right: 11px;\n  width: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\nalpha-global-header.collapsed .menu-toggle i,\nalpha-global-header.collapsed .menu-toggle:before,\nalpha-global-header.collapsed .menu-toggle:after {\n  background: black;\n  display: block;\n  border-radius: 4px;\n  width: 100%;\n  height: 4px;\n  content: \"\";\n  margin: 2px 0;\n}\nalpha-global-header.collapsed .menu-wrapper {\n  position: fixed;\n  top: 0;\n  z-index: 100;\n  width: 100%;\n  height: 0;\n  overflow-y: scroll;\n  visibility: hidden;\n  background: #000;\n  border: none;\n  -webkit-transition:background 0.3s ease-out;\n  -o-transition:background 0.3s ease-out;\n  transition: background 0.3s ease-out;\n}\nalpha-global-header.collapsed .menu-search-area {\n  display: none;\n  position: static;\n  height: auto;\n  margin-bottom: 20px;\n}\nalpha-global-header.collapsed .menu-search-area .search-form-close {\n  display: none;\n}\nalpha-global-header.collapsed .menu-search-area .menu-search-input {\n  border: 1px solid #dfdfdf;\n}\nalpha-global-header.collapsed .before-menu {\n  display: none;\n}\nalpha-global-header.collapsed .sub-menu {\n  margin: 20px 0;\n  position: static;\n  visibility: visible;\n  display: none;\n  background: none;\n  border: none;\n  width: 100%;\n  -webkit-transform: none;\n      -ms-transform: none;\n          transform: none;\n}\nalpha-global-header.collapsed .sub-menu a {\n  padding: 8px 0;\n  font-size: var(--item-font-size);\n}\nalpha-global-header.collapsed .sub-menu-toggle {\n  cursor: pointer;\n  position: absolute;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 13px 0 0 -5px;\n  height: auto;\n  padding: 10px;\n}\nalpha-global-header.collapsed .sub-menu-toggle::before {\n  content: \"\";\n  position: absolute;\n  border-bottom: none;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-top: 6px solid #fff;\n}\nalpha-global-header.collapsed li {\n  border: none;\n  display: block;\n}\nalpha-global-header.collapsed li a {\n  background: none;\n  height: auto;\n  color: inherit;\n}\nalpha-global-header.collapsed li.search-element {\n  display: none;\n}\nalpha-global-header.collapsed li.menu-btn {\n  color: #e42312;\n}\nalpha-global-header.collapsed li.open > .sub-menu {\n  display: block;\n}\nalpha-global-header.collapsed li.open .sub-menu-toggle::before {\n  border-top: none;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid #fff;\n}\nalpha-global-header.collapsed .menu-container {\n  background: #000;\n  color: #fff;\n}\nalpha-global-header.collapsed .menu-container li a {\n  border: none;\n}\nalpha-global-header.collapsed .main-menu {\n  text-align: center;\n  overflow-y: auto;\n  display: block;\n  padding-top: 50px;\n  /** Top level elements */\n}\nalpha-global-header.collapsed .main-menu > li {\n  margin-bottom: 10px;\n  width: 100%;\n  -webkit-box-flex: initial;\n      -ms-flex: initial;\n          flex: initial;\n  /** link inside top level elements **/\n}\nalpha-global-header.collapsed .main-menu > li > a {\n  display: inline-block;\n  font-size: 24px;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  padding-top: 8px;\n  padding-bottom: 8px;\n  height: auto;\n}\nalpha-global-header.collapsed .main-menu > li.language-menu {\n  max-width: none;\n}\nalpha-global-header.collapsed .main-menu > li.language-menu a {\n  border: none;\n  background: none;\n}\nalpha-global-header.collapsed .main-menu > li.language-menu .icon-globe {\n  display: none;\n}\nalpha-global-header.collapsed .main-menu > li.language-menu .language-menu-link {\n  font-size: 24px;\n  padding: 8px 15px;\n}\nalpha-global-header.collapsed #closeButton {\n  display: block;\n  position: absolute;\n  right: 0;\n  z-index: 100;\n  font-size: 26px;\n  padding: 15px;\n  line-height: 80%;\n  cursor: pointer;\n}\n"

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


const RegisterHtmlTemplate = __webpack_require__(8);

RegisterHtmlTemplate.register("<dom-module id=alpha-global-header> <template> <template is=dom-if if={{home}}> <a class=\"question-mark icon-logo\" id=mobileLogo href=[[home]]></a> </template> <div class=menu-wrapper> <div class=menu-container> <span id=closeButton class=icon-close-thin on-click=close></span> <template is=dom-if if={{home}}> <div class=before-menu> <a class=\"question-mark icon-logo\" href=[[home]]></a> </div> </template> <ul id=mainMenu class=\"main-menu collapsible\"> <slot id=menuSlot></slot> <template is=dom-if if={{languages}}> <li class=\"language-menu bg-darker menu-item menu-item-has-children\"> <a class=icon-globe></a> <a class=language-menu-link href=#>Languages</a> <span class=sub-menu-toggle></span> <ul class=sub-menu> <template is=dom-repeat items={{languages}}> <li class=menu-item><a href=[[item.href]]>[[item.label]]</a></li> </template> </ul> </li> </template> <template is=dom-if if={{search}}> <li class=\"menu-item search-element search-element-toggle\" on-click=toggleSearchInput> <a class=\"menu-search-label icon-search\"></a> </li> <div id=menuSearchArea class$=\"menu-search-area [[searchOpenClass]]\"> <form class=menu-search action=[[searchAction]]> <div class=menu-search-input-wrapper> <input class=menu-search-input type=text name=s value=\"\" placeholder=Search> </div> <div class=\"search-form-close icon-close-thin\" on-click=toggleSearchInput></div> </form> </div> </template> </ul> </div> </div> <div class=menu-toggle on-click=toggleMenu><i></i></div> </template> </dom-module>");

'use strict';

var $htmlClasses = window.document.documentElement.classList;

Polymer({
	is: 'alpha-global-header',
	properties: {
		title: String,
		settings: Object,
		home: String,
		languages: Array,
		search: Boolean,
		searchAction: String
	},
	parseSettings: function () {},
	ready: function () {

		this.parseSettings();

		var _this = this;

		// imported from menu-width.js
		this.menuSizer = registerMenu(this.$.mainMenu, {

			// map config properties to css vars
			minItemSize: "@item-size",
			itemPadding: "@item-padding",
			fontSize: "@item-font-size",
			reservedWidth: "@menu-reserved-width",

			onCollapse: function () {
				_this.classList.add('collapsed');
			},
			onExpand: function () {
				_this.classList.remove('collapsed');
			}
		});

		// add toggles
		this.addSubMenuToggles();

		this.addEventListener('click', function (event) {
			_this.onSiteMenuClick(event);
		});

		this.menuSizer.check();
	},

	addSubMenuToggles: function () {

		function createToggle() {
			var tog = document.createElement("span");
			tog.classList.add('sub-menu-toggle');
			return tog;
		}

		var subSelector = '.menu-item-has-children > a';

		var childContainers = this.querySelectorAll(subSelector);

		childContainers.forEach(function (item) {
			item.parentNode.insertBefore(createToggle(), item.nextSibling);
		});
	},

	open: function () {
		$htmlClasses.add('nav-open');
		this.classList.add('open');
	},
	/**
 * Close the Menu
 */
	close: function () {
		$htmlClasses.remove('nav-open');
		this.classList.remove('open');
	},

	/**
 * On Site Menu Clicked
 */
	onSiteMenuClick: function (event) {

		if (event.target.classList.contains("alpha-menu-wrapper") || event.target.attributes.getNamedItem("data-menu-close-button")) {

			this.close();
		} else if (event.target.classList.contains('sub-menu-toggle')) {

			this.toggleSubMenu(event);
		}
	},

	/**
 * Toggle Menu
 */
	toggleMenu: function (event) {

		if ($htmlClasses.contains('nav-open')) {
			this.close();
		} else {
			this.open();
		}
	},

	toggleSearchInput: function () {
		this.searchOpenClass = this.searchOpenClass === "open" ? "" : "open";
	},

	/**
 * Sub Menu Toggle Clicked
 */
	toggleSubMenu: function (event) {
		var menu = event.target.parentNode;
		if (menu.classList.contains("open")) {
			menu.classList.remove("open");
		} else {
			menu.classList.add("open");
		}
	}
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* eslint-env browser */

class RegisterHtmlTemplate {
  /**
   * Create a `<template>` element to hold `<dom-module>` content.
   * This bit of code will execute in the context of the main document,
   * calling `importNode` on the `<template>`, which in turn triggers
   * the lifecycle of the `<dom-module>` and allows it to insert its
   * content into Polymer's global module map. When a Polymer element
   * boots up it will fetch its template from this module map.
   * https://github.com/Polymer/polymer/blob/master/lib/mixins/element-mixin.html#L501-L538
   * @param {string} val A `<dom-module>` as an HTML string
   */
  static register(val) {
    let content;
    const template = document.createElement('template');
    template.innerHTML = val;
    if (template.content) {
      content = template.content; // eslint-disable-line prefer-destructuring
    } else {
      content = document.createDocumentFragment();
      while (template.firstChild) {
        content.appendChild(template.firstChild);
      }
    }
    document.importNode(content, true);
  }
  /**
   * Content that will be injected into the main document. This is primarily
   * for things like `<iron-iconset>` and `<custom-style>` which do not have
   * templates but rely on HTML Imports ability to apply content to the main
   * document.
   * @param {string} val An HTML string
   */
  static toBody(val) {
    const trimmedVal = val.trim();
    if (trimmedVal) {
      const div = document.createElement('div');
      div.innerHTML = trimmedVal;
      if (div.firstChild) {
        if (document.body) {
          document.body.insertBefore(div.firstChild, document.body.firstChild);
        } else {
          document.addEventListener('DOMContentLoaded', () => {
            document.body.insertBefore(div.firstChild, document.body.firstChild);
          });
        }
      }
    }
  }
}

module.exports = RegisterHtmlTemplate;

/***/ })
/******/ ]);