import { createAction } from 'redux-actions';
export const fetchCardList = createAction('fetch cardlist');
export const fetchBanList = createAction('fetch banlist');
export const fetchBanForm = createAction('fetch banform');
export const fetchInit = createAction('fetch init');
export const setBanType = createAction('set bantype');
export const addToList = createAction('add tolist');
export const changeBtnType = createAction('change btntype');
export const changeBanDate = createAction('change bandate');
export const changeName = createAction('change name');
export const requestSearch = (value) => {
  return (dispatch) => {
    fetch(`http://10.211.55.3/Asia.Ocg.WebAPI/search/${value}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data){
        dispatch(fetchCardList(json.data.items));
      }
    });
  };
};
export const requestCreateBan = () => {
  return (dispatch, state) => {
    const {ban} = state();
    console.log('ban',ban.banform);
    fetch(`http://10.211.55.3/Asia.Ocg.WebAPI/manage/ban`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ban.banform)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      console.log(json);
    });

  };
};
// Manage
export const requestManageBanList = (value) => {
  return (dispatch) => {
    fetch(`http://10.211.55.3/Asia.Ocg.WebAPI/manage/ban`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data){
        dispatch(fetchBanList(json.data));
      }
    });
  };
};
export const requestManageBanForm = (id) => {
  return (dispatch) => {
    fetch(`http://10.211.55.3/Asia.Ocg.WebAPI/manage/ban/${id}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data){
        dispatch(fetchBanForm(json.data));
      }
    });
  };
};
