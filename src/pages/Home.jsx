import { useState } from "react";
import HeroSearchSection from "../components/Home/HeroSearchSection";
import DivisionFilterBar from "../components/Home/DivisionFilterBar";
import FeaturedHouseGrid from "../components/Home/FeaturedHouseGrid";
import LandlordBenefitsSection from "../components/Home/LandlordBenefitsSection";
import CallToActionBanner from "../components/Home/CallToActionBanner";
import ContactLandlordModal from "../components/Home/ContactLandlordModal";

const Home = () => {
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero & Search Section */}
      <HeroSearchSection
        onSearch={handleSearch}
        selectedDivision={selectedDivision}
        setSelectedDivision={setSelectedDivision}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Division Quick Filter Bar */}
      <DivisionFilterBar
        selectedDivision={selectedDivision}
        setSelectedDivision={setSelectedDivision}
      />

      {/* Featured Properties Grid */}
      <FeaturedHouseGrid
        selectedDivision={selectedDivision}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onSelectHouse={(house) => setSelectedHouse(house)}
      />

      {/* SaaS Feature Highlights for Landlords */}
      <LandlordBenefitsSection />

      {/* Call To Action Banner */}
      <CallToActionBanner />

      {/* Contact & Details Modal */}
      {selectedHouse && (
        <ContactLandlordModal
          house={selectedHouse}
          onClose={() => setSelectedHouse(null)}
        />
      )}
    </div>
  );
};

export default Home;
