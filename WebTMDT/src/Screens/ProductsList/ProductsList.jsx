import React, { useEffect, useRef, useState } from 'react'
import "./ProductsList.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchCategoriesById, setFilter, setHighToLowPrice, setLowToHighPrice } from '../../redux/Slices/categoriesSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchProduct } from '../../redux/Slices/productsSlice';
import { addCart, fetchCart } from '../../redux/Slices/cartSLice';
import { toast } from 'react-toastify';
const ProductsList = () => {
    const { id } = useParams();
    const [selectedBrand, setSelectedBrand] = useState('All');
    const category = useSelector((state) => state.categories.currentCaterogy);
    const categories = useSelector((state) => state.categories.categories);
    const filter = useSelector((state) => state.categories.filter);
    const products = useSelector((state) => state.products.products);
    const currentUser = localStorage.getItem("currentUser");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("pro", category);


    const [filters, setFilters] = useState({
        sort: "default",
        category: "",
        brand: "All",
        price: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filterProducts = () => {
        let filtered = [...category?.productList || []];

        if (filters.category) {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        if (filters.brand !== "All") {
            filtered = filtered.filter(p => p.brand === filters.brand);
        }

        if (filters.price) {
            if (filters.price === "<1000000") filtered = filtered.filter(p => p.price < 1000000);
            if (filters.price === "1000000-3000000") filtered = filtered.filter(p => p.price >= 1000000 && p.price <= 3000000);
            if (filters.price === "3000000-5000000") filtered = filtered.filter(p => p.price >= 3000000 && p.price <= 5000000);
            if (filters.price === "5000000-10000000") filtered = filtered.filter(p => p.price >= 5000000 && p.price <= 10000000);
            if (filters.price === ">10000000") filtered = filtered.filter(p => p.price > 10000000);
        }

        if (filters.sort === "asc") filtered.sort((a, b) => a.price - b.price);
        if (filters.sort === "desc") filtered.sort((a, b) => b.price - a.price);

        return filtered;
    };

    const filteredProducts = filterProducts();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    // let result = category?.productList
    // const lowToHighPrice = () => {
    //     const copy = structuredClone(category);
    //     result = copy.productList.sort((a, b) => a.price - b.price);
    //     console.log(result);
    //     dispatch(setLowToHighPrice(result))
    //     return result;
    // }
    // const highToLowPrice = () => {

    //     const copy = structuredClone(category);
    //     result = copy.productList.sort((a, b) => b.price - a.price);
    //     console.log(result);
    //     dispatch(setHighToLowPrice(result))
    //     return result;

    // }

    const handleCaterogies = (id) => {
        navigate(`/categories/${id}`);
    }


    useEffect(() => {
        dispatch(fetchCategoriesById(id));
        dispatch(fetchCategories());
        dispatch(fetchProduct());
        dispatch(fetchCart());
    }, [dispatch, id])

    if (!category) {
        return (
            <div className='text-center'>
                This caterogy not found |
                <Link to={"/home"}>back home</Link>
            </div>

        )
    }







    const brands = ['All', ...Array.from(new Set(products.map(p => p.brand)))];
    // const currentPro = category?.productList;
    // const filteredProducts = selectedBrand === 'All'
    //     ? currentPro
    //     : currentPro.filter(p => p.brand === selectedBrand);

    const handleAddToCart = (id) => {
        if (currentUser) {
            dispatch(addCart({ idProduct: id, quantity: 1 }))
                .then(() => dispatch(fetchCart()));
            toast.success('Đã thêm vào giỏ hàng thành công!', {
                position: 'top-right',
                autoClose: 1500,
                hideProgressBar: false,
                theme: 'light',
            });
        } else {
            navigate("/login");
        }
        //    navigate("/payment");
    }



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
                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                        <aside className="locTimKiemSP">
                            <div className="sapXep">
                                <label><b>SẮP XẾP</b></label><br />
                                <label><input type="radio" name="sort" value="default" onChange={handleChange} defaultChecked /> Mặc định</label><br />
                                <label><input type="radio" name="sort" value="asc" onChange={handleChange} /> Giá từ thấp đến cao</label><br />
                                <label><input type="radio" name="sort" value="desc" onChange={handleChange} /> Giá từ cao đến thấp</label><br />
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
                                            defaultChecked={brand === "All"}
                                            onChange={handleChange}
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
                            <div className="sapXep">
                                <label><b>GIÁ SẢN PHẨM</b></label><br />
                                <label><input type="radio" name="price" value="<1000000" onChange={handleChange} /> Giá dưới 1.000.000đ</label><br />
                                <label><input type="radio" name="price" value="1000000-3000000" onChange={handleChange} /> 1.000.000đ - 3.000.000đ</label><br />
                                <label><input type="radio" name="price" value="3000000-5000000" onChange={handleChange} /> 3.000.000đ - 5.000.000đ</label><br />
                                <label><input type="radio" name="price" value="5000000-10000000" onChange={handleChange} /> 5.000.000đ - 10.000.000đ</label><br />
                                <label><input type="radio" name="price" value=">10000000" onChange={handleChange} /> Giá trên 10.000.000đ</label><br />
                            </div>
                        </aside>
                    </div>
                    <div className="col-lg-9 col-md-6 col-sm-12 col-12">
                        <div className="row">
                            {filteredProducts?.map(item => (
                                <div key={item.id} className="col-lg-4 col-md-12 col-sm-12 col-12">
                                    <Link style={{ textDecoration: "none" }} to={`/products/${item.id}`}>
                                        <div className="sanPham">
                                            <div className="overlay3" />
                                            <div className="iconMuaHang">
                                                <i className="fa-solid fa-cart-plus" />
                                            </div>
                                            <a href="#">
                                                <img src={item.img} alt="" />
                                            </a>
                                            <h2>{item.brand}</h2>
                                            <a className='imgSP' href>
                                                {item.name}
                                            </a>
                                            <div className="gia">
                                                {/* <p className="giaCu">4.500.000đ</p> */}
                                                <p className="giaMoi">{formatPrice(item.price)} ₫</p>
                                            </div>
                                            <div>
                                                <p style={{ color: "gray" }}>{item.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <button onClick={() => handleAddToCart(item.id)} className='orderProduct'>Đặt Hàng</button>
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
