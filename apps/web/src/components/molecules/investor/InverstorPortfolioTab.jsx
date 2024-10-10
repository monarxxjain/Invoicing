"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import axios from "axios";
import InvestedDeal from "./InvestedDeal";
import { useEffect } from "react";
import { BACKEND_URL } from "@/content/values";
import { supabase } from "@/utils/supabase";
import LoadDeals from "../common/LoadDeals";

export default function InvestorPortfolioTab({ tabs }) {
  const [value, setValue] = useState("1"); // Initially set value as string '1'
  // const []
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue); // Log the new value
  };

  const [ongoingDeals, setOngoingDeals] = useState();
  const [matureDeals, setMatureDeals] = useState();
  const [completedDeals, setCompletedDeals] = useState();
  const [liquidatedDeals, setLiquidatedDeals] = useState();
  const [reqLiquidateDeals, setReqLiquidateDeals] = useState();

  const getAllInvestedDeals = async () => {
    let investedDeals = await axios.get(
      `${BACKEND_URL}/deal/getInvestedDeals`,
      { withCredentials: true }
    );
    let ongoingDeals = [];
    let matureDeals = [];
    let completedDeals = [];
    let liquidatedDeals = [];
    let reqLiquidateDeals = [];
    console.log(investedDeals.data);

    investedDeals.data.data.forEach((element) => {
      if (element.break) reqLiquidateDeals.push(element);
      else if (element.status == "SOLID") matureDeals.push(element);
      else if (element.status == "LIQUID") ongoingDeals.push(element);
      else if (element.status == "COMPLETED" || element.status == "CANCELLED") completedDeals.push(element);
      else if (element.status == "BREAKED") liquidatedDeals.push(element);
    });
    // ongoingDeals = investedDeals.data.data.filter( (element) => {
    //   return (element.status === "LIQUID")
    // });
    ongoingDeals = await Promise.all(
      ongoingDeals?.map(async (element) => {
        const { data, error } = await supabase.storage
          .from("invoice")
          .createSignedUrl(element.deal.seller.logo, 3600);

        let te = element;
        te.deal.seller.logo = data.signedUrl;
        return te;
      })
    );
    matureDeals = await Promise.all(
      matureDeals?.map(async (element) => {
        const { data, error } = await supabase.storage
          .from("invoice")
          .createSignedUrl(element.deal.seller.logo, 3600);
        let te = element;
        te.deal.seller.logo = data.signedUrl;
        return te;
      })
    );
    completedDeals = await Promise.all(
      completedDeals?.map(async (element) => {
        const { data, error } = await supabase.storage
          .from("invoice")
          .createSignedUrl(element.deal.seller.logo, 3600);
        let te = element;
        te.deal.seller.logo = data.signedUrl;
        return te;
      })
    );
    liquidatedDeals = await Promise.all(
      liquidatedDeals?.map(async (element) => {
        const { data, error } = await supabase.storage
          .from("invoice")
          .createSignedUrl(element.deal.seller.logo, 3600);
        let te = element;
        te.deal.seller.logo = data.signedUrl;
        return te;
      })
    );
    reqLiquidateDeals = await Promise.all(
      reqLiquidateDeals?.map(async (element) => {
        const { data, error } = await supabase.storage
          .from("invoice")
          .createSignedUrl(element.deal.seller.logo, 3600);
        let te = element;
        te.deal.seller.logo = data.signedUrl;
        return te;
      })
    );
    // ongoingDeals = await Promise.all(ongoingDeals);
    // matureDeals = await Promise.all(matureDeals);

    setOngoingDeals(ongoingDeals);
    setMatureDeals(matureDeals);
    setCompletedDeals(completedDeals);
    setLiquidatedDeals(liquidatedDeals);
    setReqLiquidateDeals(reqLiquidateDeals);
  };

  useEffect(() => {
    getAllInvestedDeals();
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          className="px-6 pt-4"
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
        <TabPanel value={"1"}>
          <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
            <div className="grid grid-cols-2 gap-6 relative">
              {!ongoingDeals && <LoadDeals />}
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
              {!matureDeals && <LoadDeals />}
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
              {!liquidatedDeals && <LoadDeals />}
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
              {!reqLiquidateDeals && <LoadDeals />}
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
              {!completedDeals && <LoadDeals />}
              {completedDeals &&
                completedDeals?.map((iv, id) => {
                  return <InvestedDeal key={id} investedDeals={iv} />;
                })}
            </div>
          </div>
        </TabPanel>

        {/* {tabs.map((tab, index) => ( // Changed 'id' to 'index' for clarity
          <TabPanel key={index} value={(index + 1).toString()}>Item {index + 1}</TabPanel>
        ))} */}
      </TabContext>
    </Box>
  );
}
