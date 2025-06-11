import React from 'react';
export const Footer = () => {
  return <footer className="bg-[#293e40] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} ServiceNow Solution Advisor. All
              rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-300 hover:text-[#81b5a1]">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-[#81b5a1]">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-[#81b5a1]">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>;
};