import React from 'react'
import MarketSidebar from '../../components/MarketSidebar/MarketSidebar'
import useWindowSize from '../../hooks/useWindowSize'
import MobileNav from '../../components/MobileNav/MobileNav';

const MarketStake = () => {

  const windowSize = useWindowSize();
  return (
    <div className="container-fluid p-0" style={{minHeight: '72vh'}}>
            {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}

    </div>
  )
}

export default MarketStake