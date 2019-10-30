import { toastError } from '@root/front/services/toasts';

// eslint-disable-next-line import/prefer-default-export
export const startGame = ({ teams, playingTeam }) => fetch('/api/molkky/start', {
  method: 'post',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({ teams, playingTeam }),
})
  .then((response) => (response.status === 200
    ? response.json()
    : Promise.reject(response.statusText)))
  .catch(toastError);

export const scorePoints = ({ team, points }) => fetch('/api/molkky/score', {
  method: 'post',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({ team, points }),
})
  .then((response) => (response.status === 200
    ? response.json()
    : Promise.reject(response.statusText)))
  .catch(toastError);

export const missTarget = (team) => fetch('/api/molkky/miss', {
  method: 'post',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({ team }),
})
  .then((response) => (response.status === 200
    ? response.json()
    : Promise.reject(response.statusText)))
  .catch(toastError);
