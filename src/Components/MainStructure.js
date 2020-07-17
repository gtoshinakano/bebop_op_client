import React from 'react'
import {Grid} from 'semantic-ui-react'
import DroneLogger from './DroneLogger'

const MainStructure = () => {
  return(
    <Grid>
      <Grid.Row>
        <Grid.Column
          computer={11}
          tablet={11}
          mobile={16}
        >
        </Grid.Column>
        <Grid.Column
          computer={5}
          tablet={5}
          mobile={16}
        >
          <DroneLogger />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default MainStructure
