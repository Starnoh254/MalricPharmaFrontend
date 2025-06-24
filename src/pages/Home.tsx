import HeroBanner from "../components/HeroBanner";
import MainLayout from "../components/MainLayout";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <MainLayout>
      <HeroBanner />
      <Testimonials />
    </MainLayout>
  );
}

export default Home;
