window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  
  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  
  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  
  function showTabCOntent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }


  info.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab'))

     for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabCOntent(i);
          break;
        }
     }
   });

  //Timer
  let deadline = '2020-10-17';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
    seconds = Math.floor((t / 1000) % 60),
    minutes = Math.floor((t / 1000 / 60) % 60),
    hourse = Math.floor((t / (1000 * 60 * 60)));
  
    return {
      'total': t,
      'hourse': hourse,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function SetClock(id, endtime) {
    let timer = document.getElementById(id);
    let hourse = timer.querySelector('.hours');
    let  minutes = timer.querySelector('.minutes');
    let  seconds = timer.querySelector('.seconds');

    let timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      hourse.textContent = t.hourse;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if(t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  SetClock('timer', deadline);

  //Modal
  let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    });

    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // отмена действий по умолчанию
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        /*
          (1)Первый пример - отправка текстом
          (2) Второй пример отправка Json
        */
        //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //(1)
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');  // (2)

        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function(value, key) {
          obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function () {
          if (request.readyState < 4){
            statusMessage.innerHTML = message.loading;
          } else if (request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success;
          } else {
            statusMessage.innerHTML = message.failure;
          }
        });

      for (let i = 0; i < input.length; i++){
          input[i].value ='';
      }
    });
});


