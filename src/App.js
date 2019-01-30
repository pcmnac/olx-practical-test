import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './conf/redux-store';
import ItemList from './components/item-list';
import ItemDetail from './components/item-detail';
import { Container, Header, Image } from 'semantic-ui-react';
import './App.css';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className="App">
                        <Container>
                            <Header>
                                <Link to="/">
                                    <Image avatar size="tiny" bordered circular src='https://i1.wp.com/espalhafactos.com/wp-content/uploads/2012/06/olx_logo.jpg' />
                                </Link>
                            </Header>
                            <Switch>
                                <Route exact path="/" render={() => (<Redirect to="/list"/>)} />
                                <Route exact path="/list" component={ItemList} />
                                <Route path="/list/:itemId" component={ItemDetail} />
                            </Switch>
                        </Container>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
