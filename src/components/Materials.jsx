import React, { useState } from 'react';

function Materials() {
    const [materials, setMaterials] = useState([{ material: '', number: '' }]);

    const handleInputChange = (index, type, value) => {
      const newMaterials = [...materials];
      newMaterials[index][type] = value;
      setMaterials(newMaterials);
    };
  
    const addMaterial = () => {
      setMaterials([...materials, { material: '', number: '' }]);
    };

    const deleteMaterial = (indexToDelete) => {
        const filteredMaterials = materials.filter((_, index) => index !== indexToDelete);
        setMaterials(filteredMaterials);
      };
  
      return (
        <div className="material-container">
          {materials.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Items"
                value={item.material}
                onChange={(e) => handleInputChange(index, 'material', e.target.value)}
              />
              <input
                type="number"
                placeholder="number of days"
                value={item.number}
                onChange={(e) => handleInputChange(index, 'number', e.target.value)}
              />
              <button className="delete-btn" onClick={() => deleteMaterial(index)}>-</button>
            </div>
          ))}
          <button className="add-btn" onClick={addMaterial}>+</button>
        </div>
      );
  }

export default Materials;