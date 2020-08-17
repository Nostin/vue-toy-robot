import { mount } from '@vue/test-utils'
import CommandLine from '@/components/CommandLine.vue'
import { BaseCommandEnum, RobotFaceDirectionEnum } from '../../src/globalTypes'
import store from '../../src/store'

describe('Command Line Test Suite', () => {
  it('renders the command line', () => {
    const wrapper = mount(CommandLine)
    expect(wrapper.find('p').text()).toEqual('Please type your commands here:')
  })

  it('Should not allow a command not in the Enum list', async () => {
    const allowedCommands = Object.values(BaseCommandEnum) as string[]
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'COMMANDO'
    input.trigger('change')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual(
      `Bad command, Please use one of: ${Object.values(allowedCommands).join(', ')}`
    )
  })

  // PLACE
  it('Should not allow PLACE unless 4 arguments are in the command', async () => {
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'PLACE 1 1'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual('Bad Command: expected 4 arguments')
  })

  it('Should not allow bad X coordinate with PLACE', async () => {
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'PLACE X 0 NORTH'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual('Bad Command: X and Y coordinates must be integers')
  })

  it('Should not allow bad Y coordinate with PLACE', async () => {
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'PLACE 0 X NORTH'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual('Bad Command: X and Y coordinates must be integers')
  })

  it('Should not allow invalid direction facing with PLACE', async () => {
    const allowedDirections = Object.values(RobotFaceDirectionEnum) as string[]
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'PLACE 1 1 NORF'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual(
      `Bad Command: direction must be one of ${Object.values(allowedDirections).join(', ')}`
    )
  })

  it('Should not allow robot PLACE off the table', async () => {
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'PLACE 1 7 WEST'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual('Bad Command: coordinates are off the table')
  })

  // LEFT and RIGHT
  it('Should not allow unplaced robot to turn LEFT', async () => {
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'LEFT'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual('Cannot turn unplaced robot')
  })

  // REPORT
  it('Should not allow reporting before robot is placed', async () => {
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'REPORT'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual('Cannot report position of unplaced robot')
  })

  // MOVE
  it('No Robot on the Table shouldnt move', async () => {
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any
    input.element.value = 'MOVE'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error').text()).toEqual('Cannot move unplaced robot')
  })

  it('South Facing Robot at Y coord 0 should not move', async () => {
    const wrapper = mount(CommandLine, { store })
    const input: any = wrapper.find('input') // eslint-disable-line @typescript-eslint/no-explicit-any

    // Place the robot at the bottom facing south at the edge
    input.element.value = 'PLACE 0 0 SOUTH'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    // Send the robot off the south side of the table to its doom
    input.element.value = 'MOVE'
    await input.trigger('input')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('.error').text()).toEqual('Cannot move robot off the table')
  })
})
