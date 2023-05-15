import React from "react";
import "./style.css";
import { useState } from "react";
import {
  Order,
  Customer,
  OrderItem,
  PaymentDetails,
  ShippingDetails,
} from "../../utils/types/type";
import SampleData from "../../Data/SampleData.js";
import ObjectGraphNodeDetail from "../objectGraphNodeDetail/ObjectGraphNodeDetail";

export interface ItemType {
  data:
    | ItemType
    | Order
    | Customer
    | OrderItem
    | PaymentDetails
    | ShippingDetails;
}
const ObjectGraphNav = () => {
  const [listItemData, setListItemData] = useState<
    | ItemType
    | Order
    | Customer
    | OrderItem
    | PaymentDetails
    | ShippingDetails
  >({ name:'No Value Selected' });
  const [orderShow, setOrderShow] = useState(true);
  const [childKey,setChildKey] = useState<string | number>('')
  const [parentKey  ,setParentKey] = useState('')
  const [showNested, setShowNested] = useState({});
  const [valueInput,setValueInput] = useState('');

  return (
    <div className="mainConatiner">
    <div className="navContainer">
      <ul>
        <li
         className={
          orderShow ? "nested-show" : "nested-hide"
        }
          onClick={(e: any) => {
            e.preventDefault();
            setOrderShow(!orderShow);
          }}
        >
          Order
          {orderShow && (
            <ul>
              {Object.keys(SampleData.order).map((item, index) => {
                return (
                  <li
                  className={
                    showNested[index] ? "nested-show" : "nested-hide"
                  }
                  key={index}
                  onClick={(e:React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    e.stopPropagation()
                    e.preventDefault();
                    setShowNested((prevShowNested) => ({
                      ...prevShowNested,
                      [index]: !prevShowNested[index],
                    }));
                  }}
                >
                  {item}
                  {showNested[index] && (
                    <ul>
                      {Array.isArray(SampleData.order[item])
                        ? SampleData.order[item].map((orderItem, idx) => {
                          return (
                            <li
                              key={idx}
                              onClick={(e:React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                                setChildKey(orderItem)
                                setParentKey(item)
                                setValueInput(SampleData.order[item][idx])
                                e.stopPropagation();
                                setChildKey(idx)
                                setListItemData({ [item]: SampleData.order[item][idx] });
                              }}
                            >
                              {orderItem.ProductName}
                            </li>
                          );
                        })
                        : Object.keys(SampleData.order[item]).map((nestedItem, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={(e:React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                                  setChildKey(nestedItem)
                                  setParentKey(item)
                                  e.stopPropagation();
                                  setValueInput(SampleData.order[item][nestedItem])

                                  setListItemData({
                                    [item]: { [nestedItem]: SampleData.order[item][nestedItem] },//ship:{addressline:'}
                                  });
                                }}
                              >
                                {nestedItem}
                              </li>
                            );
                          })}
                    </ul>
                  )}
                </li>
                );
              })}
            </ul>
          )}
        </li>
      </ul>
    </div>
    <div className="nodeContainer">
      <ObjectGraphNodeDetail data={listItemData} value={valueInput}  originalData={{...SampleData}} childKey={childKey} parentKey={parentKey}/>
    </div>
      

     
    </div>
  );
};

export default ObjectGraphNav;
