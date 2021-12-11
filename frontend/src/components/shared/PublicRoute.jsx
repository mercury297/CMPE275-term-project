import React from "react"
import {Redirect, Route} from "react-router-dom";

export const PublicRoute = ({children, isLoggedIn, ...rest}) => {
    let pathname = '/'
    return (
        <Route
            {...rest}
            render={({ location }) => !isLoggedIn ? (
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
