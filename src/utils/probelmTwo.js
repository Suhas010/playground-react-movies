const students = [
  {name: 'Alice', grades: [89, 93, null, 100, 66]}, 
  {name: 'Bob', grades: [70, 71, 100, 82, 90]},
  {name: 'Martin', grades: [89, 93, 45, 62, null]},
  {name: 'Storm', grades: [80, 70, 100, 82, 94]},
  {name: 'Corrina', grades: [86, null, 100, 34, 79]},
  {name: 'Alexa', grades: [95, 85, 100, null, 64]},
  {name: 'Susan', grades: [82, 91, 84, 94, 90]},
  {name: 'Jake', grades: [92, null, 84, null, 90]}
];

// sathishkumar kuppuswami16:38
// 1. Find the student with the highest average grade.
// 2. Consider nulls as 0. Ignore the least mark of all the candidates while calculating the average. So, average is calculated only for 4 grades
// 3. Breakdown the solution into reusable functions
// 4. Try non-imperative solution
// 5. Try to wrap this in a Student module (without using javascript class)
// sathishkumar.kuppuswami@zeotap.com

const asc = (a,b) => a-b;

const getLastResults = (arr, last) => arr.splice(arr.length-last, arr.length);

const sum = (acc, num) => {
  if(!num || num !== null ) {
    acc += num;
  }
  return acc;
}

function getMaxGrades(arr) {
  arr.sort(asc);
  let topFour = getLastResults(arr, 4);
  let total = topFour.reduce(sum, 0)
  return total/4;
}

function getTopper(students) {
  let max = 0;
  let student = '';
  for(let {name, grades} of students) {
    let avgGrades = getMaxGrades(grades);    
    if(avgGrades > max) {
      max = avgGrades;
      student = name;
    }
  }
  return `${student} scored Highest grade with ${max}`
}
console.log(getTopper(students))