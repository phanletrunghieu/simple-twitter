import { Modal } from 'antd';

export function showError(msg) {
    
    Modal.error({
        title: "Error",
        content: msg.toString(),
    });
}

export function showSuccess(msg) {
    Modal.success({
        title: "Success",
        content: msg.toString(),
    });
}