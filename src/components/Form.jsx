import React, { useState } from 'react'
import { useFormik } from 'formik';
import SubmissionArea from './SubmissionArea';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from 'react-rainbow-components';
// import Select from 'react-select';
import Materials from './Materials';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DateRangeCalendar } from '@mui/x-date-pickers/DateRangeCalendar';



function Form({ children }) {
    const [formClicked, setFormClicked] = useState(false);
    const [dateRange, setDateRange] = useState(null);
     

    const handleClick = () => {
        setFormClicked(prevState => !prevState);
    }


    const formik = useFormik({
        initialValues: {
          projectName: '',
          projectAddress: '',
          projectJobs: '',
          projectMaterials: '',
          dateRange: null,
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
    });


    
    
  



    return (
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
                                    
                                    <DatePicker
                                        className="date-picker"
                                        id="datePicker-15"
                                        label="Time duration of project:"
                                        placeholder="Select range of dates"
                                        selectionType="range"
                                        formatStyle="large"
                                        variant="single"
                                        value={dateRange}
                                        onChange={newRange => setDateRange(newRange)}
                                    />
                                </div>
                        
    
                            <div className="right-section">  {/* New className for styling purposes */}
                                <Materials />
                                <SubmissionArea onSubmit={formik.handleSubmit} />
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
    );
            }

    
    export default Form;
    