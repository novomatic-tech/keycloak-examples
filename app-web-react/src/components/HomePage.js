import React from 'react';
import {Paper, Typography} from 'material-ui';

const HomePage = () => {
    return (
            <Paper style={{width: '1000px', padding: '3em'}}>
                <Typography variant="display2">Welcome</Typography>
                <p>This is a sample React application implementing <strong>OAuth2.0's Implicit grant</strong></p>
            </Paper>
    );
};

export default HomePage;