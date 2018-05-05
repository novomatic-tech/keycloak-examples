import React from 'react';
import {Paper, Typography, Button} from 'material-ui';
import PropTypes from 'prop-types';
import {connected} from '../store/connected';
import {getProducts} from '../actions/productsActions';
import {getTokenPayload} from '../util';

const canViewProducts = (user) => {
    const payload = getTokenPayload(user.access_token);
    return payload.resource_access['product-service'] &&
        payload.resource_access['product-service'].roles.indexOf('view-products') !== -1;
};

const HomePage = ({ products, actions, user }) => {
    return (
            <Paper style={{width: '1000px', padding: '3em'}}>
                <Typography variant="display2">Welcome</Typography>
                <p>This is a sample React application implementing <strong>OAuth2.0's Implicit grant</strong></p>
                {user &&
                    <div>
                        <Button variant="raised" disabled={!canViewProducts(user)} color="primary"
                                onClick={() => actions.getProducts().catch()}>
                            List products
                        </Button>
                        <ul>
                            {products && products.map(product => (
                                <li>{product}</li>
                            ))}
                        </ul>
                    </div>
                }
            </Paper>
    );
};

HomePage.propTypes = {
    user: PropTypes.object,
    products: PropTypes.array,
    actions: PropTypes.shape({
        getProducts: PropTypes.func.isRequired
    })
};

export default connected(HomePage)
    .mappingStateToProps((state) => {
        return {
            user: state.oidc.user,
            products: state.products
        };
    })
    .mappingActionsToProps({ getProducts })
    .build();