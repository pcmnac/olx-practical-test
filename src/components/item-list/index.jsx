import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { push } from 'connected-react-router';
import { actionCreators } from '../../ducks/item';
import ItemListPresenter from './presenter';

class ItemList extends Component {

    componentDidMount() {
        console.log('ItemList component mounted');
        const { listItems, search, page:  cachedPage } = this.props;
        const page = +queryString.parse(search).page || 1;

        if (page !== cachedPage) {
            console.log(`querying for page ${page} after mount and cache not found`);
            listItems(page);
        }
    }

    componentDidUpdate(prevProps) {
        console.log('ItemList component updated');

        const { listItems, search, page:  cachedPage } = this.props;
        const prevPage = +queryString.parse(prevProps.search).page;
        const page = +queryString.parse(search).page || 1;

        if (page && page !== prevPage && page !== cachedPage) {
            console.log(`querying for page ${page} after update`)
            listItems(page);
        }
    }

    handlePageChange = (event, { activePage }) => {
        this.props.push({
            pathname: this.props.pathname,
            search: `?${queryString.stringify({
                page: activePage,
            })}`,
        });
    }


    render() {
        return (
            <ItemListPresenter
                {...this.props}
                onPageChange={this.handlePageChange}
            />
        );
    }
}

const mapStateToProps = ({
    item: { 
        list,
        totalPages,
        page,
        loadingList,
        listError,
    },
    router: {
        location: {
            pathname,
            search,
        } = {},
    } = {},
}) => ({
    list,
    totalPages,
    page,
    loading: loadingList,
    error: listError,
    pathname,
    search,
});

export default connect(mapStateToProps, { ...actionCreators, push })(ItemList);