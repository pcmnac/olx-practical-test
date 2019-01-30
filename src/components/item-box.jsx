import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Button, Icon } from 'semantic-ui-react';

function ItemBox({
    title,
    id,
    created,
    city_label,
}) {
    return (
        <Grid.Column computer={5} tablet={8} mobile={16} stretched>
            <Card className="item-box">
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{created}</Card.Meta>
                    <Card.Description>
                        <Icon name='map marker alternate' /> {city_label}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Link to={`/list/${id}`}>
                        <div className='ui two buttons'>
                            <Button basic color='green' animated='vertical'>
                                <Button.Content hidden>View Details</Button.Content>
                                <Button.Content visible>
                                        <Icon name='search' />
                                </Button.Content>
                            </Button>
                        </div>
                    </Link>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default ItemBox;