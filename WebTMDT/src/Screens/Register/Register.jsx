import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { register } from '../../redux/Slices/authSlice';
import "../../Screens/Login/login.css"
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPass, setConfirmpass] = useState("");
    const [err, setErr] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);

    const validate = () => {
        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Họ tên không được để trống';
        }

        if (!email.includes('@')) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (password !== confirmPass) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {

        e.preventDefault();
        console.log("email", email);
        console.log("pass", password);


        if (validate()) {
            try {
                const data = await dispatch(register({ email, password, fullName }));
                if (register.fulfilled.match(data)) {
                    navigate("/login");
                    alert("dang ki thanh cong!!")
                }
            } catch (error) {
                alert(error.message)
            }
        }
    }
    return (
        <div className="container-fluid">

            <div className="container justify-content-center dangNhap">
                <div className="col-md-4 phanDangNhap">
                    <h3>Đăng Ký</h3>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3 mt-3 formDN">
                            <input className="form-control input" id="uname" name='email' type='text' onChange={(e) => { setFullName(e.target.value) }} value={fullName} />
                            <label htmlFor="uname" className="form-label label">Họ Tên</label>

                            <p style={{ color: 'red' }}>{errors.fullName}</p>
                        </div>
                        <div className="mb-3 mt-3 formDN">
                            <input className="form-control input" id="uname" name='email' type='email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
                            <label htmlFor="uname" className="form-label label">Tài khoản Email</label>

                            <p style={{ color: 'red' }}>{errors.email}</p>
                        </div>
                        <div className="mb-3 formDN">
                            <input className="form-control input" id="pwd" name='password' type='password' onChange={(e) => { setPass(e.target.value) }} value={password} />
                            <label htmlFor="pwd" className="form-label label">Mật Khẩu</label>

                            <p style={{ color: 'red' }}>{errors.password}</p>
                        </div>
                        <div className="mb-3 formDN">
                            <input className="form-control input" id="pwd" name='ConfirmPassword' type='password' onChange={(e) => { setConfirmpass(e.target.value) }} value={confirmPass} />
                            <label htmlFor="pwd" className="form-label label">Xác Nhận Mật Khẩu</label>

                            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
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
                        <h5>Bạn có tài khoản? <Link to={"/login"}>Đăng nhập</Link></h5>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
