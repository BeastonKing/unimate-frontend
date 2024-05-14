import React from "react";
import { useState } from "react";

const CheckSessionButton = () => {
  const [sessionData, setSessionData] = useState(null);

  const checkSession = () => {
    const sessionKeys = Object.keys(sessionStorage);
    const sessionValues = sessionKeys.map((key) => {
      return { [key]: sessionStorage.getItem(key) };
    });
    setSessionData(sessionValues);
  };

  const clearSession = () => {
    sessionStorage.clear();
    setSessionData(null);
  };

  return (
    <div>
      <button
        onClick={checkSession}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
      >
        Check Session
      </button>
      <button
        onClick={clearSession}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear Session
      </button>
      {sessionData && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Session Data:</h3>
            <ul>
              {sessionData.map((item, index) => (
                <li key={index}>
                  {Object.keys(item)}: {Object.values(item)}
                </li>
              ))}
            </ul>
          </div>
        ) &&
        console.log(JSON.parse(sessionData[0].questions))}
    </div>
  );
};

export default CheckSessionButton;
