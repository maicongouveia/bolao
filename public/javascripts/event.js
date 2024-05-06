let sleepScoreInput = document.getElementById('sleepScore')
  sleepScoreInput.addEventListener('input', async () => {
    await setSleepScore(getYesterdayDate(), sleepScoreInput.value);
    await getLeaderboard();
  })