// Store scent data
let scentData = [];

// Function 1: addScent(scent, feeling)
function addScent(scent, feeling) {
    if (scent && feeling) {
        const scentEntry = { scent: scent, feeling: feeling };
        scentData.push(scentEntry);
        alert(`Scent "${scent}" with feeling "${feeling}" has been recorded!`);
    } else {
        alert("Please fill out both fields.");
    }
}

// Function 2: assignMoodScore(scentEntry)
function assignMoodScore(scentEntry) {
    let score = 0;

    // Reflect on personal experience (subjective score)
    switch (scentEntry.feeling.toLowerCase()) {
        case "calm":
            score = 8;
            break;
        case "energized":
            score = 9;
            break;
        case "grossed out":
            score = 2;
            break;
        case "relaxed":
            score = 7;
            break;
        case "happy":
            score = 10;
            break;
        case "sad":
            score = 3;
            break;
        default:
            score = 5;
            break;
    }

    return score;
}

// Function 3: analyzeMoods()
function analyzeMoods() {
    if (scentData.length === 0) {
        return { average: 0, bestScent: "None", worstScent: "None" };
    }

    let totalScore = 0;
    let highestScore = -1;
    let lowestScore = 11;
    let bestScent = "";
    let worstScent = "";

    scentData.forEach(entry => {
        const score = assignMoodScore(entry);
        totalScore += score;

        if (score > highestScore) {
            highestScore = score;
            bestScent = entry.scent;
        }

        if (score < lowestScore) {
            lowestScore = score;
            worstScent = entry.scent;
        }
    });

    const average = totalScore / scentData.length;

    return { average: average.toFixed(2), bestScent: bestScent, worstScent: worstScent };
}

// Function 4: displayResults(analysis)
function displayResults(analysis) {
    const resultsDiv = document.getElementById("results");
    const message = `Your average mood score is ${analysis.average}.
                     <br>The best scent today was "${analysis.bestScent}".
                     <br>The worst scent today was "${analysis.worstScent}".`;

    resultsDiv.innerHTML = message;
}

// Event listener for the Add Scent button
document.getElementById("addScentBtn").addEventListener("click", () => {
    const scentInput = document.getElementById("scent").value;
    const feelingInput = document.getElementById("feeling").value;

    addScent(scentInput, feelingInput);

    // After adding, show the updated analysis
    const analysis = analyzeMoods();
    displayResults(analysis);
});
