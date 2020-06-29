import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';

import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
	let wrapper = '';

	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitiateIngredient={() => {}} />);
	});

	it('BurgerControls component should be available if ingredient and totalprice is not null', () => {
		wrapper.setProps({ ingnt: { salad: 1 }, tPrice: 5 });
		expect(wrapper.find(BurgerControls)).toHaveLength(1);
	});

	it('BurgerControls component should not be available if ingredient and totalprice is null', () => {
		wrapper.setProps({ ingnt: null, tPrice: 5 });
		expect(wrapper.find(BurgerControls)).toHaveLength(0);
	});
});
