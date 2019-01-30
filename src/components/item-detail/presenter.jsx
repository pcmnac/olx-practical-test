import React from 'react';
import {
    Dimmer,
    Loader,
    Message,
    Card,
    Grid,
    Icon,
    Label,
    Divider,
    Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SemanticCOLORS = [
    'violet',
    'teal',
    'orange',
    'yellow',
    'olive',
    'green',
    'blue',
    'purple',
    'pink',
    'brown',
    'grey',
    'red',
    'black',
];

function ItemDetailPresenter({
    item: {
        title,
        created,
        description,
        city_label,
        params = [],
    } = {},
    error,
    loading,
    page,
}) {
    let content = null;

    if (loading) {
        content = (
            <Dimmer active inverted>
                <Loader>Loading Item</Loader>
            </Dimmer>
        );
    } else if (error) {
        content = (
            <Message
                error
                header={error.message}
            />
        )
    } else {
        content = (
            <Grid>
                <Grid.Column computer={13} tablet={16} stretched>
                    <Card className="item-detail">
                        <Card.Content>
                            <Card.Header>
                                {title}
                            </Card.Header>
                            <Card.Meta>{created}</Card.Meta>
                            <Card.Description>
                                {description}                                    
                                <br/>
                                <Divider />
                                <Icon name='map marker alternate' />{city_label}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            {
                                params.map(([key, value], i) => (
                                    <Label key={key} as='a' color={SemanticCOLORS[i % SemanticCOLORS.length]} image>
                                        {key}
                                        <Label.Detail>{value}</Label.Detail>
                                    </Label>
                                ))
                            }
                           
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        )
    }

    return (
        <div>
            {content}

            <br/>
            {
                page > 0 &&
                <Link to={`/list?page=${page}`}>
                    <Button icon><Icon name="arrow alternate circle left"/> Back</Button>
                </Link> 
            }
        </div>
    )
}

export default ItemDetailPresenter;