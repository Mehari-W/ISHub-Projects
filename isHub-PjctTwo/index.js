// Task1
let paragraph = document.getElementById("myPara");
const TextChanger = () => {
  paragraph.textContent = "Hello";
};
const ColorChanger = () => {
  paragraph.style.color = "red";
};

// Task2
const ImageChanger = (filename) => {
  document.getElementById("mainImg").src = `./images/${filename}`;
};
// Task3
const toggleDone = (taskElement) => {
  taskElement.classList.toggle("done");
};

// Task4

let count = 0;
let display = document.getElementById("countDisplay");

const increment = () => {
  count++;
  display.textContent = count;
};

const decrement = () => {
  if (count > 0) {
    count--;
    display.textContent = count;
  }
};

// Task5
const logNextSibling = (listItem) => {
    let nextItem = listItem.nextElementSibling; 
    if (nextItem) {
      console.log(nextItem.textContent);
    } else {
      console.log("No more items");
    }
  };

console.log('Ethiopia');
