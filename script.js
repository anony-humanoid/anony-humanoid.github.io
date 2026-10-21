'use strict';

// The full page and native video controls remain usable without JavaScript.
document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  document.querySelector('.filter-bar').hidden = false;
  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(filter => {
        const selected = filter === button;
        filter.classList.toggle('active', selected);
        filter.setAttribute('aria-pressed', String(selected));
      });
      cards.forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
        if (card.hidden) card.querySelector('video').pause();
      });
    });
  });

  const operatorVideo = document.querySelector('.operator-video video');
  const caption = document.getElementById('operator-caption');
  const heightButtons = document.querySelectorAll('[data-height]');
  document.querySelector('.height-options').hidden = false;
  heightButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-pressed') === 'true') return;
      const height = button.dataset.height;
      operatorVideo.pause();
      operatorVideo.querySelector('source').src = `resources/video/${height}cm.mp4`;
      operatorVideo.poster = `resources/posters/${height}cm.jpg`;
      operatorVideo.setAttribute('aria-label', `Teleoperation by a ${height} cm operator`);
      operatorVideo.load();
      caption.innerHTML = `Operator height <strong>${height} cm</strong><span>Automatic scale calibration</span>`;
      heightButtons.forEach(option => {
        const selected = option === button;
        option.classList.toggle('active', selected);
        option.setAttribute('aria-pressed', String(selected));
      });
    });
  });

  // Avoid competing audio and video streams when browsing demonstrations.
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(other => { if (other !== video) other.pause(); });
    });
  });
});
