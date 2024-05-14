import React from "react";
import Jambotron from "../../components/partnership/Jambotron";
import CompanyPartnert from "../../components/partnership/CompanyPartnert";
import Services from "../../components/partnership/Services";
import Advantages from "../../components/partnership/Advantages";
import PartnershipForm from "../../components/partnership/PartnershipForm";
const PartnershipPage = () => {
  return (
    <>
      <div>
        <Jambotron />
        <CompanyPartnert />
        <Services />
        <Advantages />
        <PartnershipForm />
      </div>
    </>
  );
};

export default PartnershipPage;
