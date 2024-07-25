import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AssetDetail() {
  const [asset, setAsset] = useState(null);
  const { id } = useParams();

  const fetchAsset = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/assets/${id}`);
      setAsset(response.data);
    } catch (error) {
      console.error("Error fetching asset data", error);
    }
  }, [id]);

  useEffect(() => {
    fetchAsset();
  }, [fetchAsset]);

  if (!asset) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Asset Detail</h1>
      <p><strong>Asset Number:</strong> {asset.assetNumber}</p>
      <p><strong>Category:</strong> {asset.categoryID}</p>
      <p><strong>Manufacturer:</strong> {asset.manufacturerID}</p>
      <p><strong>Model Name:</strong> {asset.modelName}</p>
      <p><strong>Serial Number:</strong> {asset.serialNumber}</p>
      <p><strong>Previous User:</strong> {asset.previousUserID}</p>
      <p><strong>Current User:</strong> {asset.currentUserID}</p>
      <p><strong>Receive Date:</strong> {asset.receiveDate}</p>
      <p><strong>Return Date:</strong> {asset.returnDate}</p>
      <p><strong>Return Reason:</strong> {asset.returnReason}</p>
      <p><strong>Purchase Date:</strong> {asset.purchaseDate}</p>
      <p><strong>Notes:</strong> {asset.notes}</p>
    </div>
  );
}

export default AssetDetail;

