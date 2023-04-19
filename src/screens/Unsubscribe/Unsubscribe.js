import React, { useEffect, useState } from "react";
import "./_unsubscribe.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import avatar from '../../components/LeaderBoard/assets/userAvatar2.png'
import axios from "axios";

const Unsubscribe = () => {

    const { email } = useParams()
    const [success, setSuccess] = useState(false)
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
  

      const checkEmail = () => {
        axios.get(`https://api3.dyp.finance/api/newsletter/check/${email}`).then((res) => {
          if(res.data.status === 0){
            navigate('/')
          }else{
            setShow(true)
          }
        })
      }

      const unsubscribe = async() => {
        await axios.get(`https://api3.dyp.finance/api/newsletter/unsubscribe/${email}`).then((res) => {
          setSuccess(true)
        })
      }

      useEffect(() => {
        checkEmail()
      }, [])
      


  return (
    <div className="container-fluid unsubscribe-wrapper px-0 d-flex align-items-center justify-content-center" >
      {show === true && 
      <div className="container-lg  d-flex w-100 flex-column py-5" style={{minHeight: '68vh'}}>
      <div className="row w-100 flex-column pt-5 pt-lg-0 px-3 gap-5 px-lg-5 mx-0 justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center gap-2">
              <img src={avatar} width={40} height={40} alt="" />
          <h6 className="text-white mb-0" style={{width: 'fit-content', fontSize: '20px'}}>{email}</h6>
          </div>
        {success === false ?
          <>
            <div className="d-flex align-items-center flex-column gap-2">
          <span className="text-white" style={{width: 'fit-content'}}>You are unsubscribing from: </span>
          <h3 className="text-white" style={{width: 'fit-content'}}>World of Dypians Newsletter</h3>
          </div>
          <div className="d-flex flex-column align-items-center gap-4">
          <div
                className="linear-border"
                style={{
                  width: "fit-content",
                  zIndex: 5,
                  position: "relative",
                }}
              >
                <button
                  className="btn filled-btn px-4 px-lg-5 d-flex align-items-center gap-2"
                  onClick={unsubscribe}
                >
                  Confirm
                </button>
              </div> 
              <Link
              to="/"
                className="linear-border"
                style={{
                  width: "fit-content",
                  zIndex: 5,
                  position: "relative",
                  textDecoration: 'none'
                }}
              >
                <button
                  className="btn outline-btn px-4 px-lg-5 d-flex align-items-center gap-2"
                >
                 Cancel
                </button>
              </Link>
          </div>
          </>  
          :
          <>
             <div className="d-flex align-items-center flex-column gap-2">
          <h6 className="text-white" style={{width: 'fit-content'}}>You have unsubscribed from <b>World of Dypians newsletter</b></h6>
          <span className="text-white" style={{width: 'fit-content'}}>We will no longer be sending you updates</span>
          </div>
          <Link
              to="/"
                className="linear-border"
                style={{
                  width: "fit-content",
                  zIndex: 5,
                  position: "relative",
                  textDecoration: 'none'
                }}
              >
                <button
                  className="btn filled-btn px-4 px-lg-5 d-flex align-items-center gap-2"
                >
                 Return
                </button>
              </Link>
          </>
      }
      </div>
    </div>
      }
    </div>
  );
};

export default Unsubscribe;
