"use client";

import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const JobOpportunityDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id);

  console.log(params);

  const slug = (await params).id;

  return (
    <>
      <Header />
      <p>test</p>
      <Footer />
    </>
  );
};

export default JobOpportunityDetail;
