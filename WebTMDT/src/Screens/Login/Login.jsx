import "./login.css"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { fetchProduct } from "../../redux/Slices/productsSlice";
import { login } from "../../redux/Slices/authSlice";
import { setCurrUser } from "../../redux/Slices/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const error = useSelector((state) => state.auth.error);

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email không được để trống';
        }



        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {

        e.preventDefault();
        console.log("Email", email);
        console.log("pass", password);

        if (validate()) {
            const data = await dispatch(login({ email, password }));
            console.log(data);

            if (login.fulfilled.match(data)) {
                localStorage.setItem("currentUser", email);
                await dispatch(fetchProduct())
                navigate("/home")
            }
        }

    }
    return (
        <div className="container-fluid">

            <div className="container justify-content-center dangNhap">
                <div className="col-md-4 phanDangNhap">
                    <h3>Đăng Nhập</h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3 mt-3 formDN">
                            <input className="form-control input" id="uname" name='email' type='email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
                            <label htmlFor="uname" className="form-label label">Tài khoản Email</label>
                            <i className="fa-solid fa-user" />
                            <p style={{ color: 'red' }}>{errors.email}</p>
                        </div>
                        <div className="mb-3 formDN">
                            <input className="form-control input" id="pwd" name='password' type='password' onChange={(e) => { setPass(e.target.value) }} value={password} />
                            <label htmlFor="pwd" className="form-label label">Mật Khẩu</label>
                            <i className="fa-solid fa-lock" />

                        </div>
                        <div className="form-check mb-3">
                            <label className="form-check-label check">
                                <input className="form-check-input" type="checkbox" name="remember" /> Nhớ mật khẩu
                            </label>
                        </div>
                        {error && <p className="text-center" style={{ color: "red" }}>{error}</p>}
                        <button type="submit" className="btn btn-primary">Đăng Nhập</button>
                        {/* <h4 style={{ marginTop: '20px', fontSize: "1rem" }}>Hoặc tiếp tục với</h4>
                        <button className="nutDNFB">
                            <i className="fa-brands fa-facebook-f" />Đăng nhập bằng Facebook
                        </button>
                        <button className="nutDNGG">
                            <i className="fa-brands fa-google-plus-g" />
                            Đăng nhập bằng Google
                        </button> */}
                        <h5>Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link></h5>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login
