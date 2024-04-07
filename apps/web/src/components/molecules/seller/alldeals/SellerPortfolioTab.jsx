"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import axios from "axios";

import { useEffect } from "react";
import { BACKEND_URL } from "@/content/values";
import CircularProgress from "@mui/material/CircularProgress";
import { supabase } from "@/utils/supabase";

export default function SellerPortfolioTab({ tabs }) {
  const [value, setValue] = useState("1"); // Initially set value as string '1'
  // const []
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue); // Log the new value
  };

  const [ongoingDeals, setOngoingDeals] = useState();
  const [completedDeals, setCompletedDeals] = useState();

  const getSellerDeals = async () => {
    console.log("sdfds");
    let sellerDeals = await axios.get(
      `${BACKEND_URL}/deal/getSellerDeals`,
      { withCredentials: true }
    );
    console.log("Ddta ",sellerDeals);
    let ongoingDeals = [];
    let completedDeals = [];
  

    // seller.data.data.forEach((element) => {
    //   if (element.break) reqLiquidateDeals.push(element);
    //   else if (element.status == "SOLID") matureDeals.push(element);
    //   else if (element.status == "LIQUID") ongoingDeals.push(element);
    //   else if (element.status == "COMPLETED" || element.status == "CANCELLED") completedDeals.push(element);
    //   else if (element.status == "BREAKED") liquidatedDeals.push(element);
    // });
    // // ongoingDeals = investedDeals.data.data.filter( (element) => {
    // //   return (element.status === "LIQUID")
    // // });
    // ongoingDeals = await Promise.all(
    //   ongoingDeals?.map(async (element) => {
    //     const { data, error } = await supabase.storage
    //       .from("invoice")
    //       .createSignedUrl(element.deal.seller.logo, 3600);

    //     let te = element;
    //     te.deal.seller.logo = data.signedUrl;
    //     return te;
    //   })
    // );
    // matureDeals = await Promise.all(
    //   matureDeals?.map(async (element) => {
    //     const { data, error } = await supabase.storage
    //       .from("invoice")
    //       .createSignedUrl(element.deal.seller.logo, 3600);
    //     let te = element;
    //     te.deal.seller.logo = data.signedUrl;
    //     return te;
    //   })
    // );
    // completedDeals = await Promise.all(
    //   completedDeals?.map(async (element) => {
    //     const { data, error } = await supabase.storage
    //       .from("invoice")
    //       .createSignedUrl(element.deal.seller.logo, 3600);
    //     let te = element;
    //     te.deal.seller.logo = data.signedUrl;
    //     return te;
    //   })
    // );
    // liquidatedDeals = await Promise.all(
    //   liquidatedDeals?.map(async (element) => {
    //     const { data, error } = await supabase.storage
    //       .from("invoice")
    //       .createSignedUrl(element.deal.seller.logo, 3600);
    //     let te = element;
    //     te.deal.seller.logo = data.signedUrl;
    //     return te;
    //   })
    // );
    // reqLiquidateDeals = await Promise.all(
    //   reqLiquidateDeals?.map(async (element) => {
    //     const { data, error } = await supabase.storage
    //       .from("invoice")
    //       .createSignedUrl(element.deal.seller.logo, 3600);
    //     let te = element;
    //     te.deal.seller.logo = data.signedUrl;
    //     return te;
    //   })
    // );
    // // ongoingDeals = await Promise.all(ongoingDeals);
    // // matureDeals = await Promise.all(matureDeals);

    // setOngoingDeals(ongoingDeals);
    // setMatureDeals(matureDeals);
    // setCompletedDeals(completedDeals);
    // setLiquidatedDeals(liquidatedDeals);
    // setReqLiquidateDeals(reqLiquidateDeals);
  };

  useEffect(() => {
    getSellerDeals();
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          className="px-6 py-4"
        >
          {tabs.map(
            (
              tab,
              index // Changed 'id' to 'index' for clarity
            ) => (
              <Tab
                key={index}
                label={tab}
                value={(index + 1).toString()}
                sx={{ textTransform: "none" }}
              />
            )
          )}
        </TabList>
        {/* <TabPanel value={"1"}>
          <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
            <div className="grid grid-cols-2 gap-6 relative">
              {!ongoingDeals && <CircularProgress className="mx-auto" />}
              {ongoingDeals &&
                ongoingDeals?.map((iv, id) => {
                  return <InvestedDeal key={id} investedDeals={iv} />;
                })}
            </div>
          </div>
        </TabPanel>

        <TabPanel value={"2"}>
          <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
            <div className="grid grid-cols-2 gap-6 relative">
              {!matureDeals && <CircularProgress className="mx-auto" />}
              {matureDeals &&
                matureDeals?.map((iv, id) => {
                  return <InvestedDeal key={id} investedDeals={iv} />;
                })}
            </div>
          </div>
        </TabPanel>       
        <TabPanel value={"3"}>
          <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
            <div className="grid grid-cols-2 gap-6 relative">
              {!liquidatedDeals && <CircularProgress className="mx-auto" />}
              {liquidatedDeals &&
                liquidatedDeals?.map((iv, id) => {
                  return <InvestedDeal key={id} investedDeals={iv} />;
                })}
            </div>
          </div>
        </TabPanel>
        <TabPanel value={"4"}>
          <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
            <div className="grid grid-cols-2 gap-6 relative">
              {!reqLiquidateDeals && <CircularProgress className="mx-auto" />}
              {reqLiquidateDeals &&
                reqLiquidateDeals?.map((iv, id) => {
                  return <InvestedDeal key={id} investedDeals={iv} />;
                })}
            </div>
          </div>
        </TabPanel>
        <TabPanel value={"5"}>
          <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
            <div className="grid grid-cols-2 gap-6 relative">
              {!completedDeals && <CircularProgress className="mx-auto" />}
              {completedDeals &&
                completedDeals?.map((iv, id) => {
                  return <InvestedDeal key={id} investedDeals={iv} />;
                })}
            </div>
          </div>
        </TabPanel> */}

        {/* {tabs.map((tab, index) => ( // Changed 'id' to 'index' for clarity
          <TabPanel key={index} value={(index + 1).toString()}>Item {index + 1}</TabPanel>
        ))} */}
      </TabContext>
    </Box>
  );
}
