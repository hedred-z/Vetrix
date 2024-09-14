let score = 0;
const totalPoints = 50;
const farmingDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const farmingStartTime = Date.now();
const scoreIncrementPerSecond = totalPoints / (farmingDuration / 1000);
const farmingEndTime = farmingStartTime + farmingDuration;

const startFarmingButton = document.getElementById('start-farming');
const farmingScoreElem = document.getElementById('farming-score');
const remainingTimeElem = document.getElementById('remaining-time');
const telegramContentElem = document.getElementById('telegram-content');
const farmStatusElem = document.getElementById('farm-status');

startFarmingButton.addEventListener('click', () => {
    startFarmingButton.disabled = true;
    startFarmingButton.style.backgroundColor = '#cccccc';
    telegramContentElem.style.display = 'none';
    farmStatusElem.style.display = 'block';

    const updateFarmingStatus = () => {
        const now = Date.now();
        const remainingTime = Math.max(0, farmingEndTime - now);
        const remainingSeconds = Math.floor(remainingTime / 1000);
        const remainingHours = Math.floor(remainingSeconds / 3600);
        const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const remainingSecondsDisplay = remainingSeconds % 60;

        remainingTimeElem.textContent = `Remaining Time: ${remainingHours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSecondsDisplay.toString().padStart(2, '0')}`;

        if (remainingTime > 0) {
            score += scoreIncrementPerSecond;
            farmingScoreElem.textContent = `Score: ${Math.min(score.toFixed(2), totalPoints)}`;
            setTimeout(updateFarmingStatus, 1000);
        } else {
            farmingScoreElem.textContent = `Score: ${totalPoints}`;
        }
    };

    updateFarmingStatus();
});
