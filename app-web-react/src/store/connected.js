import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

class ComponentConnection {

    constructor(component) {
        this.component = component;
        this.mapStateToProps = {};
        this.actions = {};
    }

    mappingStateToProps(mapStateToProps) {
        this.mapStateToProps = mapStateToProps;
        return this;
    }

    mappingActionsToProps(actions) {
        this.actions = Object.assign({}, this.actions, actions);
        return this;
    }

    build() {
        const actions = this.actions;
        const mapDispatchToProps = (dispatch) => {
            return {
                actions: bindActionCreators(actions, dispatch)
            };
        };
        return withRouter(connect(this.mapStateToProps, mapDispatchToProps)(this.component));
    }
}

export function connected(component) {
    return new ComponentConnection(component);
}