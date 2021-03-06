document.addEventListener('DOMContentLoaded', () => {

    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {

        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

       
    });

    //timer

    const deadline = '2022-07-11';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor( (t / (1000 * 60 * 60 * 24)) );
            seconds = Math.floor( (t / 1000) % 60 );
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60 );
        }
              
              
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }

setClock('.timer', deadline);

//modal

    const btnOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
    }

    btnOpen.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
        }

    });

    document.addEventListener('keydown', (e) => {    //
        if(e.code === 'Escape' && modal.classList.contains('show') ) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() { //
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll); //

    // {once: true}

    //???????????????????? ????????????????

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();

        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0) { // ???????? ???????????? ????????????
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
            this.classes.forEach(className => element.classList.add(className)); 
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">????????:</div>
                        <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                    </div>`;

                this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        '???????? "??????????????"',
        "???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.",
        10,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    //forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: '??????????????! ?????????? ???? ?? ???????? ??????????S??????',
        failure: '??????-???? ?????????? ???? ??????...'
    };

    forms.forEach(item => {
        postDate(item);
    });

    function postDate(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText =`
                display:block;
                margin:0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            
            // request.setRequestHeader('Content-type', 'multipart/form-data');

            const formData = new FormData(form);

            const object = {};

            formData.forEach(function(value, key) {
                object[key] = value;
            });


            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)

            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         setTimeout(() => {
            //             statusMessage.remove();
            //         }, 2000);
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            openModal();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>??</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 4000);
        }
    }

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));




    // class Rect {                        // ???? ?????????????? ???????????? ???????????????? ??????????
    //     constructor(name, age) {
    //         this.name = name;
    //         this.age = age;
    //     }

    //     celAge() {
    //         return this.name * this.age;
    //     }
    // }

    // class Rectgg extends Rect{
    //     constructor(name, age, color, hh) {
    //         super(name, age); // super ???????????? ???????????? ???? ???????????? ??????????
    //         this.color = color;
    //         this.hh = hh;
    //     }

    //     showGG() {
    //         console.log(`???????????? ${this.hh} ???????? ${this.color}`);
    //     }
    // }

    // const ghj = new Rectgg(2, 12, 'red', '????????');

    // ghj.showGG();

    // console.log(ghj.celAge());

    // const fff = new Rect(12, 20);

    // console.log(fff.celAge());

    //filter

    const names = ['Ivan', 'Ann', 'voland', 'nikita'];

    const name = names.filter(name => name.length < 5);
    console.log(name);// Ivan, Ann

    //map

    const answer = ['IvAn', 'AnN', 'VolaNd'];

    const result = answer.map(item => item.toLowerCase());

    // every/some

    const aome = [4, 'ff', 'gg'];

    console.log(aome.some(item => typeof(item) === 'number'));//true
    console.log(aome.every(item => typeof(item) === 'number'));//false

    //reduce

    const arr = [2, 5, 6, 7, 6];
                        // 0(???? ??????????????????) ?????? 3   2
                        // 2   5
                        // 7   6
                        // 13  7
                        // 20  6

    const res = arr.reduce((sum, current) => sum + current, 3);

    const ff = ['apple', 'go'];

    const gg = ff.reduce((some, current) => `${some}, ${current}`);
    console.log(gg);//apple, go

    //Obiect.entries

    const obj = {
        Ivan: 'persone',
        Ann: 'persone',
        dog: 'animal'
    };


    const hh = Object.entries(obj) 
    //[ [ 'Ivan', 'persone' ], [ 'Ann', 'persone' ], [ 'dog', 'animal' ] ]
    .filter(item => item[1] === 'persone')//[ [ 'Ivan', 'persone' ], [ 'Ann', 'persone' ] ]
    .map(item => item[0]);// ['Ivan', 'Ann']
});




// const now = new Date();

// console.log(now.getFullYear());
// console.log(now.getDay());
// console.log(now.get);

// let start = new Date();

// for(let i = 0; i < 100000; i++) {
//     let some = i ** 3;
// }

// let end = new Date();

// alert(end - start);

// JSON

// const app = {
//     dd: 123,
//     jg:'ann',
//     parents: {
//         mom:'gg',
//         family:'ff'
//     }
// };

// const clone = JSON.parse(JSON.stringify(app));

// clone.parents.mom = 'hh';

// console.log(clone);

