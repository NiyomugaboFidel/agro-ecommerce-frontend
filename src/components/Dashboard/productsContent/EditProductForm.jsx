import  { useState, useEffect, useCallback } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, CircularProgress } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import customAxios from "../../../lib/customAxios";
import { FaTrash } from 'react-icons/fa';
import { getProduct } from "../../../services/products/products";

// Units Enum for the select options
const unitsEnum = [
  "kg", "g", "lb", "l", "ml", "m", "cm", "pcs", "box", "dozen", "bottle", "packet",
];

const EditProdForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    discount: '',
    quantity: '',
    moq: '',
    unit: '',
    details: '',
    categoryName: '',
    expirationDate: '',
  });
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch product data by ID when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const product = await getProduct(productId);
        console.log("product==", product.category.name)
        setFormData({
          title: product.title || '',
          price: product.price || '',
          discount: product.discount || '',
          quantity: product.quantity || '',
          moq: product.moq || '',
          unit: product.unit || '',
          details: product.details || '',
          categoryName: product.category.name || '',
          expirationDate: product.expirationDate ? product.expirationDate.split('T')[0] : '',
        });
        setSelectedImages(product.images.map(image => ({ preview: image })));
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle image drop
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages((prevState) => [
      ...prevState, 
      ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
    ]);
  }, []);
  
  // Remove a selected image
  const handleRemoveImage = (index) => {
    setSelectedImages((prevState) => prevState.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });
  
  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler to update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = new FormData();
    
    // Append form data
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    // Append new images
    selectedImages.forEach(image => {
      if (image instanceof File) {
        form.append('images', image);
      }
    });

    try {
      // Use PUT request to update the product by ID
      const response = await customAxios.put(`/products/${productId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product updated:', response.data);
      navigate('/dashboard/products');
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen dark:bg-darkTheme bg-gray-100 p-6 w-full">
      <div className="w-full max-w-5xl bg-white dark:bg-white/80 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Minimum Order Quantity (MOQ)"
              name="moq"
              type="number"
              value={formData.moq}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Unit</InputLabel>
              <Select
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                fullWidth
              >
                {unitsEnum.map(unit => (
                  <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Expiration Date"
              name="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </div>
          <TextField
            label="Details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          
          {/* Category Select */}
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Agriculture">Agriculture</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              {/* <MenuItem value="Handicrafts">Handicrafts</MenuItem> */}
            
              {/* <MenuItem value="Textiles">Textiles</MenuItem>
              <MenuItem value="Cosmetics">Cosmetics</MenuItem>
              <MenuItem value="Chemicals">Chemicals</MenuItem>
              <MenuItem value="Energy and Resources">Energy and Resources</MenuItem> */}
            </Select>
          </FormControl>

          {/* Image Upload Section */}
          <div {...getRootProps()} className="border-dashed border-2 border-gray-400 py-10 text-center cursor-pointer">
            <input {...getInputProps()} />
            <p>{isDragActive ? "Drop images here..." : "Drag & drop images here, or click to select files"}</p>
          </div>
          
          {/* Preview Selected Images */}
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-9 gap-7 mt-4">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative w-[80px]">
                  <img src={file.preview} alt="preview" className="object-cover w-[80px] h-[80px] rounded-md" />
                  <button
                    type="button"
                    className="absolute top-1 right-2 text-red-500 rounded-full text-sm font-bold py-[2px] px-[2] "
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FaTrash/>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button with Loader */}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={loading}  // Disable button when loading
            startIcon={loading && <CircularProgress size={20} />}  // Show loader icon
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditProdForm;
