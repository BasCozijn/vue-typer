const URL = 'https://random-word-api.herokuapp.com/word';

export async function useFetchWords(number = 100) {
  const response = await fetch(`${URL}?number=${number}`);
  const data = await response.json();
  return data;
}
