import React from 'react';
import {connected} from '../store/connected';
import {Paper} from 'material-ui';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';
import Typography from 'material-ui/Typography';

const getTokenPayload = (token) => {
    const encodedPayload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
    return JSON.stringify(JSON.parse(atob(encodedPayload)), null, 2);
};

const inspectToken = (token) => {
    window.location = `https://jwt.io/?token=${token}`;
};

class Token extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenDecoded: false
        };
    }

    toggleDecode = () => {
        const tokenDecoded = !this.state.tokenDecoded;
        this.setState({ tokenDecoded });
    };

    render() {
        const { tokenDecoded } = this.state;
        const { token, tokenName } = this.props;
        return (
            <Paper style={{ padding: '1em', margin: '1em' }}>
                <Typography variant="display1" style={ { float: 'left' } }>{tokenName}</Typography>
                <div style={ { float: 'right' } }>
                    <Button onClick={this.toggleDecode} variant="raised" color="primary">
                        {tokenDecoded ? <VisibilityOffIcon/> : <VisibilityIcon />}&nbsp;
                        {tokenDecoded ? 'Encode' : 'Decode'}
                    </Button>&nbsp;
                    <Button onClick={() => inspectToken(token)} variant="raised">Inspect in jwt.io</Button>
                </div>
                <div style={ { clear: 'both' } } />
                <pre>
                    {tokenDecoded ? getTokenPayload(token) : token}
                </pre>
            </Paper>
        );
    }
}

Token.propTypes = {
    token: PropTypes.string.required,
    tokenName: PropTypes.string.required,
};


const AccountPage = ({ user }) => {
    if (!user) {
        return <Typography variant="display1">Please sign in to view this page</Typography>;
    }
    return (
        <Paper style={{ margin: '0 10em', padding: '3em', width: '1000px' }}>
            <Typography variant="display2">Account</Typography>
            <Token tokenName="ID token" token={user.id_token} />
            <Token tokenName="Access token" token={user.access_token} />
        </Paper>);
};

AccountPage.propTypes = {
    user: PropTypes.object,
};

export default connected(AccountPage)
    .mappingStateToProps((state) => {
        return {
            user: state.oidc.user
        };
    })
    .build();