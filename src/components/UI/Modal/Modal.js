import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import AUX from '../../../hoc/Hoc/hoc-aux';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		);
	}

	render() {
		//console.log("Model : show " + this.props.show);
		return (
			<AUX>
				<Backdrop show={this.props.show} clicked={this.props.cancelPurchase} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					{this.props.children}
				</div>
			</AUX>
		);
	}
}

export default Modal;
