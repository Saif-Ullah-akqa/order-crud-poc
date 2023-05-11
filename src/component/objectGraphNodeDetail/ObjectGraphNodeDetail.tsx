import {Order,Customer,OrderItem,PaymentDetails,ShippingDetails} from "../../utils/types/type"

type NodeType= Order |Customer |OrderItem | PaymentDetails | ShippingDetails
interface itemType{
    data:NodeType
}

const ObjectGraphNodeDetail = (data: itemType) => {
    // function getObjKey(obj,value){
    //     console.log( Object.keys(obj).find(key=>obj[key]===value))
    // }
  console.log(data,'dataa')
  return(
  Object.values(data.data[Object.keys(data.data)[0]]).map((item:any,index)=>{
    console.log(item===true)
if(item===true){
    return<div>PAID</div>
}else if(item===false){
    return<div>NOT PAID</div>
}else{
    // getObjKey(data.data[0],item)
    return(<div key={index}>{item}</div>)
}
    }))
};

export default ObjectGraphNodeDetail;
