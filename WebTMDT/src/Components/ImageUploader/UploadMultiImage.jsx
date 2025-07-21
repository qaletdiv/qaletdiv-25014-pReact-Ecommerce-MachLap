import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageUploaderMulti({ editPro , onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  

    useEffect(()=> {
      setPreviews(editPro.listImg ?? "");
    }, [editPro])

  const handleFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'myCloud'); 

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dm7hcblag/image/upload', 
          formData
        );
        uploadedUrls.push(res.data.secure_url);
      } catch (err) {
        console.error('Upload thất bại:', err);
      }
    }

    setPreviews(uploadedUrls);
    setUploading(false);
    onUpload(uploadedUrls); // 👈 gửi mảng URL ảnh về parent
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleFilesChange} />
      {uploading && <p className="text-sm text-gray-500">Đang tải ảnh...</p>}

      <div className="flex flex-wrap gap-2 mt-2">
        {(previews || []).map((url, idx) => (
          <img key={idx} src={url} alt={`Preview ${idx}`} className="w-24 h-24 object-cover rounded"  style={{width:"120px" , height:"120px" , marginRight: "10px"}}/>
        ))}
      </div>
    </div>
  );
}

export default ImageUploaderMulti;
