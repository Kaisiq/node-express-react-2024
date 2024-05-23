import Layout from "./components/Layout";
import { HeroSection } from "./components/HeroSection";
// import { FeaturedProduct } from "./components/FeaturedProduct";
// import { LatestProducts } from "./components/LatestProducts";
import { IndexAbout } from "./components/IndexAbout";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <Layout>
      <main className="flex-1">
        <HeroSection />
        <Separator className="mt-6" />
        <IndexAbout />
      </main>
    </Layout>
  );
}

export default App;
