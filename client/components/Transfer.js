import { Form, FormGroup, Input, Label, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";
import styles from "../styles/newTransfer.module.scss";
import React from 'react';

export default class Transfer extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
  return( <div>
      <Label className={styles.label}> Type of transfer (External transfers deduct an additional $5 fee)</Label>
      <div>
      <Button outline color="secondary"> Internal </Button>{' '}
        &nbsp; &nbsp; &nbsp;
        <Button outline color="secondary"> External </Button>{' '}
      </div>
      <br/>

      <Label className={styles.label}> Account to transfer from </Label>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret outline color="secondary">
        Select account
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem> Account 1 </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <br/>


      <Label className={styles.label}> Recepient account </Label>
      <Input
        className={styles.input}
        type="text"
        name="Recepient"
        id="Recepient"
        placeholder="Enter his/her account number"
      />
      <br/>

      <Label className={styles.label}> Amount </Label>
      <Input
        className={styles.input}
        type="text"
        name="Amount"
        id="Amount"
        placeholder="Enter the amount"
      />
      <br/>

      <Label className={styles.label}> Message </Label>
      <Input
        className={styles.input}
        type="text"
        name="Message"
        id="Message"
        placeholder="Enter a brief message"
      />

      <div className={styles.SendButtonContainer}>
        <div className={`${styles.SendButton} unselectable`}>Send</div>
      </div>
    </div>
);
}
}
