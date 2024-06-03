import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode.react';
import AddForm from './AddForm';
import Head from 'next/head';
import Online from './Online';
import { useRouter } from 'next/router';




const generatePayload = require('promptpay-qr');

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("095-642-2872");
  const [amount, setAmount] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrCode, setQrCode] = useState("sample");

  const router = useRouter(); 
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user !== 'admin') {
      router.push('/login');
    }
  }, [router]);
  



  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.adsdep.com/bil`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await res.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const totalPrice = data.reduce((acc, item) => acc + item.ads_price + item.price, 0);
      setTotalPrice(totalPrice);
    }
  }, [data]);

  useEffect(() => {
    const qrCodeData = generatePayload(phoneNumber, { amount: totalPrice });
    setQrCode(qrCodeData);
  }, [phoneNumber, totalPrice]);

  const copyText = () => {
    navigator.clipboard.writeText("1761696374").then(function() {
      setCopySuccess(true);
    }, function() {
      console.error('Unable to copy');
    });
  };




  const handleDelete = (namebil) => {
    fetch(`https://api.adsdep.com/delete/${namebil}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete data');
        }
        console.log('Data deleted successfully');
        window.location.reload(true);
        
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
        window.location.reload(true);
      });
  };
  
console.log(data)



  return (
  

        <>
        <Head>
          <title>Bil:แจ้งรายละเอียดค่าบริ โฆษณา</title>
          <meta name="description" content="Bil:แจ้งรายละเอียดค่าบริโฆษณา และ รายละเอียดต่าง" />
          <meta property="og:image" content="https://mybil.adsdep.com/favicon.ico"/>  
             <meta name="twitter:image" content="/img/logo.png"/>
    <meta property="og:image" content="/img/logo.png"/>  
        </Head>
        
        
        
<div className="show">

      <div className="text-center">

        <div className="user mt-5"> <Online/> </div>


      <AddForm/>
      </div>



    {loading ? (
                    <p></p>
                ) : (
            
 <table className="table container w-100">
                            <thead>
                                <tr>
                                    <th scope="col">####</th>
                                    <th scope="col">รายการ</th>
                                    <th scope="col">ยอดเงิน</th>
                                    <th scope="col">ค่าโฆษณา</th>
                                    <th scope="col">วัน</th>
                                    <th scope="col">บาท</th>

                                    <th scope="col">ยอดเงิน</th>
                                    <th scope="col">รวมยอด</th>
                                </tr>
                            </thead>


                            {data.map(post => (
  <tbody key={post.id}>
    <tr>
      <th scope="row"> <a className='btn btn-outline-primary ' target='bank' href={`/bil/${post.namebil}`}>{post.namebil}</a> </th>
      <td>{post.name}</td>
      <td>{post.price}</td>
      <td>{post.ads}</td>
      <td>{post.days}</td>
       <td>{post.ads_price}  </td>
       <td>{post.days*post.ads_price}  </td>
       <td>{post.days*post.ads_price+post.price}  </td>



      <td>
        <button onClick={() => handleDelete(post.namebil)}>Delete</button>
      </td>
    </tr>
  </tbody>
))}


                        </table>
                )};
            </div>
        
        </>
   
  );
}

