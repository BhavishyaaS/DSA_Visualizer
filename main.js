let array = [];
let speed = 300;

const visArea = document.getElementById("visualizationArea");
const arrayValues = document.getElementById("arrayValues");
const generateBtn = document.getElementById("generateBtn");
const useInputBtn = document.getElementById("useInputBtn");
const arrayInput = document.getElementById("arrayInput");
const startBtn = document.getElementById("startBtn");
const algoSelect = document.getElementById("algorithmSelect");
const speedSlider = document.getElementById("speedSlider");
const sizeSlider = document.getElementById("sizeSlider");
const themeToggle = document.getElementById("themeToggle");

const algoName = document.getElementById("algoName");
const algoTime = document.getElementById("algoTime");
const algoSpace = document.getElementById("algoSpace");
const algoDesc = document.getElementById("algoDesc");

const algoDetails = {
  bubble: { name: "Bubble Sort", time: "O(n²)", space: "O(1)", desc: "Repeatedly swaps adjacent elements if they are in the wrong order." },
  selection: { name: "Selection Sort", time: "O(n²)", space: "O(1)", desc: "Selects the smallest element and places it in the correct position each pass." },
  insertion: { name: "Insertion Sort", time: "O(n²)", space: "O(1)", desc: "Builds the sorted array one item at a time." },
  merge: { name: "Merge Sort", time: "O(n log n)", space: "O(n)", desc: "Divides the array into halves, sorts recursively, and merges sorted halves." },
  quick: { name: "Quick Sort", time: "O(n log n)", space: "O(log n)", desc: "Picks a pivot, partitions, and recursively sorts subarrays." },
  linear: { name: "Linear Search", time: "O(n)", space: "O(1)", desc: "Checks each element sequentially." },
  binary: { name: "Binary Search", time: "O(log n)", space: "O(1)", desc: "Divides the sorted array to find target efficiently." }
};

//Render and Generate
function renderArray(arr) {
  visArea.innerHTML = "";
  arrayValues.innerHTML = "";
  arr.forEach(val => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val * 3}px`;
    visArea.appendChild(bar);

    const value = document.createElement("div");
    value.classList.add("value");
    value.textContent = val;
    arrayValues.appendChild(value);
  });
}

function generateArray(size = 25) {
  array = [];
  for (let i = 0; i < size; i++) array.push(Math.floor(Math.random() * 100) + 5);
  renderArray(array);
}

generateBtn.addEventListener("click", () => {
  sizeSlider.disabled = false;
  generateArray(parseInt(sizeSlider.value));
});

sizeSlider.addEventListener("input", () => generateArray(parseInt(sizeSlider.value)));

function useUserArray() {
  const input = arrayInput.value.trim();
  if (!input) return alert("Enter numbers separated by commas.");
  const values = input.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v) && v >= 0);
  if (!values.length) return alert("Invalid input.");
  array = values;
  renderArray(array);
  sizeSlider.disabled = true;
}
useInputBtn.addEventListener("click", useUserArray);

//Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

//Speed
speedSlider.addEventListener("input", () => (speed = speedSlider.value));

//Info
algoSelect.addEventListener("change", () => {
  const selected = algoDetails[algoSelect.value];
  algoName.textContent = selected.name;
  algoTime.textContent = selected.time;
  algoSpace.textContent = selected.space;
  algoDesc.textContent = selected.desc;
});

//Sorting Algo
async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.background = "var(--compare-color)";
      bars[j + 1].style.background = "var(--compare-color)";
      await new Promise(r => setTimeout(r, speed));
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray(array);
      }
      bars[j].style.background = "var(--bar-color)";
      bars[j + 1].style.background = "var(--bar-color)";
    }
    bars[array.length - i - 1].style.background = "var(--sorted-color)";
  }
  renderArray(array);
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    bars[minIdx].style.background = "var(--compare-color)";
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.background = "var(--compare-color)";
      await new Promise(r => setTimeout(r, speed));
      if (array[j] < array[minIdx]) minIdx = j;
      bars[j].style.background = "var(--bar-color)";
    }
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    renderArray(array);
    bars[i].style.background = "var(--sorted-color)";
  }
  renderArray(array);
}

async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderArray(array);
      await new Promise(r => setTimeout(r, speed));
    }
    array[j + 1] = key;
  }
  renderArray(array);
}

async function mergeSort(arr = array) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = await mergeSort(arr.slice(0, mid));
  const right = await mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) result.push(left.shift());
    else result.push(right.shift());
  }
  return [...result, ...left, ...right];
}

//Searching algo
async function linearSearch(target) {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    bars[i].style.background = "var(--compare-color)";
    await new Promise(r => setTimeout(r, speed));
    if (array[i] === target) {
      bars[i].style.background = "var(--sorted-color)";
      return;
    }
    bars[i].style.background = "var(--bar-color)";
  }
  alert("Value not found!");
}

async function binarySearch(target) {
  let left = 0, right = array.length - 1;
  const bars = document.getElementsByClassName("bar");
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    bars[mid].style.background = "var(--compare-color)";
    await new Promise(r => setTimeout(r, speed));
    if (array[mid] === target) {
      bars[mid].style.background = "var(--sorted-color)";
      return;
    }
    if (array[mid] < target) left = mid + 1;
    else right = mid - 1;
    bars[mid].style.background = "var(--bar-color)";
  }
  alert("Value not found!");
}

//start
startBtn.addEventListener("click", async () => {
  const algo = algoSelect.value;
  const target = parseInt(document.getElementById("searchValue").value);
  if (algo === "linear" || algo === "binary") {
    if (isNaN(target)) return alert("Enter a target to search!");
    if (algo === "binary") array.sort((a, b) => a - b);
    renderArray(array);
    await (algo === "linear" ? linearSearch(target) : binarySearch(target));
  } else {
    if (algo === "bubble") await bubbleSort();
    else if (algo === "selection") await selectionSort();
    else if (algo === "insertion") await insertionSort();
    else if (algo === "merge") array = await mergeSort(array);
    else if (algo === "quick") array.sort((a, b) => a - b);
    renderArray(array);
  }
});


generateArray();
