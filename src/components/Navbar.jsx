import { useState } from "react";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="shrink-0 flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">
                MONKCOMMERCE
              </a>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="#"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="https://www.linkedin.com/in/anshu-pandey-b08860258/"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="https://github.com/mr-Dev-Anshu/monkcommerce"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Git Repo
              </a>
              <p
                onClick={() => setToggle(!toggle)}
                className="text-gray-900 cursor-pointer  hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Message for the Team
              </p>
            </div>
          </div>
        </div>
      </div>

      {toggle && (
        <div
          id="info-popup"
          tabindex="-1"
          class=" flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
          <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
            <div class="relative p-4 bg-white rounded-lg shadow border border-gray-300  md:p-8">
              <div class="mb-4 text-sm font-light text-gray-500 ">
                <h3 class="mb-3 text-2xl font-bold text-gray-900 ">
                  Message for the Team
                </h3>
                <p className=" font-medium text-xl">
                  Dear Team , I hope this message finds you well. I wanted to
                  inform you about an issue I encountered while working on the
                  assignment. Despite following the provided instructions, the
                  API and API key supplied to me did not function correctly.
                  After several attempts to troubleshoot the issue, I decided to
                  use dummy data to implement the required features and
                  demonstrate my understanding and approach to the task.
                </p>
              </div>
              <div class="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                <a
                  href="#"
                  class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                ></a>
                <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                  <button
                    onClick={() => setToggle(!toggle)}
                    type="button"
                    class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border  border-gray-300 sm:w-auto hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  {/* <button
                 // onClick={handleSubmit}
                 id="confirm-button"
                 type="button"
                 class="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-gray-700 "
               >
                 Confirm
               </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
