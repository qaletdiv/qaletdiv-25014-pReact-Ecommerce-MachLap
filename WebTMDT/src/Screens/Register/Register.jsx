import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { register } from '../../redux/Slices/authSlice';
import "../../Screens/Login/login.css"
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [confirmPass , setConfirmpass] = useState("");
    const [err, setErr] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);
    const handleRegister = async (e) => {

        e.preventDefault();
        console.log("email", email);
        console.log("pass", password);
        if(confirmPass !== password){
            setErr("Vui lòng nhập giống với mật khẩu ở trên !!!");
            return;
        }

        try {
            const data = await dispatch(register({ email, password }));
            if (register.fulfilled.match(data)) {
                navigate("/login");
                alert("dang ki thanh cong!!")
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div className="container-fluid">
           
            <div className="container justify-content-center dangNhap">
                <div className="col-md-4 phanDangNhap">
                    <h3>Đăng Ký</h3>
                    <form onSubmit={handleRegister} className="was-validated">
                        <div className="mb-3 mt-3 formDN">
                            <input className="form-control input" id="uname" name='email' type='email' onChange={(e) => { setEmail(e.target.value) }} value={email} required />
                            <label htmlFor="uname" className="form-label label">Tài Khoản</label>
                            <i className="fa-solid fa-user" />
                            <div className="valid-feedback" />
                            <div className="invalid-feedback">Vui lòng nhập email</div>
                        </div>
                        <div className="mb-3 formDN">
                            <input className="form-control input" id="pwd" name='password' type='password' onChange={(e) => { setPass(e.target.value) }} value={password} required />
                            <label htmlFor="pwd" className="form-label label">Mật Khẩu</label>
                            <i className="fa-solid fa-lock" />
                            <div className="valid-feedback" />
                            <div className="invalid-feedback">Vui lòng nhập mật khẩu</div>
                        </div>
                         <div className="mb-3 formDN">
                            <input className="form-control input" id="pwd" name='ConfirmPassword' type='password' onChange={(e) => { setConfirmpass(e.target.value) }} value={confirmPass} required />
                            <label htmlFor="pwd" className="form-label label">Xác Nhận Mật Khẩu</label>
                            <i className="fa-solid fa-lock" />
                            <div className="valid-feedback" />
                            <div className="invalid-feedback">Vui lòng nhập xác nhận mật khẩu</div>
                            { err && <p style={{ color: 'red' }}>{err}</p>}
                        </div>
                         {error && <p className='text-center' style={{ color: "red" }}>{error}</p>}
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        {/* <h4 style={{ marginTop: '20px', fontSize: "1rem" }}>Hoặc tiếp tục với</h4>
                        <button className="nutDNFB">
                            <i className="fa-brands fa-facebook-f" />Đăng nhập bằng Facebook
                        </button>
                        <button className="nutDNGG">
                            <i className="fa-brands fa-google-plus-g" />
                            Đăng nhập bằng Google
                        </button> */}
                        <h5>Bạn có tài khoản? <Link to={"/register"}>Đăng nhập</Link></h5>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
