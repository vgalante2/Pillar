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

    const deleteMaterial = () => {
        // Always delete the last element in the array
        const filteredMaterials = materials.slice(0, materials.length - 1);
        setMaterials(filteredMaterials);
      };
  
      return (
        <div className="material-container">
        <div className="add-btn-div">
        <button className="add-btn" onClick={addMaterial}>+</button>
        </div>
          {materials.map((item, index) => (
            <div  className="input-div" key={index}>
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
            </div>
          ))}
          <div className="delete-btn-div">
          {/* Show the delete button only if there are 2 or more materials */}
          {materials.length >= 2 && <button className="delete-btn" onClick={deleteMaterial}>-</button>}
          </div>
        </div>
      );
}

export default Materials;