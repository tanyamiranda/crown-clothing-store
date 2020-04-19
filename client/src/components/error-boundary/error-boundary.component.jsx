import React from 'react';

import ErroMessage from '../error-message/error-message.component';

class ErrorBoundary extends React.Component {

    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    componentDidCatch(error, info) {
        console.log("ErrorPage error:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErroMessage />
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;