    (function() {
      document.addEventListener("DOMContentLoaded",function() {init();});
      function init (){


        const divCount = 9;
        const colorStyle = 'rgb';  //'hex' / 'rgb'
        let firstTime = true;
        let hint;
        let hintString = 'Starte das Farbenspiel!'

        let button = document.querySelector('#colorstart');
        let content = document.querySelector('#content')
        document.addEventListener('mouseover', showHint);
        document.addEventListener('click', startColorGame);

        function showHint(event,string) {
          if (event.target != button) return;
          hint = document.querySelector('.hint');
          if (!hint) {
            let coords = button.getBoundingClientRect();
            hint = document.createElement('p');
            hint.style.position = 'fixed';
            hint.style.opacity = 0;
            hint.style.left = coords.left + 25 + 'px';
            hint.style.top = coords.bottom + 5 + 'px';
            hint.classList.add('hint');
            content.append(hint);
          }
          hint.innerHTML = '';
          hint.innerHTML = hintString;
          let showDelay = setTimeout(() => hint.style.opacity = 1, 1000);
          setTimeout(() => hint.style.opacity = 0, 2500);
          button.onmouseout = function() {
            clearInterval(showDelay);
            hint.style.opacity = 0;
          }
        }

        function startColorGame(event) {
          if (event.target != button) return;
          document.addEventListener('click', checkColor);
          hintString = 'Neue Farben';
          let colors = [];
          if (firstTime) {
            makeDivs()
          } else {
            let divs = document.querySelectorAll('.colorDiv');
            for (let div of divs) {
              div.innerHTML = '';
              div.classList.remove('wrong');
              div.classList.remove('right');
            }
          }
          makeColor(colorStyle);
          let right = Math.floor(Math.random() * divCount);          
          button.innerHTML = `Farbe: ${colors[right]}`;
          let hint = document.querySelector('.hint');
          if (hint) hint.remove();
          
          function makeDivs() {
            let container = document.createElement('div');
            container.setAttribute('id','container');
            for (let i = 0; i < divCount; i++) {
              let div = document.createElement('div');
              div.setAttribute('id','id' + (i+1));
              div.classList.add('colorDiv');
              div.style.backgroundColor = `${colors[i]}`;
              container.append(div);
              firstTime = false;
              content.append(container);
              container.style.height = container.clientWidth + 'px';

            }
          }
          function makeColor(colortype) {
            let randomColor = colortype == 'rgb' ? randomRGBColor : randomHexColor;
            let divs = $('.colorDiv');
            for (let i = 0; i < divs.length; i++) {
              colors[i] = randomColor();
              divs[i].style.backgroundColor = `${colors[i]}`;
            }
          }

          function checkColor(event) {
            let targetDiv = document.querySelector(`#id${right}`);
            if (event.target.className != 'colorDiv') return;
            if (event.target.classList.contains('wrong')) return;
            if (event.target != targetDiv) {
              event.target.classList.add('wrong');
              return;
            }
            event.target.classList.add('right');
            document.removeEventListener('click', checkColor);
            button.innerHTML = 'SUPER!';
            targetDiv.innerHTML = colors[right];
            setTimeout(resetGame,2500);
            setTimeout(() => button.innerHTML = 'Neues Spiel',2500);

          }

          function resetGame() {
            let divs = document.querySelectorAll('.colorDiv') 
            for (let div of divs) {
              div.classList.remove('wrong');
              div.classList.remove('right');
              div.innerHTML = div.style.backgroundColor;
            }
            document.addEventListener('click', startColorGame);
          }
        } 
      }
    }());



