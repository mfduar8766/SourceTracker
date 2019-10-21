import axios from 'axios';
import { ADD_AGENCY } from '../../../Utils/index';

export const addNewAgency = async agency => {
  try {
    const res = await axios.post(ADD_AGENCY, agency);
    return res;
  } catch (error) {
    return error;
  }
};
