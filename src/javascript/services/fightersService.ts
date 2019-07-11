import { callApi } from '../helpers/apiHelper';
import { IFighterInfo } from '../fighter';

export interface IFighter {
  _id: number,
  name: string,
  source: string
}

class FighterService {
  async getFighters(): Promise<IFighter[]> {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id: number): Promise<IFighterInfo> {
    try {
      const endpoint = `details/fighter/${_id}.json`;
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    }
    catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
