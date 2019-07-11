const API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

export async function callApi(endpoind: string, method: string) {
  const url = API_URL + endpoind;
  const options = {
    method
  };

  try {
    const response = await fetch(url, options);
    return await (response.ok ? response.json() : Promise.reject(Error('Failed to load')));
  }
  catch (error) {
    throw error;
  }
}

