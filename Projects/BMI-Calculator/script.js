const bmiCategories = {
    "18+": [
        { category: "Severe Thinness", range: "< 16" },
        { category: "Moderate Thinness", range: "16 - 17" },
        { category: "Mild Thinness", range: "17 - 18.5" },
        { category: "Normal", range: "18.5 - 25" },
        { category: "Overweight", range: "25 - 30" },
        { category: "Obese Class I", range: "30 - 35" },
        { category: "Obese Class II", range: "35 - 40" },
        { category: "Obese Class III", range: "> 40" }
    ],
    "13-17": [
        { category: "Severe Thinness", range: "< 16.5" },
        { category: "Moderate Thinness", range: "16.5 - 17.5" },
        { category: "Mild Thinness", range: "17.5 - 19" },
        { category: "Normal", range: "19 - 24" },
        { category: "Overweight", range: "24 - 29" },
        { category: "Obese Class I", range: "29 - 34" },
        { category: "Obese Class II", range: "34 - 39" },
        { category: "Obese Class III", range: "> 39" }
    ],
    "6-12": [
        { category: "Severe Thinness", range: "< 14" },
        { category: "Moderate Thinness", range: "14 - 15" },
        { category: "Mild Thinness", range: "15 - 17" },
        { category: "Normal", range: "17 - 22" },
        { category: "Overweight", range: "22 - 27" },
        { category: "Obese Class I", range: "27 - 32" },
        { category: "Obese Class II", range: "32 - 37" },
        { category: "Obese Class III", range: "> 37" }
    ]
};

let currentAgeGroupIndex = 0;
const ageGroups = Object.keys(bmiCategories);

function loadTable() {
    const ageGroup = ageGroups[currentAgeGroupIndex];
    const categories = bmiCategories[ageGroup];
    const tbody = document.getElementById('bmiTableBody');
    tbody.innerHTML = '';

    categories.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${category.category}</td><td>${category.range}</td><td>${ageGroup}</td>`;
        tbody.appendChild(row);
    });
}

function nextAgeGroup() {
    currentAgeGroupIndex = (currentAgeGroupIndex + 1) % ageGroups.length;
    loadTable();
}

function previousAgeGroup() {
    currentAgeGroupIndex = (currentAgeGroupIndex - 1 + ageGroups.length) % ageGroups.length;
    loadTable();
}

function bmi() {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var age = Number(document.getElementById('age').value);
    var height = Number(document.getElementById('height').value);
    var weight = Number(document.getElementById('weight').value);

    if (height === 0 || weight === 0 || age === 0 || isNaN(height) || isNaN(weight) || isNaN(age)) {
        alert('Please enter valid name, age, height, and weight.');
        return;
    }

    var bmiValue = weight / ((height / 100) * (height / 100));
    var bmi = bmiValue.toFixed(1);
    var category = '';

    let ageGroup = "18+";
    if (age >= 6 && age <= 12) {
        ageGroup = "6-12";
    } else if (age >= 13 && age <= 17) {
        ageGroup = "13-17";
    }

    const categories = bmiCategories[ageGroup];
    for (const cat of categories) {
        if (cat.range.includes('<')) {
            const max = parseFloat(cat.range.replace('<', ''));
            if (bmi < max) {
                category = cat.category;
                break;
            }
        } else if (cat.range.includes('>')) {
            const min = parseFloat(cat.range.replace('>', ''));
            if (bmi > min) {
                category = cat.category;
                break;
            }
        } else {
            const [min, max] = cat.range.split(' - ').map(parseFloat);
            if (bmi >= min && bmi < max) {
                category = cat.category;
                break;
            }
        }
    }

    var resultText = `${name}'s BMI is ${bmi} (${category})`;
    var resultElement = document.getElementById('result');

    // Remove previous result if exists
    var previousResult = document.getElementById('BmiCalculator');
    if (previousResult) {
        previousResult.remove();
    }

    var resultBMI = document.createTextNode(resultText);
    var bmih1 = document.createElement('h2');
    bmih1.setAttribute('id', 'BmiCalculator');
    bmih1.appendChild(resultBMI);
    resultElement.appendChild(bmih1);
}

function remove() {
    var resultElement = document.getElementById('BmiCalculator');
    if (resultElement) {
        resultElement.remove();
    }
}

// Initialize the table on page load
window.onload = loadTable;
