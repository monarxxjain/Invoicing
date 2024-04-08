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
import InvestedDeal from "../../investor/InvestedDeal";
import Deal from "../../investor/Deal";

export default function SellerPortfolioTab({ tabs, role }) {

  const [value, setValue] = useState("1")
  const [deals, setDeals] = useState(null)
  const handleChange = (event, newValue) => {
    setDeals()
    setValue(newValue);
  };


  const getSellerDeals = async () => {

    let sellerDeals = await axios.post(
      `${BACKEND_URL}/deal/getSellerDeals`,
      { status: tabMapping[value] },
      { withCredentials: true }
    );
    console.log("Data ",sellerDeals);
    sellerDeals = await Promise.all(
      sellerDeals.data.deals?.map(async (element) => {
        const { data, error } = await supabase.storage
          .from("invoice")
          .createSignedUrl(element.seller.logo, 3600);

        let te = element;
        te.seller.logo = data.signedUrl;
        return te;
      })
    );
    setDeals(sellerDeals)
  
  };

  useEffect(() => {
    getSellerDeals();
  }, []);

  useEffect(() => {
    getSellerDeals();
  }, [value]);

  const tabMapping = {
    1 : "PENDING",
    2 : "OPEN",
    3 : "FREEZED",
    4 : "FINAL",
    5 : "CLOSED",
    6 : "CANCELLED",
    7 : "DRAFT",
  }

  return (
    <Box sx={{ width: "100%", typography: "body1", background: "white" }}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          className="px-6"
        >
          {tabs.map(
            (tab,index) => (
              <Tab
                key={index}
                label={`${tab}`}
                value={(index + 1).toString()}
                sx={{ textTransform: "none" }}
              />
            )
          )}
        </TabList>

        {tabs.map((tab, id) => {
          return (
            <TabPanel className="bg-gray-100 p-2 xl:p-6" value={(id+1).toString()}>
              <div className="px-2 xl:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-3 xl:gap-6 relative">
                  {!deals && <CircularProgress className="mx-auto" />}
                  {deals &&
                    deals?.map((deal, id) => {
                      return <Deal key={id} deal={deal} role={role} />;
                    })}
                </div>
              </div>
            </TabPanel>
          )
        })}
      </TabContext>
    </Box>
  );
}
