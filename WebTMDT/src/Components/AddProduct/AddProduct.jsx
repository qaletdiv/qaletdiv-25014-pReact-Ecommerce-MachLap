import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, resetStatus, updateProduct } from '../../redux/Slices/productsSlice';
import ImageUploader from '../ImageUploader/ImageUploader';
import ImageUploaderMulti from '../ImageUploader/UploadMultiImage';
import { fetchCategories } from '../../redux/Slices/categoriesSlice';
import { useNavigate } from 'react-router-dom';


function AddProduct({ editPro }) {
  console.log("edit" , editPro);
  
  const [formData, setFormData] = useState({
    name: '',
    img: '',
    listImg: [],
    categoriesId: '',
    description: '',
    price: '',
    brand: '',
  });



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories.categories);
  let [selectedCate, setSelectedCate] = useState("");

  useEffect(() => {
    setFormData({
      name: editPro.name,
      img: editPro.img,
      listImg: editPro.listImg,
      categoriesId: editPro.categoriesId,
      description: editPro.description,
      price: editPro.price,
      brand: editPro.brand,
    })
    setSelectedCate(editPro.categoriesId)
  }, [editPro]);



  useEffect(() => {
    dispatch(fetchCategories());
    if (success || error) {
      const timer = setTimeout(() => dispatch(resetStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleChangeSelect = (e) => {
    setSelectedCate(e.target.value);
    setFormData(prev => ({ ...prev, categoriesId: e.target.value }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, img: url }));
  };

  const handleListImgUpload = (urls) => {
    setFormData((prev) => ({ ...prev, listImg: urls }));
  };

  const handAddProduct = () => {
    dispatch(addProduct(formData));
    navigate("/admin");
  };

  const handUpdateProduct = () => {
    dispatch(updateProduct({ id: editPro.id, name: formData.name, img: formData.img, listImg: formData.listImg, categoriesId: formData.categoriesId, description: formData.description, price: formData.price, brand: formData.brand }))
    navigate("/admin");
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Thêm sản phẩm mới</h2>
      <form className="space-y-3">
        {['name', 'description', 'price', 'brand'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={field === 'name'}
              className="w-full border rounded p-2"
            />
          </div>
        ))}

        <label for="members">Choose categories:</label>
        <select name="categories" id="categories" value={selectedCate} onChange={handleChangeSelect}>
          {categories.map(item => (
            <option key={item.id} value={item.id}> {item.name} </option>
          ))}
        </select>

        <div>
          <label className="block mb-1">Ảnh sản phẩm</label>
          <ImageUploader editPro={editPro} onUpload={handleImageUpload} />
        </div>

        <div>
          <label className="block mb-1">Ảnh phụ (nhiều ảnh)</label>
          <ImageUploaderMulti editPro={editPro} onUpload={handleListImgUpload} />
        </div>


        {editPro ? <button
          onClick={handUpdateProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3"
        >
          Save
        </button> :
          <button
            onClick={handAddProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3"
            disabled={loading}
          >
            {loading ? 'Đang thêm...' : 'Thêm sản phẩm'}
          </button>}
      </form>

      {success && <p className="text-green-600 mt-4">✔️ Thêm sản phẩm thành công!</p>}
      {error && <p className="text-red-600 mt-4">❌ {error}</p>}
    </div>
  );
}

export default AddProduct;
