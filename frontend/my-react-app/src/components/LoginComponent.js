import React from 'react';
import { Form, Button } from 'react-bootstrap';


const LoginComponent = ({ buttonText, formFields, onSubmit, children }) => (
    <Form onSubmit={onSubmit}>
        {formFields.map((field, index) => (
            <Form.Group key={index} controlId={field.controlId}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control type={field.type} placeholder={field.placeholder} />
            </Form.Group>
        ))}
        <Button className="form-btn mt-3" variant="dark" type="submit">{buttonText}</Button>
        { children }
    </Form>
);

export default LoginComponent;
