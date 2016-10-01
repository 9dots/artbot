/** @jsx element */

import element from 'vdux/element'
import {Block} from 'vdux-containers'
import Runner from './Runner'
import IconButtons from './IconButtons'
import TextApi from './TextApi'

function render ({props}) {
  const {active, type, running, hasRun, inputType} = props

  return (
    <Block maxWidth='275px' minWidth='200px' relative bgColor='#7689A9' tall>
      <Block relative top='0' wide>
        <Runner wide relative running={running} hasRun={hasRun} />
      </Block>
      <Block wide h='90%' p='10px' top='10%'>
        {inputType === 'icons'
          ? <IconButtons type={type} active={active} />
          : <TextApi type={type}/>
        }
      </Block>
    </Block>
  )
}

export default {
  render
}
