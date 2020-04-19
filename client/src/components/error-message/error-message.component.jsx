import React from 'react';

import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from './error-message.styles'; 

const ErrorMessage = () => ( 

    <ErrorImageOverlay>
        <ErrorImageContainer imageUrl="https://i.ibb.co/v3qSGm0/sad-Dragon.jpg"/>
        <ErrorImageText>Ooops!<br/>One of our dragons broke something.<br/>We'll try and not let that happen again.<br/>He's been warned.</ErrorImageText>
    </ErrorImageOverlay>
);

export default ErrorMessage;