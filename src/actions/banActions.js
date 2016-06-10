import { createAction } from 'redux-actions';
export const fetchCardList = createAction('fetch cardlist');
export const setBanType = createAction('set bantype');
export const addToList = createAction('add tolist');
export const changeBtnType = createAction('change btntype');
export const changeBanDate = createAction('change bandate');
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
    fetch(`http://10.211.55.3/Asia.Ocg.WebAPI/ban`,{
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
