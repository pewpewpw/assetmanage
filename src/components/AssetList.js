import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AssetList() {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const response = await axios.get('http://localhost:000/api/assets');
    setAssets(response.data);
  };

  const deleteAsset = async (id) => {
    await axios.delete(`http://localhost:3000/api/assets/${id}`);
    fetchAssets();
  };

  return (
    <div>
      <h2>자산 목록</h2>
      <Link to="/add">새 자산 추가</Link>
      <table>
        <thead>
          <tr>
            <th>자산관리번호</th>
            <th>구분</th>
            <th>제조사</th>
            <th>모델명</th>
            <th>현재 사용자</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset._id}>
              <td>{asset.assetNumber}</td>
              <td>{asset.category}</td>
              <td>{asset.manufacturer}</td>
              <td>{asset.modelName}</td>
              <td>{asset.currentUser}</td>
              <td>
                <button onClick={() => navigate(`/edit/${asset._id}`)}>수정</button>
                <button onClick={() => deleteAsset(asset._id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetList;
