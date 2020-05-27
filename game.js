import { getClue as getClueFromCallback } from "./callback-version.js";
import { getClue as getClueFromPromise } from "./promise-version.js";
import { getClue as getClueFromAsyncAwait} from './async-await-version.js';
let playerScore = 0;


const render = function (clue) {
    document.getElementById("question").innerText = `${clue.question}`;
    document.getElementById(`answer`).innerText = clue.answer;
    document.getElementById("value").innerText = clue.value;
    document.getElementById("category-title").innerText = clue.categoryTitle;
    if (clue.invalidCount > 0) {
        document.getElementById("invalid-count").innerText = "Invalid!";
    } else {
        document.getElementById("invalid-count").innerText = "Valid";
    }
  document.getElementById('check-response').classList.remove('is-hidden');
  document.getElementById('player-response').value = '';
  document.getElementById('answer').classList.add('is-hidden');
  document.getElementById('score').innerText = playerScore;
};

const useCallback = document.getElementById("use-callback");
useCallback.addEventListener("click", () => {

  getClueFromCallback((errCode, clue) => {
      if (errCode !== null) {
          console.error(errCode);
    } else {
        window.localStorage.setItem('clue', clue.id)
        render(clue);
    }
});
});

const usePromise = document.getElementById("use-promise");
usePromise.addEventListener("click", (ev) => {
    getClueFromPromise().then((result) => {
        window.localStorage.setItem('clue', result.id)
        render(result)
    }).catch((err) => {
        console.log(error.message);
    });
});

const useAsyncAwait = document.getElementById('use-async-await');
useAsyncAwait.addEventListener('click', async ev => {
    try {
        const clue = await getClueFromAsyncAwait();
        window.localStorage.setItem('clue', clue.id)
        render(clue);
    } catch(err) {
        console.log(err);
    }
});


document.getElementById('check-response')
.addEventListener('click', ev => {
    const textarea = document.getElementById('player-response');
    const answer = document.getElementById('answer');
    if(textarea.value.length >0 && answer.innerText.toLowerCase().includes(textarea.value.toLowerCase())) {
        playerScore += Number(document.getElementById("value").innerText)
            answer.classList.remove('is-hidden');
            document.getElementById('check-response').classList.add('is-hidden');
            document.getElementById('score').innerText = playerScore;
        } else {
            answer.classList.remove('is-hidden');
            document.getElementById('check-response').classList.add('is-hidden');
        }
        window.localStorage.playerScore = playerScore;
    });

// document.getElementById('game-board').addEventListener('click', () => {
//         document.getElementById('check-response').classList.remove('is-hidden');
//         document.getElementById('player-response').value = '';
// });

if(window.localStorage.getItem('playerScore') === null) {
    window.localStorage.setItem('playerScore', 0);
} else {
    playerScore += Number(window.localStorage.getItem('playerScore'));
}

if(window.localStorage.getItem('clue') !==null) {
    getFromStorage();
}

async function getFromStorage() {
    const response = await fetch(`https://jservice.xyz/api/clues/${window.localStorage.getItem('clue')}`)
        .then((result) => {
            if (result.ok === false) {
                throw error(result.status)
            }
            else {
                return result.json()
            }
        })
    render(response);
}
