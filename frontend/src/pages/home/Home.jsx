import React from 'react'
import Banner from '../../component/banner/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonial from './Testimonial'
import OurStory from './OurStory'

const Home = () => {
  return (
    <div>
     <Banner/>
     <Categories/>
     <SpecialDishes/>
     <Testimonial/>
     <OurStory/>
    </div>
  )
}

export default Home
