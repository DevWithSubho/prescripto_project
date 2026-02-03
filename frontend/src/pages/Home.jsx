import Banner from "../components/Banner";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctorsList from "../components/TopDoctorsList";

const Home = () => {
  return (
    <>
      <Header />
      <SpecialityMenu />
      <TopDoctorsList />
      <Banner />
    </>
  );
};
export default Home;
