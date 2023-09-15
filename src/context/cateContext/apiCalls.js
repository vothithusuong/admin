import axios from "axios";

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const getListCate = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL+"/categories/getallCategoryAdmin", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const handleDeleteCate = async (id, setNotify) => {
    try {
        const res = await axios.delete(BACK_END_URL+"/categories/deleteCategory/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const createCate = async (data, setNotify, setOpenModal) => {
    try {
        const res = await axios.post(BACK_END_URL+"/categories/createCategory", data, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
            setOpenModal(false)
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const updateCate = async (id, data, setNotify, setOpenModal) => {
    try {
        console.log(id, data)
        const res = await axios.put(BACK_END_URL+"/categories/updateCategory/" + id, data, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
            setOpenModal(false)
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}