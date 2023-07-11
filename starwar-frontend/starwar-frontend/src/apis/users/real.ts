import API from '../../apis/api';
import * as Models from "../../models";

export const getUserInfo = (username: string): Promise<Models.User> => {
    return API.get(`/people?name=${username}`);
}
