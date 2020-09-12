import React from 'react';
import {
    Col, Form, Button,
} from 'react-bootstrap';

export const InputChangePassword = (props: any): JSX.Element => (
    <Col sm={{ offset: 1, span: '7' }}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>New password:</Form.Label>
            <Form.Control
                type="password"
                value={props.password}
                onChange={props.onChangePass}
            />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>New password confirmation:</Form.Label>
            <Form.Control
                type="password"
                value={props.confirmPassword}
                onChange={props.onChangeConfirmPass}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Change Password
        </Button>
    </Col>
);