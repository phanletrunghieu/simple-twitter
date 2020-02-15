import { Modal } from 'antd';

export function showError(msg) {
    Modal.error({
        title: "Error",
        content: msg,
    });
}

export function showSuccess(msg) {
    Modal.success({
        title: "Success",
        content: msg,
    });
}