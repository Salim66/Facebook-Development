import React from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import Timeline from '../../components/Timeline/Timeline';

const Home = () => {
  return (
    <>
        <body>
          <HomeHeader />

          <div class="fb-home-body">
            <Sidebar />

            <Timeline />
          </div>

        </body>
    </>
  )
};

export default Home;