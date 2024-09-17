import React, { useEffect, useState } from "react";
import AuthAdmin from "../authAdmin";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  API_URL,
  apiDelete,
  apiGet,
  apiPatch,
  apiPost 
} from "../../../services/apiService";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

Modal.setAppElement("#root");

export default function ProductsListAdmin() {
  const [data, setData] = useState([]);
  const [catListAr, setCatListAr] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    doApi();
    doApiGetCatList();
  }, []);

  const doApi = async () => {
    const url = API_URL + "/products/list";
    try {
      const data = await apiGet(url);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (_idDel, productName) => {
    if (
      window.confirm('אתה בטוח שברצונך למחוק את המוצר "' + productName + '"')
    ) {
      try {
        const url = API_URL + "/products/" + _idDel;
        const data = await apiDelete(url);
        if (data.deletedCount > 0) {
          doApi();
          toast.info("המוצר " + productName + " נמחק בהצלחה");
        }
      } catch (error) {
        console.log(error);
        toast.error("ישנה בעיה, נסה שוב");
      }
    }
  };

  const doApiGetCatList = async () => {
    const url = API_URL + "/categories/list";
    try {
      const data = await apiGet(url);
      console.log(data);
      setCatListAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  const doApiPostProduct = async (_bodyData) => {
    try {
      const url = API_URL + "/products";
      const data = await apiPost(url, _bodyData);
      if (data._id) {
        toast.success("מוצר חדש נוסף!");
        closeAddModal();
        doApi();
        reset();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("המשאב או הבקשה לא נמצאו.");
      } else {
        console.log(error);
        toast.error("אירעה שגיאה בעת הוספת המוצר.");
      }
    }
  };

  const doApiUpdateProduct = async (_bodyData) => {
    try {
      const url = API_URL + "/products/" + selectedProduct._id;
      const data = await apiPatch(url, _bodyData);
      if (data.modifiedCount > 0) {
        toast.success("המוצר עודכן בהצלחה!");
        closeEditModal();
        doApi();
      }
    } catch (error) {
      console.log(error);
      toast.error("אירעה שגיאה בעת עדכון המוצר.");
    }
  };

  const filteredAndSortedData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item) =>
      selectedCategory ? item.cat_url === selectedCategory : true
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    reset();
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setValue("name", product.name);
    setValue("cat_url", product.cat_url);
    setValue("image", product.image);
    setValue("price", product.price);
    setValue("amount", product.amount);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    reset();
  };

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPostProduct(_bodyData);
  };

  const onEditForm = (_bodyData) => {
    console.log(_bodyData);
    doApiUpdateProduct(_bodyData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <AuthAdmin />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-8">
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:items-center">
            <input
              type="search"
              className="p-2 border border-gray-400 rounded-lg w-full md:w-auto md:ml-2"
              placeholder="חיפוש ..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select
              className="p-2 border border-gray-400 rounded-lg w-full md:w-auto "
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">כל הקטגוריות</option>
              {catListAr.map((cat) => (
                <option key={cat._id} value={cat.cat_url}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              className="p-2 border border-gray-400 rounded-lg w-full md:w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">מחיר: מהנמוך לגבוה</option>
              <option value="desc">מחיר: מהגבוה לנמוך</option>
            </select>
          </div>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 w-full md:w-auto"
            onClick={openAddModal}
          >
            הוסף מוצר
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedData.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="font-bold text-lg text-white">
                לא נמצאו מוצרים התואמים את החיפוש
              </p>
            </div>
          ) : (
            filteredAndSortedData.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-center mb-2">
                    {item.name}
                  </h2>
                  <p className="text-center">מחיר: {item.price} לק"ג</p>
                  <p className="text-center">מלאי זמין: {item.amount}</p>
                  <div className="flex justify-center space-x-2 mt-4">
                    <button
                      onClick={() => deleteProduct(item._id, item.name)}
                      className="p-2 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      <DeleteIcon />
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      <EditIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="הוסף מוצר חדש"
        className="fixed inset-0 flex items-center justify-center mx-3"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">הוסף מוצר חדש</h2>
          <form onSubmit={handleSubmit(onSubForm)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                שם המוצר:
              </label>
              <input
                {...register("name", { required: true, minLength: 2 })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">* הזן שם מוצר!</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                שיוך לקטגוריה:
              </label>
              <select
                {...register("cat_url", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">בחר קטגוריה</option>
                {catListAr.map((cat) => (
                  <option key={cat._id} value={cat.cat_url}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.cat_url && (
                <span className="text-red-500 text-sm">* בחר קטגוריה!</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                הוסף תמונה:
              </label>
              <input
                {...register("image", { required: true, minLength: 2 })}
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.image && (
                <span className="text-red-500 text-sm">* הוסף תמונה!</span>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  מחיר:
                </label>
                <input
                  {...register("price", { required: true, min: 0 })}
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">* הזן מחיר תקין!</span>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  כמות במלאי:
                </label>
                <input
                  {...register("amount", { required: true, min: 0 })}
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.amount && (
                  <span className="text-red-500 text-sm">
                    * הזן כמות תקינה!
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                הוסף
              </button>
              <button
                type="button"
                onClick={closeAddModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                סגור
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="ערוך מוצר"
        className="fixed inset-0 flex items-center justify-center mx-3"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">ערוך מוצר</h2>
          <form onSubmit={handleSubmit(onEditForm)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                שם המוצר:
              </label>
              <input
                {...register("name", { required: true, minLength: 2 })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">* הזן שם מוצר!</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                שיוך לקטגוריה:
              </label>
              <select
                {...register("cat_url", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">בחר קטגוריה</option>
                {catListAr.map((cat) => (
                  <option key={cat._id} value={cat.cat_url}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.cat_url && (
                <span className="text-red-500 text-sm">* בחר קטגוריה!</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                תמונה:
              </label>
              <input
                {...register("image", { required: true, minLength: 2 })}
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.image && (
                <span className="text-red-500 text-sm">* הוסף תמונה!</span>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  מחיר:
                </label>
                <input
                  {...register("price", { required: true, min: 0 })}
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">* הזן מחיר תקין!</span>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  כמות במלאי:
                </label>
                <input
                  {...register("amount", { required: true, min: 0 })}
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.amount && (
                  <span className="text-red-500 text-sm">
                    * הזן כמות תקינה!
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                עדכן
              </button>
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                סגור
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
