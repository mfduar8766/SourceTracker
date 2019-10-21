import axios from 'axios';
import { formatDate } from '../../../../Utils/index';

export const editAgentById = async ({ EDIT_AGENT, agent }) => {
  const agentId = agent.agentId;
  const startDate = agent.startDate;
  const endDate = agent.endDate;
  const formatedAgentData = {
    ...agent,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  };
  try {
    const res = await axios.patch(EDIT_AGENT(agentId), {
      data: formatedAgentData
    });
    return console.log(res);
  } catch (error) {
    return console.log(error);
  }
};
