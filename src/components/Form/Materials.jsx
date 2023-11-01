import React from 'react';

function Materials({ formik }) {
    const addMaterial = () => {
        const newMaterials = [...formik.values.projectMaterials, { materialName: '', materialNumber: '' }];
        formik.setFieldValue("projectMaterials", newMaterials);
    };

    const deleteMaterial = () => {
        const filteredMaterials = formik.values.projectMaterials.slice(0, formik.values.projectMaterials.length - 1);
        formik.setFieldValue("projectMaterials", filteredMaterials);
    };

    return (
        <div className="material-container">
            <div className="add-btn-div">
                <button type="button" className="add-btn" onClick={addMaterial}>+</button>
            </div>
            {formik.values.projectMaterials.map((material, index) => (
                <div key={index}>
                    <input
                        className="material-input-name"
                        name={`projectMaterials[${index}].materialName`}
                        value={material.materialName}
                        onChange={formik.handleChange}
                        placeholder="Material Name"
                    />
                    <input
                        className="material-input-number"
                        name={`projectMaterials[${index}].materialNumber`}
                        value={material.materialNumber}
                        onChange={formik.handleChange}
                        placeholder="# of Days"
                    />
                </div>
            ))}

            <div className="delete-btn-div">
                {/* Show the delete button only if there are 2 or more materials */}
                {formik.values.projectMaterials.length >= 2 && <button type="button" className="delete-btn" onClick={deleteMaterial}>-</button>}
            </div>
        </div>
    );
}

export default Materials;
