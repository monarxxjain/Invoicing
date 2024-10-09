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
import Deal from "./Deal";
import { useContext } from "react";
import ThemeContext from "@/components/context/ThemeContext";
import PendingDeal from "../deal/PendingDeal";
import Loader from "@/components/atoms/Loader";
import OpenDeal from "../deal/OpenDeal";
import FreezedDeal from "../deal/FreezedDeal";
import CancelledDeal from "../deal/CancelledDeal";

export default function SellerPortfolioTab({ tabs, role }) {

  const [value, setValue] = useState("1")
  const [loading, setLoading] = useState(true)
  const [deals, setDeals] = useState(null)

  const handleChange = (event, newValue) => {
    setLoading(true)
    setDeals([])
    setValue(newValue)
  };

  const {user} = useContext(ThemeContext)

  const getSellerDeals = async () => {

    let sellerDeals = await axios.post(
      `${BACKEND_URL}/deal/getSellerDeals`,
      { status: tabMapping[value] },
      { withCredentials: true }
    );

    console.log("Seller Deals:  ",sellerDeals);
    sellerDeals = await Promise.all(
      sellerDeals?.data?.deals?.map(async (element) => {
        const { data, error } = await supabase.storage
          .from("invoice")
          .createSignedUrl(element.seller.logo, 3600);

        let te = element;
        te.seller.logo = data.signedUrl;
        return te;
      })
    );
    setDeals(sellerDeals)
    setLoading(false)
  };

  const updateDeals = (deal) => {
    setDeals(deals.filter(elem => elem.id !== deal.id))
  }

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
    4 : "CANCELLED",
    5 : "ACCEPTED",
    6 : "CANCELLED",
    7 : "CLOSED",
    8 : "REJECTED"
  }

  return (
    <Box sx={{ width: "100%", height: "83vh", typography: "body1", background: "white" }}>
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

        <TabPanel className="bg-gray-100 p-2 xl:p-6 h-full overflow-y-scroll" value={"1"}>
            <div className="relative h-full">
              {loading && <Loader className="absolute left-1/2 -translate-x-[45%] top-1/2 -translate-y-[50%]" />}
              <div className="flex flex-col gap-6">
                <section className="flex flex-col gap-1">
                  <h1 className="text-2xl">Hey <span className="font-serif font-semibold italic">{user?.name}</span> !!</h1>
                  {!loading && deals.length!=0 && <p className="text- font-light text-gray-500">New sellers are waiting for your approval on the platform. Let's get them onboard!</p>}
                  {!loading && deals.length==0 && <p className="text- font-light text-gray-500">There are NO new Seller Requests as of now.</p>}
                </section>

                {!loading && deals.length!=0 && <section className=" grid grid-cols-2 gap-6">
                    {deals.map((deal,id) => {
                        return(
                            <PendingDeal key={id} deal={deal} updateDeals={updateDeals} />
                        )
                    })}
                </section>}

                {!loading && deals.length==0 &&
                <div className="absolute left-1/2 font-extrabold -translate-x-[50%] top-1/2 -translate-y-[100%] w-full text-center text-8xl text-blue-950 t">
                    NO New Deals
                </div>
                } 
              </div>
            </div>
        </TabPanel>
        <TabPanel className="bg-gray-100 p-2 xl:p-6 h-full overflow-y-scroll" value={"2"}>
            <div className="relative h-full">
              {loading && <Loader className="absolute left-1/2 -translate-x-[45%] top-1/2 -translate-y-[50%]" />}
              <div className="flex flex-col gap-6 h-full">
                <section className="flex flex-col gap-1">
                  <h1 className="text-2xl">Hey <span className="font-serif font-semibold italic">{user?.name}</span> !!</h1>
                  {!loading && deals.length!=0 && <p className="text- font-light text-gray-500">Here is the list of all of our prestigious Clients</p>}
                  {!loading && deals.length==0 && <p className="text- font-light text-gray-500">There are NO Approved Sellers as of now.</p>}
                </section>
                  

                {!loading && deals.length!=0 && <section className=" grid grid-cols-2 gap-6">
                    {deals.map((deal,id) => {
                        return(
                            <OpenDeal key={id} deal={deal} updateDeals={updateDeals} />
                        )
                    })}
                </section>}

                {!loading && deals.length==0 &&
                <div className="absolute left-1/2 font-extrabold -translate-x-[50%] top-1/2 -translate-y-[100%] w-full text-center text-8xl text-blue-950 t">
                    NO Open Deals
                  </div>
                }
              </div>
            </div>
        </TabPanel>
        <TabPanel className="bg-gray-100 p-2 xl:p-6 h-full overflow-y-scroll" value={"3"}>
            <div className="relative h-full">
              {loading && <Loader className="absolute left-1/2 -translate-x-[45%] top-1/2 -translate-y-[50%]" />}
              <div className="flex flex-col gap-6 h-full">
                <section className="flex flex-col gap-1">
                  <h1 className="text-2xl">Hey <span className="font-serif font-semibold italic">{user?.name}</span> !!</h1>
                  {!loading && deals.length!=0 && <p className="text- font-light text-gray-500">Here is the list of all of our prestigious Clients</p>}
                  {!loading && deals.length==0 && <p className="text- font-light text-gray-500">There are NO Approved Sellers as of now.</p>}
                </section>
                  

                {!loading && deals.length!=0 && <section className="grid grid-cols-2 gap-6">
                    {deals.map((deal,id) => {
                      return (
                        <FreezedDeal key={id} deal={deal} updateDeals={updateDeals} />
                    )
                  })}
                </section>} 

                {!loading && deals.length==0 &&
                <div className="absolute left-1/2 font-extrabold -translate-x-[50%] top-1/2 -translate-y-[100%] w-full text-center text-8xl text-blue-950 t">
                    NO Freezed Deals
                  </div>
                }
              </div>
            </div>
        </TabPanel>

        <TabPanel className="bg-gray-100 p-2 xl:p-6 h-full overflow-y-scroll" value={"6"}>
            <div className="relative h-full">
              {loading && <Loader className="absolute left-1/2 -translate-x-[45%] top-1/2 -translate-y-[50%]" />}
              <div className="flex flex-col gap-6 h-full">
                <section className="flex flex-col gap-1">
                  <h1 className="text-2xl">Hey <span className="font-serif font-semibold italic">{user?.name}</span> !!</h1>
                  {!loading && deals.length!=0 && <p className="text- font-light text-gray-500">Here is the list of all of our prestigious Clients</p>}
                  {!loading && deals.length==0 && <p className="text- font-light text-gray-500">There are NO Approved Sellers as of now.</p>}
                </section>
                  

                {!loading && deals.length!=0 && <section className="grid grid-cols-2 gap-6">
                    {deals.map((deal,id) => {
                      return (
                        <CancelledDeal key={id} deal={deal} updateDeals={updateDeals} />
                    )
                  })}
                </section>}  

                {!loading && deals.length==0 &&
                <div className="absolute left-1/2 font-extrabold -translate-x-[50%] top-1/2 -translate-y-[100%] w-full text-center text-8xl text-blue-950 t">
                    NO Cancelled Deals
                  </div>
                }
              </div>
            </div>  
        </TabPanel>
      </TabContext>
    </Box>
  );
}
