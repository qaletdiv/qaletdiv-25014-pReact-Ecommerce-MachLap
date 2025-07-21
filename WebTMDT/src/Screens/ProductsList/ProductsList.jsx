import React, { useEffect, useRef, useState } from 'react'
import "./ProductsList.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchCategoriesById, setFilter, setHighToLowPrice, setLowToHighPrice } from '../../redux/Slices/categoriesSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchProduct } from '../../redux/Slices/productsSlice';
const ProductsList = () => {
    const { id } = useParams();
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [rage , setRage] = useState("");
    const category = useSelector((state) => state.categories.currentCaterogy);
    const categories = useSelector((state) => state.categories.categories);
    const filter = useSelector((state) => state.categories.filter);
    const products = useSelector((state) => state.products.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const refPrice = useRef();
    console.log(category);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    let result = category?.productList
    const lowToHighPrice = () => {
        const copy = structuredClone(category);
        result = copy.productList.sort((a, b) => a.price - b.price);
        console.log(result);
        dispatch(setLowToHighPrice(result))
        return result;
    }
    const highToLowPrice = () => {

        const copy = structuredClone(category);
        result = copy.productList.sort((a, b) => b.price - a.price);
        console.log(result);
        dispatch(setHighToLowPrice(result))
        return result;

    }

    const handleCaterogies = (id) => {
        navigate(`/categories/${id}`);
        refPrice.current.checked = true
    }


    useEffect(() => {
        dispatch(fetchCategoriesById(id));
        dispatch(fetchCategories());
        dispatch(fetchProduct());
    }, [dispatch, id])

    if (!category) {
        return (
            <div className='text-center'>
                This caterogy not found |
                <Link to={"/home"}>back home</Link>
            </div>

        )
    }

//     const filtered = products.filter((p) => {
//         if(rage === "lt1"){
//             console.log(p.price < 3000);
            
//         }
//         if(rage === "1to3"){
//             console.log(p.price > 3000);
            
//         }
//   });



    const brands = ['All', ...Array.from(new Set(products.map(p => p.brand)))];
    const currentPro = category?.productList;
    const filteredProducts = selectedBrand === 'All'
        ? currentPro
        : currentPro.filter(p => p.brand === selectedBrand);


    return (
        <div>
            <div className="slideshowTinTuc">
                <div className="overlay2" />
                <img src="/img/bannerSanPham.png" alt="" />
                <div className="content">
                    <h2>Sản Phẩm</h2>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <aside className="locTimKiemSP">
                            <div className="sapXep">
                                <label><b>SẮP XẾP</b></label><br />
                                <input type="radio" name="xepGia" defaultValue={1} ref={refPrice} defaultChecked />Mặc định<br />
                                <input type="radio" name="xepGia" defaultValue={2} onClick={lowToHighPrice} />Giá từ thấp đến cao <br />
                                <input type="radio" name="xepGia" defaultValue={3} onClick={highToLowPrice} />Giá từ cao đến thấp
                            </div>
                            <div className="sapXep">
                                <label><b>Danh mục</b></label><br />
                                {categories.map(item => (
                                    <div key={item.id}>
                                        <input type="radio" name="phanLoai" onClick={() => handleCaterogies(item.id)} />{item.name}
                                    </div>
                                ))}

                            </div>
                            <div className="sapXep">
                                <label><b>THƯƠNG HIỆU</b></label><br />
                                {brands.map((brand) => (
                                    <div key={brand}>
                                        <input
                                            type="radio"
                                            name="brand"
                                            value={brand}
                                            checked={selectedBrand === brand}
                                            onChange={(e) => setSelectedBrand(e.target.value)}
                                        />
                                        {brand}
                                    </div>
                                ))}
                                {/* <input type="radio" name="thuongHieu" defaultValue={1} defaultChecked onClick={() => { dispatch(setFilter("Adidas")) }} />Adidas<br />
                                <input type="radio" name="thuongHieu" defaultValue={2} onClick={() => { dispatch(setFilter("Logitech")) }} />Logitech */}
                            </div>
                            {/* <div className="sapXep">
                                <label><b>KÍCH THƯỚC</b></label><br />
                                <ul className="danhSach">
                                    <li>
                                        <button className="size">35</button>
                                    </li>
                                    <li>
                                        <button className="size">36</button>
                                    </li>
                                    <li>
                                        <button className="size">37</button>
                                    </li>
                                    <li>
                                        <button className="size">38</button>
                                    </li>
                                    <li>
                                        <button className="size">39</button>
                                    </li>
                                    <li>
                                        <button className="size">40</button>
                                    </li>
                                    <li>
                                        <button className="size">41</button>
                                    </li>
                                    <li>
                                        <button className="size">42</button>
                                    </li>
                                    <li>
                                        <button className="size">43</button>
                                    </li>
                                    <li>
                                        <button className="size">44</button>
                                    </li>
                                    <li>
                                        <button className="size">45</button>
                                    </li>
                                    <li>
                                        <button className="size">46</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="sapXep">
                                <label><b>MÀU SẮC</b></label><br />
                                <ul className="danhSach">
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: 'white', border: '1px solid #E7E7E7' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: 'black' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#F1C40F' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#9B59B6' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#E74C3C' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#2ECC71' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#FF00CC' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#E67E22' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#bcbbc0' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#0082be' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#88c9dd' }} />
                                    </li>
                                    <li>
                                        <div className="mauSac" style={{ backgroundColor: '#e67d9e' }} />
                                    </li>
                                </ul>
                            </div> */}
                            {/* <div className="sapXep">
                                <label><b>GIÁ SẢN PHẨM</b></label><br />
                                <input type="radio" name="xepTheoGia"  value="lt1" checked = {rage === "lt10"} onChange={(e) => {setRage(e.target.value)}}/>Giá dưới 1.000.000đ<br />
                                <input type="radio" name="xepTheoGia" value="1to3" checked = {rage === "1to3"} onChange={(e) => {setRage(e.target.value)}}/>1.000.000đ - 3.000.000đ <br />
                                <input type="radio" name="xepTheoGia" value="3to5"  checked = {rage === "3to5"} onChange={(e) => {setRage(e.target.value)}}/>3.000.000đ - 5.000.000đ  <br />
                                <input type="radio" name="xepTheoGia" value="5to10"  checked = {rage === "5to10"} onChange={(e) => {setRage(e.target.value)}}/>5.000.000đ - 10.000.000đ  <br />
                                <input type="radio" name="xepTheoGia" value="gt10"  checked = {rage === "gt10"} onChange={(e) => {setRage(e.target.value)}}/>Giá trên 10.000.000đ
                            </div> */}
                        </aside>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            {filteredProducts?.map(item => (
                                <div key={item.id} className="col-lg-4 col-md-4 col-sm-6 col-6">
                                    <Link style={{textDecoration:"none"}} to={`/products/${item.id}`}>
                                        <div className="sanPham">
                                            <div className="overlay3" />
                                            <div className="iconMuaHang">
                                                <i className="fa-solid fa-cart-plus" />
                                            </div>
                                            <a href="#">
                                                <img src={item.img} alt="" />
                                            </a>
                                            <h2>{item.brand}</h2>
                                            <a href>
                                                {item.name}
                                            </a>
                                            <div className="gia">
                                                {/* <p className="giaCu">4.500.000đ</p> */}
                                                <p className="giaMoi">{formatPrice(item.price)}₫</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                     
                        </div>
                        {/* <div className="nutChuyenTrang">
                            <div className="so1">1</div>
                            <div className="so2">2</div>
                            <div className="iconChuyenTrang">
                                <i className="fa-solid fa-angles-right" />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductsList
