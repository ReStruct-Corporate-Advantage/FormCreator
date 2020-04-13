import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom';
import Createform from './pages/Createform'
import Createattribute from './pages/Createattribute'
import Displayform from './pages/Displayform'
import TabbedRoot from './pages/TabbedRoot/TabbedRoot';

class Router extends React.Component {

    render() {
        const {store} = this.props
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route exact path="/" component={TabbedRoot} />
                    <Route exact path="/create/form" component={Createform} />
                    <Route exact path="/create/attribute" component={Createattribute} />
                    <Route exact path="/display/form" component={Displayform} />
                </BrowserRouter>
            </Provider>
        )
    }
}

Router.propTypes = {
    store: PropTypes.object
}

export default Router;
