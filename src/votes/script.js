'use strict';

// const votes = document.querySelector('.votes');
const items = document.querySelector('.items');

const fetchAPI = async function () {
  try {
    const { data } = await axios.get('/api/votes');
    const markup = data
      .map(item => {
        return `
          <article class="item">
            <h3>${item.name}</h3>
            <p>
              Votes:
              <span class="vote-${item.id}">
                ${item.votes}
              </span>
            </p>
            <button class="vote-btn" data-id="${item.id}">Vote</button>
          </article>
        `;
      })
      .join('');

    items.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.error('Something went wrong!');
    console.log(error);
  }
};

items.addEventListener('click', function (event) {
  const target = event.target.closest('.vote-btn');

  if (!target) return;

  const { id } = target.dataset;
  const voteDisplay = items.querySelector(`.vote-${id}`);

  let votes = Number.parseInt(voteDisplay.textContent);
  votes = votes + 1;
  voteDisplay.textContent = votes;

  fetchUpdateAPI(id, votes);
});

const fetchUpdateAPI = async function (id, votes) {
  try {
    await axios.put('/api/votes', { id, votes });
  } catch (error) {
    console.error('Something went wrong!');
    console.log(error);
  }
};

window.addEventListener('load', fetchAPI);
