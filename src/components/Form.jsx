import React, { useState } from 'react'
import { useFormik } from 'formik';
import SubmissionArea from './SubmissionArea';
import Sketches from './Sketches';
import CancelIcon from '@mui/icons-material/Cancel';


function Form() {
    const [formClicked, setFormClicked] = useState(false);

    const handleClick = () => {
        setFormClicked(prevState => !prevState);
    }

    const formik = useFormik({
        initialValues: {
          email: '',
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
                       <CancelIcon  className="cancel"/>
                    </div>
                    <div className={`form-content ${formClicked ? 'active' : ''}`}>
                    <form onSubmit={formik.handleSubmit}>
                   <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                     type="email"
                      onChange={formik.handleChange}
                     value={formik.values.email}
                    />
                    <SubmissionArea onSubmit={formik.handleSubmit} />
                    <Sketches onSubmit={formik.handleSubmit} />
 
       <button type="submit">Submit</button>
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