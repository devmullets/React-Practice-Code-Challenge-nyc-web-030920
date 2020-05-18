import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi';

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          /*  Render Sushi components here! */
          props.sushiList.map((singleSushi, index) => <Sushi 
            key={singleSushi.id}
            sushi={singleSushi}
            index={index}
            eatSushi={props.eatSushi}

          />)
        }
        <MoreButton moreSushi={props.moreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer