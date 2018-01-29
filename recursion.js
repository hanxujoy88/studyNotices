//反转字符串

function reverse(str) {
    if(str.length === 1){
        return str;
    } else {
        return str[str.length - 1] + reverse(str.substr(0, str.length - 1))
    }
}

console.log(reverse('abcdefgh'));



function factorial(num) {
    if(num < 0) {
        return -1;
    } else if(num === 1 || num === 0) {
        return 1;
    } else {
        return (num * factorial(num - 1));
    }
}

//var result = factorial(6);

//console.log(result);

var arr1 = [3,4,5,6,7];

function getSum(first, last) {
    console.log("first: " + first + "  last: " + last);
    var total = first + last;
    return total;
}

//arr1.reduce(getSum);

//console.log(arr1.reduce(getSum));



