import React, { Component } from 'react';
import AUX from '../Hoc/hoc-aux';
import classes from './Layout.css';
import Toolbar from '../../components/Naivgation/Toolbar/Toolbar';
import SideDrawer from '../../components/Naivgation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	closeSidedrawerHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	showSidedrawerHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<AUX>
				<Toolbar
					closed={this.showSidedrawerHandler}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.closeSidedrawerHandler}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</AUX>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
