document.addEventListener('DOMContentLoaded', () => {
  const contents = document.querySelectorAll('.content');
  const buttons = {
    'home-btn': 'home-content',
    'leaderboard-btn': 'leaderboard-content',
    'interesting-btn': 'interesting-content',
    'referral-btn': 'referral-content',
    'tasks-btn': 'tasks-content'
  };

  const tapLimit = 100;
  let tapCount = 0;

  function showContent(id) {
    contents.forEach(content => content.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }

  Object.keys(buttons).forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', () => {
      showContent(buttons[buttonId]);
    });
  });

  showContent('home-content');

  document.getElementById('currency-img').addEventListener('click', () => {
    if (tapCount < tapLimit) {
      tapCount++;
      document.getElementById('tap-count').textContent = `Тапов сегодня: ${tapCount} / ${tapLimit}`;
      fetch('http://localhost:3000/update-coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'user1', coins: 0.01 })
      }).then(response => response.json())
        .then(data => console.log('Coins updated:', data))
        .catch(error => console.error('Error:', error));
    }
  });

  // Fetch leaderboard
  fetch('http://localhost:3000/leaderboard')
    .then(response => response.json())
    .then(data => {
      const leaderboard = document.getElementById('leaderboard');
      data.forEach((user, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `
          <span class="leaderboard-position">${index + 1}</span>
          <span>${user.username}</span>
          <span>${user.coins.toFixed(2)}</span>
        `;
        leaderboard.appendChild(item);
      });
    })
    .catch(error => console.error('Error:', error));
});
