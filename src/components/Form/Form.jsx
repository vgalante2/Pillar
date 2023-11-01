import React, { useState } from 'react'
import { useFormik } from 'formik';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from 'react-rainbow-components';
import Materials from './Materials';




function Form({ children }) {
    const [formClicked, setFormClicked] = useState(false);
   
     

    const handleClick = () => {
        setFormClicked(prevState => !prevState);
    }


    const formik = useFormik({
        initialValues: {
            projectName: '',
            projectAddress: '',
            projectJobs: '',
            dateRange: [null, null],
            projectMaterials: [{ materialName: '', materialNumber: '' }]
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    
    
  



    return (
        <section className="form-section">
        <img className="proj-img" src="./proj.png" alt="project" />
        <div className="form-container">
            {formClicked ? (
                <>
                    <div className="close-btn" onClick={handleClick}>
                       <CancelIcon className="cancel"/>
                    </div>
                    <div className={`form-content ${formClicked ? 'active' : ''}`}>
                        <form className="form" onSubmit={formik.handleSubmit}>
                            <div className="left-section">  {/* New className for styling purposes */}
                                
                                    <label className="project-name" htmlFor="projectName">Project Name</label>
                                    <input
                                        className="project-name-input"
                                        id="0"
                                        name="projectName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.projectName}
                                    />
    
                                    <label className="project-address" htmlFor="projectAddress">Project Address</label>
                                    <input
                                        className="project-address-input"
                                        id="1"
                                        name="projectAddress"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.projectAddress}
                                    />
    
                                    <label className="project-jobs" htmlFor="projectJobs">Project Jobs</label>
                                    <input
                                        className="project-jobs-input"
                                        id="2"  
                                        name="projectJobs"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.projectJobs}
                                    />
                                    
                                </div>
                        
    
                            <div className="right-section">  {/* New className for styling purposes */}
                            <Materials formik={formik} />
                            <DatePicker
                                        className="date-picker"
                                        id="datePicker-15"
                                        label="Time duration of project:"
                                        placeholder="Select range of dates"
                                        selectionType="range"
                                        formatStyle="large"
                                        variant="single"
                                        value={formik.values.dateRange}
                                        onChange={newRange => formik.setFieldValue("dateRange", newRange)}
                                    />
                           
                                
                                <button className="form-submit-btn" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <button onClick={handleClick} className="open-btn">
                    <img className="pillar-img" src="/pillar.png" alt="Pillar Icon" />
                </button>
            )}
        </div>
        </section>
    );
            }

    
    export default Form;
    