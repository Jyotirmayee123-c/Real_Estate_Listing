import { useAuth } from '../../context/AuthContext';
import Banner from '../../components/Home/Banner'
import OurAchievement from '../../components/Home/OurAchievement'
import OurServices from "../../components/Home/OurServices"
import WhyChooseUs from "../../components/Home/WhyChooseUs"

const Home = () => {

  return (
    <div className="">
      <Banner />
      <OurAchievement />
      <OurServices />
      <WhyChooseUs />
    </div>
  );
};

export default Home;