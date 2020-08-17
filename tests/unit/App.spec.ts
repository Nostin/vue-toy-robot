// integration tests
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import store from '../../src/store'

describe('Test the Examples provided in the problem spec', () => {
  it('Example A: should report Output: 0,1,NORTH', async () => {
    const wrapper = mount(App, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any

    input.element.value = 'PLACE 0,0,NORTH'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'MOVE'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'REPORT'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('p span').text()).toEqual('0,1,NORTH')
  })

  it('Example B: should report Output: 0,0,WEST', async () => {
    const wrapper = mount(App, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any

    input.element.value = 'PLACE 0,0,NORTH'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'LEFT'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'REPORT'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('p span').text()).toEqual('0,0,WEST')
  })

  it('Example B: should report Output: 3,3,NORTH', async () => {
    const wrapper = mount(App, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any

    input.element.value = 'PLACE 1,2,EAST'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'MOVE'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'MOVE'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'LEFT'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'MOVE'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    input.element.value = 'REPORT'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('p span').text()).toEqual('3,3,NORTH')
  })
})
