import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { actionCreators } from '../../ducks/item';
import ItemDetailPresenter from './presenter';

class ItemDetail extends Component {

    componentDidMount() {
        console.log('ItemDetail component mounted');
        const {
            item,
            match: {
                params: {
                    itemId,
                },
            },
            detailItem,
        } = this.props;

        if (!item || item.id !== itemId) {
            console.log(`querying for item ${itemId} after mount and not found in cache`);
            detailItem(itemId);
        }
    }

    handleBackClick = () => {
        this.props.goBack();
    }

    render() {

        return (
            <ItemDetailPresenter {...this.props} />
        )
    }
}

const mapStateToProps = ({
    item: {
        selected,
        itemError,
        loadingItem,
        itemLoadedFromRouter,
        page,
    }
}) => ({
    item: selected,
    loading: loadingItem,
    error: itemError,
    itemLoadedFromRouter,
    page,
});

export default connect(mapStateToProps, { ...actionCreators, goBack })(ItemDetail);