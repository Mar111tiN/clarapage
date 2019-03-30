    // function poseIt moves element to absolute position in container after mouse click
    // Options:    center --> if true, center element on mouse click
    //             contain --> if true, keep element fully within target area

    function poseIt(elem, container, center = true, contain = true) {
    // prepare container and element
        container.addEventListener('click',moveIt);
        container.style.position = 'relative';
        elem.style.position = 'absolute';
    //get mouse position array with container-relative coords
        function moveIt(elem, container, center = true, contain = true, event) {
            let containerCoords = container.getBoundingClientRect();        
            let elemPos = [event.clientX - containerCoords.left,
            event.clientY - containerCoords.top + pageYOffset,elem.offsetHeight / 2];
            let elemShift = (center) ? [elem.offsetWidth / 2, ] : [0,0];
            let elemLeft = elemPos[0] - elemShift[0] - container.clientLeft;
            let elemTop = elemPos[1] - elemShift[1] - container.clientTop;   
            if (contain) {        
                let borderStop = [0,container.clientWidth - elem.offsetWidth,0,container.clientHeight - elem.offsetHeight];
                elemLeft = Math.min(Math.max(borderStop[0],elemLeft),borderStop[1]);
                elemTop = Math.min(Math.max(borderStop[2],elemTop),borderStop[3]);
            } 
            elem.style.left = elemLeft + 'px';
            elem.style.top = elemTop + 'px';
        }
    }

// function textWrap takes 2 parameters (DOM elements) and wraps wrapper around textNode of elem
function textWrap(elem_with_text,wrapper) {
    elem_with_text.prepend(wrapper);
    wrapper.append(wrapper.nextSibling);
}

// function textWrap takes 2 parameters (DOM elements) and wraps wrapper around elem
function elemWrap(elem,wrapper) {
    elem.before(wrapper);
    wrapper.append(elem);    
}

// function tagWrap takes 2 parameters (DOM element + simple css-selector for wrap-element) and wraps wrapper around textNode of elem
function tagWrap(elem,tag) {
    let wrapper = document.createElement(tag);
    elemWrap(elem,wrapper);
}
// runOnKeys runs funct if all keys defined in codes where pressed simultaneously
function runOnKeys(func, ...codes) {
  let pressed = new Set();
  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);
    for (let code of codes) { // are all keys in the set?
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();
    func();
  });
  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });
}


// function runs animation using requestAnimationFrame
// timing function f(t) sets the progression timing (timing(t) {return progress})
//  draw f(progress) defines actions that should happen depending on progress draw(progress) {actions;}

function animate({timing, draw, duration}) {
    // gets starting time for timing function
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction)

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

// element.onclick = function() {animate({
//     timing: timefunc,
//     draw: drawfunc,
//     duration: 1000
// }) };

// EaseOut transform for timing function to reverse progression
// returns combination of original and reversed timing function

function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
// EaseInOut transform for timing function to reverse progression
// returns reversed timing function
function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}
// Function creates random RGB color
function randomRGBColor() {
  let color = 'rgb(';
  let array = [];
  for (let i = 0; i < 3; i++) {
    array.push(Math.floor(Math.random() * 256));
  }
  color += array.join(',') + ')';
  return color;
}

function randm(x, y) {
    return Math.floor(Math.random() * (y - x)) + x;
}

function randomHexColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}