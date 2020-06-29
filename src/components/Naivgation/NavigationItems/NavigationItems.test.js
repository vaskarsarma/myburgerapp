import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems>', () => {
	let wrapper = '';
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});
	it('2 navigations if not authorized', () => {
		// wrapper = shallow(<NavigationItems />);
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('3 navigations if authorized', () => {
		// wrapper = shallow(<NavigationItems isAuthenticated='true' />);
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('Component is not empty', () => {
		const wrapper = shallow(<NavigationItems />);
		expect(wrapper.find(NavigationItem).exists()).toBe(true);
	});

	it('logout navigation should preset if authorized', () => {
		// wrapper = shallow(<NavigationItems isAuthenticated='true' />);
		wrapper.setProps({ isAuthenticated: true });
		expect(
			wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>),
		).toEqual(true);
	});
});
