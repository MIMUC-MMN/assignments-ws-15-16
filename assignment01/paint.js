window.CanvasPaint = function() {
  "use strict";
  var CanvasPaint = function($container, colors) {
    this.$container = $container;
    this.$canvas = this.$container.querySelector("canvas");
    this.$toolbar = this.$container.querySelector(".toolbar");
    this.$colorpicker = this.$container.querySelector(".colorpicker");

    this.drawCtx = this.$canvas.getContext("2d");
    this.drawCtx.fillStyle = "white";
    this.drawCtx.fillRect(0, 0, 800, 600);
    this.drawCtx.lineCap = "round";
    this.drawCtx.lineJoin = "round";

    // Undo/Redo FIFOs
    this.undoStack = [this.$canvas.toDataURL("image/png")];
    this.redoStack = [];

    this.settings = {
      color: "black",
      size: 1
    };

    this.setupColors(colors || ["black", "white", "red", "green", "blue"]);
    this.bindCanvasEvents();
    this.bindToolbarEvents();
  };


  CanvasPaint.prototype = {
    bindCanvasEvents: function bindCanvasEvents() {
      this.$canvas.addEventListener("mousedown", function(e) {
        this.redoStack = [];
        this.$toolbar.querySelector(".btn-redo").disabled = true;
        this.drawCtx.beginPath();
        this.drawCtx.moveTo(e.offsetX, e.offsetY);
        this.$canvas.onmousemove = this.handleMouseMove.bind(this);
      }.bind(this));
      this.$canvas.addEventListener("mouseup", function(e) {
        this.$canvas.onmousemove = null;
        this.drawCtx.lineTo(e.offsetX, e.offsetY);
        this.drawCtx.stroke();
        this.drawCtx.closePath();
        this.undoStack.push(this.$canvas.toDataURL("image/png"));
        this.$toolbar.querySelector(".btn-undo").disabled = false;
      }.bind(this));
    },

    bindToolbarEvents: function bindToolbarEvents() {
      this.$toolbar.querySelector(".btn-pensize").value = this.settings.size;
      this.$toolbar.querySelector(".btn-pensize")
                .addEventListener("change", function(e) {
        this.settings.size = e.target.value;
        console.log(e.target.value);
        this.drawCtx.lineWidth = this.settings.size;
      }.bind(this));
      this.$toolbar.querySelector(".btn-undo")
                .addEventListener("click", this.undo.bind(this));
      this.$toolbar.querySelector(".btn-redo")
                .addEventListener("click", this.redo.bind(this));
      this.$toolbar.querySelector(".btn-save")
                .addEventListener("click", this.save.bind(this));
    },

    setupColors: function setupColors(colors) {
      var colorButtons = colors.map(function(color) {
        var btn = document.createElement("button");
        btn.className = "btn-color";
        if (color === this.settings.color) {
          btn.className += " active";
        }
        btn.style.backgroundColor = color;
        btn.addEventListener("click", function(e) {
          this.settings.color = color;
          this.drawCtx.strokeStyle = color;
          var prevActive = this.$colorpicker.querySelector(".active");
          prevActive.className = prevActive.className.split("active")[0];
          e.target.className += " active";
        }.bind(this));
        return btn;
      }.bind(this));
      colorButtons.reverse().forEach(function(btn) {
        this.$colorpicker.insertBefore(btn, this.$colorpicker.firstChild);
      }.bind(this));
      this.$colorpicker.querySelector("input").addEventListener("change", function(e) {
        var color = e.target.value;
        this.settings.color = color;
        this.drawCtx.strokeStyle = color;
        var prevActive = this.$colorpicker.querySelector(".active");
        prevActive.className = prevActive.className.split("active")[0];
        e.target.className += " active";
      }.bind(this));
    },

    handleMouseMove: function handleMouseMove(e) {
      this.drawCtx.lineTo(e.offsetX, e.offsetY);
      this.drawCtx.stroke();
    },

    undo: function undo() {
      if (this.undoStack.length > 0) {
        this.redoStack.push(this.undoStack.pop());
        this.$toolbar.querySelector(".btn-redo").disabled = false;
        var previousState = document.createElement("img");
        previousState.onload = function(e){
          this.drawCtx.drawImage(e.target, 0, 0);
        }.bind(this);
        previousState.src = this.undoStack.slice(-1)[0];
      }
      if (this.undoStack.length === 1) {
        this.$toolbar.querySelector(".btn-undo").disabled = true;
      }
    },

    redo: function redo() {
      if (this.redoStack.length > 0) {
        var nextState = document.createElement("img");
        nextState.onload = function(){
          this.drawCtx.drawImage(nextState, 0, 0);
        }.bind(this);
        var data = this.redoStack.pop();
        this.undoStack.push(data);
        this.$toolbar.querySelector(".btn-undo").disabled = false;
        nextState.src = data;
      }
      if (this.redoStack.length === 0) {
        this.$toolbar.querySelector(".btn-redo").disabled = true;
      }
    },

    save: function save() {
      window.open(this.undoStack.slice(-1)[0], "_blank");
    }
  };


  return CanvasPaint;
}();
