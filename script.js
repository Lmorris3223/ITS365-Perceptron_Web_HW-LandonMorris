const gridElement = document.getElementById("grid");
let gridData = new Array(9).fill(0);

for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    cell.addEventListener("click", () => {
        cell.classList.toggle("active");
        gridData[i] = gridData[i] === 1 ? 0 : 1;
    });

    gridElement.appendChild(cell);
}

const L = [1,0,0, 1,0,0, 1,1,1];
const T = [1,1,1, 0,1,0, 0,1,0];


function addNoise(pattern, noiseLevel = 0.2) {
    let noisy = [...pattern];
    for (let i = 0; i < noisy.length; i++) {
        if (Math.random() < noiseLevel) {
            noisy[i] = noisy[i] === 1 ? 0 : 1;
        }
    }
    return noisy;
}


let data = [];
let labels = [];

for (let i = 0; i < 50; i++) {
    data.push(addNoise(L));
    labels.push(-1);
}

for (let i = 0; i < 50; i++) {
    data.push(addNoise(T));
    labels.push(1);
}


let weights = new Array(9).fill(0);
let bias = 0;
let lr = 0.1;

function predict(x) {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i] * weights[i];
    }
    sum += bias;
    return sum >= 0 ? 1 : -1;
}

function trainModel() {
    for (let epoch = 0; epoch < 20; epoch++) {
        for (let i = 0; i < data.length; i++) {
            let guess = predict(data[i]);
            let error = labels[i] - guess;

            for (let j = 0; j < weights.length; j++) {
                weights[j] += lr * error * data[i][j];
            }

            bias += lr * error;
        }
    }

    document.getElementById("output").innerText = "Training complete!";
}

function predictGrid() {
    let result = predict(gridData);
    document.getElementById("output").innerText =
        result === 1 ? "Prediction: T" : "Prediction: L";
}

function clearGrid() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("active"));
    gridData.fill(0);
    document.getElementById("output").innerText = "Grid cleared";
}