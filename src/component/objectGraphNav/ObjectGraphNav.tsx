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
           {Object.keys(SampleData)[0]}
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
                        !Array.isArray(originalData[item]) && !showNested[index] &&
                          setListItemData({ [item]: originalData[item] });
                        !Array.isArray(originalData[item]) && !showNested[index] &&
                          setParentKey(item);
                        !Array.isArray(originalData[item]) && !showNested[index] && setChildKey(item);
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
                          {originalData[item].map((ArrayItem, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={(e) => {
                                  setChildKey(ArrayItem);
                                  setParentKey(item);
                                  setValueInput(originalData[item][idx]);
                                  e.stopPropagation();
                                  setChildKey(idx);
                                  setListItemData({
                                    [item]: originalData[item][idx],
                                  });
                                }}
                              >
                                {ArrayItem && ArrayItem[Object.keys(ArrayItem)[0]]}
                                <button className="list-item-remove"
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    const updatedArray = [
                                      ...originalData[item],
                                    ];
                                    updatedArray.splice(idx, 1);
                                    originalData[item] = updatedArray;
                                    setOriginalData((prevData) => ({
                                      ...prevData,
                                      [item]: updatedArray,
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
                                  x
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {Array.isArray(originalData[item]) && showNested[index] &&  (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            const updatedArray = [...originalData[item]];
                            const newArrayItem = {
                              ProductName: `new item ${
                                updatedArray.length + 1
                              }`,
                              quantity: 0,
                            };
                            setChildKey(updatedArray.length);
                            updatedArray.push(newArrayItem);
                            setOriginalData((prev) => ({
                              ...prev,
                              [item]: updatedArray,
                            })); // Trigger re-render
                          }}
                        >
                          Add New Field
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
