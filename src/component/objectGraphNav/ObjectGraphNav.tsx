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
    ItemType | Order | Customer | OrderItem | PaymentDetails | ShippingDetails
  >({ name: "No Value Selected" });
  const [orderShow, setOrderShow] = useState(true);
  const [childKey, setChildKey] = useState<number | string>(0);
  const [parentKey, setParentKey] = useState("");
  const [showNested, setShowNested] = useState({});
  const [valueInput, setValueInput] = useState("");
  const [originalData, setOriginalData] = useState(SampleData.order);

  return (
    <div className="mainConatiner">
      <div className="navContainer">
        <ul>
          <li
            className={orderShow ? "nested-show" : "nested-hide"}
            onClick={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              setOrderShow(!orderShow);
            }}
          >
            Order
            {orderShow && (
              <ul>
                {Object.keys(originalData).map((item, index) => {
                  return (
                    <li
                      className={
                        showNested[index] ? "nested-show" : "nested-hide"
                      }
                      key={index}
                      onClick={(
                        e: React.MouseEvent<HTMLLIElement, MouseEvent>
                      ) => {
                        !Array.isArray(originalData[item]) &&
                          setListItemData({ [item]: originalData[item] });
                        !Array.isArray(originalData[item]) &&
                          setParentKey(item);
                        !Array.isArray(originalData[item]) && setChildKey(item);
                        e.stopPropagation();
                        e.preventDefault();
                        setShowNested((prevShowNested) => ({
                          ...prevShowNested,
                          [index]: !prevShowNested[index],
                        }));
                      }}
                    >
                      {item}
                      {Array.isArray(originalData[item]) && (
                        <ul>
                          {originalData[item].map((orderItem, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={(e) => {
                                  setChildKey(orderItem);
                                  setParentKey(item);
                                  setValueInput(originalData[item][idx]);
                                  e.stopPropagation();
                                  setChildKey(idx);
                                  setListItemData({
                                    [item]: originalData[item][idx],
                                  });
                                }}
                              >
                                {orderItem && orderItem.ProductName}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    const updatedOrder = [
                                      ...originalData[item],
                                    ];
                                    updatedOrder.splice(idx, 1);
                                    originalData[item] = updatedOrder;
                                    setOriginalData((prevData) => ({
                                      ...prevData,
                                      [item]: updatedOrder,
                                    }));

                                    if (
                                      childKey===idx
                                    ) {
                                      setChildKey(originalData[item].length-1)
                                      setListItemData({
                                        name: "No Value Selected",
                                      });
                                    }
                                  }}
                                >
                                  -
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {Array.isArray(originalData[item]) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            const updatedOrder = [...originalData[item]];
                            const newOrderItem = {
                              ProductName: `new item ${
                                updatedOrder.length + 1
                              }`,
                              quantity: 0,
                            };
                            setChildKey(updatedOrder.length);
                            updatedOrder.push(newOrderItem);
                            setOriginalData((prev) => ({
                              ...prev,
                              [item]: updatedOrder,
                            })); // Trigger re-render
                          }}
                        >
                          +
                        </button>
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
        <ObjectGraphNodeDetail
          data={listItemData}
          value={valueInput}
          originalData={originalData}
          childKey={childKey}
          parentKey={parentKey}
        />
      </div>
    </div>
  );
};

export default ObjectGraphNav;
