const films = [
    {
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];




function showGoodFilms(arr) {
    return arr.filter(item => item.rating >= 8);
}

function showListOfFilms(arr) {
    return arr.reduce((some, current) => `${typeof(some) === 'object' ? some.name : some}, ${current.name}`);
}

function setFilmsIds(arr) {
    return arr.map((item, i) => {
        item.id = i;
        return item;
    });
}

const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
    return arr.every(item => typeof(item.id) === 'number');
}

//2

const funds = [
    {amount: -1400},
    {amount: 2400},
    {amount: -1000},
    {amount: 500},
    {amount: 10400},
    {amount: -11400}
];


const getPositiveIncomeAmount = (data) => {
    return data.filter(item => item.amount >= 0)
    .reduce((acc, current) => acc + current.amount, 0);
};

console.log(getPositiveIncomeAmount(funds));

const getTotalIncomeAmount = (data) => {
    return data.some(item => item.amount < 0) ? data.reduce((acc, curr) => acc + curr.amount, 0) : getPositiveIncomeAmount(data);
};

console.log(getTotalIncomeAmount(funds));

//localstorage


    // localStorage.setItem('number', 5);//(key; value) макс 5 мб

    // localStorage.getItem('number');//получить 

    // localStorage.removeItem('number');//удалить

    // localStorage.clear();//очищает



// classes


// class Rect {                        // со главной буквой называем класс
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
    //         super(name, age); // super должен стоять на первом месте
    //         this.color = color;
    //         this.hh = hh;
    //     }

    //     showGG() {
    //         console.log(`привет ${this.hh} цвет ${this.color}`);
    //     }
    // }

    // const ghj = new Rectgg(2, 12, 'red', 'саша');

    // ghj.showGG();

    // console.log(ghj.celAge());

    // const fff = new Rect(12, 20);

    // console.log(fff.celAge());





    //filter

    // const names = ['Ivan', 'Ann', 'voland', 'nikita'];

    // const name = names.filter(name => name.length < 5);
    // console.log(name);// Ivan, Ann

    // //map

    // const answer = ['IvAn', 'AnN', 'VolaNd'];

    // const result = answer.map(item => item.toLowerCase());

    // // every/some

    // const aome = [4, 'ff', 'gg'];

    // console.log(aome.some(item => typeof(item) === 'number'));//true
    // console.log(aome.every(item => typeof(item) === 'number'));//false

    // //reduce

    // const arr = [2, 5, 6, 7, 6];
    //                     // 0(по умолчанию) или 3   2
    //                     // 2   5
    //                     // 7   6
    //                     // 13  7
    //                     // 20  6

    // const res = arr.reduce((sum, current) => sum + current, 3);

    // const ff = ['apple', 'go'];

    // const gg = ff.reduce((some, current) => `${some}, ${current}`);
    // console.log(gg);//apple, go

    // //Obiect.entries

    // const obj = {
    //     Ivan: 'persone',
    //     Ann: 'persone',
    //     dog: 'animal'
    // };


    // const hh = Object.entries(obj) 
    // //[ [ 'Ivan', 'persone' ], [ 'Ann', 'persone' ], [ 'dog', 'animal' ] ]
    // .filter(item => item[1] === 'persone')//[ [ 'Ivan', 'persone' ], [ 'Ann', 'persone' ] ]
    // .map(item => item[0]);// ['Ivan', 'Ann']

    //npx json-server db.json
    //async/await парные 

    


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



//регулярные варжения

// new RegExp('pattern', 'flags');

// /pattern/f

const gf = prompt('ведите имя');

const fg = /n/ig;

//флаги

//i не зависимо от большой или малекой буквы
//g global
//m много строчный режим

//классы

// \d ищем цифру
// \w ищем букву,слово
// \s ищем пробел

//не классы

// \D не цифра
// \W не буква

// console.log(gf.search(fg));//ann = 1
// console.log(gf.match(fg));//получаем массив []
// console.log(gf.replace(/./g, "*"));//все буквы заменится на *
// console.log(gf.replace(/\./g, "*"));//вместо точек будут *
// console.log('12-56-34'.replace(/-/g, ":"));//12:56:34
// console.log(fg.test(gf));//true или false (true)
// console.log(gf.match(/\w\d\w\d/i));//ищет слово(бцбц)



//акцусы (объект)

const persone = {
    name: 'alex',
    age: 25,

    get userAge() {
        return this.age;
    },

    set userAge(num) {
        this.age = num;
    }
};

console.log(persone.userAge);//25
console.log(persone.userAge = 30);//age = 30