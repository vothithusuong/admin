import axios from "axios";

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const getListBanner = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/banners/getallBannerAdmin", {
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

export const createBanner = async (data, setNotify, setOpenModal) => {
    try {
        const res = await axios.post(BACK_END_URL + "/banners/createBanner", data, {
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

export const updateBanner = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/banners/updateBanner/" + id, data, {
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

export const handleDeleteBanner = async (id, setNotify) => {
    try {
        const res = await axios.delete(BACK_END_URL + "/banners/deleteBanner/" + id, {
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