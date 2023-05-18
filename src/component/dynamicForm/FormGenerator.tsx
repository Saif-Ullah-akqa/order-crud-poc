import React, { useState, useEffect } from "react";
import {
  Customer,
  Order,
  OrderItem,
  PaymentDetails,
  PaymentMode,
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
    if (Array.isArray(formData[parentKey])) {
      //@ts-ignore
      const prevArrayItems = [...formData[parentKey]];
      const prevArrayItem = { ...prevArrayItems[childKey] };
      prevArrayItem[name] = parsedValue ? parsedValue : value;
      prevArrayItems[childKey] = prevArrayItem;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentKey]: prevArrayItems,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentKey]: {
          //@ts-ignore
          ...prevFormData[parentKey],
          [name]: value,
        },
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(formData || {});
    e.preventDefault();
  };

  const handleReset = () => {
    const originalArrayObject = JSON.parse(JSON.stringify(originalData)) || {};
    if (Array.isArray(formData[parentKey])) {
      const originalArray = originalArrayObject[parentKey];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentKey]: originalArray,
      }));
    } else {
      const originalValue = originalArrayObject[parentKey];
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [parentKey]: originalValue,
      }));
    }
  };

  if (parentKey === "") {
    return <div>Select Item From Menu</div>;
  } else if (Array.isArray(formData[parentKey])) {
    const title = Object.values(data[parentKey])[0];
    const itemArr = formData[parentKey][childKey];
    return (
      <div>
        <h3> {title as string}</h3>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          {itemArr &&
            formData &&
            Object.entries(itemArr).map(([key, value]) => {
              return (
                <div key={key} className="form-item-content-container">
                  <label htmlFor={key} className="form-label">
                    {key}
                  </label>
                  {typeof value === "number" ? (
                    <input
                      type="number"
                      name={key}
                      id={key}
                      value={value as number}
                      onChange={handleChange}
                    />
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
                  ) : (
                    <input
                      type="text"
                      name={key}
                      id={key}
                      value={value as string}
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
      </div>
    );
  } else {
    const paymentModes: PaymentMode[] = [
      "Credit Card",
      "Debit Card",
      "Netbanking",
      "UPI",
    ];
    return (
      <div>
        <h3>{parentKey}</h3>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          {Object.entries(Object.values(data)[0]).map(([key, value]) => {
            return (
              <div key={key} className="form-item-content-container">
                <label htmlFor={key} className="form-label">
                  {key}
                </label>
                {paymentModes.includes(value as PaymentMode) ? (
                  <select
                    name={key}
                    id={key}
                    value={formData[parentKey][childKey]}
                    onChange={handleChange}
                  >
                    {paymentModes.map((paymentMethod,idx) => {
                      return (
                        <option key={idx} value={paymentMethod}>{paymentMethod}</option>
                      );
                    })}
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
                    value={parseInt(formData[parentKey][key], 10) as number}
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
      </div>
    );
  }
}

export default FormGenerator;
