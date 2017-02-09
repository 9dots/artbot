/** @jsx element */

import handleActions from '@f/handle-actions'
import {setUrl} from 'redux-effects-location'
import Controls from '../components/Controls'
import createAction from '@f/create-action'
import Output from '../components/Output'
import {initializeGame} from '../actions'
import Button from '../components/Button'
import OptionsPage from './OptionsPage'
import Tabs from '../components/Tabs'
import objEqual from '@f/equal-obj'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

const EDIT_CODE = 'Edit Code'
const updateTime = createAction('<Game/>: UPDATE_TIME')
const updateInitialData = createAction('<Game/>: UPDATE_INITIAL_DATA')
const changeTab = createAction('CHANGE_TAB')

function initialState ({props, local}) {
  return {
    tab: props.mine ? 'options' : 'code',
    elapsedTime: 0,
    initialData: props.initialData || props.game,
    actions: {
      tabChanged: local((name) => changeTab(name)),
      updateInitialData: local(updateInitialData)
    }
  }
}

function * onCreate ({props, state, local}) {
  if (props.initialData) {
    yield initializeGame(props.initialData)
  }
}

function * onUpdate (prev, {props, state, local}) {
  if (!objEqual(prev.props.gameData || {}, props.gameData || {})) {
    yield initializeGame(props.initialData)
  }
  if (!props.saveID && prev.props.game.startCode !== props.game.startCode) {
    yield state.actions.updateInitialData(props.game)
  }
}

function render ({props, state, local, children}) {
  const {
    selectedLine,
    activeLine,
    saveLink,
    gameData,
    publish,
    running,
    hasRun,
    active,
    mine,
    game
  } = props

  const {
    inputType,
    animals
  } = game

  const {tab, actions, initialData} = state
  const {tabChanged} = actions
  const size = '350px'

  const display = (
    <Block wide tall align='start start'>
      <Output
        size={size}
        tab={tab}
        hasRun={hasRun}
        {...game}
        {...props}/>
      <Controls
        selectedLine={selectedLine}
        initialData={initialData}
        activeLine={activeLine}
        inputType={inputType}
        canCode={game.permissions.indexOf(EDIT_CODE) > -1}
        running={running}
        saveID={saveLink}
        saved={game.saved}
        animals={animals}
        hasRun={hasRun}
        active={active}
        tab={tab}/>
    </Block>
  )

  return (
    <Block tall wide minHeight='600px'>
      <Block
        relative
        display='flex'
        left='0'
        tall
        pr='10px'
        wide>
        {display}
      </Block>
      {children}
    </Block>
  )
}

const reducer = handleActions({
  [changeTab.type]: (state, payload) => ({...state, tab: payload}),
  [updateInitialData.type]: (state, payload) => ({...state, initialData: payload})
})

export default ({
  initialState,
  onUpdate,
  onCreate,
  reducer,
  render
})