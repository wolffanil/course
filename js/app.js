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