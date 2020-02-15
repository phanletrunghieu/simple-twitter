import React, { PureComponent } from 'react'
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { MessageAction } from '../redux/message'
import { showError, showSuccess } from '../utils/error'

class ErrorMessage extends PureComponent {
    componentDidUpdate(){
        let messages = this.props.message.messages

        if (messages.length <= 0) {
            return
        }

        let msg = messages[0]
        this.props.removeError(msg)
        if (msg.type == "error") {
            showError(msg.message)
        } else if (msg.type == "success") {
            showSuccess(msg.message)
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    message: state.message,
})

const mapDispatchToProps = dispatch => ({
    removeError: (err) => dispatch(MessageAction.removeError(err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage)
