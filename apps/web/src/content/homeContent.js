import stats1 from "@/assets/home/stats1.svg";
import stats2 from "@/assets/home/stats2.svg";
import stats3 from "@/assets/home/stats3.svg";
import stats4 from "@/assets/home/stats4.svg";
import stats5 from "@/assets/home/stats5.svg";

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const heroPoints = [
  "Gain 2-5x additional returns with zero overheads",
  "Digitise vendor management. Gain 3x participation",
  "Avail flexible finance options for early invoice payment",
  "Go live in days with quickest ERP integration"
]

const features = [
  { 
    title: "2-5x Returns", 
    description: "60% plus vendor participation resulting in  2x discounted invoices; ability to discount invoices throughout the year",
    icon: <SignalCellularAltIcon className="text-purple-500  text-3xl"/>
  },
  {
    title: "Dynamic bidding",
    description: "Flexibility for vendors to bid discount rates and days at each invoice level",
    icon: <SpaceDashboardIcon  className="text-red-500  text-3xl"/>
  },
  { 
    title: "AI/ML powered solution",
    description: "Solve for invoices, taxes, payments and credits together making it an all-in-one solution",
    icon: <EngineeringIcon className="text-yellow-600  text-3xl"/>
  },
  { 
    title: "AI/ML powered solution",
    description: "Solve for invoices, taxes, payments and credits together making it an all-in-one solution",
    icon: <TipsAndUpdatesIcon className="text-red-600  text-3xl"/>
  },
  {
    title: "Multiple avenues to earn",
    description: "Blue chip invoices,Leasing,AA debt",
    icon: <AssuredWorkloadIcon className="text-red-500  text-3xl"/>
  },
  { 
    title: "AI/ML powered solution",
    description: "Solve for invoices, taxes, payments and credits together making it an all-in-one solution",
    icon: <TipsAndUpdatesIcon className="text-yellow-600  text-3xl"/>
  },
  {
    title: "Multiple avenues to earn",
    description: "Blue chip invoices,Leasing,AA debt",
    icon: <AssuredWorkloadIcon className="text-red-500 text-3xl"/>
  },
  { 
    title: "AI/ML powered solution",
    description: "Solve for invoices, taxes, payments and credits together making it an all-in-one solution",
    icon: <TipsAndUpdatesIcon className="text-yellow-600 text-3xl"/>
  },
];

const statistic = [
  { icon: stats2, value: "25000", title: "Active Customers" },
  { icon: stats3, value: "200,000", title: "Unique Transactions" },
  { icon: stats4, value: "600", title: "Unique Companies" },
  { icon: stats5, value: "6000 Cr", title: "Annualised GMV" },
];

const faqs = [
  {
    question: "What is Invoice Discounting ?",
    answer:
      "Invoice discounting is the practice of using company's unpaid invoices to raise working capital & fulfil its financial needs.",
  },
  {
    question: "How does it work?",
    answer:
      "Investo provides a marketplace/platform for business owners to sell and investors to purchase invoices raised on blue chip companies. It combines the best in class technology experience with credit underwriting & data analytics capabilities to create a brand new investment asset class.\n   Business-owners looking for advance on their invoices, raised on blue chip/creditworthy institutions, can use our platform to sell these unpaid invoices at attractive rates.",
  },
  {
    question: "What is the eligibility criteria for businesses?",
    answer:
      "Any business that supplies goods/services to large blue-chip companies can avail the bill discounting services provided by Investo. Eligibility and amount of discounting is governed by the creditworthiness of the business and therefore they should be willing to share their financial information and other related documents.",
  },
  {
    question: "Will availing Invoice Discounting affect the balance sheet?",
    answer:
      "Invoice discounting with Investo is an off-the-book financial solution. That's because it is availed by leveraging the unsettled invoices. Hence, it does not have any effect on the balance sheet.",
  },
  {
    question: "Is Invoice Discounting a funded credit product?",
    answer:
      "The financing option works like a revolving funding facility. The discounting service provider forwards funds against unpaid invoices based on their worth.",
  },
  {
    question:
      "How long does it take to avail funds through Invoice Discounting",
    answer:
      "The time to avail funds through invoice discounting depends on your financier. With Investo, you can avail funds within 24-72 hours*.",
  },
  {
    question: "How can Invoice Discounting benefit my business?",
    answer:
      "Through invoice discounting, you can avail credits up to a certain percentage of your unpaid invoice’s total value, allowing you to ensure a steady inflow of capital to your business at all times.",
  },
];

const userTypes = [
  {
    id:1,
    name: "Investor",
    description: "Increase EBITDA by discounting invoices of your large supplier base using treasury funds, banks or TReDs. Fully integrated with ERP.",
    image: "/homeImages/7.jpg"
  },
  {
    id:2,
    name: "Seller",
    description: "Use EarlyPay to access affordable financing anytime on your pending invoices. Get real-time status on invoice processing and payments.",
    image: "/homeImages/9.jpg"
  },
  {
    id:3,
    name: "Employee",
    description: "Enable low-risk vendor financing via AI/ML powered platform. Increase limit utilisation by getting access to good-rated corporates.",
    image: "/homeImages/8.jpg"
  },
]

const investorTabs=["Ongoing Deals","Mature Deals","Liqudated Deals","Requested to Liquidate","Completed Deals"];

const sellerTabs=["Deals under Review", "Ongoing Deals", "Deals to be Approved", "Payout Queue", "Completed Deals", "Cancelled Deals", "Drafts" ];

const adminSellerListTabs = ["Approve Sellers", "Verified Sellers", "Rejected Sellers"]

const adminDealTabs = ["Pending Deals", "Open Deals", "Deals at Freezing Point", "Freezed Deals", "Cancelled Deals", "Accepted Deals", "Final Deals", "Completed Deals", "Rejected Deals"]

export { heroPoints, features, statistic, userTypes, faqs, investorTabs, sellerTabs, adminSellerListTabs, adminDealTabs};
