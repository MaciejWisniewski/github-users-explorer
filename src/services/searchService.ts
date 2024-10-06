import http from './httpService';
import { User } from '../types/domain';
import { apiUrl } from '../config.json';
import { SearchUsersResult } from 'types/app';

const apiEndpoint = `${apiUrl}/search`;

export const searchUsers = async (
  searchQuery: string,
  page: number,
  perPage: number
): Promise<SearchUsersResult<User>> => {
  try {
    const url = `${apiEndpoint}/users?q=${encodeURIComponent(
      searchQuery
    )}&page=${page}&per_page=${perPage}`;
    const { data } = await http.get(url);

    return data;
  } catch (ex: any) {
    if (ex.response && ex.response.status === 404)
      return { incomplete_results: false, items: [], total_count: 0 };
    return ex;
  }
};

const searchService = {
  searchUsers,
};

export default searchService;
