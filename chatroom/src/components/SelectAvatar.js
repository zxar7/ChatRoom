import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import {avatars} from '../data/users'

export default class SelectAvatar extends Component {

    onSelect = (e, { data }) => {
        this.props.setupUser(data)
    }

    render() {
        return (
            <div className='selectContainer'>
                <div className="selectHeader">Select An Avatar!!!</div>
                <div className="avatars" >
                    {avatars.map(avt =>
                        <Card
                            key={avt.userId}
                            data={avt}
                            onClick={this.onSelect}
                            className="indCard"
                            image={avt.src}
                            style={{backgroundColor: avt.bgColor, color: avt.color}}
                            header={avt.name} />
                        )
                    }
                </div>
            </div>
        )
    }
}