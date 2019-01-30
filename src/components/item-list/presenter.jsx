import React from 'react';
import {
    Grid,
    Icon,
    Segment,
    Loader,
    Pagination,
    Dimmer,
    Message,
} from 'semantic-ui-react'
import ItemBox from '../item-box';

function ItemListPresenter({
    list,
    page,
    totalPages,
    loading,
    error,
    onPageChange,
}) {
    let content = null;

    if (loading) {
        content = (
            <Dimmer active inverted>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    } else if (error) {
        content = (
            <Message
                error
                header={error.message}
            />
        )
    } else if (list.length === 0) {
        content = (
            <Message
                warning
                header='No items found'
            />
        )
    } else {
        content = (
            <>
                <Grid columns={15}>
                    {
                        list.map(item => <ItemBox key={item.id} {...item}/>)
                    }
                </Grid>

                <Segment textAlign="right">
                    <Pagination
                        totalPages={totalPages}
                        defaultActivePage={page} 
                        firstItem={page > 1 ? { content: <Icon name='angle double left' />, icon: true } : null}
                        lastItem={page < totalPages ? { content: <Icon name='angle double right' />, icon: true } : null}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        ellipsisItem={null}
                        onPageChange={onPageChange}
                    />
                </Segment>
            </>
        )
    }


    return (
        <div>
            {content}
        </div>
    )
}

export default ItemListPresenter;