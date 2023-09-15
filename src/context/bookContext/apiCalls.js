import axios from "axios";
const FileDownload = require('js-file-download');

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const getListBook = async (data, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/books/getallBook/" + data, {
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

export const getallStockBook = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/books/getallStockBook", {
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

export const importFileBook = async (data, setNotify, setOpenModal) => {
    const formData = new FormData();
    formData.append("file", data)
    try {
        const res = await axios.post(BACK_END_URL + "/books/addFileBook", formData, {
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

export const getConfirmBook = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getwaittoConfirmAdmin", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}


export const getWaittoBorrowBook = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getwaittoBorrowAdmin", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getBorrowedBook = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getBorrowedAdmin", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getReturnedBook = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getReturnedAdmin", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}


export const getUserReturnedBook = async (id, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getUserReturnedAdmin/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getCartAdmin = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getCartAdmin", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getCancelBook = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getCancelAdmin", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getUserConfirmBook = async (id, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getUserConfirmAdmin/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getUserWaittoBorrowBook = async (id, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getUserWaittoBorrowAdmin/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getUserBorrowedBook = async (id, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getUserBorroweddAdmin/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getUserCancelBook = async (id, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getUserCancelAdmin/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const handleDeleteBook = async (id, setNotify) => {
    try {
        const res = await axios.delete(BACK_END_URL + "/books/deleteBook/" + id, {
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

export const corfirmBook = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/carts/confirmBook/" + id, data, {
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

export const borrowBookinDetail = async (id, data, setNotify, setOpenModal) => {
    try {
        console.log(data)
        const res = await axios.put(BACK_END_URL + "/carts/borrowBook/" + id, data, {
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

export const getBorrowedStats = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/statsBook", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getCategories = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/categories/getallCategory");
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
        return res
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const createBook = async (data, setNotify, setOpenModal) => {
    try {
        const res = await axios.post(BACK_END_URL + "/books/createBook", data, {
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

export const updateBook = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/books/updateBook/" + id, data, {
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

export const exportFileBook = async (choose, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/books/exportFileBook/" + choose, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
            responseType: "blob"
        }).then((response) => {
            FileDownload(response.data, 'book-list.xlsx');
        });
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const inboundBook = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/books/inboundBook/" + id, data, {
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

export const liquidBook = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/books/liquidBook/" + id, data, {
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

export const returnBook = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/carts/returnBook/" + id, data, {
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

export const borrowBook = async (data, setNotify, setOpenModal) => {
    try {
        const res = await axios.post(BACK_END_URL + "/carts/borrowBookAdmin", data, {
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

export const cancelBook = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/carts/cancelBook/" + id, data, {
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