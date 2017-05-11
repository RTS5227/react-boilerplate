import React from 'react';
import CurrencyInput from '../CurrencyInput';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('render component', () => {
    const defaultProps = {
    };

    it('should display input', () => {
        const tree = renderer.create(
            <CurrencyInput {...defaultProps} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('CurrencyInput keep the empty after click', () => {
        // Render a checkbox with label in the document
        const inline = shallow(
            <CurrencyInput />
        );

        expect(inline.text()).toEqual('');

        inline.simulate('click');

        expect(inline.find('input')).toBeTruthy();
        expect(inline.find('input').first().text()).toEqual('');
    });

    it('should display "100" after pass value "100"', () => {
        const wrapper = shallow(<CurrencyInput value="100"/>);
        expect(wrapper.find('input').length).toBe(1);
        expect(wrapper.state().display).toEqual('100');
    });

    it('should display "0" after pass "0"', () => {
        const input = shallow(<CurrencyInput value="0"/>);
        expect(input.state('display')).toEqual('0');
    });

    it('should display "1" after pass value "1"', () => {
        const input = shallow(<CurrencyInput value="1"/>);
        expect(input.state('display')).toEqual('1');
    });

    it('should display "1.000" after pass value "1000"', () => {
        const input = shallow(<CurrencyInput value="1000"/>);
        expect(input.state('display')).toEqual('1.000');
    });

    it('should display "2.000" after pass value "1000" and change to "2000"', () => {
        const input = shallow(<CurrencyInput value="1000"/>);
        expect(input.state('display')).toEqual('1.000');
        input.simulate('change', {target: {value: '2000'}});
        expect(input.state('display')).toEqual('2.000');
    });

    it('should display "2.000" after pass value "1000" and change to "2.000"', () => {
        const input = shallow(<CurrencyInput value="1000"/>);
        expect(input.state('display')).toEqual('1.000');
        input.simulate('change', {target: {value: '2.000'}});
        expect(input.state('display')).toEqual('2.000');
    });

    it('should display "22" after pass value "2.2"', () => {
        const {component} = setup("2.2");
        expect(component.state('display')).toEqual('22');
    })

    it('should display "22" after pass value "2aaa2"', () => {
        const {component} = setup("2aaa2");
        expect(component.state('display')).toEqual('22');
    })

    it('should display "2.000" after pass value "1000" and change to "2,000"', () => {
        const input = shallow(<CurrencyInput value="1000"/>);
        expect(input.state('display')).toEqual('1.000');
        input.simulate('change', {target: {value: '2,000'}});
        expect(input.state('display')).toEqual('2.000');
    });

    it('should display "2.000" after type 2-.-0-0-0', () => {
        const input = shallow(<CurrencyInput value=""/>);
        input.simulate('change', {target: {value: '2'}});
        input.simulate('change', {target: {value: '2.'}});
        input.simulate('change', {target: {value: '2.0'}});
        input.simulate('change', {target: {value: '2.00'}});
        input.simulate('change', {target: {value: '2.000'}});
        expect(input.state('display')).toEqual('2.000');
    });

    it('should display "20.000" after type 2-0-0-0-0', () => {
        const input = shallow(<CurrencyInput value=""/>);
        input.simulate('change', {target: {value: '2'}});
        expect(input.state('display')).toEqual('2');
        input.simulate('change', {target: {value: '20'}});
        expect(input.state('display')).toEqual('20');
        input.simulate('change', {target: {value: '200'}});
        expect(input.state('display')).toEqual('200');
        input.simulate('change', {target: {value: '2000'}});
        expect(input.state('display')).toEqual('2.000');
        input.simulate('change', {target: {value: '2.0000'}});
        expect(input.state('display')).toEqual('20.000');
    });

    it('should display "2.000" after type 2-,-0-0-0', () => {
        const input = shallow(<CurrencyInput value=""/>);
        input.simulate('change', {target: {value: '2'}});
        input.simulate('change', {target: {value: '2,'}});
        input.simulate('change', {target: {value: '2,0'}});
        input.simulate('change', {target: {value: '2,00'}});
        input.simulate('change', {target: {value: '2,000'}});
        expect(input.state('display')).toEqual('2.000');
    });
})

function setup(value = 0) {
    const actions = {
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onKeyUp: jest.fn()
    }
    const component = shallow(
        <CurrencyInput value={value} {...actions} />
    )
    return {
        component, actions,
        input: component.find('input')
    }
}

describe('call component actions', () => {
    it('change input should call onChange ', () => {
        const {input, actions} = setup();
        input.at(0).simulate('change', {target: {value: 0}});
        expect(actions.onChange).toBeCalled()
    });
    it('change input to "2.2" should call onChange(22)', () => {
        const {input, actions} = setup();
        input.at(0).simulate('change', {target: {value: "2.2"}});
        expect(actions.onChange).toBeCalledWith(22)
    })
    it('change input to "2a2" should call onChange(22)', () => {
        const {input, actions} = setup();
        input.at(0).simulate('change', {target: {value: "2a2"}});
        expect(actions.onChange).toBeCalledWith(22)
    })
    it('change input to "2000" should call onChange(2000)', () => {
        const {input, actions} = setup();
        input.at(0).simulate('change', {target: {value: "2000"}});
        expect(actions.onChange).toBeCalledWith(2000)
    })
    it('change input to "2.0000" should call onChange(20000)', () => {
        const {input, actions} = setup();
        input.at(0).simulate('change', {target: {value: "2.0000"}});
        expect(actions.onChange).toBeCalledWith(20000)
    })
    it('remove all input from "2.3" should call onChange(null)', () => {
        const {input, actions} = setup("2.3");
        input.at(0).simulate('change', {target: {value: "2."}});
        expect(actions.onChange).toBeCalledWith(2)

        input.at(0).simulate('change', {target: {value: ""}});
        expect(actions.onChange).toBeCalledWith(null)
    })



    it('blur input should call onBlur', () => {
        const {input, actions} = setup();
        input.at(0).simulate('blur', {target: {value: "2.2"}});
        expect(actions.onBlur).toBeCalled()
    })
    it('blur input with "2.000" should call onBlur(2000)', () => {
        const {input, actions} = setup();
        input.at(0).simulate('blur', {target: {value: "2.000"}});
        expect(actions.onBlur).toBeCalledWith(2000)
    })
    it('blur input with "2.0000" should call onBlur(20000)', () => {
        const {input, actions} = setup();
        input.at(0).simulate('blur', {target: {value: "2.0000"}});
        expect(actions.onBlur).toBeCalledWith(20000)
    })
    it('keyUp input should call onKeyUp', () => {
        const {input, actions} = setup();
        input.at(0).simulate('keyUp', {target: {value: 0}});
        expect(actions.onKeyUp).toBeCalled()
    })
})