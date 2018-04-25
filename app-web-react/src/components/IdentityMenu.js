import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Menu} from 'material-ui';
import PropTypes from 'prop-types';
import AccountIcon from 'material-ui-icons/AccountCircle';
import ChangePasswordIcon from 'material-ui-icons/Lock';
import SignOutIcon from 'material-ui-icons/ExitToApp';
import {MenuItem} from 'material-ui/Menu';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: 2 * theme.spacing.unit,
    },
    profileButton: {
        color: '#ffffff',
        fontWeight: 300,
        fontSize: '1rem',
        textTransform: 'none',
        paddingLeft: '3px',
        paddingRight: '0px',
    },
});

class IdentityMenu extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    menuOpen = event => {
        this.setState({open: true, anchor: event.currentTarget});
    };

    menuClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, userName, isAuthenticated, signIn, signOut, changePassword} = this.props;
        const {open} = this.state;
        return (
            <div className={classes.root}>
                {isAuthenticated ?
                    (<div>
                        <Button id='menu-profile' className={classes.profileButton}
                            aria-owns={open ? 'menu-list' : null}
                            aria-haspopup="true"
                            onClick={this.menuOpen}>
                            {isAuthenticated && userName}
                            <AccountIcon className={`${classes.rightIcon} appIcon`}/>
                        </Button>
                        <Menu
                            id="menu-authenticated"
                            anchorEl={this.state.anchor}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            transformOrigin={{horizontal: 'left', vertical: 'top'}}
                            getContentAnchorEl={null}
                            transitionDuration={0}
                            open={this.state.open}
                            onClose={this.menuClose}>
                            <MenuItem key="placeholder" style={{display: 'none'}}/>
                            <Link to="/account">
                                <MenuItem>
                                    <AccountIcon className={classes.leftIcon}/>
                                    Account
                                </MenuItem>
                            </Link>
                            <MenuItem id='menu-change-password' onClick={changePassword}>
                                <ChangePasswordIcon className={classes.leftIcon}/>
                                Change password
                            </MenuItem>
                            <MenuItem id='menu-sign-out' onClick={event => {
                                this.menuClose();
                                signOut(event);
                            }}>
                                <SignOutIcon className={classes.leftIcon}/>
                                Sign out
                            </MenuItem>
                        </Menu>
                    </div>)
                    :
                    (<Button className={classes.profileButton} onClick={signIn}>Sign in</Button>)
                }
            </div>
        );
    }
}

IdentityMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    userName: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired
};

export default withStyles(styles)(IdentityMenu);