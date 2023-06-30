import React from "react";

export const cities = {
    userName: "Bangalore",
}

const globalContext = {
    city: cities,
    changeCity: () => { }
}

export const AppContext = React.createContext(globalContext)