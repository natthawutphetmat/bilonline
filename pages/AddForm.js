// pages/addData.js

import React, { useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function AddData() {
  const [formData, setFormData] = useState({
    namebil: '',
    name: '',
    price: 0,
    ads: '',
    days: 0,
    ads_price: 0
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.adsdep.com/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        
      });

      if (!response.ok) {
        throw new Error('Failed to add data');
      }

      const data = await response.json();
      console.log('Data added successfully:', data);
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data added successfully',
        timer: 3000
      }).then((result) => {
    
        window.location.reload(true);
      });
    } catch (error) {
      console.error('Error adding data:', error);
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add data'
      });
    }
  };

  return (
    <>

<div className='forminput text-center'  id='main'>
                <h1>Add New Post</h1>
                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col-8">

                            <input type="text" name="name" list="datalistOptions" id="exampleDataList" className='form-control form-control-sm' placeholder="รายการ" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="col">
                            <input type="number" className='form-control form-control-sm' list='price'  name="price" value={formData.price} onChange={handleChange} />
                            บาท  </div>
                    </div>

                    < hr />



                    <div className="row">
                        <div className="col-6">ค่าโฆษณา
                            <input type="text" list="ads" name="ads" className='form-control form-control-sm' value={formData.ads} onChange={handleChange} placeholder="ค่าโฆษณา" />
                        </div>
                        <div className="col"> วัน
                            <input type="number" name="days" className='form-control form-control-sm' value={formData.days} onChange={handleChange} />
                        </div>
                        <div className="col">บาท
                            <input type="number" name="ads_price" className='form-control form-control-sm' value={formData.ads_price} onChange={handleChange} />
                        </div>
                    </div>
                    < hr />




                    <div className="col"> ชื่อ ลูกค้า
                    <input type="text" name="namebil" className="form-control form-control-sm" placeholder="ชื่อลูกค้า" required value={formData.namebil} onChange={handleChange} />

                    </div>



                    <button type="submit" className='btn btn-info' >Submit</button>

                    <datalist id="datalistOptions">
                        <option value="คอร์สเรียนทำโฆษณาออนไลน์ Google Ads สายเทา" />
                        <option value="คอร์สเรียนทำโฆษณาออนไลน์ facebook Ads สายเทา" />
                        <option value="บริการทำโฆษณา Google Ads สายเทา รายเดือน" />
                        <option value="บริการทำโฆษณา facebook Ads สายเทา รายเดือน" />
                        <option value="บัญชีโฆษณา Google Ads คีย์เทา อุธรแล้ว" />
                    </datalist>

                    <datalist id="ads">
                    <option value="ค่าโฆษณาที่ต้องจ่ายให้กับ Google (งบยิง) วัน x บาท" />
                    <option value="ค่าโฆษณาที่ต้องจ่ายให้กับ facebook (งบยิง) วัน x บาท" />

                    </datalist>

                    <datalist id="price">
                  <option value="9900" />
                  <option value="3500" />
                  <option value="10000" />
                  <option value="18500" />

                    </datalist>




                </form>

            </div>
            
  
        
    </>
  );
}
