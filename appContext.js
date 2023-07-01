import React from "react";

export const user = {
    userName: "Bangalore",
}

const globalContext = {
    city: user.userName,
    changeCity: () => { }
}

export const AppContext = React.createContext(globalContext)