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

  // node_modules/jff-table/lib/index.js
  var require_lib = __commonJS((exports) => {
    var L = Object.defineProperty;
    var j = (t) => L(t, "__esModule", {value: true});
    var G = (t, e) => {
      j(t);
      for (var i in e)
        L(t, i, {get: e[i], enumerable: true});
    };
    class h {
      constructor(t) {
        t == null && console.error("frame must be set on view"), this.repaint = this.repaint.bind(this), this.paint = this.paint.bind(this), this.getPointInView = this.getPointInView.bind(this), this.frame = t, this.subviews = [], this.clickable = true, this.hidden = false, this.backgroundColor = void 0, this.superview = void 0, this.strokeColor = void 0, this.animation = void 0;
      }
      getFrame() {
        return this.frame;
      }
      setSuperview(t) {
        this.superview = t;
      }
      viewDidAppearBase() {
        this.viewDidAppear(), this.subviews.forEach((t) => t.viewDidAppearBase());
      }
      viewDidAppear() {
      }
      viewDidDisappear() {
      }
      addSubview(t) {
        if (t.hasSuperview()) {
          console.error("Cant add subview already within another view ", t);
          return;
        }
        t.setSuperview(this), this.subviews.push(t), h.isAdded(this) && (this.viewDidAppearBase(), this.repaint());
      }
      insertViewAtBottom(t) {
        t.setSuperview(this), this.subviews.unshift(t), h.isAdded(this) && (this.viewDidAppearBase(), this.repaint());
      }
      removeFromSuperview() {
        this.superview.removeView(this), this.superview = void 0;
      }
      hasSuperview() {
        return this.superview !== void 0;
      }
      removeView(t) {
        for (let e = 0, i = this.subviews.length; e < i; e++)
          if (t === this.subviews[e]) {
            this.removeSubviewAtIndex(e), t.viewDidDisappear();
            return;
          }
      }
      removeSubviewAtIndex(t) {
        this.subviews.splice(t, 1);
      }
      animate(t, e, i, s = false) {
        this.animation = {func: e, duration: t, onComplete: i, start: void 0};
      }
      isEventInside(t) {
        return this.isPointInside(t.point.x, t.point.y);
      }
      isPointInside(t, e) {
        return this.frame.x <= t && t <= this.frame.x + this.frame.width && this.frame.y <= e && e <= this.frame.y + this.frame.height;
      }
      getPointInView(t, e) {
        const i = {x: t, y: e};
        let s = this;
        for (; s != null; )
          i.x -= s.frame.x, i.y -= s.frame.y, s = s.superview;
        return i;
      }
      onMousedown(t) {
        const e = {...t.point};
        for (let i = 0, s = this.subviews.length; i < s; i++) {
          const o = this.subviews[this.subviews.length - i - 1];
          o.clickable && !o.hidden && !t.defaultPrevented && o.isEventInside(t) && (t.point = {x: e.x - o.frame.x, y: e.y - o.frame.y}, o.onMousedown(t), t.point = {...e});
        }
      }
      repaint() {
        if (!this.hasSuperview()) {
          console.error("cant repaint without superview");
          return;
        }
        this.superview.repaint();
      }
      paint(t, e) {
      }
      paintBase(t, e) {
        if (this.hidden)
          return;
        this.animation !== void 0 && this.handleAnimation(e);
        const i = this.frame.x !== 0 || this.frame.y !== 0;
        i && (t.ctx.save(), t.ctx.translate(this.frame.x, this.frame.y)), this.backgroundColor != null && t.paintRect(0, 0, this.frame.width, this.frame.height, this.backgroundColor), this.strokeColor !== void 0 && t.drawRect(0, 0, this.frame.width, this.frame.height, this.strokeColor), this.paint(t, e);
        for (let s = 0, o = this.subviews.length; s < o; s++) {
          const n = this.subviews[s];
          n.paintBase(t, e);
        }
        i && t.ctx.restore();
      }
      handleAnimation(t) {
        this.animation.start || (this.animation.start = t);
        const e = Math.round(t - this.animation.start) / this.animation.duration, i = Math.min(Math.max(e, 0), 1);
        this.animation.func(i), e > 1 && (this.animation.loop ? this.animation.start = t : (this.animation.onComplete(), this.animation = void 0));
      }
      getDOMElement() {
        if (!this.hasSuperview()) {
          console.error("Cannot get DOM element before view has appeared");
          return;
        }
        return this.superview.getDOMElement();
      }
      static isAdded(t) {
        return t instanceof x ? true : t == null ? false : h.isAdded(t.superview);
      }
    }
    class x extends h {
      constructor(t, e) {
        super(t);
        this.canvas = e, this.actuallyRepaint = this.actuallyRepaint.bind(this), this.repaint = this.repaint.bind(this);
      }
      reset() {
      }
      repaint() {
        window.requestAnimationFrame(this.actuallyRepaint);
      }
      actuallyRepaint(t) {
        this.canvas.clear(), this.paintBase(this.canvas, t);
      }
      canvasSizeChanged(t, e) {
        this.frame.width = t, this.frame.height = e;
      }
      getDOMElement() {
        return this.canvas.domCanvas;
      }
    }
    class C {
      constructor(t, e = "auto") {
        this.onMousedown = this.onMousedown.bind(this), typeof t == "string" ? this.domCanvas = document.getElementById(t) : this.domCanvas = t, e == "auto" && (e = {width: this.domCanvas.offsetWidth, height: this.domCanvas.offsetHeight}), this.scaleFactor = 2, this.ctx = this.domCanvas.getContext("2d"), this.rootview = new x({x: 0, y: 0, ...e}, this), this.setFrame(e.width, e.height), this.domCanvas.addEventListener("mousedown", this.onMousedown);
      }
      onMousedown(t) {
        t.point = {x: t.layerX, y: t.layerY}, this.rootview.isEventInside(t) && this.rootview.onMousedown(t);
      }
      getFrame() {
        return {x: 0, y: 0, width: Math.ceil(this.domCanvas.width / this.scaleFactor), height: Math.ceil(this.domCanvas.height / this.scaleFactor)};
      }
      setFrame(t, e) {
        const i = this.ctx.font, s = this.ctx.fillStyle, o = this.ctx.strokeStyle;
        this.domCanvas.style.width = t, this.domCanvas.style.height = e, this.domCanvas.width = Math.ceil(t * this.scaleFactor), this.domCanvas.height = Math.ceil(e * this.scaleFactor), this.ctx.scale(this.scaleFactor, this.scaleFactor), this.ctx.font = i, this.ctx.fillStyle = s, this.ctx.strokeStyle = o, this.rootview.canvasSizeChanged(t, e);
      }
      paintRect(t, e, i, s, o) {
        this.ctx.fillStyle = o, this.ctx.fillRect(t, e, i, s);
      }
      drawRect(t, e, i, s, o, n = 2) {
        this.ctx.lineWidth = n, this.ctx.strokeStyle = o, this.ctx.strokeRect(t, e, i, s);
      }
      beginLine(t, e = 1, i = "butt") {
        this.ctx.lineWidth = e, this.ctx.strokeStyle = t, this.ctx.lineCap = i, this.ctx.beginPath();
      }
      drawHorizontalLine(t, e, i) {
        this.ctx.moveTo(t, i), this.ctx.lineTo(e, i);
      }
      drawLine(t, e, i, s, o) {
        const n = Math.cos(this.degToRad(o)), r = Math.sin(this.degToRad(o));
        this.ctx.moveTo(t + i * n, e + i * r), this.ctx.lineTo(t + s * n, e + s * r);
      }
      degToRad(t) {
        return t * Math.PI / 180;
      }
      drawVerticalLine(t, e, i) {
        this.ctx.moveTo(t, e), this.ctx.lineTo(t, i);
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
      normalTextWithSize(t) {
        this.setFont(`${t}px Helvetica`);
      }
      setFont(t = "14px Helvetica") {
        this.ctx.font = t;
      }
      textShadow(t, e) {
        this.ctx.shadowColor = e, this.ctx.shadowOffsetX = 0, this.ctx.shadowOffsetY = 0, this.ctx.shadowBlur = t;
      }
      drawText(t, e, i, s = "start", o) {
        this.ctx.fillStyle = o, this.ctx.textAlign = s, this.ctx.fillText(i, t, e);
      }
      drawCanvas(t, e, i) {
        const s = t.getFrame();
        this.ctx.drawImage(t.domCanvas, e, i, s.width, s.height, e, i, s.width, s.height);
      }
      clear() {
        this.ctx.clearRect(0, 0, this.domCanvas.width, this.domCanvas.height);
      }
    }
    const d = {x: 8, y: 20};
    const O = {};
    class b {
      constructor(t, e, i) {
        this.height = t, this.getBackgroundColor = e, this.getTextColor = i;
      }
      paintCell(t, e, i, s, o, n, r = u.DEFAULT) {
        if (t.paintRect(o.x, o.y, s, this.height, this.getBackgroundColor(e, i, r)), n.length == 0)
          return;
        const a = b.getTextWidth(t.ctx, n);
        a > s - d.x * 2 ? t.drawText(o.x + d.x, d.y + o.y, n, "start", this.getTextColor()) : t.drawText(-d.x + o.x + s, d.y + o.y, n, "end", this.getTextColor());
      }
      static getTextWidth(t, e) {
        let i = O[e.length];
        if (i == null) {
          const s = t.measureText(e);
          return O[e.length] = s.width, s.width;
        }
        return i;
      }
    }
    const u = {DEFAULT: "DEFAULT", SELECTED: "SELECTED", ACTIVE: "ACTIVE"};
    class S extends h {
      constructor(t, e, i, s, o, n) {
        super(t);
        this.moveTo = this.moveTo.bind(this), this.dataSupplier = e, this.contentWidth = i, this.xOffset = 0, this.yOffset = 0, this.cellHeight = s, this.selectedRows = {}, this.tmpSelectedRows = {}, this.active = {x: 0, y: 0}, this.onActiveChange = n, this.shownRows = {y1: 0, y2: 0}, this.shownCols = {x1: 0, x2: 0}, this.didMove = () => {
        }, this.cache = {}, this.inFocus = false, this.isMultiSelect = o, this.cellPainter = new b(this.cellHeight, e.getCellBackgroundColor, e.getCellTextColor), this.lineColor = e.getSeparatorColor();
      }
      resetCache() {
        this.cache.maxXOffset = void 0, this.cache.minXOffset = void 0, this.cache.columnLength = void 0;
      }
      setDidMove(t) {
        this.didMove = t;
      }
      getPageHeight() {
        return Math.ceil(this.frame.height / this.cellHeight);
      }
      getNumberOfRows() {
        return this.dataSupplier.getNumberOfRows();
      }
      getNumberOfColumns() {
        return this.dataSupplier.getNumberOfColumns();
      }
      getContentSize() {
        return {width: this.contentWidth, height: this.getNumberOfRows() * this.cellHeight};
      }
      getNumberOfVisibleColumns() {
        const t = 0;
        for (let e = 0; e < this.dataSupplier.getNumberOfColumns(); e++) {
          const i = this.dataSupplier.getColumnData();
          i.visible && t++;
        }
        return t;
      }
      getColumnWithIndex(t) {
        return this.dataSupplier.getColumnData(t);
      }
      getCell(t, e) {
        return this.dataSupplier.getText(t, e);
      }
      focused() {
        this.inFocus = true, this.superview !== void 0 && this.repaint();
      }
      blurred() {
        this.inFocus = false, this.superview !== void 0 && this.repaint();
      }
      setActive(t, e) {
        this.active = {x: t, y: e}, this.onActiveChange(t, e, this.outOfFrameDelta(t, e));
      }
      moveDown() {
        this.move(0, 1);
      }
      moveUp() {
        this.move(0, -1);
      }
      moveLeft() {
        this.move(-1, 0);
      }
      moveRight() {
        this.move(1, 0);
      }
      move(t, e) {
        this.moveTo(this.xOffset + t, this.yOffset + e);
      }
      moveToRow(t) {
        this.moveTo(this.xOffset, t);
      }
      moveToCol(t) {
        this.moveTo(t, this.yOffset);
      }
      moveTo(t, e) {
        this.xOffset = t, this.yOffset = e;
      }
      moveActiveDown() {
        this.moveActive(0, 1);
      }
      moveActiveUp() {
        this.moveActive(0, -1);
      }
      moveActiveLeft() {
        this.moveActive(-1, 0);
      }
      moveActiveRight() {
        this.moveActive(1, 0);
      }
      moveActive(t, e) {
        let i = this.active.x + t;
        t != 0 && (i = this.getNextVisibleColumnIndex(this.active.x, t > 0 ? 1 : -1)), this.moveActiveTo(i, this.active.y + e);
      }
      moveActiveTo(t, e) {
        const i = Math.max(0, this.getNumberOfRows() - 1), s = Math.max(0, this.getNumberOfColumns() - 1);
        this.setActive(Math.min(Math.max(0, t), s), Math.min(Math.max(0, e), i)), this.repaint();
      }
      getNextVisibleColumnIndex(t, e = 1) {
        let i = 0, s;
        do
          i += e, s = this.getColumnWithIndex(t + i);
        while (s !== void 0 && !s.visible);
        return s === void 0 || !s.visible ? t : t + i;
      }
      updateSelectedFromTmp(t, e, i = false) {
        i || (this.selectedRows = {});
        const s = Math.min(t, e), o = Math.max(t, e);
        for (let n = s; n <= o; n++)
          this.isSelected(n) ? this.selectedRows[n] = 1 : this.selectedRows[n] = void 0;
        this.tmpSelectedRows = {}, this.repaint();
      }
      tmpSelectRow(t, e, i = false) {
        this.setActive(t, e), this.tmpSelectRowRange(e, e, i);
      }
      tmpSelectRowRange(t, e, i = false) {
        i || (this.selectedRows = {}), this.tmpSelectedRows = {};
        const s = Math.min(t, e), o = Math.max(t, e);
        for (let n = s; n <= o; n++)
          this.tmpSelectedRows[n] = 1;
        this.repaint();
      }
      selectRow(t, e, i = false) {
        i || (this.selectedRows = {}), this.selectedRows[e] = 1, this.repaint();
      }
      deselect(t, e, i = false) {
        this.setActive(t, e), i ? this.selectedRows[e] = void 0 : this.selectedRows = {}, this.repaint();
      }
      isSelected(t) {
        return (this.selectedRows[t] || 0) + (this.tmpSelectedRows[t] || 0) == 1;
      }
      outOfFrameDelta(t, e) {
        if (e < this.yOffset && this.yOffset > 0)
          return {x: 0, y: e - this.yOffset};
        const i = this.getPageHeight() + this.yOffset;
        return e > i - 3 ? {x: 0, y: e - i + 3} : t < this.shownCols.x1 + 1 ? {x: t - this.shownCols.x1, y: 0} : t > this.shownCols.x2 - 1 ? {x: t - this.shownCols.x2 + 1, y: 0} : void 0;
      }
      isActive(t, e) {
        return this.active.x == t && this.active.y == e;
      }
      paint(t, e) {
        let i = {x: 0, y: 0};
        const s = Math.min(this.yOffset + this.getPageHeight() + 1, this.getNumberOfRows());
        let o;
        t.normalText(), t.beginLine(this.lineColor);
        let n = true;
        for (let r = this.yOffset; r < s; r++) {
          for (let a = this.xOffset, c = this.getNumberOfColumns(); a < c; a++) {
            const _ = this.dataSupplier.getText(a, r), v = this.dataSupplier.getColumnData(a);
            if (!v.visible)
              continue;
            if (this.cellPainter.paintCell(t, r, a, v.width, i, _, this.getCellStatus(r, a)), n && this.paintColumnSeparator(t, i.x, 0, this.frame.height), i.x += v.width, i.x > this.frame.width) {
              o = a;
              break;
            }
          }
          n && this.paintColumnSeparator(t, i.x, 0, this.frame.height), this.paintRowSeparator(t, i.y), r == s - 1 && i.x < this.frame.width && t.paintRect(i.x, 0, this.frame.width - i.x, this.frame.height, "white"), i = {x: 0, y: i.y + this.cellHeight}, n = false;
        }
        this.paintRowSeparator(t, i.y), this.shownRows = {y1: this.yOffset, y2: s}, this.shownCols = {x1: this.xOffset, x2: o}, t.endLine();
      }
      getCellStatus(t, e) {
        return this.isActive(e, t) ? u.ACTIVE : this.isSelected(t) ? u.SELECTED : u.DEFAULT;
      }
      paintRowSeparator(t, e) {
        t.drawHorizontalLine(0, t.getFrame().width, e + 0.5);
      }
      paintColumnSeparator(t, e, i, s) {
        t.drawVerticalLine(e + 0.5, i, s);
      }
    }
    class D extends h {
      constructor(t, e, i) {
        super(t);
        this.canvasMouseMove = this.canvasMouseMove.bind(this), this.canvasMouseUp = this.canvasMouseUp.bind(this), this.setHandleRatio = this.setHandleRatio.bind(this), this.handleLength = 50, this.location = 0, this.getScrollColor = i, this.cursor = {down: false, handleDist: 0}, this.handler = e, this.handle = new h(this.getHandleFrame(this.handleLength)), this.handle.backgroundColor = this.getHandleBackgroundColor(), this.addSubview(this.handle), this.hidden = false, this.clickable = true;
      }
      getLocationFromEvent(t) {
        console.error("abstract function");
      }
      getLength() {
        console.error("abstract function");
      }
      getHandleFrame() {
        console.error("abstract function");
      }
      setLocation(t) {
        this.location = t;
      }
      setHandleLength(t) {
        this.handleLength = t, this.handle.frame = this.getHandleFrame(t), this.hidden = this.handleLength >= this.getLength();
      }
      setHandleRatio(t) {
        const e = this.getLength() * Math.max(Math.min(t, 1), 0.1);
        this.setHandleLength(e);
      }
      getHandleBackgroundColor() {
        return this.getScrollColor(this.cursor.down);
      }
      onMousedown(t) {
        t.button == 0 && (this.cursor.down = true, this.cursor.handleDist = this.location - this.getLocationFromEvent(t), this.handle.backgroundColor = this.getHandleBackgroundColor(), this.repaint(), t.preventDefault(), window.addEventListener("mousemove", this.canvasMouseMove), window.addEventListener("mouseup", this.canvasMouseUp));
      }
      canvasMouseMove(t) {
        if (!this.cursor.down || t.button != 0)
          return;
        const e = this.getLocationFromEvent(t), i = e - (this.location - this.cursor.handleDist), s = this.limitLocation(this.location + i);
        this.setLocation(s), this.handler(this.getProgress(this.location)), this.repaint(), t.preventDefault();
      }
      canvasMouseUp(t) {
        t.button == 0 && (this.cursor.down = false, this.handle.backgroundColor = this.getHandleBackgroundColor(), this.repaint(), t.preventDefault(), window.removeEventListener("mousemove", this.canvasMouseMove), window.removeEventListener("mouseup", this.canvasMouseUp));
      }
      limitLocation(t) {
        const e = Math.max(0, t), i = Math.min(e, this.getLength() - this.handleLength);
        return i;
      }
      getProgress(t = this.location) {
        return this.getLength() === this.handleLength ? 0 : t / (this.getLength() - this.handleLength);
      }
      setProgress(t) {
        this.setLocation(t * (this.getLength() - this.handleLength));
      }
      addDelta(t) {
        const e = t + this.getProgress(), i = Math.min(1, Math.max(0, e)), s = (this.getLength() - this.handleLength) * i;
        return this.setLocation(s), i;
      }
    }
    const l = 2;
    class T extends D {
      getLocationFromEvent(t) {
        return t.x;
      }
      getLength() {
        return this.frame.width - l * 2;
      }
      getHandleFrame(t) {
        return {x: this.location + l, y: l, width: t, height: this.frame.height - l * 2};
      }
      setLocation(t) {
        super.setLocation(t), this.handle.frame.x = t + l;
      }
    }
    class H extends D {
      getLocationFromEvent(t) {
        return t.y;
      }
      getLength() {
        return this.frame.height - l * 2;
      }
      getHandleFrame(t) {
        return {x: l, y: this.location + l, width: this.frame.width - l * 2, height: t};
      }
      setLocation(t) {
        super.setLocation(t), this.handle.frame.y = t + l;
      }
    }
    class y extends h {
      constructor(t, e, i, s, o) {
        super(t);
        this.scrolledHorizontal = this.scrolledHorizontal.bind(this), this.scrolledVertical = this.scrolledVertical.bind(this), this.onWheel = this.onWheel.bind(this), this.SCROLL_WIDTH = i, this.contentSize = e, this.delegate = s;
        const n = new H(this.getVerticalScrollFrame(t.width, t.height), this.scrolledVertical, o), r = new T(this.getHorizontalScrollFrame(t.width, t.height), this.scrolledHorizontal, o);
        this.vertical = n, this.horizontal = r, this.addSubview(r), this.addSubview(n), this.resized(this.contentSize);
      }
      viewDidAppear() {
        const t = this.getDOMElement();
        t.addEventListener("wheel", this.onWheel);
      }
      resized(t) {
        const e = this.frame.height / this.contentSize.height, i = this.frame.width / this.contentSize.width;
        this.horizontal.hidden = i > 1, this.vertical.hidden = e > 1, this.horizontal.hidden && this.horizontal.location > 0 && (this.horizontal.setLocation(0), this.horizontal.handler(this.horizontal.getProgress(this.horizontal.location))), this.vertical.hidden && this.vertical.location > 0 && (this.vertical.setLocation(0), this.vertical.handler(this.vertical.getProgress(this.vertical.location))), this.horizontal.setHandleRatio(i), this.vertical.setHandleRatio(e);
        const s = this.frame.height - (this.horizontal.hidden ? 0 : this.horizontal.getFrame().height), o = this.frame.width - (this.vertical.hidden ? 0 : this.vertical.getFrame().width);
        this.vertical.frame = this.getVerticalScrollFrame(this.frame.width, s), this.horizontal.frame = this.getHorizontalScrollFrame(o, this.frame.height), this.contentSize = t;
      }
      onWheel(t) {
        const e = 0.1;
        if (t.deltaY != 0) {
          const s = t.deltaY * e / this.frame.height;
          var i = this.vertical.addDelta(s);
          this.scrolledVertical(i);
        }
        if (t.deltaX != 0) {
          const s = t.deltaX * e / this.frame.width;
          var i = this.horizontal.addDelta(s);
          this.scrolledHorizontal(i);
        }
        this.repaint(), t.preventDefault();
      }
      setScroll(t, e) {
        t != null && this.horizontal.setProgress(t), e != null && this.vertical.setProgress(e);
      }
      scrolledHorizontal(t) {
        this.delegate(t, void 0);
      }
      scrolledVertical(t) {
        this.delegate(void 0, t);
      }
      getVerticalScrollFrame(t, e) {
        return {x: t - this.SCROLL_WIDTH, y: 0, width: this.SCROLL_WIDTH, height: e};
      }
      getHorizontalScrollFrame(t, e) {
        return {x: 0, y: e - this.SCROLL_WIDTH, width: t, height: this.SCROLL_WIDTH};
      }
    }
    const F = 32;
    const A = 33;
    const E = 34;
    const W = 13;
    const V = 37;
    const I = 38;
    const P = 39;
    const z = 40;
    const B = 67;
    class R {
      constructor(t, e) {
        this.canvasOnClick = this.canvasOnClick.bind(this), this.canvasMouseMove = this.canvasMouseMove.bind(this), this.canvasMouseUp = this.canvasMouseUp.bind(this), this.canvasKeyDown = this.canvasKeyDown.bind(this), this.getCellForEvent = this.getCellForEvent.bind(this), this.onFocus = this.onFocus.bind(this), this.onBlur = this.onBlur.bind(this), t.onMousedown = this.canvasOnClick;
        const i = t.viewDidAppear;
        t.viewDidAppear = () => {
          this.viewDidAppear(), i();
        }, this.table = t, this.menuDelegate = e, this.cursor = {down: false, start: {x: 0, y: 0}, movedOutside: false};
      }
      viewDidAppear() {
        this.focusOnCanvas = () => canvas.focus(), canvas.oncontextmenu = (t) => false, canvas.addEventListener("keydown", this.canvasKeyDown), canvas.addEventListener("focus", this.onFocus), canvas.addEventListener("blur", this.onBlur), this.reset = () => {
          canvs.removeEventListener("keydown", this.canvasKeyDown), canvas.removeEventListener("focus", this.onFocus), canvas.removeEventListener("blur", this.onBlur);
        };
      }
      showContextMenu(t, e) {
        this.menuDelegate.show(t, e);
      }
      hideContextMenu() {
        this.menuDelegate.hide();
      }
      onFocus() {
        this.table.focused();
      }
      onBlur() {
        this.table.blurred();
      }
      toggleSelect(t, e) {
        this.table.isSelected(t.y) ? this.table.deselect(t.x, t.y, e) : this.table.selectRow(t.x, t.y, e);
      }
      canvasOnClick(t) {
        this.table.inFocus || this.focusOnCanvas(), t.button == 0 ? this.leftClickDown(t) : t.button == 2 && this.rightClickDown(t), window.addEventListener("mousemove", this.canvasMouseMove), window.addEventListener("mouseup", this.canvasMouseUp);
      }
      canvasMouseMove(t) {
        t.point = this.table.getPointInView(t.layerX, t.layerY);
        const e = this.getCellForEvent(t);
        t.button == 0 && this.leftClickMove(t, e);
      }
      canvasMouseUp(t) {
        const e = this.getCellForEvent(t);
        t.button == 0 && this.cursor.down ? (this.leftClickUp(t, e), this.cursor.down = false) : t.button == 2 && this.rightClickUp(t, e), window.removeEventListener("mousemove", this.canvasMouseMove), window.removeEventListener("mouseup", this.canvasMouseUp);
      }
      leftClickDown(t) {
        const e = this.getCellForEvent(t);
        this.cursor.down = true, this.cursor.movedOutside = false, this.cursor.start = e, this.table.tmpSelectRow(this.cursor.start.x, this.cursor.start.y, this.table.isMultiSelect && t.ctrlKey), this.hideContextMenu(), t.preventDefault();
      }
      leftClickMove(t, e) {
        (e.x !== this.cursor.start.x || e.y !== this.cursor.start.y) && (this.cursor.movedOutside = true), this.table.isMultiSelect ? this.table.tmpSelectRowRange(this.cursor.start.y, e.y, t.ctrlKey) : this.table.tmpSelectRow(e.x, e.y, false);
      }
      leftClickUp(t, e) {
        if (!this.cursor.movedOutside) {
          const i = this.table.getColumnWithIndex(e.x);
          i && i.onClick && i.onClick(this.table.getRowWithIndex(e.y));
        }
        this.table.updateSelectedFromTmp(this.cursor.start.y, e.y, t.ctrlKey);
      }
      rightClickDown(t) {
        const e = this.getCellForEvent(t);
        this.table.isSelected(e.y) || (console.log("rc select row"), this.table.tmpSelectedRows[this.table.cells[e.y]] = void 0, this.table.selectRow(e.x, e.y, this.table.isMultiSelect && t.ctrlKey)), console.log("rc select cell ", e), this.table.active = e, this.hideContextMenu(), this.showContextMenu(t.point.x, t.point.y), t.preventDefault();
      }
      rightClickMove(t) {
      }
      rightClickUp(t, e) {
      }
      canvasKeyDown(t) {
        let e = false;
        switch (t.keyCode) {
          case F:
            this.toggleSelect(this.table.active, t.ctrlKey && this.table.isMultiSelect), e = true;
            break;
          case A:
            this.table.moveActive(0, -this.table.getPageHeight()), e = true;
            break;
          case E:
            this.table.moveActive(0, this.table.getPageHeight()), e = true;
            break;
          case W: {
            const i = this.table.active;
            if (i.x >= 0 && i.y >= 0) {
              const s = this.table.getColumnWithIndex(i.x), o = this.table.getRowWithIndex(i.y);
              s.onClick !== void 0 && s.mapper(o) !== void 0 && s.onClick(this.table.getRowWithIndex(i.y));
            }
            e = true;
            break;
          }
          case V:
            this.table.moveActiveLeft(), e = true;
            break;
          case I:
            this.table.moveActiveUp(), e = true;
            break;
          case P:
            this.table.moveActiveRight(), e = true;
            break;
          case z:
            this.table.moveActiveDown(), e = true;
            break;
          default:
        }
        t.ctrlKey && (t.keyCode === B ? (this.copy(t.shiftKey), e = true) : t.key === "a" && (this.table.isMultiSelect && (console.log("select all"), this.table.tmpSelectRowRange(0, this.table.getNumberOfRows() - 1, false), this.table.updateSelectedFromTmp(0, this.table.getNumberOfRows() - 1, false)), e = true)), e && t.preventDefault();
      }
      copy(t, e = false) {
        const i = this.table.getSelectedRows(), s = this.table.active, o = this.table.getColumnWithIndex(s.x), n = this.table.getRowWithIndex(s.y);
        let r;
        if (i.length > 0 && t) {
          const a = this.table.columns.filter((c) => c.visible);
          r = a.map((c) => c.mapper(i)).join(`\r
`);
        } else
          r = o.mapper(n) || " ";
        console.log("copy ", `${r}`.substr(0, 50)), this.inputElement.value = r, this.inputElement.select(), document.execCommand("Copy"), this.focusOnCanvas();
      }
      getCellForEvent(t) {
        const e = t.point ? t.point.x : t.layerX, i = t.point ? t.point.y : t.layerY, s = this.table.dataSupplier.getNumberOfRows(), o = this.getColumnIndexForPosition(e), n = Math.floor(i / this.table.cellHeight);
        return {x: o + this.table.xOffset, y: Math.min(s - 1, n + this.table.yOffset)};
      }
      getColumnIndexForPosition(t) {
        let e = 0;
        for (let i = this.table.xOffset, s = this.table.getNumberOfColumns(); i < s; i++) {
          const o = this.table.getColumnWithIndex(i);
          if (!o.visible)
            continue;
          const n = e + o.width;
          if (e <= t && t <= n)
            return i - this.table.xOffset;
          e = n;
        }
        return -1;
      }
    }
    const N = [...Array(26)].map((t, e) => String.fromCharCode(e + 65));
    class M extends h {
      constructor(t, e, i) {
        super(t);
        this.onMousemove = this.onMousemove.bind(this), this.onMouseup = this.onMouseup.bind(this), this.dataSupplier = e, this.onColumnSizeChange = i, this.xOffset = 0, this.cursor = {down: false, start: void 0, column: void 0};
      }
      moveTo(t) {
        this.xOffset = t;
      }
      onMousedown(t) {
        const e = this.getColumnAtPoint(t.point.x);
        this.cursor.column = e, this.cursor.down = true, this.cursor.start = {...t.point}, document.addEventListener("mousemove", this.onMousemove), document.addEventListener("mouseup", this.onMouseup), this.repaint();
      }
      onMousemove(t) {
        const e = this.getPointInView(t.layerX, t.layerY), i = e.x - this.cursor.start.x;
        this.cursor.start = e, this.onColumnSizeChange(this.cursor.column, i), t.target.style.cursor = "col-resize", this.repaint();
      }
      onMouseup(t) {
        this.cursor.down = false, this.cursor.column = void 0, t.target.style.cursor = "default", document.removeEventListener("mousemove", this.onMousemove), document.removeEventListener("mouseup", this.onMouseup), this.repaint();
      }
      paint(t, e) {
        let i = 0;
        for (let s = this.xOffset, o = this.dataSupplier.getNumberOfColumns(); s < o; s++) {
          const n = this.dataSupplier.getColumnWidth(s);
          if (t.drawText(i + n / 2, 15, this.getText(s), "center", "black"), i += n, i > this.frame.width)
            break;
        }
      }
      getColumnAtPoint(t) {
        let e = 0;
        for (let i = this.xOffset, s = this.dataSupplier.getNumberOfColumns(); i < s; i++) {
          const o = this.dataSupplier.getColumnWidth(i);
          if (e < t && t < e + o)
            return i;
          e += o;
        }
        return;
      }
      getText(t) {
        const e = N.length, i = Math.floor(t / e), s = t % e, o = N[s];
        return i <= 0 ? o : this.getText(i - 1) + o;
      }
    }
    class k extends h {
      constructor(t, e, i) {
        super(t);
        this.numberOfRows = e, this.cellHeight = i, this.row = 0;
      }
      moveTo(t) {
        this.row = t;
      }
      paint(t, e) {
        let i = 0;
        for (let s = this.row; s < this.numberOfRows; s++)
          t.drawText(this.frame.width / 2, i + this.cellHeight / 2 + 4, s, "center", "black"), i += this.cellHeight;
      }
    }
    const U = 30;
    const m = 12;
    const w = 20;
    const g = 30;
    class f extends h {
      constructor(t, e) {
        super(t);
        this.scrollviewDidScroll = this.scrollviewDidScroll.bind(this), this.onColumnSizeChange = this.onColumnSizeChange.bind(this), this.onActiveChange = this.onActiveChange.bind(this), this.dataSupplier = e, this.contentWidth = f.getColumnWidth(e);
        const i = {x: g, y: w, width: t.width - g, height: t.height - w};
        this.columnHeader = new M({x: g, y: 0, width: i.width, height: w}, e, this.onColumnSizeChange), this.rowHeader = new k({x: 0, y: w, width: g, height: i.height}, e.getNumberOfRows(), U), this.columnHeader.backgroundColor = e.getHeaderBackgroundColor(), this.rowHeader.backgroundColor = e.getHeaderBackgroundColor(), this.grid = new S(i, e, this.contentWidth, U, true, this.onActiveChange), new R(this.grid, {show: () => {
        }, hide: () => {
        }}), this.scrollview = new y(i, this.grid.getContentSize(), m, this.scrollviewDidScroll, e.getScrollColor), this.scrollview.vertical.backgroundColor = e.getScrollBackgroundColor(), this.scrollview.horizontal.backgroundColor = e.getScrollBackgroundColor();
        const s = new h({x: t.width - m, y: t.height - m, width: m, height: m});
        s.clickable = false, s.backgroundColor = e.getHeaderBackgroundColor(), this.addSubview(this.grid), this.addSubview(this.columnHeader), this.addSubview(this.rowHeader), this.addSubview(this.scrollview), this.addSubview(s), this.columnSpan = this.getColumnSpans(), this.rowSpan = this.getRowSpans(), this.delegate = {selected: () => {
        }};
      }
      scrollviewDidScroll(t, e) {
        if (t != null) {
          const [i, s] = this.columnSpan, o = Math.floor((s - i) * t);
          this.grid.moveToCol(o), this.columnHeader.moveTo(o);
        }
        if (e != null) {
          const [i, s] = this.rowSpan, o = Math.floor((s - i) * e);
          this.grid.moveToRow(o), this.rowHeader.moveTo(o);
        }
      }
      onColumnSizeChange(t, e) {
        let i = this.dataSupplier.getColumnWidth(t);
        i = Math.max(20, i + e), this.dataSupplier.setColumnWidth(t, i), this.contentWidth = f.getColumnWidth(this.dataSupplier), this.scrollview.resized(this.grid.getContentSize()), this.columnSpan = this.getColumnSpans();
      }
      onActiveChange(t, e, i) {
        this.delegate.selected(t, e), i !== void 0 && (this.grid.move(i.x, i.y), this.columnHeader.moveTo(this.grid.xOffset || 0), this.rowHeader.moveTo(this.grid.YOffset || 0), this.scrollview.setScroll(this.grid.xOffset / this.columnSpan[1], this.grid.yOffset / this.rowSpan[1]));
      }
      getColumnSpans() {
        const t = 50;
        let e = 0, i = 0, s = 0;
        for (let o = 0, n = this.dataSupplier.getNumberOfColumns(); o < n; o++) {
          const r = this.dataSupplier.getColumnData(o);
          if (r.visible) {
            if ((i = 0) && (i = o), e + this.frame.width > this.contentWidth + t && s == 0) {
              s = o;
              break;
            }
            e += r.width;
          }
        }
        return [i, s];
      }
      getRowSpans() {
        return [0, this.dataSupplier.getNumberOfRows() - this.grid.getPageHeight() + 2];
      }
      static getColumnWidth(t) {
        let e = 0;
        for (let i = 0, s = t.getNumberOfColumns(); i < s; i++)
          e += t.getColumnWidth(i);
        return e;
      }
    }
    class p {
      getNumberOfColumns() {
        console.error("must implement in subclass");
      }
      getNumberOfRows() {
        console.error("must implement in subclass");
      }
      getColumnWidth(t) {
        console.error("must implement in subclass");
      }
      setColumnWidth(t, e) {
        console.error("must implement in subclass");
      }
      getColumnData(t) {
        console.error("must implement in subclass");
      }
      getText(t, e) {
        console.error("must implement in subclass");
      }
      getCellBackgroundColor(t, e, i) {
        switch (i) {
          case "DEFAULT":
            return t % 2 == 0 ? "#F4F4F4" : "#FFFFFF";
          case "SELECTED":
            return "#FFFFCC";
          case "ACTIVE":
            return "#FFAAAA";
        }
      }
      getSeparatorColor = () => "#BBB";
      getCellTextColor = () => "#000";
      getScrollBackgroundColor = () => "#DDD";
      getScrollColor = (t) => t ? "#999" : "#BBB";
      getHeaderBackgroundColor = () => "#FFF";
      static spreadsheet(t, e) {
        return new K(t, e);
      }
    }
    class K extends p {
      constructor(t, e) {
        super();
        this.columns = t, this.cells = e;
      }
      getNumberOfColumns() {
        return this.columns.length;
      }
      getNumberOfRows() {
        return this.cells.length;
      }
      getColumnWidth(t) {
        return this.columns[t].width;
      }
      setColumnWidth(t, e) {
        this.columns[t].width = e;
      }
      getColumnData(t) {
        return this.columns[t];
      }
      getText(t, e) {
        const i = this.cells[t][e];
        return i == null ? "" : i.formattedValue || i.value;
      }
    }
    G(exports, {Canvas: () => C, DataModel: () => p, TableView: () => f});
  });

  // src/jff-table.js
  const jff_table = __toModule(require_lib());
  const columns = new Array(2e3).fill(null).map((e, i) => ({title: `Column ${i}`, mapper: (a) => `${a.a}${i}`, visible: true, width: 70}));
  let index = 0;
  const cells = new Array(2e3).fill(null).map((c) => new Array(2e3).fill(null).map((e, i) => {
    const value = index++;
    return {value, formattedValue: value};
  }));
  const canvas2 = new jff_table.Canvas("canvas", "auto");
  const tableView = new jff_table.TableView(canvas2.rootview.frame, jff_table.DataModel.spreadsheet(columns, cells));
  canvas2.rootview.addSubview(tableView);
})();
