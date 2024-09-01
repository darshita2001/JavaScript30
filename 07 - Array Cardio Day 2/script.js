// ## Array Cardio Day 2

const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
// Array.prototype.every() // is everyone 19 or older?
const now = new Date();
const currentYear = now.getFullYear();

let isAdult = people.some((person) => currentYear - person.year >= 19);
console.log(`is at least one person 19 or older :- ${isAdult}`);

allAdults = people.every((person) => currentYear - person.year >= 19);
console.log(`is everyone 19 or older :- ${allAdults}`);

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
const comment = comments.find((comment) => comment.id == 823423);
console.log(`comment with the ID of 823423 :- ${JSON.stringify(comment)}`);

// Array.prototype.findIndex()
// Find the comment with this ID
const index = comments.findIndex((comment) => comment.id == 823423);
console.log(`index of 823423 :- ${index}`);
// delete the comment with the ID of 823423
let newComments = comments.splice(index, 1);
console.log(newComments);
console.log(comments);

// newComments = [...comments.slice(0, index), ...comments.slice(index + 1)];
// console.log(newComments);
