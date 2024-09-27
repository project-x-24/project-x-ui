import { apiCall } from "../../services/axios";

export const getPokemon = async (name) => {
  try {

    const resp =  await apiCall({
      method: 'get',
      url: `pokemon/${name}`,
      data: {}
    })

    return resp;
  } catch (e) {
    console.log(e)
  }
};



