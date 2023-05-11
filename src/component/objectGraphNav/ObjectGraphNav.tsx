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

type dataType = string | number | boolean;
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
  >({ data: {name:'No Value Selected'}});
  const [orderShow, setOrderShow] = useState(true);
  const [nestedShow, setNestedSHow] = useState(false);
  const [showNested, setShowNested] = useState({});

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
                    setNestedSHow(prevNestedShow => !prevNestedShow);
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
                                e.stopPropagation();
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
                                  e.stopPropagation();
                                  setListItemData({
                                    [item]: { [nestedItem]: SampleData.order[item][nestedItem] },
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
    {
        //@ts-ignore
        <ObjectGraphNodeDetail data={listItemData} />
      }
    </div>
      

     
    </div>
  );
};

export default ObjectGraphNav;
