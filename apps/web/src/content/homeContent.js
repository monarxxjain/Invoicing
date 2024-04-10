import stats1 from "@/assets/home/stats1.svg";
import stats2 from "@/assets/home/stats2.svg";
import stats3 from "@/assets/home/stats3.svg";
import stats4 from "@/assets/home/stats4.svg";
import stats5 from "@/assets/home/stats5.svg";
const features = [
  { title: "Easy Access", description: "By using a mobile app within seconds" },
  { title: "Liquidity", description: "Description of object 2" },
  {
    title: "Start with INR 1 lac",
    description: "Start with little as INR 1 lac",
  },
  {
    title: "Multiple avenues to earn",
    description: "Blue chip invoices,Leasing,AA debt",
  },
];

const statistic = [
  { chitra: stats1, amount: "0", title: "Defaults" },
  { chitra: stats2, amount: "25000+", title: "Active Customers" },
  { chitra: stats3, amount: "200,000+", title: "Unique Transactions" },
  { chitra: stats4, amount: "600+", title: "Unique Companies" },
  { chitra: stats5, amount: "6000 Cr+", title: "Annualised GMV" },
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

const investorTabs=["Ongoing Deals","Mature Deals","Liqudated Deals","Requested to Liquidate","Completed Deals"];

const sellerTabs=["Deals under Review", "Ongoing Deals", "Deals to be Approved", "Payout Queue", "Completed Deals", "Cancelled Deals", "Drafts" ];

const adminSellerListTabs = ["Approve Sellers", "Verified Sellers", "Rejected Sellers"]

const adminDealTabs = ["Pending Deals", "Open Deals", "Deals at Freezing Point", "Freezed Deals", "Cancelled Deals", "Final Deals", "Closed Deals"]

export { features, statistic,faqs,investorTabs,sellerTabs,adminSellerListTabs,adminDealTabs};
