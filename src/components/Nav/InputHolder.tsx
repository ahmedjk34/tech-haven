"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./nav.module.scss";

type Props = {};

function InputHolder({}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(false); // Loading state
  const [isFocused, setIsFocused] = useState(false); // Track if input is focused

  // Handle input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // Wait for 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Cleanup timeout if the user types again
    };
  }, [searchTerm]);

  // Fetch items from the API when debouncedTerm changes
  useEffect(() => {
    const fetchItems = async () => {
      if (debouncedTerm) {
        setLoading(true); // Start loading
        try {
          const response = await axios.get(
            `http://localhost:3000/api/item/name/${debouncedTerm}`
          );
          setItems(response.data); // Update items with API response
        } catch (error) {
          console.error("Error fetching items:", error);
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      } else {
        setItems([]); // Clear items if search term is empty
      }
    };

    fetchItems();
  }, [debouncedTerm]);

  // Calculate price after discount
  const calculatePrice = (price: number, discount: number) => {
    return discount !== 0 ? price - (price * discount) / 100 : price;
  };

  // Handle focus and blur events
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    // Only hide popup if neither the input nor the popup itself is focused
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      className={styles.inputHolder}
      onBlur={handleBlur}
      onFocus={() => setIsFocused(true)}
      tabIndex={-1}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <div
        className={`${styles.searchPopUp} ${
          isFocused && searchTerm && (loading || items.length > 0)
            ? styles.active
            : ""
        }`} // Show popup only when focused AND searchTerm is not empty
      >
        {loading ? ( // Display loading indicator when loading
          <p>Loading...</p>
        ) : items.length > 0 ? (
          <ul className={styles.itemList}>
            {items.map((item) => (
              <li key={item._id} className={styles.item}>
                {/* Display the first image, name, and price */}
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <p>
                    Price: $
                    {calculatePrice(item.price, item.discount).toFixed(2)}
                  </p>
                  {item.discount > 0 && (
                    <p className={styles.discountText}>
                      Discount: {item.discount}%
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

export default InputHolder;
