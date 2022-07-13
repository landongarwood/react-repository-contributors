import axios from "axios";
import { ContributorsPerPage } from "../constants";

const GITHUB_API_REACT_REPOSITORY_CONTRIBUTORS = 'https://api.github.com/repos/facebook/react/contributors';

export interface RepositoryContributor {
    login: string
    avatar_url: string
    url: string
    html_url: string
    contributions: number
    loading: boolean
}

const getList = async (page: number): Promise<RepositoryContributor[]> => {
    const {
        data: contributors,
      } = await axios.get<RepositoryContributor[]>(`${GITHUB_API_REACT_REPOSITORY_CONTRIBUTORS}?per_page=${ContributorsPerPage}&page=${page}`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
        },
      });
    
    return contributors;
};

const services = {
    getList,
};

export default services;