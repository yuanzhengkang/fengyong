//价格补 0
const addZero = (value)=>{
    if(isNaN(Number(value))){
        return value
    }
    return Number(value).toFixed(2)
}
const picsUrl = (val)=>{
    if(val) {
      return val.split(',')[0]
    }else {
      return val
    }
  }
export default {
    addZero,
    picsUrl
}