import React from 'react'
import { Company, ItemData } from '../../../types/game'
import CompanyItem from './company'

import './_index.scss'

interface GameItemProps extends React.ComponentProps<any> {
  row?: 'top' | 'right' | 'bottom' | 'left',
  data?: ItemData | Company
}

function GameItemComponent ({ row, data }: GameItemProps) {
  if (data.type === 'company') {
    return <CompanyItem data={data as Company} />
  }

  return (
    <div className={`component -table-item -row-${row}`}>
      <div className="label flex center">
        <div>item</div>
      </div>
    </div>
  )
}

export default GameItemComponent
