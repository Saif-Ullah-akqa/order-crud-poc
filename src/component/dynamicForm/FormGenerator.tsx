import React, { useState, useEffect } from "react";
import {
  Customer,
  Order,
  OrderItem,
  PaymentDetails,
  ShippingDetails,
  State,
} from "../../utils/types/type";
import { ItemType } from "../objectGraphNav/ObjectGraphNav";
import "./FormGenerator.css";

export type InputType = {
  key: string;
  value: string | number | boolean | State;
};

interface FormGeneratorProps {
  originalData: any;
  childKey: string | number;
  parentKey: string;
  data:
    | Order
    | Customer
    | OrderItem
    | PaymentDetails
    | ShippingDetails
    | ItemType;
  onSubmit: (formData: {
    [key: string]: string | number | boolean | State | OrderItem[] | {};
  }) => void;
}
function FormGenerator({
  data,
  onSubmit,
  childKey,
  originalData,
  parentKey,
}: FormGeneratorProps) {
  console.log({ originalData });
  const [formData, setFormData] = useState<{
    [key: string]: string | number | boolean | OrderItem[];
  }>(JSON.parse(JSON.stringify(originalData)));

  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(originalData)));
  }, [originalData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let parsedValue = null;
    if (parentKey === "orderItems") {
      if (name === "quantity") {
        parsedValue = parseInt(value, 10);
      }
      let prevOrderItem = formData.orderItems[childKey];
      prevOrderItem[name] = parsedValue ? parsedValue : value;
      let updatedOrderItems = formData.orderItems;
      updatedOrderItems[childKey] = prevOrderItem;
      setFormData(
        (prevFormData) =>
          ({
            ...prevFormData,
            orderItems: updatedOrderItems as OrderItem[],
          } as { [key: string]: string | number | boolean | OrderItem[] })
      );
    } else {
      if (name === "pincode") {
        var intValue = parseInt(value, 10);
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentKey]: {
          //@ts-ignore
          ...prevFormData[parentKey],
          [name]: intValue ? intValue : value,
        },
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(formData);
    e.preventDefault();
  };

  const handleReset = () => {
    const originalOrderObject = JSON.parse(JSON.stringify(originalData));
    if (parentKey === "orderItems") {
      const originalOrder = originalOrderObject.orderItems;
      setFormData((prevFormData) => ({
        ...prevFormData,
        orderItems: originalOrder,
      }));
    } else {
      const originalValue = originalOrderObject[parentKey];
      setFormData((prevFormData: any) => {
        return {
          ...prevFormData,
          //@ts-ignore
          [parentKey]: { ...prevFormData, [parentKey]: originalValue },
        };
      });
    }
  };
  if (parentKey === "") {
    return <div>Select Item From Menu</div>;
  } else if (parentKey === "orderItems") {
    return (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-item-content-container">
          <label htmlFor="ProductName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            name="ProductName"
            onChange={handleChange}
            value={formData.orderItems[childKey]?.ProductName || ""}
          ></input>
        </div>
        <div className="form-item-content-container">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            value={parseInt(formData.orderItems[childKey]?.quantity) as number}
          ></input>
        </div>
        <div className="form-button-container">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        {Object.entries(Object.values(data)[0]).map(([key, value]) => {
          return (
            <div key={key} className="form-item-content-container">
              <label htmlFor={key} className="form-label">
                {key}
              </label>
              {key === "paymentMode" ? (
                <select
                  name={key}
                  id={key}
                  value={formData[parentKey][childKey]}
                  onChange={handleChange}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Netbanking">Netbanking</option>
                  <option value="UPI">UPI</option>
                </select>
              ) : typeof value === "boolean" ? (
                <select
                  name={key}
                  id={key}
                  value={formData[parentKey][key]}
                  onChange={handleChange}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              ) : typeof value === "number" ? (
                <input
                  type="number"
                  name={key}
                  id={key}
                  value={parseInt(formData[parentKey][key], 10)}
                  onChange={handleChange}
                />
              ) : (Object.values(State) as unknown[]).includes(value) ? (
                <select
                  name={key}
                  id={key}
                  value={formData[parentKey][key]}
                  onChange={handleChange}
                >
                  {Object.values(State).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[parentKey][key]}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        })}
        <div className="form-button-container">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    );
  }
}

export default FormGenerator;
