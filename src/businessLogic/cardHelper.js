export default class CardHelper {
  static Monster(data) {
    const monster = data.filter(data=>
      data.property !== '魔' && data.property !== '罠'
    )
    let type = [];
    data.map(data=>{
      if(type.indexOf(data.serial_number)=== -1 &&  data.property !== '魔' && data.property !== '罠'){
        type.push(data.serial_number);
      }
    })
    let result = {
      mCount: monster.length,
      tCount: type.length
    };
    return (result);
  }
  static filter(data,property) {
    const prop = data.filter(data=>
      data.property === property
    )
    let type = [];
    data.map(data=>{
      if(type.indexOf(data.serial_number)=== -1 && data.property === property){
        type.push(data.serial_number);
      }
    })
    let result = {
      mCount: prop.length,
      tCount: type.length
    };
    return (result);
  }

}
