/* eslint-disable react/jsx-filename-extension */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import snap from 'misc/test/snap'
import Input from './input'
import InputContainer from './input.container'
import { UPDATE_PROP, updateProp } from '../../../../redux/model'

describe('component/props/input', () => {
  describe('input.jsx', () => {
    const snapshot = snap(Input)
    const component = { name: 'foo', propType: 'string', type: 'text', onChange: jest.fn() }

    describe('common props', () => {
      it('should take custom className', snapshot({ ...component, className: 'custom' }))
      it('should take custom style', snapshot({ ...component, style: { backgroundColor: 'red' } }))
    })

    describe('input type="text"', () => {
      it('should render a textfield', snapshot(component))
      it(
        'should set a default value',
        snapshot({ ...component, value: 'bar' })
      )
      it('should trigger onChange events', () => {
        // data & mocks
        const props = { ...component, onChange: jest.fn() }
        const wrapper = mount(<Input {...props} />)

        // simulate
        wrapper.find('input').simulate('change', { target: { value: 'baz' } })

        // asserts
        expect(props.onChange.mock.calls.length).toBe(1)
        expect(props.onChange.mock.calls[0][0].target.value).toBe('baz')
      })
    })

    describe('input type="checkbox"', () => {
      it('should render a checkbox', snapshot({ ...component, type: 'checkbox', propType: 'bool' }))
      it('should set a default value', snapshot({ ...component, value: true }))
      it('should trigger onChange events', () => {
        // data & mocks
        const props = { ...component, onChange: jest.fn() }
        const wrapper = mount(<Input {...props} />)

        // simulate
        wrapper.find('input').simulate('change', { target: { checked: true } })

        // asserts
        expect(props.onChange.mock.calls.length).toBe(1)
        expect(props.onChange.mock.calls[0][0].target.checked).toBe(true)
      })
    })
  })

  describe('input.container.js', () => {
    // utility function to create a snapshot of the component
    const snapshotContainer = (name, store) => {
      const container = renderer.create(
        <Provider store={store}>
          <InputContainer name={name} />
        </Provider>
      )
      const tree = container.toJSON()
      expect(tree).toMatchSnapshot()
    }

    describe('model with type string', () => {
      it('should render a textfield', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'string' } },
              },
            },
          },
          model: { foo: undefined },
        }))
        snapshotContainer('foo', store)
      })
      it('should render a textfield with value', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'string' } },
              },
            },
          },
          model: { foo: 'foo' },
        }))
        snapshotContainer('foo', store)
      })
      it(`should trigger dispatch ${UPDATE_PROP} when value was changed`, () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'string' } },
              },
            },
          },
          model: { foo: 'foo' },
        }))
        store.dispatch = jest.fn()

        const wrapper = mount(
          <Provider store={store}>
            <InputContainer name="foo" />
          </Provider>
        )

        wrapper.find('input').simulate('change', { target: { value: 'baz' } })

        expect(store.dispatch.mock.calls.length).toBe(1)
        expect(store.dispatch.mock.calls[0]).toEqual([updateProp('foo', 'string', 'baz')])
      })
    })

    describe('model with type bool', () => {
      it('should render a checkbox', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'bool' } },
              },
            },
          },
          model: { foo: undefined },
        }))
        snapshotContainer('foo', store)
      })
      it('should render a checkbox with value', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'bool' } },
              },
            },
          },
          model: { foo: true },
        }))
        snapshotContainer('foo', store)
      })
      it(`should trigger dispatch ${UPDATE_PROP} when value was changed`, () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'bool' } },
              },
            },
          },
          model: { foo: false },
        }))
        store.dispatch = jest.fn()

        const wrapper = mount(
          <Provider store={store}>
            <InputContainer name="foo" />
          </Provider>
        )

        wrapper.find('input').simulate('change', { target: { checked: true } })

        expect(store.dispatch.mock.calls.length).toBe(1)
        expect(store.dispatch.mock.calls[0]).toEqual([updateProp('foo', 'bool', true)])
      })
    })

    describe('model with type array', () => {
      it('should render a textfield', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'array' } },
              },
            },
          },
          model: { foo: undefined },
        }))
        snapshotContainer('foo', store)
      })
      it('should render a textfield with value', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'array' } },
              },
            },
          },
          model: { foo: ['item1', 'item2'] },
        }))
        snapshotContainer('foo', store)
      })
    })

    describe('model with type object', () => {
      it('should render a textfield', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'object' } },
              },
            },
          },
          model: { foo: undefined },
        }))
        snapshotContainer('foo', store)
      })
      it('should render a textfield with value', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'object' } },
              },
            },
          },
          model: { foo: { item: 'value' } },
        }))
        snapshotContainer('foo', store)
      })
    })

    describe('model with type function', () => {
      it('should render a textfield', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'func' } },
              },
            },
          },
          model: { foo: undefined },
        }))
        snapshotContainer('foo', store)
      })
      it('should render a textfield with value', () => {
        const store = createStore(() => ({
          docgen: {
            data: {
              props: {
                foo: { type: { name: 'func' } },
              },
            },
          },
          model: { foo: '() => {}' },
        }))
        snapshotContainer('foo', store)
      })
    })
  })
})
