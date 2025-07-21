import React from 'react'

const Footer = () => {
    return (
        <footer className="background_Footer">
            <div className="overlayFooter" />
            <div className="container">
                <div className="row noiDung">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-12 phan1">
                        <div className="d-flex">
                            <img src="/img/logo.png" alt="" />
                            <h2>URBANSHOES</h2>
                        </div>
                        <div className="noiDungChiTiet">
                            <i className="fa-solid fa-location-dot m-2" />
                            <p>Tầng 6, Tòa nhà Ladeco, 266 Đội Cấn, Phường Liễu Giai, Quận Ba Đình, TP Hà Nội</p>
                        </div>
                        <div className="noiDungChiTiet">
                            <i className="fa-solid fa-phone m-2" />
                            <p>19006750</p>
                        </div>
                        <div className="noiDungChiTiet">
                            <i className="fa-solid fa-headset m-2" />
                            <p>support@urbanshoes.vn</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-4 col-6 phan2">
                        <h4>Về chúng tôi</h4>
                        <a href="#"><p>Trang chủ</p></a>
                        <a href="#"><p>Giới thiệu</p></a>
                        <a href="#"><p>Sản Phẩm</p></a>
                        <a href="#"><p>Tin Tức</p></a>
                        <a href="#"><p>Liên hệ</p></a>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 phan2">
                        <h4>Chính sách</h4>
                        <a href="#"><p>Trang chủ</p></a>
                        <a href="#"><p>Giới thiệu</p></a>
                        <a href="#"><p>Sản Phẩm</p></a>
                        <a href="#"><p>Tin Tức</p></a>
                        <a href="#"><p>Liên hệ</p></a>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-4 col-12 phan3">
                        <h4>Theo Dõi Chúng Tôi</h4>
                        <div className="iconSocial d-flex">
                            <div className="iconVuong">
                                <i className="fa-brands fa-youtube" />
                            </div>
                            <div className="iconVuong">
                                <i className="fa-brands fa-facebook-f" />
                            </div>
                            <div className="iconVuong">
                                <i className="fa-brands fa-instagram" />
                            </div>
                        </div>
                        <h4 className="mr_top_20">Đăng kí để nhận tin</h4>
                        <div className="dangKiNhanThongTin d-flex">
                            <input type="email" placeholder="Nhập địa chỉ email" />
                            <button>Gửi</button>
                        </div>
                    </div>
                    <hr />
                    <div className="banQuyen text-center">
                        <h5>Copyright © 2023 by URBANSHOES</h5>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
