// Defining bet input elements
let playerName = document.getElementById('playerName');
let statType = document.getElementById('statType');
// Definig over bet elements
let overLine = document.getElementById('overLine');
let overOdds = document.getElementById('overOdds');
let overBookmaker = document.getElementById('overBookmaker');
// Definig under bet elements
let underLine = document.getElementById('underLine');
let underOdds = document.getElementById('underOdds');
let underBookmaker = document.getElementById('overBookmaker');
// Defining Button
let calculateButton = document.getElementById('calculateButton');
let recordButton = document.getElementById('recordButton');
// Defining middle Info
let middleInfoPElement = document.getElementById('middleInfo');
let recordBetComment = document.getElementById('recordBetComment');
let maxStake = document.getElementById('maxStake');
let middleInfo = '';
// Definig previous bets 
let previousBets = [];
let underStake;
let overStake;

const middleInfoConcatenate = () => {
    let underOdds1 = parseFloat(underOdds.value);
    let overOdds1 = parseFloat(overOdds.value);
    if (overOdds1 == '' || underOdds1 == '') {
        middleInfo = 'Enter odds information';
        middleInfoPElement.textContent = middleInfo;
        displayMiddleStats();
    } else if (parseFloat(overLine.value) > parseFloat(underLine.value)) {
        middleInfo = 'Under line has to be greater than over line';
        middleInfoPElement.textContent = middleInfo;
        displayMiddleStats();
    } else {
        // PUT ACTUAL FORMULA HERE
        let syntheticOdds = middleOddsCalculator(underOdds1,overOdds1);
        let breakEvenPerCent = ((1 / syntheticOdds).toFixed(4) * 100).toFixed(2) + " %";
        middleInfo = `Synthetic Odds:<br><span class="betInfoSpan">${syntheticOdds}</span><br>Break Even %:<br><span class="betInfoSpan">${breakEvenPerCent}</span>`;
        middleInfoPElement.innerHTML = middleInfo;
        displayMiddleStats();
        displayRecordBet();
    }
}

calculateButton.addEventListener('click', middleInfoConcatenate);


// Hide Middle info
const hideMiddleStats = () => {
    document.getElementById('middleStats').style.visibility = 'Hidden';
}
// Display Middle Info
const displayMiddleStats = () => {
    document.getElementById('middleStats').style.visibility = 'Visible';
}

// Hide Middle Record Bet Button
const hideRecordBet = () => {
    document.getElementById('middleStatButtonContainer').style.display = 'none';
}
// Display Middle Record Bet Button
const displayRecordBet = () => {
    document.getElementById('middleStatButtonContainer').style.display = 'block';
}

const middleOddsCalculator = (a, b) => {
    let aStake = 100; let aReturn = a * aStake;
    let bStake = aReturn / b; let bReturn = b * bStake;
    let maxReturn = bReturn + aReturn;
    let totalStake = aStake + bStake;
    let totalRisk = aReturn - totalStake;
    let totalProf = maxReturn - totalRisk;
    let odds = -(totalProf / totalRisk) - 1;
    if(odds < 0) {
        return '! ARB !';
    } else {
        return (odds).toFixed(2);
    }
}

const handleRecordBetButton = () => {
    if (playerName.value == '' ||
        statType.value == '' ||
        overLine.value == '' ||
        overOdds.value == '' ||
        overBookmaker.value == ''||
        underLine.value == '' ||
        underOdds.value == '' ||
        underBookmaker.value == '' ||
        maxStake.value == '') {
        // Add comment to beneath button
        recordBetComment.innerHTML = '* Fill out all bet details';
    } else {
        if (parseFloat(overOdds.value) > parseFloat(underOdds.value)) {
            underStake = parseFloat(maxStake.value);
            overStake = (parseFloat(underOdds.value) / parseFloat(overOdds.value)) * parseFloat(underStake);
            overStake = Math.round(overStake / 5) * 5;
        } else if (parseFloat(overOdds.value) < parseFloat(underOdds.value)) {
            overStake = parseFloat(maxStake.value);
            underStake = (parseFloat(overOdds.value) / parseFloat(underOdds.value)) * parseFloat(overStake);
            underStake = Math.round(underStake / 5) * 5;
        }
        let betObject = {
            playerName: playerName.value,
            statType: statType.value,
            overLine: parseFloat(overLine.value),
            overOdds: parseFloat(overOdds.value),
            overBookmaker: overBookmaker.value,
            overStake: overStake,
            underLine: parseFloat(underLine.value),
            underOdds: parseFloat(underOdds.value),
            underBookmaker: underBookmaker.value,
            underStake: underStake,
            middleGap: parseFloat(underLine.value) - parseFloat(overLine.value)

        };
        previousBets.push(betObject);
        recordBetComment.style.color = 'green';
        recordBetComment.innerHTML = '* Bet information saved';
        hideMiddleStats();
    }
}

recordButton.addEventListener('click', handleRecordBetButton);

// Adds event listener to enter button
window.addEventListener('keydown', (event) => {
    if ((event.key ==='Enter') && (document.getElementById('middleStatButtonContainer').style.display = 'none')) {
        middleInfoConcatenate();
    } else if ((event.key ==='Enter') && !(playerName.value == '' &&
        statType.value == '' &&
        overLine.value == '' &&
        overOdds.value == '' &&
        overBookmaker.value == '' &&
        underLine.value == '' &&
        underOdds.value == '' &&
        underBookmaker.value == '')) {
        alert('tRY');
        displayRecordBet();
        handleRecordBetButton();
    }
});

// -------------------------------------------------- //
//                        TO DO                       //
// -------------------------------------------------- //
// Add localstorage funtionality to previous bet array
// Add synthetic odds to bet object
// 