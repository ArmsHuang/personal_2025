'use strict';

var Hammer = typeof require === 'function' ? require('hammerjs') : window.Hammer;

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

var scrollToY = function scrollToY(_ref) {
  var _ref$scrollTargetY = _ref.scrollTargetY,
      scrollTargetY = _ref$scrollTargetY === undefined ? 0 : _ref$scrollTargetY,
      _ref$speed = _ref.speed,
      speed = _ref$speed === undefined ? 200 : _ref$speed,
      _ref$easing = _ref.easing,
      easing = _ref$easing === undefined ? 'easeInOutQuint' : _ref$easing;

  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  var scrollY = window.scrollY,
      currentTime = 0,

  // min time .1, max time .8 seconds
  time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8)),
      PI_D2 = Math.PI / 2,
      easingEquations = {
    easeOutSine: function easeOutSine(pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function easeInOutSine(pos) {
      return -0.5 * (Math.cos(Math.PI * pos) - 1);
    },
    easeInOutQuint: function easeInOutQuint(pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5);
      }
      return 0.5 * (Math.pow(pos - 2, 5) + 2);
    }
  };

  // add animation loop
  var tick = function tick() {
    currentTime += 1 / 60;

    var p = currentTime / time;
    var t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);
      window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  };

  tick();
};

Vue.component('content-nav', {
  template: '#content-nav-template',
  data: function data() {
    return {
      isNavOpen: false
    };
  },

  props: {
    nodes: {
      type: Array,
      required: false
    },
    now: {
      type: Number,
      default: 0
    }
  },
  methods: {
    navAction: function navAction() {
      this.isNavOpen = !this.isNavOpen;
    },
    delay: function delay(i) {
      var out = i >= this.now ? i - 1 : i;
      out *= .1;
      return this.isNavOpen ? out.toString() + 's' : '0';
    }
  }
});

Vue.component('page-header', {
  template: '#page-header-template',
  data: function data() {
    return {
      menuActive: false,
      nowBoxGroup: ''
    };
  },

  props: {
    menus: {
      type: Object,
      default: function _default() {
        return {
          spLinks: [{ legend: '會員登入', link: '#', bgPad: true }, { legend: '聯繫我們', link: '#' }],
          language: {
            legend: '語言',
            nodes: [{ legend: 'ENGLISH', link: '#' }, { legend: '简体中文', link: '#' }, { legend: '繁体中文', link: '#' }]
          },
          boxGroups: [{
            legend: '關於我們',
            link: 'about_us.html',
            target: '_blank',
            nodes: [{ legend: '我們的優勢', link: 'about_us.html', target: '_blank' }, { legend: '全球未來發展', link: 'about_us.html' }, { legend: '我們的成員', link: 'about_us.html' }]
          }, {
            legend: '理財項目',
            nodes: [{ legend: '外匯產品', link: '#' }, { legend: '與MS交易比特幣', link: '#' }, { legend: '交易平台', link: '#' }]
          }, {
            legend: '交易培訓',
            nodes: [{ legend: '新手入門', link: '#' }, { legend: '外匯市場特點', link: '#' }, { legend: '直通式处理交易经纪商 (STP)', link: '#' }, { legend: '差价合约', link: '#' }, { legend: '基本知識', link: '#' }]
          }]
        };
      }
    },
    menuTitle: {
      type: String,
      default: '選單'
    }
  },
  methods: {
    getOnopened: function getOnopened(data) {
      this.nowBoxGroup = data;
    },
    menuAction: function menuAction() {
      this.menuActive = !this.menuActive;
      if (this.menuActive) return scrollToY({});
    }
  }
});

Vue.component('box-group', {
  template: '#box-group-template',

  data: function data() {
    return {
      active: false
    };
  },


  props: {
    legend: {
      type: String,
      default: "標題"
    },
    link: String,
    target: String,
    legendLink: {
      type: String,
      default: "#"
    },
    nodes: Array,
    appendClass: String
  },

  methods: {
    onMouseenter: function onMouseenter() {
      this.active = !this.active;
      if (this.active) {
        this.$emit('opened', this.legend);
      }
    },
    onMouseleave: function onMouseleave() {
      this.active = false;
    }
  }
});

Vue.component('scroll', {
  template: '#scroll-template',
  data: function data() {
    return {
      scrollTo: 0
    };
  },

  methods: {
    doScroll: function doScroll() {
      this.scrollTo = this.$el.offsetTop + this.$el.offsetHeight;
      scrollToY({ scrollTargetY: this.scrollTo });
    }
  }
});

Vue.component('slider-box', {
  template: '#slider-box-template',
  data: function data() {
    return {
      nowNode: 0,
      nodeClass: 'next',
      intervalDude: {}
    };
  },

  props: {
    nodes: {
      type: Array,
      required: true
    },
    speed: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    nodesSize: function nodesSize() {
      return this.nodes.length;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.routine();

      var hammertime = new Hammer(_this.$el);
      hammertime.on("swipeleft", function (e) {
        if (e.deltaX <= -150) return _this.nodeAction({ action: 'next' });
      });
      hammertime.on("swiperight", function (e) {
        if (e.deltaX >= 150) return _this.nodeAction({ action: 'last' });
      });
    });
  },
  methods: {
    routine: function routine() {
      var _this2 = this;

      this.stopRoutine();
      this.intervalDude.action = setTimeout(function () {
        _this2.nodeAction({ setter: _this2.nowNode });
      }, this.speed);
    },
    stopRoutine: function stopRoutine() {
      clearTimeout(this.intervalDude.action);
    },
    pageChanger: function pageChanger(_ref2) {
      var _ref2$page = _ref2.page,
          page = _ref2$page === undefined ? 0 : _ref2$page,
          _ref2$method = _ref2.method,
          method = _ref2$method === undefined ? 'next' : _ref2$method;

      this.stopRoutine();
      this.nowNode = page;
      this.nodeClass = method;
      this.routine();
    },
    nodeAction: function nodeAction(_ref3) {
      var _ref3$setter = _ref3.setter,
          setter = _ref3$setter === undefined ? this.nowNode : _ref3$setter,
          _ref3$action = _ref3.action,
          action = _ref3$action === undefined ? 'next' : _ref3$action;

      var page = void 0,
          method = void 0;
      action = action.trim().toLowerCase();
      if (action == 'click') {
        method = setter > this.nowNode ? 'next' : 'last';
        return this.pageChanger({ page: setter, method: method });
      }
      if (action == 'next') {
        page = setter >= this.nodesSize - 1 ? 0 : setter + 1;
        return this.pageChanger({ page: page, method: action });
      }
      if (action == 'last') {
        page = setter <= 0 ? this.nodesSize - 1 : setter - 1;
        return this.pageChanger({ page: page, method: action });
      }
    }
  }
});

var PromoteService = function PromoteService() {};

PromoteService.marquee = function (_ref4) {
  var context = _ref4.context;

  return new Promise(function (resolve, reject) {
    return xhr({
      url: 'marquee'
    }).then(function (res) {
      return resolve(res.data);
    }).catch(function (err) {
      return reject(err);
    });
  });
};

new Vue({
  el: '.container',

  methods: {
    goTop: function goTop() {
      scrollToY({ scrollTargetY: 0 });
    }
  }
});

// new Vue({
//   el: '.container'
// })
//# sourceMappingURL=script.debug.js.map
