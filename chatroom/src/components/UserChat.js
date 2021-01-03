import React, { Component } from 'react';
import { Card, Form, TextArea, Button, Header } from 'semantic-ui-react';
import { saveUserMessage } from '../services';

export const ShowPassiveUser = (props) => {
    const { activeUser } = props;
    const { messages, name, bgColor, color } = activeUser || {}
    return (
        messages?.length ?
            <div>
                <Header className="emptyMessage">{name}'s Messages</Header >
                {messages.map(msg => {
                    const time = new Date(msg.timestamp || '');
                    const timestamp = time.toDateString() + ' ' + time.toLocaleTimeString();
                    return <Card
                        style={{ "background": `radial-gradient(${bgColor} 59%, rgb(0 0 0 / 0%) 78%)`, color }}
                        className='userMessage'
                        description={msg.message || ''}
                        header={timestamp}
                    />
                })}
            </div>
            :
            <div className="emptyMessage">{name} hasn't shared anything yet! Still waiting...</div>
    )
}

export class ShowActiveUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            message: e?.target?.value
        })
    }


    saveMessage = async () => {
        await saveUserMessage({ message: this.state.message });
        this.setState({
            message: ''
        })
    }

    render() {
        const { activeUser } = this.props;
        const { messages, name, bgColor, color } = activeUser || {}
        return (
            <div className="messageSection">
                <Form className='messageArea'>
                    <TextArea placeholder='Wanna say something?' value={this.state.message} onChange={this.onValueChange} />
                    <Button primary disabled={!this.state.message} onClick={this.saveMessage} content='SAVE' />
                </Form>
                {messages.length ?
                    <>
                        <Header className="emptyMessage">Past Messages</Header >
                        {messages.map(msg => {
                            const time = new Date(msg.timestamp || '');
                            const timestamp = time.toDateString() + ' ' + time.toLocaleTimeString();
                            return <Card
                                style={{ backgroundColor: bgColor, color }}
                                className='userMessage'
                                description={msg.message || ''}
                                header={timestamp}
                            />
                        })}
                    </> :
                    <div className='emptyMessage'>Hey {name}. Say something. They're waiting... </div>
                }
            </div>
        )
    }
}

export default class UserChat extends Component {
    render() {
        const { currentUser, activeUser } = this.props;
        return (
            <div>
                <Card
                    className="indCard"
                    image={activeUser.src}
                    style={{ "background": `radial-gradient(${activeUser.bgColor} 59%, rgb(0 0 0 / 0%) 78%)`, color: activeUser.color }}
                    header={activeUser.name} />
                {currentUser ?
                    <ShowActiveUser activeUser={activeUser} />
                    :
                    <ShowPassiveUser activeUser={activeUser} />
                }
            </div>
        )
    }
}
