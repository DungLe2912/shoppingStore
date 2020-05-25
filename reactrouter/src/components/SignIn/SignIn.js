import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
SignIn.propTypes = {

};

function SignIn(props) {
    return (
        <React.Fragment>
            <Dropdown as={ButtonGroup}>
                <Button variant="success">Split Button</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item >Action</Dropdown.Item>
                    <Dropdown.Item >Another action</Dropdown.Item>
                    <Dropdown.Item >Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default SignIn;