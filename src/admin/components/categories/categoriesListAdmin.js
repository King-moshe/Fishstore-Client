import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import AuthAdmin from "../authAdmin";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  API_URL,
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from "../../../services/apiService";
import { useForm } from "react-hook-form";

Modal.setAppElement("#root");

// CategoryModal component
const CategoryModal = ({ isOpen, onClose, onSubmit, editData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (editData) {
      setValue("name", editData.name);
      setValue("cat_url", editData.cat_url);
      setValue("image", editData.image);
    }
  }, [editData, setValue]);

  const onSubForm = (data) => {
    onSubmit(data, editData?._id);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Category Modal"
      className="fixed inset-0 flex items-center justify-center mx-3"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {editData ? "ערוך קטגוריה" : "הוסף קטגוריה חדשה"}
        </h2>
        <form onSubmit={handleSubmit(onSubForm)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              שם הקטגוריה:
            </label>
            <input
              {...register("name", { required: true, minLength: 2 })}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">* הזן שם קטגוריה!</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              שיוך לקטגוריה:
            </label>
            <input
              {...register("cat_url", { required: true, minLength: 2 })}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.cat_url && (
              <span className="text-red-500 text-sm">* הזן שיוך קטגוריה!</span>
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 ml-2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {editData ? "עדכן" : "הוסף"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              סגור
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default function CategoriesListAdmin() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    const url = API_URL + "/categories/list";
    try {
      const data = await apiGet(url);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (_idDel, catName) => {
    if (
      window.confirm('אתה בטוח שברצונך למחוק את הקטגוריה "' + catName + '"')
    ) {
      try {
        const url = API_URL + "/categories/" + _idDel;
        const data = await apiDelete(url);
        if (data.deletedCount > 0) {
          doApi();
          toast.info("הקטגוריה " + catName + " נמחקה בהצלחה");
        }
      } catch (error) {
        console.log(error);
        toast.error("ישנה בעיה, נסה שוב");
      }
    }
  };

  const handleSubmit = async (_bodyData, _id = null) => {
    try {
      let url = API_URL + "/categories";
      let data;
      
      if (_id) {
        // Edit existing category
        url += "/" + _id;
        data = await apiPatch(url, _bodyData);
        toast.success("הקטגוריה עודכנה בהצלחה");
      } else {
        // Add new category
        data = await apiPost(url, _bodyData);
        toast.success("קטגוריה חדשה נוספה");
      }

      if (data._id) {
        setIsModalOpen(false);
        setEditData(null);
        doApi();
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("המשאב או הבקשה לא נמצאו.");
      } else if (error.response?.data?.message === "You have the same category") {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("אירעה שגיאה. אנא נסה שוב.");
      }
    }
  };

  const openEditModal = (item) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <AuthAdmin />
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex justify-between items-center mb-8 md:w-[43%]">
          <input
            type="search"
            className="flex-grow p-2 border border-gray-400 rounded-lg ms-2 me-2"
            placeholder="חיפוש ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
          >
            צור קטגוריה
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredData.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="font-bold text-lg text-white">
                הקטגוריה שחיפשת אינה קיימת במאגר
              </p>
            </div>
          ) : (
            filteredData.map((item) => (
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
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => deleteCategory(item._id, item.name)}
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
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  );
}