import React, { useContext, useEffect, useState } from "react";
import Card from "../../component/card/Card";
import Pagination from "../../component/Pagination/Pagination";
import { AuthContext } from "../../context/AuthProvider";


const categories = [
  { id: "all", label: "All" },
  { id: "Pizza", label: "Pizza" },
  { id: "Appetizers", label: "Appetizers" },
  { id: "Soups", label: "Soups" },
  { id: "Pasta", label: "Pasta" },
  { id: "Main Course", label: "Main Course" },
  { id: "Vegetarian", label: "Vegetarian" },
  { id: "Burgers", label: "Burgers" },
];

const Menu = () => {
  const [filteredRecepit, setFilteredRecepit] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12); 
  const {recepit}=useContext(AuthContext)
 

  //filter By Category function
  const filterByCategory = (recepit, category) => {
    setFilteredRecepit(recepit)
    if (category === "all") {
      return recepit;
    }
    return recepit.filter((item) => item.category === category);
  };

    //sort function
  const sortData = (data, option) => {
    const sortFunctions = {
      "low-high": (a, b) => a.price - b.price,
      "high-low": (a, b) => b.price - a.price,
      "a-z": (a, b) => a.name.localeCompare(b.name),
      "z-a": (a, b) => b.name.localeCompare(a.name),
    };
    const sortFunction = sortFunctions[option];
    if (sortFunction) {
      return [...data].sort(sortFunction);
    }
    return data; // Return as is if "default"
  };

  //aplying filter and sort
  useEffect(() => {
    const applyFiltersAndSort = () => {
      // Filter by category first
      const filteredData = filterByCategory(recepit, selectedCategory);

      // Then sort based on the selected option
      const sortedData = sortData(filteredData, sortOption);

      setFilteredRecepit(sortedData);
    };

    applyFiltersAndSort();
  }, [recepit, selectedCategory, sortOption]);

  //handing category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  //handing sort
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

    // Paginate items
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = filteredRecepit.slice(indexOfFirstItem, indexOfLastItem);

  const handlePagination = (pageNumber) => {
    setCurrentPage (pageNumber);
};


  return (
    <div>
      <div className="section-container">
        <div className="flex items-center justify-center text-center py-12 lg:py-24 gap-8 ">
          {/* Text Section */}
          <div className="space-y-7 px-4">
            <h1 className="text-4xl md:text-5xl font-bold md:leading-snug leading-snug">
              Dive into Delights Of Delectable{" "}
              <span className="text-green">Food</span>
            </h1>
            <p className="lg:text-xl text-[#4A4A4A] text-lg">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            <button className="btn bg-green rounded-full text-white px-8 py-3 drop-shadow-xl font-semibold">
              Contact
            </button>
          </div>
        </div>

        {/* Subcategory list */}
        <div className="mb-12 flex items-center justify-between gap-10 w-full">
        <ul className="w-full sm:w-3/4 flex items-center space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-green scrollbar-track-gray-100 py-1 px-5 snap-x snap-mandatory border border-green rounded-lg bg-white text-sm sm:text-base lg:text-lg">
            {categories.map((cat, index) => (
              <li
                className={`${
                  selectedCategory === cat.id ? "text-white bg-green rounded-lg transition-all duration-500" : ""
                } cursor-pointer lg:text-base md:text-sm  px-4 py-2 `}
                onClick={() => handleCategoryChange(cat.id)}
                key={index}
              >
                {cat.label}
              </li>
            ))}
          </ul>

          {/* Filter */}
          <select
            onChange={handleSortChange}
            className="w-1/2 select select-info border-green focus:border-green focus:outline-green   max-w-xs"
          >
            <option value="default">Default</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* recepit card */}
        <div className="grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-x-8 gap-y-16 pb-12">
          {currentItems.map((item, i) => (
            <Card item={item} key={i} />
          ))}
        </div>

        {/* pagination */}
        <div className="">
        <Pagination
        length={filteredRecepit.length}
        postsPerPage={postsPerPage}
        handlePagination={handlePagination}
        currentPage={currentPage}
    />
        </div>
      </div>
    </div>
  );
};

export default Menu;
