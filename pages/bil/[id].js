import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

import Online from './Online';
import Head from 'next/head';

const generatePayload = require('promptpay-qr');

export default function Iduser() {
  const router = useRouter();
  const { id } = router.query; 

  const [data, setData] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const captureRef = useRef(null); // ใช้สำหรับจับภาพหน้าจอ

  useEffect(() => {
    if (id) { 
      fetch(`https://api.adsdep.com/bil/${id}`) 
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Failed to load data:', error));
    }
  }, [id]); 

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true); // อัพเดตสถานะการคัดลอกเมื่อสำเร็จ
        console.log('Text copied successfully!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err); // จัดการข้อผิดพลาดหากมี
      });
  };

  const downloadImage = () => {
    const element = captureRef.current;
    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const link = document.createElement('a');
      const customerName = data[0].namebil || 'downloaded-image'; // กำหนดชื่อลูกค้าหรือชื่อเริ่มต้นถ้าไม่มีข้อมูล
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.download = `${customerName}.jpg`; // ใช้ชื่อของลูกค้าเป็นชื่อไฟล์
      link.click();
    });
  };

  if (!data || data.length === 0) {
    return <>
      <Head>
        <title>Bil:แจ้งรายละเอียดค่าบริการ</title>
        <meta name="description" content="Bil:แจ้งรายละเอียดค่าบริการโฆษณา และ รายละเอียดต่าง" />
         <meta name="twitter:image" content="/img/logo.png"/>
    <meta property="og:image" content="/img/logo.png"/>  
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mybil.adsdep.com/" />
        <meta property="og:title" content="Bil:แจ้งรายละเอียดค่าบริการ" />
        <meta property="og:description" content="Bil:แจ้งรายละเอียดค่าบริการโฆษณา และ รายละเอียดต่าง" />
        <meta property="og:image" content="https://myfb-ads.adsdep.com/img/logo.png" />
        <meta property="twitter:card" content="https://myfb-ads.adsdep.com/img/logo.png" />
        <meta property="twitter:url" content="https://mybil.adsdep.com/" />
        <meta property="twitter:title" content="Bil:แจ้งรายละเอียดค่าบริการ" />
        <meta property="twitter:description" content="Bil:แจ้งรายละเอียดค่าบริการโฆษณา และ รายละเอียดต่าง" />
        <meta property="twitter:image" content="https://myfb-ads.adsdep.com/img/logo.png" />
        <meta name="author" content="BilAds" />
        <link rel="canonical" href="https://mybil.adsdep.com/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='text-center mt-5 h1'> 
        404 - Page Not Found
      </div>
    </>;
  }

  if (data) {   
    var totol = data[0].ads_price * data[0].days + data[0].price;
    const phoneNumber = "0960792769"; 
    const amount = totol;
    const payload = generatePayload(phoneNumber, { amount: amount });

    return (
      <> 
        <Head>
          <title>Bil:แจ้งรายละเอียดค่าบริการ</title>
          <meta name="description" content="Bil:แจ้งรายละเอียดค่าบริการโฆษณา และ รายละเอียดต่าง" />
          <meta name="twitter:image" content="/img/logo.png"/>
          <meta property="og:image" content="/img/logo.png"/>  
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mybil.adsdep.com/" />
          <meta property="og:title" content="Bil:แจ้งรายละเอียดค่าบริการ" />
          <meta property="og:description" content="Bil:แจ้งรายละเอียดค่าบริการโฆษณา และ รายละเอียดต่าง" />
          <meta property="og:image" content="https://myfb-ads.adsdep.com/img/logo.png" />
          <meta property="twitter:card" content="https://myfb-ads.adsdep.com/img/logo.png" />
          <meta property="twitter:url" content="https://mybil.adsdep.com/" />
          <meta property="twitter:title" content="Bil:แจ้งรายละเอียดค่าบริการ" />
          <meta property="twitter:description" content="Bil:แจ้งรายละเอียดค่าบริการโฆษณา และ รายละเอียดต่าง" />
          <meta property="twitter:image" content="https://myfb-ads.adsdep.com/img/logo.png" />
          <meta name="author" content="BilAds" />
          <link rel="canonical" href="https://mybil.adsdep.com/" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='none'><Online/></div>
          
        <div className='container text-center mt-5'>  
          <main id='main' ref={captureRef}>  
            <div className="text-center">
              <img src="/favicon.ico" width={50} height={50} alt="logo"/>
              <p>@adsmanager 0960792769</p> 
              <p> ใบเสนอราคา แจ้งรายละเอียดบริการต่าง </p>
            </div>
            <div class="d-flex justify-content-around">
              <div className="xx">
                <h5>ลูกค้า : <strong>{data[0].namebil}</strong> </h5>
              </div>
              <div className="xx">
                No. 2024{data[0].id}
              </div>
            </div>
            <div id="cut"></div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">รายการ</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">ราคา</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{data[0].name}</th>
                  <td></td>
                  <td></td>
                  <td>{data[0].price} บาท</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">{data[0].ads}</th>
                  <td></td>
                  <td> จำนวน {data[0].days}วัน X {data[0].ads_price}บาท </td>
                  <td>{data[0].days * data[0].ads_price} บาท</td>
                  <td></td>
                </tr>
                <tr>
                  <td scope="row">รวมยอด</td>
                  <td></td>
                  <td><strong>{totol}</strong> บาท</td>
                </tr>
              </tbody>
            </table>
            <div id='a' className="a">

              <div className="b">
              <div className="bb">

                <img src="/img/p.png" width={200} alt="" /> 
                <QRCode value={payload} size={200}/>
              </div>
              </div>
              
              <div className="c">
                <div className="text-center">
                  <Image src="/img/b.jpg" width={80} height={80} className='mt-3' />
                  <h5>ธนาคารกสิกรไทย</h5>
                  <h6>K. Rak Thongko</h6>
                  <h3>1851598142</h3>
                  {copySuccess && <p style={{ color: 'green' }}>คัดลอก 1851598142 แล้ว!</p>}
                  <button onClick={() => copyText('1851598142')}>Copy Text</button>
                </div>
              </div>
            </div>
          </main>
          <br/><br/>
          <button onClick={downloadImage} className="btn btn-primary mt-5">Download Image</button>
        </div>
      </>
    );
  }
}
