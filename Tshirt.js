var canvas = new fabric.Canvas('c');

function insertShape() {
// create a rectangle with angle=45
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
});
canvas.add(rect);
}

function insertText() {
  var text = new fabric.IText('hello world', { left: 40, top: 100 });
  canvas.add(text);
}

function addHandler(id, fn, eventName) {
  document.getElementById(id)[eventName || 'onclick'] = function() {
    var el = this;
    if (obj = canvas.getActiveObject()) {
      fn.call(el, obj);
      canvas.renderAll();
    }
  };
}

function setStyle(object, styleName, value) {
  if (object.setSelectionStyles && object.isEditing) {
    var style = { };
    style[styleName] = value;
    object.setSelectionStyles(style);
  }
  else {
    object[styleName] = value;
  }
}

function getStyle(object, styleName) {
  return (object.getSelectionStyles && object.isEditing)
    ? object.getSelectionStyles()[styleName]
    : object[styleName];
}
/*
addHandler('underline', function(obj) {
  var isUnderline = (getStyle(obj, 'textDecoration') || '').indexOf('underline') > -1;
  setStyle(obj, 'textDecoration', isUnderline ? '' : 'underline');
});
*/

addHandler('underline', function() {
  var isUnderline = getStyle(obj, 'textDecoration') === 'underline';
  setStyle(obj, 'textDecoration', isUnderline ? '' : 'underline');
});

addHandler('italic', function() {
  var isItalic = getStyle(obj, 'fontStyle') === 'italic';
  setStyle(obj, 'fontStyle', isItalic ? '' : 'italic');
});

addHandler('centered', function() {
  var isCentered = getStyle(obj, 'textAlign') === 'center';
  setStyle(obj, 'textAlign', isCentered ? '' : 'center');
});

addHandler('left', function() {
  var isLeft = getStyle(obj, 'textAlign') === 'left';
  setStyle(obj, 'textAlign', isLeft ? '' : 'left');
});

addHandler('right', function() {
  var isRight = getStyle(obj, 'textAlign') === 'right';
  setStyle(obj, 'textAlign', isRight ? '' : 'right');
});

addHandler('size', function(obj) {
  setStyle(obj, 'fontSize', parseInt(this.value, 10));
}, 'onchange');

addHandler('height', function(obj) {
  setStyle(obj, 'lineHeight', parseInt(this.value, 10));
}, 'onchange');

addHandler('color', function(obj) {
  setStyle(obj, 'fill', this.value);
}, 'onchange');

addHandler('bg-color', function(obj) {
  setStyle(obj, 'textBackgroundColor', this.value);
}, 'onchange');




function deleteObjects(){
	var activeObject = canvas.getActiveObject(),
    activeGroup = canvas.getActiveGroup();
    if (activeObject) {
        if (confirm('Are you sure that you want to delete this selection?')) {
            canvas.remove(activeObject);
        }
    }
    else if (activeGroup) {
        if (confirm('Are you sure that you want to delete this selection?')) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
            canvas.remove(object);
            });
        }
    }
}

//upload image

document.getElementById('imgLoader').onchange = function handleImage(e) {
var reader = new FileReader();
  reader.onload = function (event){
    var imgObj = new Image();
    imgObj.src = event.target.result;
    imgObj.onload = function () {
      var image = new fabric.Image(imgObj);
      image.set({
            angle: 0,
            padding: 10,
            cornersize:10,
            height:110,
          width:110
      });
      canvas.centerObject(image);
      canvas.add(image);
      canvas.renderAll();
    }
  }
  reader.readAsDataURL(e.target.files[0]);
}

function onObjectSelected(e) {
  if ((e.target.get('type')) === "i-text") {
    document.getElementById("textMenu").className = "displayOperations";
  } else {
    // do nothing.
  }
}
canvas.on('object:selected', onObjectSelected);

canvas.on('before:selection:cleared', function() {
  document.getElementById("textMenu").className = "hideOperations";
});