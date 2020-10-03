(() => {
  var __defineProperty = Object.defineProperty;
  var __hasOwnProperty = Object.prototype.hasOwnProperty;
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __markAsModule = (target) => {
    return __defineProperty(target, "__esModule", {value: true});
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defineProperty(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module) => {
    __markAsModule(target);
    if (typeof module === "object" || typeof module === "function") {
      for (let key in module)
        if (!__hasOwnProperty.call(target, key) && key !== "default")
          __defineProperty(target, key, {get: () => module[key], enumerable: true});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defineProperty({}, "default", {value: module, enumerable: true}), module);
  };

  // node_modules/jff-canvas/lib/index.js
  var require_lib = __commonJS((exports) => {
    var __defineProperty2 = Object.defineProperty;
    var __markAsModule2 = (target) => {
      return __defineProperty2(target, "__esModule", {value: true});
    };
    var __export2 = (target, all) => {
      __markAsModule2(target);
      for (var name in all)
        __defineProperty2(target, name, {get: all[name], enumerable: true});
    };
    class BlinkBezier {
      constructor(p1x, p1y, p2x, p2y) {
        this.cx = 3 * p1x;
        this.bx = 3 * (p2x - p1x) - this.cx;
        this.ax = 1 - this.cx - this.bx;
        this.cy = 3 * p1y;
        this.by = 3 * (p2y - p1y) - this.cy;
        this.ay = 1 - this.cy - this.by;
        this.m_startGradient = 0;
        if (p1x > 0) {
          this.m_startGradient = p1y / p1x;
        } else if (!p1y && p2x > 0) {
          this.m_startGradient = p2y / p2x;
        }
        this.m_endGradient = 0;
        if (p2x < 1) {
          this.m_endGradient = (p2y - 1) / (p2x - 1);
        } else if (p2x == 1 && p1x < 1) {
          this.m_endGradient = (p1y - 1) / (p1x - 1);
        }
      }
      sampleCurveX(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
      }
      sampleCurveY(t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
      }
      sampleCurveDerivativeX(t) {
        return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
      }
      solveCurveX(x, epsilon) {
        let t0, t1, t2, x2, d2, i;
        for (t2 = x, i = 0; i < 8; i++) {
          x2 = this.sampleCurveX(t2) - x;
          if (Math.abs(x2) < epsilon) {
            return t2;
          }
          d2 = this.sampleCurveDerivativeX(t2);
          if (Math.abs(d2) < 1e-6) {
            break;
          }
          t2 = t2 - x2 / d2;
        }
        t0 = 0;
        t1 = 1;
        t2 = x;
        while (t0 < t1) {
          x2 = this.sampleCurveX(t2);
          if (Math.abs(x2 - x) < epsilon) {
            return t2;
          }
          if (x > x2) {
            t0 = t2;
          } else {
            t1 = t2;
          }
          t2 = (t1 - t0) * 0.5 + t0;
        }
        return t2;
      }
      solve(x, epsilon = 1e-4) {
        if (x < 0) {
          return this.m_startGradient * x;
        }
        if (x > 1) {
          return 1 + this.m_endGradient * (x - 1);
        }
        return this.sampleCurveY(this.solveCurveX(x, epsilon));
      }
    }
    const bounce = (deceleration = 0.2, springConstant = 4, mass = 50) => {
      let velocity = 0;
      let p = 0;
      const endP = 1;
      const pos = [];
      do {
        const springForce = -(p - endP) * springConstant;
        const acc = springForce / mass;
        velocity += acc;
        p += velocity;
        if (p > 1) {
          p = 1 - (p - 1);
          velocity = -velocity;
        }
        pos.push(p);
        velocity *= deceleration;
      } while (Math.abs(p - endP) > 1e-4 || Math.abs(velocity) > 1e-4);
      const len = pos.length;
      return (t) => pos[Math.floor(t * (len - 1))];
    };
    var Bounce_default = bounce;
    const spring = (deceleration = 0.2, springConstant = 4, mass = 50) => {
      let velocity = 0;
      let p = 0;
      const endP = 1;
      const pos = [];
      do {
        const springForce = -(p - endP) * springConstant;
        const acc = springForce / mass;
        velocity += acc;
        p += velocity;
        pos.push(p);
        velocity *= deceleration;
      } while (Math.abs(p - endP) > 1e-4 || Math.abs(velocity) > 1e-4);
      const len = pos.length;
      return (t) => pos[Math.floor(t * (len - 1))];
    };
    var Spring_default = spring;
    const Ease_exports = {};
    __export2(Ease_exports, {
      Bounce: () => Bounce2,
      EaseIn: () => EaseIn,
      EaseInOut: () => EaseInOut,
      EaseOut: () => EaseOut,
      Linear: () => Linear,
      Spring: () => Spring2
    });
    const inOut = new BlinkBezier(0.63, 1, 0.43, 0.9);
    const out = new BlinkBezier(0, 0, 0.4, 1);
    const _in = new BlinkBezier(0.6, 0, 1, 1);
    const EaseInOut = (t) => inOut.solve(t);
    const EaseOut = (t) => out.solve(t);
    const EaseIn = (t) => _in.solve(t);
    const Linear = (t) => t;
    const Spring2 = (dec, springc, mass) => {
      const func = Spring_default(dec, springc, mass);
      return (t) => func(t);
    };
    const Bounce2 = (dec, springc, mass) => {
      const func = Bounce_default(dec, springc, mass);
      return (t) => func(t);
    };
    class View {
      constructor(frame) {
        if (frame == void 0) {
          console.error("frame must be set on view");
        }
        this.repaint = this.repaint.bind(this);
        this.paint = this.paint.bind(this);
        this.getPointInView = this.getPointInView.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
        this.frame = frame;
        this.subviews = [];
        this.clickable = true;
        this.hidden = false;
        this.backgroundColor = void 0;
        this.superview = void 0;
        this.strokeColor = void 0;
        this.strokeWidth = 2;
        this.animation = void 0;
      }
      getFrame() {
        return this.frame;
      }
      setSuperview(superview) {
        this.superview = superview;
      }
      viewDidAppearBase() {
        this.viewDidAppear();
        this.subviews.forEach((e) => e.viewDidAppearBase());
      }
      viewDidAppear() {
      }
      viewDidDisappear() {
      }
      addSubview(view) {
        if (view.hasSuperview()) {
          console.error("Cant add subview already within another view ", view);
          return;
        }
        view.setSuperview(this);
        this.subviews.push(view);
        if (View.isAdded(this)) {
          this.viewDidAppearBase();
          this.repaint();
        }
      }
      insertViewAtBottom(view) {
        view.setSuperview(this);
        this.subviews.unshift(view);
        if (View.isAdded(this)) {
          this.viewDidAppearBase();
          this.repaint();
        }
      }
      removeFromSuperview() {
        this.superview.removeView(this);
        this.superview.repaint();
        this.superview = void 0;
      }
      hasSuperview() {
        return this.superview !== void 0;
      }
      removeView(view) {
        for (let i = 0, len = this.subviews.length; i < len; i++) {
          if (view === this.subviews[i]) {
            this.removeSubviewAtIndex(i);
            view.viewDidDisappear();
            return;
          }
        }
      }
      removeSubviewAtIndex(index) {
        this.subviews.splice(index, 1);
      }
      isEventInside(event) {
        return this.isPointInside(event.point.x, event.point.y);
      }
      isPointInside(x, y) {
        return this.frame.x <= x && x <= this.frame.x + this.frame.width && this.frame.y <= y && y <= this.frame.y + this.frame.height;
      }
      getPointInView(x, y) {
        const point = {x, y};
        let currentView = this;
        while (currentView != void 0) {
          point.x -= currentView.frame.x;
          point.y -= currentView.frame.y;
          currentView = currentView.superview;
        }
        return point;
      }
      onMousedown(event) {
      }
      onMousedownBase(event) {
        let eventHandlers = [];
        const origPoint = {...event.point};
        for (let i = 0, len = this.subviews.length; i < len; i++) {
          const subview = this.subviews[this.subviews.length - i - 1];
          if (subview.clickable && !subview.hidden && !event.defaultPrevented && subview.isEventInside(event)) {
            event.point = {x: origPoint.x - subview.frame.x, y: origPoint.y - subview.frame.y};
            const mouseHandler = subview.onMousedownBase(event);
            if (mouseHandler) {
              eventHandlers = eventHandlers.concat(mouseHandler);
            }
            event.point = {...origPoint};
          }
        }
        if (!event.defaultPrevented) {
          const handler = this.onMousedown(event);
          if (handler) {
            eventHandlers.push(handler);
          }
        }
        return eventHandlers;
      }
      repaint() {
        if (!this.hasSuperview()) {
          console.error("cant repaint without superview");
          return;
        }
        this.superview.repaint();
      }
      paint(canvas, timestamp) {
      }
      paintBase(canvas, timestamp) {
        if (this.hidden)
          return;
        const needsTranslation = this.frame.x !== 0 || this.frame.y !== 0;
        if (needsTranslation) {
          canvas.ctx.save();
          canvas.ctx.translate(this.frame.x, this.frame.y);
        }
        if (this.backgroundColor != void 0)
          canvas.paintRect(0, 0, this.frame.width, this.frame.height, this.backgroundColor);
        if (this.strokeColor !== void 0)
          canvas.drawRect(0, 0, this.frame.width, this.frame.height, this.strokeColor, this.strokeWidth);
        this.paint(canvas, timestamp);
        if (this.animation !== void 0)
          this.handleAnimation(canvas, timestamp);
        for (let i = 0, len = this.subviews.length; i < len; i++) {
          const view = this.subviews[i];
          if (view == void 0) {
            continue;
          }
          view.paintBase(canvas, timestamp);
        }
        if (needsTranslation) {
          canvas.ctx.restore();
        }
      }
      animate(duration, animation, onComplete = () => {
      }, loop = false, easing = EaseOut) {
        this.animation = {func: animation, duration, onComplete, loop, easing, start: void 0};
        this.repaint();
      }
      stopAnimation() {
        if (this.animation) {
          this.animation.onComplete();
          this.animation = void 0;
        }
      }
      handleAnimation(canvas, timestamp) {
        if (!this.animation.start) {
          this.animation.start = timestamp;
          this.animation.val = 0;
        }
        const progress = Math.round(timestamp - this.animation.start) / this.animation.duration;
        const eased = this.animation.easing(progress);
        this.animation.func(eased, canvas);
        this.animation.val = eased;
        if (progress >= 1) {
          if (this.animation.loop) {
            this.animation.start = timestamp;
            this.animation.onComplete();
          } else {
            this.stopAnimation();
          }
          if (this.hasSuperview()) {
            this.repaint();
          }
        } else {
          this.repaint();
        }
      }
      getDOMElement() {
        if (!this.hasSuperview()) {
          console.error("Cannot get DOM element before view has appeared");
          return;
        }
        return this.superview.getDOMElement();
      }
      static isAdded(view) {
        if (view instanceof RootView) {
          return true;
        }
        if (view == void 0) {
          return false;
        }
        return View.isAdded(view.superview);
      }
    }
    class RootView extends View {
      constructor(frame, canvas) {
        super(frame);
        this.canvas = canvas;
        this.actuallyRepaint = this.actuallyRepaint.bind(this);
        this.repaint = this.repaint.bind(this);
        this.requestedPaint = false;
      }
      reset() {
      }
      repaint() {
        if (!this.requestedPaint) {
          this.requestedPaint = true;
          window.requestAnimationFrame(this.actuallyRepaint);
        }
      }
      actuallyRepaint(timestamp) {
        this.requestedPaint = false;
        this.canvas.clear();
        this.paintBase(this.canvas, timestamp);
      }
      canvasSizeChanged(width, height) {
        this.frame.width = width;
        this.frame.height = height;
      }
      getDOMElement() {
        return this.canvas.domCanvas;
      }
    }
    const textCache = {};
    class Canvas {
      constructor(canvas, size = "auto") {
        this.onMousedown = this.onMousedown.bind(this);
        if (typeof canvas === "string") {
          this.domCanvas = document.getElementById(canvas);
        } else {
          this.domCanvas = canvas;
        }
        if (size == "auto") {
          size = {width: this.domCanvas.offsetWidth, height: this.domCanvas.offsetHeight};
        }
        this.scaleFactor = 2;
        this.ctx = this.domCanvas.getContext("2d");
        this.rootview = new RootView({x: 0, y: 0, ...size}, this);
        this.setFrame(size.width, size.height);
        this.domCanvas.addEventListener("mousedown", this.onMousedown);
        this.domCanvas.addEventListener("touchstart", this.onMousedown);
      }
      onMousedown(downEvent) {
        downEvent.point = {x: downEvent.layerX, y: downEvent.layerY};
        if (this.rootview.isEventInside(downEvent)) {
          const handlers = this.rootview.onMousedownBase(downEvent);
          handlers.forEach((h) => {
            let lastDelta = {x: downEvent.clientX, y: downEvent.clientY};
            const onMove = (moveEvent, mouseUp = false) => {
              moveEvent.delta = {x: moveEvent.clientX - downEvent.clientX, y: moveEvent.clientY - downEvent.clientY};
              moveEvent.moveDelta = {x: moveEvent.clientX - lastDelta.x, y: moveEvent.clientY - lastDelta.y};
              lastDelta = {x: moveEvent.clientX, y: moveEvent.clientY};
              h(moveEvent, mouseUp);
            };
            const onUp = (e) => {
              onMove(e, true);
              document.removeEventListener("mousemove", onMove);
              document.removeEventListener("mouseup", onUp);
              document.removeEventListener("touchmove", onMove);
              document.removeEventListener("touchend", onUp);
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
            document.addEventListener("touchmove", onMove);
            document.addEventListener("touchend", onUp);
          });
        }
      }
      getFrame() {
        return {
          x: 0,
          y: 0,
          width: Math.ceil(this.domCanvas.width / this.scaleFactor),
          height: Math.ceil(this.domCanvas.height / this.scaleFactor)
        };
      }
      setFrame(width, height) {
        const tempFont = this.ctx.font;
        const tempFillStyle = this.ctx.fillStyle;
        const tempStrokeStyle = this.ctx.strokeStyle;
        this.domCanvas.style.width = width;
        this.domCanvas.style.height = height;
        this.domCanvas.width = Math.ceil(width * this.scaleFactor);
        this.domCanvas.height = Math.ceil(height * this.scaleFactor);
        this.ctx.scale(this.scaleFactor, this.scaleFactor);
        this.ctx.font = tempFont;
        this.ctx.fillStyle = tempFillStyle;
        this.ctx.strokeStyle = tempStrokeStyle;
        this.rootview.canvasSizeChanged(width, height);
      }
      paintRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
      }
      drawRect(x, y, width, height, color, lineWidth = 2) {
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, width, height);
      }
      paintCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
      }
      beginLine(color, width = 1, lineCap = "butt") {
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;
        this.ctx.lineCap = lineCap;
        this.ctx.beginPath();
      }
      drawHorizontalLine(x1, x2, y) {
        this.ctx.moveTo(x1, y);
        this.ctx.lineTo(x2, y);
      }
      drawLine(x, y, l1, l2, angle) {
        const cos = Math.cos(this.degToRad(angle));
        const sin = Math.sin(this.degToRad(angle));
        this.ctx.moveTo(x + l1 * cos, y + l1 * sin);
        this.ctx.lineTo(x + l2 * cos, y + l2 * sin);
      }
      drawLineTo(x, y, x2, y2) {
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
      }
      degToRad(deg) {
        return deg * Math.PI / 180;
      }
      drawVerticalLine(x, y1, y2) {
        this.ctx.moveTo(x, y1);
        this.ctx.lineTo(x, y2);
      }
      endLine() {
        this.ctx.stroke();
      }
      hugeText() {
        this.ctx.setFont("bold 144px Helvetica");
      }
      boldText() {
        this.setFont("bold 14px Helvetica");
      }
      normalText() {
        this.setFont();
      }
      normalTextWithSize(size) {
        this.setFont(`${size}px Helvetica`);
      }
      setFont(font = "14px Helvetica") {
        this.ctx.font = font;
      }
      textShadow(blur, color) {
        this.ctx.shadowColor = color;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = blur;
      }
      drawText(x, y, text, align = "start", color) {
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
      }
      drawCanvas(canvas, x, y) {
        const frame = canvas.getFrame();
        this.ctx.drawImage(canvas.domCanvas, x, y, frame.width, frame.height, x, y, frame.width, frame.height);
      }
      getTextWidth(text) {
        let stored = textCache[text.length];
        if (stored == void 0) {
          const size = this.ctx.measureText(text);
          textCache[text.length] = size.width;
          return size.width;
        }
        return stored;
      }
      clear() {
        this.ctx.clearRect(0, 0, this.domCanvas.width, this.domCanvas.height);
      }
    }
    class Label extends View {
      constructor(frame) {
        super(frame);
        this.text = "Text";
        this.align = "center";
        this.textColor = "black";
        this.font = "14px Helvetica";
        this.clickable = false;
      }
      paint(canvas) {
        if (!this.text) {
          return;
        }
        canvas.setFont(this.font);
        canvas.drawText(0, 20, this.text, this.align, this.textColor);
      }
    }
    class Button extends View {
      constructor(frame) {
        super(frame);
        this.onMousedown = this.onMousedown.bind(this);
        this.onMouseup = this.onMouseup.bind(this);
        this.backgroundColor = "#AAA";
        this.activeColor = "#888";
        this.label = new Label({...frame, x: 0, y: 4});
        this.label.text = "Button";
        this.label.align = "center";
        this.addSubview(this.label);
        this.onClick = () => {
        };
      }
      onMousedown(event) {
        this._backgroundColor = this.backgroundColor;
        this.backgroundColor = "#888";
        document.addEventListener("mouseup", this.onMouseup);
        event.preventDefault();
      }
      onMouseup(event) {
        event.point = this.getPointInView(event.layerX, event.layerY);
        this.onClick(event);
        this.backgroundColor = this._backgroundColor;
        document.removeEventListener("mouseup", this.onMouseup);
      }
    }
    __export2(exports, {
      BlinkBezier: () => BlinkBezier,
      Button: () => Button,
      Canvas: () => Canvas,
      Ease: () => Ease_exports,
      Label: () => Label,
      Spring: () => Spring_default,
      View: () => View
    });
  });

  // src/jff-canvas/ResizeView.js
  var require_ResizeView = __commonJS((exports) => {
    __export(exports, {
      default: () => ResizeView
    });
    const jff_canvas = __toModule(require_lib());
    const HANDLE_SIZE = 8;
    class ResizeView extends jff_canvas.View {
      constructor(frame) {
        super(frame);
        this.placeHandles = this.placeHandles.bind(this);
        this.onMousedownOnView = this.onMousedownOnView.bind(this);
        this.onMoveView = this.onMoveView.bind(this);
        this.onMousedownOnHandle = this.onMousedownOnHandle.bind(this);
        this.onMoveHandle = this.onMoveHandle.bind(this);
        this.onMousedown = this.onMousedownOnView;
        this.delegate = () => {
        };
        this.handles = [];
        const addHandle = (index) => {
          const handle = new jff_canvas.View({x: 0, y: 0, width: HANDLE_SIZE, height: HANDLE_SIZE});
          handle.strokeColor = "blue";
          handle.backgroundColor = "white";
          this.addSubview(handle);
          handle.onMousedown = (e) => this.onMousedownOnHandle(e, index);
          this.handles.push(handle);
        };
        addHandle(0);
        addHandle(1);
        addHandle(2);
        addHandle(3);
      }
      setResizeArea(frame) {
        this.frame = this.getFrameFromResizeArea(frame);
      }
      placeHandles() {
        const moveHandle = (i, point) => {
          const h = this.handles[i];
          h.frame.x = point.x;
          h.frame.y = point.y;
        };
        moveHandle(0, {x: this.frame.width - HANDLE_SIZE, y: 0});
        moveHandle(1, {x: this.frame.width - HANDLE_SIZE, y: this.frame.height - HANDLE_SIZE});
        moveHandle(2, {x: 0, y: this.frame.height - HANDLE_SIZE});
        moveHandle(3, {x: 0, y: 0});
      }
      onMousedownOnView(e) {
        e.preventDefault();
        return this.onMoveView;
      }
      onMoveView(e) {
        this.frame.x += e.moveDelta.x;
        this.frame.y += e.moveDelta.y;
        this.delegate(this.getResizeAreaFrame());
        this.placeHandles();
        this.repaint();
      }
      onMousedownOnHandle(e, index) {
        e.preventDefault();
        return (e2) => this.onMoveHandle(e2, index);
      }
      onMoveHandle(e, index) {
        const handlePoint = this.getPointForHandle(index);
        const movingPoint = {x: handlePoint.x + e.moveDelta.x, y: handlePoint.y + e.moveDelta.y};
        const anchor = this.getPointForHandle((index + 2) % 4);
        this.frame.x = Math.min(anchor.x, movingPoint.x);
        this.frame.y = Math.min(anchor.y, movingPoint.y);
        this.frame.width = Math.abs(anchor.x - movingPoint.x);
        this.frame.height = Math.abs(anchor.y - movingPoint.y);
        this.delegate(this.getResizeAreaFrame());
        this.placeHandles();
        this.repaint();
      }
      paint(canvas) {
        const padding = HANDLE_SIZE / 2;
        canvas.drawRect(padding, padding, this.frame.width - padding * 2, this.frame.height - padding * 2, "blue");
      }
      getResizeAreaFrame() {
        return {
          x: this.frame.x + HANDLE_SIZE / 2,
          y: this.frame.y + HANDLE_SIZE / 2,
          width: this.frame.width - HANDLE_SIZE,
          height: this.frame.height - HANDLE_SIZE
        };
      }
      getFrameFromResizeArea(area) {
        return {
          x: area.x - HANDLE_SIZE / 2,
          y: area.y - HANDLE_SIZE / 2,
          width: area.width + HANDLE_SIZE,
          height: area.height + HANDLE_SIZE
        };
      }
      getPointForHandle(index) {
        switch (index) {
          case 0:
            return {x: this.frame.x + this.frame.width, y: this.frame.y};
          case 1:
            return {x: this.frame.x + this.frame.width, y: this.frame.y + this.frame.height};
          case 2:
            return {x: this.frame.x, y: this.frame.y + this.frame.height};
          case 3:
            return {x: this.frame.x, y: this.frame.y};
        }
      }
    }
  });
  require_ResizeView();
})();
