import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 h-screen">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        {/* Organization Logo */}
        <div className="flex items-center space-x-2">
          <img src="logo.png" alt="Organization Logo" className="h-8 w-8" />
          <h1 className="text-lg font-semibold">Organization Name</h1>
        </div>
        {/* Organization Email and Metamask ID */}
        <div>
          <p className="text-gray-600">Organization Email: info@example.com</p>
          <p className="text-gray-600">Metamask ID: 0x1234567890abcdef</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Profile Information Section */}
        <section className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Joined Platform On */}
            <div>
              <label htmlFor="joinedOn" className="block text-gray-600">Joined Platform On</label>
              <p id="joinedOn" className="text-gray-800">January 1, 2022</p>
            </div>
            {/* Deals Issued Till Date */}
            <div>
              <label htmlFor="dealsIssued" className="block text-gray-600">Deals Issued Till Date</label>
              <p id="dealsIssued" className="text-gray-800">100</p>
            </div>
            {/* Currently Active Deals */}
            <div>
              <label htmlFor="activeDeals" className="block text-gray-600">Currently Active Deals</label>
              <p id="activeDeals" className="text-gray-800">10</p>
            </div>
            {/* Total Capital Raised */}
            <div>
              <label htmlFor="totalCapitalRaised" className="block text-gray-600">Total Capital Raised</label>
              <p id="totalCapitalRaised" className="text-gray-800">$1,000,000</p>
            </div>
            {/* Total Capital Returned */}
            <div>
              <label htmlFor="totalCapitalReturned" className="block text-gray-600">Total Capital Returned</label>
              <p id="totalCapitalReturned" className="text-gray-800">$800,000</p>
            </div>
            {/* Mean Amount of Deals Issued in a Year */}
            <div className="col-span-2">
              <label htmlFor="meanDealsIssued" className="block text-gray-600">Mean Amount of Deals Issued in a Year</label>
              <p id="meanDealsIssued" className="text-gray-800">$50,000</p>
            </div>
            {/* Organization Description */}
            <div className="col-span-2">
              <label htmlFor="orgDescription" className="block text-gray-600">Organization Description</label>
              <p id="orgDescription" className="text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis risus nec turpis blandit feugiat. Vestibulum sed purus eu est commodo volutpat. Fusce lobortis nulla vitae lectus convallis, nec lacinia ligula consectetur.</p>
            </div>
            {/* Add more fields as needed */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
