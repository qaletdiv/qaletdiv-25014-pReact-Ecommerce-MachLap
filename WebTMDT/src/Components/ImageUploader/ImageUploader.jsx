import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageUploader({ editPro ,  onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');

  useEffect(()=> {
    setPreview(editPro.img);
  }, [editPro])

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'myCloud'); 

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dm7hcblag/image/upload', // chỉ cần đổi phần: dm7hcblag
        formData
      );
      const imageUrl = res.data.secure_url;
      setPreview(imageUrl);
      onUpload(imageUrl); // gửi URL về parent component
    } catch (err) {
      console.error('Upload thất bại:', err);
      alert('Tải ảnh thất bại');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p>⏳ Đang tải ảnh...</p>}
      {preview && <img src={preview} alt="Preview" className="mt-2 w-32 rounded" style={{maxWidth:"120px"}}/>}
    </div>
  );
}

export default ImageUploader;
