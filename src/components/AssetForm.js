import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AssetForm() {
  const [asset, setAsset] = useState({
    assetNumber: '',
    categoryID: '',
    manufacturerID: '',
    modelName: '',
    serialNumber: '',
    previousUserID: '',
    currentUserID: '',
    receiveDate: '',
    returnDate: '',
    returnReason: '',
    purchaseDate: '',
    notes: ''
  });

  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchAsset = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/assets/${id}`);
      setAsset(response.data);
    } catch (error) {
      console.error("Error fetching asset data", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchManufacturers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/manufacturers');
        setManufacturers(response.data);
      } catch (error) {
        console.error("Error fetching manufacturers", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchCategories();
    fetchManufacturers();
    fetchUsers();

    if (id) {
      fetchAsset();
    }
  }, [id, fetchAsset]);

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/assets/${id}`, asset);
      } else {
        await axios.post('http://localhost:3000/api/assets', asset);
      }
      navigate('/');
    } catch (error) {
      console.error("Error saving asset data", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Asset Number:</label>
        <input 
          type="text" 
          name="assetNumber" 
          value={asset.assetNumber} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Category:</label>
        <select name="categoryID" value={asset.categoryID} onChange={handleChange}>
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.CategoryID} value={category.CategoryID}>
              {category.CategoryName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Manufacturer:</label>
        <select name="manufacturerID" value={asset.manufacturerID} onChange={handleChange}>
          <option value="">Select a manufacturer</option>
          {manufacturers.map(manufacturer => (
            <option key={manufacturer.ManufacturerID} value={manufacturer.ManufacturerID}>
              {manufacturer.ManufacturerName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Model Name:</label>
        <input 
          type="text" 
          name="modelName" 
          value={asset.modelName} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Serial Number:</label>
        <input 
          type="text" 
          name="serialNumber" 
          value={asset.serialNumber} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Previous User:</label>
        <select name="previousUserID" value={asset.previousUserID} onChange={handleChange}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.UserID} value={user.UserID}>
              {user.UserName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Current User:</label>
        <select name="currentUserID" value={asset.currentUserID} onChange={handleChange}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.UserID} value={user.UserID}>
              {user.UserName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Receive Date:</label>
        <input 
          type="date" 
          name="receiveDate" 
          value={asset.receiveDate} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Return Date:</label>
        <input 
          type="date" 
          name="returnDate" 
          value={asset.returnDate} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Return Reason:</label>
        <input 
          type="text" 
          name="returnReason" 
          value={asset.returnReason} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Purchase Date:</label>
        <input 
          type="date" 
          name="purchaseDate" 
          value={asset.purchaseDate} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Notes:</label>
        <textarea 
          name="notes" 
          value={asset.notes} 
          onChange={handleChange} 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AssetForm;
