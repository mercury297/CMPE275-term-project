import React from 'react'
import {Redirect, Route} from "react-router-dom";

export const PrivateRoute = ({children, isLoggedIn, ...rest}) => {
    let pathname = '/login'
    return (
        <Route
            {...rest}
            render={({ location }) => isLoggedIn ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname,
                        state: { from: location },
                    }}
                />
            )}
        />
    )
}
