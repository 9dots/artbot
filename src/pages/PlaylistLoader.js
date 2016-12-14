import IndeterminateProgress from '../components/IndeterminateProgress'
import createAction from '@f/create-action'
import element from 'vdux/element'
import createCode from '../utils'
import Playlist from './Playlist'
import {swapMode, reset} from '../actions'
import fire, {refMethod} from 'vdux-fire'

function render ({props}) {
	const {list} = props

	if (list.loading) return <IndeterminateProgress/>

	const {sequence, current = 0} = list.value

	return (
		<Playlist current={current} {...props} listRef={props.ref} {...list.value} next={next} prev={prev}/>
	)

	function * next () {
		if (current + 1 < sequence.length) {
			yield swapMode('icons')
			yield reset()
			yield refMethod({
				ref: `/savedList/${props.ref}/current`,
				updates: {method: 'transaction', value: (val) => val + 1}
			})
		}
	}

	function * prev () {
		if (current - 1 >= 0) {
			yield swapMode('icons')
			yield reset()
			yield refMethod({
				ref: `/savedList/${props.ref}/current`,
				updates: {method: 'transaction', value: (val) => val - 1}
			})
		}
	}
}

export default fire((props) => ({
  list: `/savedList/${props.ref}`
}))({
	render
})